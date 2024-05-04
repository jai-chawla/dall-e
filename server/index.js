import express from 'express';
import * as dotenv from "dotenv";
import cors from "cors"
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import job from './cron.js'

job.start();
dotenv.config();

const app=express();

// app.use(cors({
//   origin:["https://dall-e-client-three.vercel.app"],
//   methods:["GET","POST"],
//   credentials:true
// }
// ));

app.use(cors());
app.use(express.json({limit:'50mb'}));

// app.use((req,res,next)=>{
//   res.header('Access-Control-Allow-Origin','https://dall-e-client-three.vercel.app');
//   res.header('Access-Control-Allow-Headers','*');
//   res.header('Access-Control-Allow-Method','GET','POST');

//   next();
// })

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

app.get('/',async(req,res)=>{
  res.send('hello from  DALL-E');
})

const startServer= async()=>{
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080,()=> console.log('server has Started on port http://localhost:8080'))
  } catch (error) {
    console.log(error);
  }
}

startServer();
