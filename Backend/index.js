const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/timeseries', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB....');
});

const timeSeriesSchema = new mongoose.Schema({
  variable1: Number,
  variable2: Number,
  timestamp: Date,
});

const TimeSeries = mongoose.model('TimeSeries', timeSeriesSchema);


const timeSeriesValidationSchema = Joi.object({
  variable1: Joi.number().required(),
  variable2: Joi.number().required(),
  timestamp: Joi.date().required(),
});


app.post('/api/timeseries', async (req, res) => {
  try {

    const { error } = timeSeriesValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }


    const timeSeriesData = new TimeSeries(req.body);


    await timeSeriesData.save();

    res.status(201).json({ message: 'Time series data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
