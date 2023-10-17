import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 8801;


import qrcode from "qrcode-terminal";
import WhatsAppWeb from "whatsapp-web.js";
import axios from "axios";
import PDFDocument from "pdfkit";
import fs from "fs";

const { Client, LocalAuth, MessageMedia } = WhatsAppWeb; // Access the necessary components

// bot -----------
const client = new Client({
   authStrategy: new LocalAuth(),
});

client.initialize();

client.on("qr", (qr) => {
   qrcode.generate(qr, { small: true });
   console.log("QR RECEIVED", qr);
});

client.on("authenticated", () => {
   console.log("AUTHENTICATED");
});

client.on("ready", () => {
   console.log("Client is ready!");
});

client.on("auth_failure", (msg) => {
   console.error("Authentication failed:", msg);
});

client.on("disconnected", (reason) => {
   console.error("Client was disconnected:", reason);
});
// -------------

// middleware
app.use(bodyParser.json());

// chat notification
app.post('/api/booking-notification', async(req, res) => {
   const { phoneNumber, message } = req.body;

   if (!phoneNumber || !message) {
      return res.status(400).json({ error: 'Invalid request. Phone number and message are required.' });
   }

   try {
      // 917021578746@c.us
      await bookingNotification(phoneNumber, message);

      res.status(200).json({ success: true, message: 'Booking notification sent successfully.' });
   } catch (error) {
      console.error('Error sending booking notification:', error);
      res.status(500).json({ error: 'Internal server error.' });
   }
});



async function bookingNotification(phoneNumber, message) {
   try {
      // console.log(phoneNumber,message);
      const chatNum = `91${phoneNumber}@c.us`
      await client.sendMessage(chatNum, message);
      // console.log("done")
   } catch (error) {
      console.error('Error sending WhatsApp message:', error);
   }
}


// Define the function to convert data to PDF
async function convertDataToPDF(data) {
   const pdfDoc = new PDFDocument();
   pdfDoc.pipe(fs.createWriteStream("data.pdf")); // Save PDF to a file

   pdfDoc.text("Data Details"); // Add your title or header

   // Create a table header
   const tableHeaders = ["Name", "Email", "Message"];
   const headerText = tableHeaders.map(header => header.padEnd(30)).join(' ');
   pdfDoc.text(headerText, { align: 'left' });

   // Populate the table with data
   data.forEach(item => {
      const rowData = [item.name, item.email, item.message];
      const rowText = rowData.map(cell => cell.padEnd(30)).join(' ');
      pdfDoc.text(rowText, { align: 'left' });
   });

   pdfDoc.end();
}


//Replying Messages
client.on("message", async (message) => {
   const chatId = message.from;
   const text = message.body;
   console.log(chatId, text);

   if (message.body.toLowerCase() === "hello") {
      client.sendMessage(chatId, "message is");
   }

   if (message.body.toLowerCase() === "hi") {
      message.reply("Hiiiii");
   }

   if (message.body.toLowerCase() === "see details") {
      try {
         // Fetch data from the server API
         const response = await axios.get("http://localhost:8800/api/contact");
         const data = response.data;

         // Create a PDF
         await convertDataToPDF(data);

         // Send the PDF as a media message
         const pdfMedia = MessageMedia.fromFilePath("D:/zbot/data.pdf");
         client.sendMessage(message.from, pdfMedia, {
            caption: "Data Details",
         });
      } catch (error) {
         console.error("Error fetching or sending data:", error);
         message.reply("An error occurred while fetching data or generating PDF.");
      }
   }


   else if (message.body.toLowerCase() === "meme") {
      //get media from url
      let media = await MessageMedia.fromUrl(
         "https://todaysparent.mblycdn.com/tp/resized/2017/06/767x431/when-your-kid-becomes-a-meme.jpg"
      );

      //replying with media
      client.sendMessage(message.from, media, {
         caption: "meme",
      });
   }
});

// connection
app.listen(port, () => {
   console.log(`Bot Server is running on port ${port}`);
});
