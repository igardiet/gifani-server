const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/requireAuth');
const {
  postGif,
  getGifs,
  getGif,
  updateGif,
  deleteGif,
  getGifsByCategory,
  searchGifs,
} = require('../controllers/gifController');

router.get('/', getGifs);
router.get('/:id', getGif);
router.get('/category/:category', getGifsByCategory);
router.get('/search/:query', searchGifs);
router.post('/', requireAuth, postGif);
router.put('/edit', requireAuth, updateGif);
router.delete('/:id', requireAuth, deleteGif);

module.exports = router;
