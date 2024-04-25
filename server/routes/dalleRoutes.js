import express from 'express';
import * as dotenv from "dotenv";
// import { Configuration, OpenAIApi } from 'openai';
// import { SDXL } from "segmind-npm"
// import axios from "axios"
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
const apiKey = process.env.API_KEY;

// const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.send('Hello from DALL-E');
});

router.route('/').post(async (req, res) => {
  const apiUrl = 'https://api.limewire.com/api/image/generation';
  const apiKey= process.env.API_KEY;
  try{
    // const { prompt } = req.body;

    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Version': 'v1',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(req.body)

      
    });
    const data = await apiResponse.json();

    if (data.data && data.data.length > 0) {   // Return the `asset_url` of the first asset
      res.json({ imageUrl: data.data[0].asset_url });

    } else {
      // Handle cases where the assets might not be present in the response
      console.error('No assets found in response:', data);
      res.status(500).json({ error: 'No assets found in API response' });
    }

  
  }

    

    // const image = aiResponse.data.data[0].b64_json;
    // console.log(image);
    // res.status(200).json({ photo: image });

                                        //**********OLD CORRECT CODE********* */

    // const { prompt } = req.body;

    // const aiResponse = await openai.createImage({
    //   prompt,
    //   n: 1,
    //   size: '512x512',
    //   response_format: 'b64_json',
    // });

    // const image = aiResponse.data.data[0].b64_json;
    // // console.log(image);

    // res.status(200).json({ photo: image });
  catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
})
export default router;