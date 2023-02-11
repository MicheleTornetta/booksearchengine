const db = require('../config/connection');
const { User } = require('../models');
const userSeeds = require('./userSeed.json');

const seedDatabase = async () => {
  try {
    // await Book.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < bookSeeds.length; i++) {
      const { _id, bookAuthor } = await Book.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: bookAuthor },
        {
          $addToSet: {
            books: _id,
          },
        }
      );
    }
    console.log('all done!');
  } catch (err) {
    console.error(err);
  }

};

db.once('open', async () => {
  await seedDatabase();

  db.close();
});

module.exports = {
  seedDatabase
}