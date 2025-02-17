import express, { Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { Response } from 'express';
import * as fs from "fs";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cron from "node-cron";
import { connectToDatabase } from "./database"
import UploadSchema from './schema/upload.schema';

const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
const THIRTY_MINUTES = 1800;;


ffmpeg.setFfmpegPath(ffmpegPath)

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');
const app = express();

const downloads = path.join(__dirname, '../../downloads');

app.use('/downloads', express.static(downloads));
app.use(cors({
  origin: `${process.env.CORS}`,
  credentials: true, 
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function secondsToHHMMSS(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, '0')).join(':');
}

function parseVideo () {
}

app.post('/upload', async (req: Request, res: Response) => {
  try {
    const { url } = req.query;
    
    if (!url || typeof url !== 'string') {
      throw new Error('Missing or invalid URL');
    }

    const Uploads = await UploadSchema.find();
    console.log(Uploads)

    /*
    // Get video id and video info from ytdl
    const id = ytdl.getURLVideoID(url);
    const data = await ytdl.getInfo(id);
    const uuid = uuidv4();
    const inputPath = `../downloads/${uuid}.mp4`;

    // Download the video from YouTube and save it locally.
    await new Promise<void>((resolve, reject) => {
      const stream = ytdl(url);
      const writeStream = fs.createWriteStream(inputPath);
      stream.pipe(writeStream);
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    // Get the total duration of the video (in seconds).
    const totalDuration = parseInt(data.videoDetails.lengthSeconds, 10);
    const segments: Array<{ start: number; duration: number }> = [];

    // Create segments: if video longer than 30 minutes, split accordingly.
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

    const outputFiles: string[] = [];
    // Process each segment using ffmpeg.
  
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
            fs.rm(outputFile, () => {
              console.log(`deleted file: ${outputFile}`)
            });
            
            resolve();
          })
          
          .on('error', (err: Error) => {
            console.error('Error in segment conversion:', err);
            reject(err);
          })
          .run();
      });

      outputFiles.push(outputFile);
    }

    fs.rm(inputPath, () => {
      console.log(`deleted file: ${inputPath}`)
    });
    */

    return res.status(201).json({ });
  } catch (error) {
    console.error(error);
    return res.status(422).json({ error: true, message: error });
  }
});

app.get('/', (req, res) => {
  try{
    return res.status(200).send();
  }catch(error){
    return res.status(422).send();
  }
});

app.listen(PORT, async () => {
  await connectToDatabase();

  cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
  });

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
 