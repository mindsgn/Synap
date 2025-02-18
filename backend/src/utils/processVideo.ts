import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import UploadSchema from "../schema/upload.schema"
import dotenv from 'dotenv';
import * as fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import { extractJsonData } from "./extractJSON";
import path from 'path';
import { getCookieString } from "./getCookie";

const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
const THIRTY_MINUTES = 1800;
ffmpeg.setFfmpegPath(ffmpegPath)

dotenv.config();

const genAI = new GoogleGenerativeAI(`${process.env.GOOGLE_API_KEY}`);
const fileManager = new GoogleAIFileManager(`${process.env.GOOGLE_API_KEY}`);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const cookieFilePath = path.join(__dirname, '../../cookie.txt');
console.log(cookieFilePath)

function secondsToHHMMSS(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map((v) => v.toString().padStart(2, '0')).join(':');
}

async function processVideo () {
    try{
        const cookieString = await getCookieString(cookieFilePath);
      const upload = await UploadSchema.findOneAndUpdate(
        { status: "unprocessed" },
        { $set: { status: "processing" } },
        { new: true }
      );
    
      //@ts-ignore
      const {youtube = "" } = upload;
  
      if(youtube === "") return;
    
      const id = ytdl.getURLVideoID(youtube);
      const data = await ytdl.getInfo(id);
      const uuid = uuidv4();
      const inputPath = `../downloads/${uuid}.mp4`;
    
      await new Promise<void>((resolve, reject) => {
        const stream = ytdl(youtube, {
            requestOptions: {
              headers: {
                Cookie: cookieString
              }
            }
          });
        const writeStream = fs.createWriteStream(inputPath);
        stream.pipe(writeStream);
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });
  
      const totalDuration = parseInt(data.videoDetails.lengthSeconds, 10);
      const segments: Array<{ start: number; duration: number }> = [];
    
      if (totalDuration > THIRTY_MINUTES) {
        const fullSegments = Math.floor(totalDuration / THIRTY_MINUTES);
        const remainder = totalDuration % THIRTY_MINUTES;
        for (let i = 0; i < fullSegments; i++) {
          segments.push({ start: i * THIRTY_MINUTES, duration: THIRTY_MINUTES });
        }
        if (remainder > 0) {
          segments.push({ start: fullSegments * THIRTY_MINUTES, duration: remainder });
        }
      } else {
        segments.push({ start: 0, duration: totalDuration });
      }
      
  
      for (const segment of segments) {
        const startTime = secondsToHHMMSS(segment.start);
        
        // Note: fluent-ffmpeg accepts duration in seconds.
        const part = uuidv4(); 
        const outputFile = `../downloads/${uuid}_${part}.mp4`;
    
        await new Promise<void>((resolve, reject) => {     
          ffmpeg(inputPath)
            .setStartTime(startTime)
            .setDuration(segment.duration)
            .output(outputFile)
            .on('end', async() => {
            try{
              const uploadResponse = await fileManager.uploadFile(outputFile, {
                mimeType: "video/mp4",
                displayName: `${uuid}_${part}`,
              });
  
              console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);
              const name = uploadResponse.file.name;
  
              let file = await fileManager.getFile(name);
              while (file.state === FileState.PROCESSING) {
                process.stdout.write(".")
                // Sleep for 10 seconds
                await new Promise((resolve) => setTimeout(resolve, 10_000));
                // Fetch the file from the API again
                file = await fileManager.getFile(name)
              }
  
              if (file.state === FileState.FAILED) {
                throw new Error("Video processing failed.");
              }
  
              // When file.state is ACTIVE, the file is ready to be used for inference.
              console.log(`File ${file.displayName} is ready for inference as ${file.uri}`)
  
              const result = await model.generateContent([
                {
                  fileData: {
                    mimeType: uploadResponse.file.mimeType,
                    fileUri: uploadResponse.file.uri
                  }
                },
                { text: ` 
                      Based on the video generate a (10) multiple-choice questions to test my knowledge.  
                      - The question should be a mix of easy, medium, hard difficulty
                      - arrang questions them in random order
                      - It must have two to four answer choices with only **one correct answer**.  
                      - The question should **not be too obvious** but also **not misleading**.
  
                      **Return the output in the following JSON format:**
                      \`\`\`json
                      {
                        "title": "provide title",
                        "transcription": "transcribe the video",
                        "summary": "provide summary",
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
                          },
                          ...
                        ],
                        "totalPoints": "number of total points to be allocated"
                      }
                      \`\`\`
                     
                `
                },
              ]);
  
              const { response } = result;
              // const { videoDetails } = data
              // const { title, category, publishDate, author,  thumbnail: videoThumbnail} = videoDetails
              // const { name,  thumbnails: authorThumbnail } = author;

              const data = extractJsonData(response.text());
              
              await UploadSchema.findOneAndUpdate(
                { _id: upload?._id },
                {
                  $push: {
                    segments: {
                      title: data.title,
                      transcription: data.transcription,
                      summary: data.summary,
                      questions: data.questions,
                      totalPoints: data.totalPoints,
                    },
                  },
                  $set: { status: "successful" }
                },
                { upsert: true, new: true }
              );
              
              await fileManager.deleteFile(uploadResponse.file.name);
  
              fs.rm(outputFile, () => {
                console.log(`deleted file: ${outputFile}`)
              });

              resolve();
            }catch(err){
                reject(err);
            }
            })
            .on('error', reject)
            .run();
        });
      }
  
      fs.rm(inputPath, () => {
        console.log(`deleted file: ${inputPath}`)
      })
    }catch(error){
      console.log(error)
    }
}

export { processVideo };