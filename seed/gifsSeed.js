const mongoose = require('mongoose');
const { akira, dragonBall, naruto } = require('./data');
const Gif = require('../models/gifModel')


const seedDatabase = async () => {
  try {
    await Gif.deleteMany({});

    const narutoDataToSeed = naruto.data.map((gif) => {
      return {
        title: gif.title || 'No title',
        img: gif.images.original.url,
        category: 'naruto',
        user_id: 'default_user',
      };
    });

    await Gif.insertMany(narutoDataToSeed);

    const dragonBallDataToSeed = dragonBall.data.map((gif) => {
      return {
        title: gif.title || 'No title',
        img: gif.images.original.url,
        category: 'dragonBall',
        user_id: 'default_user',
      };
    });

    await Gif.insertMany(dragonBallDataToSeed);

    const akiraDataToSeed = akira.data.map((gif) => {
      return {
        title: gif.title || 'No title',
        img: gif.images.original.url,
        category: 'akira',
        user_id: 'default_user',
      };
    });

    await Gif.insertMany(akiraDataToSeed);

    console.log('Database seeded successfully!');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding the database:', err);
    mongoose.disconnect();
  }
};

module.exports = seedDatabase;
