import './config.mjs'
import mongoose from 'mongoose'
import express from 'express'
import Question from './db.mjs'
import url from 'url'
import path from 'path'
import bodyParser from 'body-parser'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.post('/questions/', async (req, res) => {
  try {
    const { question } = req.body;

    const newQuestion = new Question({
      question: question,
      answers: [] 
    });
    const savedQuestion = await newQuestion.save();
    res.json(savedQuestion); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to add question' });
  }
});

app.post('/questions/:id/answers/', async (req, res) => {
  
  console.log(req.body);
  const update = { "$push": { answers: req.body.answer } }
  try {
    const result = await Question.findByIdAndUpdate(req.params.id, update, { "new": true })
    res.json({ success: 'Added an answer' })
  } catch(error) {
    res.status(500).json({ error: 'Failed to add answer' })
  }
})

app.get('/questions/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve questions' });
  }
});


const port = process.env.PORT || 3000
app.listen(port, () => {console.log(`Server is listening on ${port}`)})
