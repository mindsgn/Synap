import express, { Request } from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './db';
import cors from 'cors';
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { Response } from 'express';
import contractSchema from "./models/contracts";
import * as cron from "node-cron";
import { getOnePDF } from './bot';
import { GoogleGenerativeAI } from "@google/generative-ai"
import { extractJsonData } from './bot';
import pdf from "pdf-parse";
import * as fs from "fs"

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');
const app = express();

app.use(cors({
  origin: `${process.env.CORS}`,
  credentials: true, 
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', '..', 'uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

const uploadsPath = path.join(__dirname, '..', '..', 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.get('/', (req, res) => {
  try{
    return res.status(200).send();
  }catch(error){
    return res.status(422).send();
  }
});

app.post('/upload', upload.fields([
  { name: 'file', maxCount: 1 }
]), async (req: Request, res: Response) => {
  try {
    //@ts-expect-error
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const file = files['file']?.map(file => `${file.filename}`) || [];
    const filePath = `../uploads/${file[0]}`;

    const data = await pdf(filePath);

    const genAI = new GoogleGenerativeAI(`${process.env.GOOGLE_API_KEY}`);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const { country } = req.query

    const prompt = `
          Based on the provided contract: "${data.text}" and the laws of "${country}", perform the following tasks:
        
          1. **Validate the Contract**:
            - Determine if the provided text is a valid contract.
            - If it is NOT a contract, return JSON only in this format:
              {
                "error": true,
                "message": "Not a real contract."
              }
            - If it IS a contract, continue to step 2.
        
          2. **Analyze and Extract Contract Information**:
            - Extract the following details from the contract and return them in JSON format:
              {
                "error": false,
                "name": "Contract name", // Extract the name of the contract, or "contract type" if unavailable
                "company": "Company name", // Extract the company name, or "contract type" if unavailable
                "concerns": [
                  // List each concern point or things to think about before signing the contract.
                  // If there are no specific concerns, return an empty array.
                ],
                "contractRating": Contract fairness rating out of 10, // Rate fairness, or return 0 if undetermined
                "duration": {
                  "start": Timestamp of the contract's start date, // If unavailable, return 0
                  "end": Timestamp of the contract's end date // If unavailable, return 0
                },
                "description": "Short description of the contract.", // Provide a brief summary, or null if unavailable
              }
            - Ensure all extracted data is as complete and accurate as possible.
            - If a specific field cannot be determined, return a null value for that field.
        
          **Additional Notes**:
            - All data must comply with the provided contract text and laws of the specified country.
            - Be concise and accurate in the extraction and analysis.
            - If a section or data point cannot be found, ensure it is explicitly marked as "null".
        `;

    const result = await model.generateContent(prompt);
    const jsonData = extractJsonData(result.response.text())
    console.log(jsonData)
    // delete file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully');
      }
    });

    return res.status(201).json({ error: false, ...jsonData, text: data.text });
  } catch (error) {
    console.error(error);
    return res.status(422).json({ error: true });
  }
});

app.listen(PORT, async () => {
  // await connectToDatabase();

  //cron.schedule('* * * * *', () => {
    // getOnePDF()
  //});

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
 