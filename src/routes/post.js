const express = require('express');
const multer = require('multer');
const postController = require('../controllers/post');

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.route('/')
    .post(upload.single('file'), postController.create)
    .get(postController.readAll);

router.route('/:id')
    .get(postController.read)
    .patch(postController.update)
    .delete(postController.delete);

module.exports = router;