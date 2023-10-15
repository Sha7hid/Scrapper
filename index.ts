require("dotenv").config();
import connectDB from './config/db'; 
import { Request, Response } from 'express';
// import { getReviewCount } from './controllers/review';
const express = require("express");
const {main} = require('./tests/scrapper.spec') 
const bodyParser = require("body-parser");
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors(corsOptions));
// main("https://www.amazon.com/ZeroWater-23-Cup-5-Stage-Dispenser-Improved/dp/B003QXM3U8/ref=sr_1_2_sspa?crid=3KBDIVUJYXVQD&keywords=water%2Bpurifier&qid=1696836409&sprefix=water%2Bpurifier%2Caps%2C910&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1")
//   .then((count) => {
//     console.log("Review Count Retrieved:", count);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

const mongo_uri = `mongodb+srv://shahid:arthur#540913@cluster0.ggcnvuy.mongodb.net/scrapper`;


connectDB();
const port = process.env.PORT || 5000;
console.log({ port });
// Routes
// app.use("/", require("./routes/review"));
app.listen(port);
app.post('/review-count', async (req:Request, res:Response) => {
   const urls: string[] = req.body.urls; // Get the array of URLs from the request body
   console.log(urls);
 
   try {
     // Initialize an array to store the results
     const results: { url: string; reviewCount: string; productName: string ;rating:string}[] = [];

 
     // Iterate through the URLs and scrape data for each one
     for (const url of urls) {
      const { count, name ,rate} = await main(url) as { count: string; name: string ; rate:string};
      results.push({ url, reviewCount: count, productName: name ,rating:rate}); // Store the result along with the URL and product name
    }
 
     // Send the results back as a JSON response
     res.status(200).json({
       code: 200,
       message: 'Scraped data successfully',
       results,
     });
   } catch (error) {
     if (error instanceof Error) {
       // Handle errors of type Error (which typically have a message property)
       console.error('Error:', error.message);
       res.status(500).json({
         code: 500,
         message: 'Error scraping data',
         error: error.message,
       });
     } else {
       // Handle other types of errors (if needed)
       console.error('Unknown Error:', error);
       res.status(500).json({
         code: 500,
         message: 'Unknown Error',
         error: 'An unknown error occurred.',
       });
     }
   }
 });
 