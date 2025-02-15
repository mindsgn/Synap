import { create } from "zustand";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { extractJsonData } from "@/src/hooks/extractJson";
import subjects from "../constants/prompts";
// import { getContentFromDB, insertContentToDB } from '@/src/database';

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
};

type QuestionStore = {
  ready: boolean;
  error: null | { message: string };
  questions: Question[];
  content: any[],
  setQuestion: (update: Question[]) => void;
  setReady: (update: boolean) => void;
  generateQuiz: () => Promise<{ totalPoints: number }>;
  generateContent: (subject: string) => void;
  getContent: (subject: string, content: string) => void;
};

export const useQuestion = create<QuestionStore>((set, get) => ({
  ready: false,
  questions: [],
  content: [],
  points: 0,
  error: null,
  generateQuiz: async () => {
    try {
      const difficulty = "medium";
      const variation = false;

      set({ ready: false });

      const topic = "javascript";
      const summary = `
        values:
          1. number
          2. strings
          3. boolean
          4. objects
          5. functions,
          6. undefined

        number: 
          - modulo
          - operator
          - precedence

        string:
          - concate
          = unary operator
          - binary oprator
          - logical operator

        boolean: 

        Expression:
          - statement
          - side effects

        Variable:
        
        Keywords and reserved words:

        The environment:
        
        functions:
          - invoking
          - applaying
          - arguments
          - parameters
        
        conditianal execution:
          - if
          - Nan
          - while loop
          - for loop
          - do loop
          - switch

        Comments:

        Undefined value:

        Null value:

        Type Conversion:
      `;

      const genAI = new GoogleGenerativeAI(
        `${process.env.EXPO_PUBLIC_GEMINI_API}`,
      );
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `
        I learned about "${topic}" today. 

        Here's a summary of what I understood:  
        "${summary}"  

        Based on this, generate a (10) multiple-choice questions to test my knowledge.  
        - The question should be a mix of easy, medium, hard difficulty
        - arrang questions them in random order
        - It must have two to four answer choices with only **one correct answer**.  
        - The question should **not be too obvious** but also **not misleading**.

        **Return the output in the following JSON format:**
        \`\`\`json
        {
          "questions":[
            {
              "question": "Generated question here",
              "options": [
                "Option 1",
                "Option 2",
                "Option 3",
                "Option 4"
              ] // two to four options,
              "correctAnswer": correct_option_index,
              "explanation": "Brief explanation of why the correct answer is correct."
              "points": "number ranging from 1 - 5 based on question difficulty",
              ${variation ? ',\n  "variation": "A different way of testing the same concept."' : ""}
            },
            ...
          ],
          "totalPoints": "number of total points to be allocated"
        }
        \`\`\`

        Ensure the question is relevant to the summary provided.
      `;

      const result = await model.generateContent(prompt);
      const { response } = result;
      const jsonData = extractJsonData(response.text());

      get().setQuestion(jsonData.questions);
      return {
        totalPoints: jsonData.totalPoints,
      };
    } catch (error) {
      return {
        totalPoints: 0,
      };
    }
  },
  generateContent: async (subject: string = "" ) => {
    try {
      const matchingSubject = subjects.find(item => item.subject === subject);
      const { roadmap } = matchingSubject;
      
      roadmap.map(async(item) => {
        let keypoints = ""
        let concepts = []

        for (const topic of item.topics) {
          concepts = topic.concepts
          for (const concept of concepts) {

            keypoints += concept + ", "

            //const storedKeypoints = await getContentFromDB(subject);
            //console.log(storedKeypoints)
            
            //if (storedKeypoints) {
              // Content already exists, use it without regenerating.
             // get().getContent(subject, storedKeypoints);
            //  return;
            //}

            //setTimeout(() => {
            //  get().getContent(subject, keypoints)
            //}, 100000) 
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  },
  getContent: async (subject: string = "", keypoints: string = "") => {
    try {
      const genAI = new GoogleGenerativeAI(
        `${process.env.EXPO_PUBLIC_GEMINI_API}`,
      );
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `
        Write an about the topic: "${subject}".
        Make sure to include the following key points: ${keypoints}.

         **Return the output in the following JSON format:**
        \`\`\`json
            {
              "title": "title",
              "example": "example of what is beaing taught",
              "content": "content",
              "summary": "summary of what is being taught",
              "videoURL": "if possible a video url",
            },
         \`\`\`
      `
      const result = await model.generateContent(prompt);
      const { response } = result;
      console.log(response.text())
    } catch (error) {
      console.log(error)
    }
  },
  setQuestion: (update: Question[]) => {
    set({ questions: update, ready: true });
  },
  setReady: (update: boolean) => {
    set({ ready: update });
  },
}));
