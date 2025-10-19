import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB Connection
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db('portfolio');
    const messages = database.collection('messages');

    // API endpoint for contact form
    app.post('/api/contact', async (req, res) => {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please fill out all fields.' });
      }

      const newMessage = {
        name,
        email,
        message,
        date: new Date(),
      };

      try {
        const result = await messages.insertOne(newMessage);
        res.status(201).json({ message: 'Message sent successfully!', result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
      }
    });

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export default app;
