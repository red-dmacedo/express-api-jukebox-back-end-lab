const express = require('express');
const router = express.Router();
const Track = require('../models/track.js');

const handleError = (res, err) => {
  switch (res.statusCode) {
    case 404:
      res.json({ err: err.message });
      break;
    default:
      res.status(500).json({ err: err.message });
  };
};

const evalSend = (res, sendObject) => {
  if (!sendObject) { res.status(404); throw new Error('Track not found') };
  res.status(200).json(sendObject);
};

router.get('/', async (req, res) => { // get all tracks
  try {
    const tracks = await Track.find();
    evalSend(res, tracks);
  } catch (err) {
    handleError(res, err);
  };
});

router.post('/', async (req, res) => { // create track
  try {
    const track = await Track.create(req.body);
    evalSend(res, track);
  } catch (err) {
    handleError(res, err);
  };
});

router.get('/:id', async (req, res) => { // get specific track
  try {
    const track = await Track.findById(req.params.id);
    evalSend(res, track);
  } catch (err) {
    handleError(res, err);
  };
});

router.put('/:id', async (req, res) => { // update existing track
  try {
    const updatedTrack = await Track.findByIdAndUpdate(req.params.id, req.body, { new: true });
    evalSend(res, updatedTrack);
  } catch (err) {
    handleError(res, err);
  };
});

router.delete('/:id', async (req, res) => { // delete track
  try {
    const removedTrack = await Track.findByIdAndDelete(req.params.id, req.body);
    evalSend(res, removedTrack);
  } catch (err) {
    handleError(res, err);
  };
});

module.exports = router;