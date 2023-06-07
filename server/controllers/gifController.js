const mongoose = require('mongoose');
const Gif = require('../models/gifModel');
const User = require('../models/userModel');
const { uploadFile } = require('../cloudinary/cloudinary');

const getGifs = async (req, res) => {
  try {
    const gifs = await Gif.find({}).sort({ createdAt: -1 });

    res.status(200).json(gifs);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: error.message });
  }
};

const getGif = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid GIF ID!' });
  }

  const gif = await Gif.findById(id);

  if (!gif) {
    return res.status(404).json({ error: 'Gif not found!' });
  }
  res.status(200).json(gif);
};

const postGif = async (req, res) => {
  const { email, category, title } = req.body;
  const img = req.files.img.tempFilePath;
  try {
    const user = await User.findOne({ email });
    const result = await uploadFile(img);

    const gif = await Gif.create({
      user_id: user._id,
      category,
      title,
      img: result.secure_url,
    });
    return res.status(201).json({
      success: true,
      gif,
    });
  } catch (error) {
    console.warn(error);
  }
};

const deleteGif = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid GIF ID!' });
  }
  const gif = await Gif.findOneAndDelete({ _id: id });

  if (!gif) {
    return res.status(400).json({ error: 'Invalid GIF ID!' });
  }
  res.status(200).json(gif);
};

const updateGif = async (req, res) => {
  const { gifId, newTitle } = req.body;

  try {
    await Gif.findOneAndUpdate(
      { _id: gifId },
      {
        title: newTitle,
      }
    );

    res.status(200).json({ ok: true });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: error.message });
  }
};

const getGifsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const gifs = await Gif.find({ category: category }).sort({ createdAt: -1 });

    res.status(200).json(gifs);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: error.message });
  }
};

const searchGifs = async (req, res) => {
  const { query } = req.params;
  try {
    const gifs = await Gif.find({
      title: {
        $regex: new RegExp(query, 'i'),
      },
    }).sort({ createdAt: -1 });

    res.status(200).json(gifs);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getGifs,
  getGif,
  postGif,
  deleteGif,
  updateGif,
  getGifsByCategory,
  searchGifs,
};
