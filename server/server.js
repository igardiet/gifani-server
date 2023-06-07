require('dotenv').config();
const fileUpload = require('express-fileupload');
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const { dbConnection } = require('./database/config');
const seedDatabase = require('./seed/gifsSeed');
const gifRoutes = require('./routes/gif');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.static(path.join(__dirname, '../client/dist'))); // tell railway client dist folder

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  })
);

app.use('/api/gifs', gifRoutes);
app.use('/api/user', userRoutes);

app.get('/api/seed', seedDatabase);

dbConnection();

app.listen(process.env.PORT || 3027, () => {
  console.log(`Server listening on PORT... ${process.env.PORT || 3027}`);
});

module.exports = app;
