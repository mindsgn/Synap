import contractSchema from "./models/contracts";
import pdf from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai"

/* 
    Notes:
    maybe check if PDF is okay
*/


const extractJsonData = (text: string) => {
    // Find the index of the opening and closing curly braces
    const startIndex = text.indexOf("{");
    const endIndex = text.lastIndexOf("}");

    // Check if both braces are found
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      // Extract the JSON string
      const jsonString = text.substring(startIndex, endIndex + 1);

      try {
        // Parse the JSON string
        const jsonData = JSON.parse(jsonString);
        return jsonData;
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
      }
    } else {
      console.error("Valid JSON structure not found in the string");
      return null;
    }
};

const getOnePDF = async () => {
    try{
        const response = await contractSchema.find({status: "pending"});
        
        if( response.length === 0){
            return null
        }

        const file = response[0];
        const data = await pdf(`../uploads/${file.file}`);

        const genAI = new GoogleGenerativeAI(`${process.env.GOOGLE_API_KEY}`);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `
            based on the provided contract: ${data.text}.
            1. is this a contract? if not return json only { error: true, message: "not real picture" } else continue to question 2
            2. return json data in this format
                {
                    error: false,
                    name: "contract name",
                    company: "company name",
                    description: "short description of contract",
                    contract: [{ title: "title", paragraph: "paragraph", page: "page number" }] // break the full contract json
                }
        `;

        const result = await model.generateContent(prompt);
        const jsonData = extractJsonData(result.response.text())
        const update = await contractSchema.findOneAndUpdate({_id: file._id}, {
            ...jsonData,
            fullContract: data.text,
            status: "processed",
            json: jsonData.contract,
        })

        console.log(update);
        
    }catch(error){
        console.log(error)
    }
}

export {
    getOnePDF,
    extractJsonData
}
