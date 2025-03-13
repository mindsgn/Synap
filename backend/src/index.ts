import express, { Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { Response } from 'express';
import cron from "node-cron";
import { connectToDatabase } from "./database";
import UploadSchema from './schema/upload.schema'
import { processVideo } from './utils/processVideo';

const ytdl = require('ytdl-core');

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

app.post('/upload', async (req: Request, res: Response) => {
  try {
    const { url } = req.query;
    
    if (!url || typeof url !== 'string') {
      throw new Error('Missing or invalid URL');
    }

    const existingUpload = await UploadSchema.findOne({ youtube: url });

    if (existingUpload) {
      const { _id, status, youtube, segments } = existingUpload;
      return res.status(200).json({ _id, status, youtube, segments });
    } else {
      const newUpload = new UploadSchema({
        youtube: url,
        status: "unprocessed",
      });

      const newEntry = await newUpload.save();
      const { _id, status, youtube } = newEntry;

      return res.status(201).json({ _id, status, youtube });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(422).json({ error: true, message: error });
  }
});

app.get('/upload', async(req, res) => {
  try{
    const { id } = req.query
    const response = await UploadSchema.findOne({_id: id});

    return res.status(200).send({
      status: response?.status,
      youtube: response?.youtube,
      segments: response?.segments,
    });
  }catch(error){
    return res.status(422).send();
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

  cron.schedule('* * * * *', async() => {
    if(process.env.ENV === "dev"){
      await processVideo()
    }
  });

  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
 