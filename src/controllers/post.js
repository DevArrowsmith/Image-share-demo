const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const uploadFile = (file) => {
  new Promise((resolve, reject) => {
    const fileKey = Date.now().toString();

    const params = {
      Body: file.buffer,
      Bucket: process.env.BUCKET_NAME,
      key: fileKey,
    }

    s3.putObject(params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`${process.env.BUCKET_URL}/${fileKey}`)
      }
    })
  })
}

const {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
  } = require('./helpers');

exports.create = (req, res) => {
  uploadFile(req.file)
    .then((imageUrl) => {
      req.body.imageUrl = imageUrl;
      createItem(res, 'posts', req.body);
    })
    .catch(error => {
      res.status(500).json({ error: error })
    })
}

exports.readAll = (req, res) => {
    getAllItems(res, 'posts', req.query);
}

exports.read = (req, res) => {
    getItemById(res, 'posts', req.params.id);
}

exports.update = (req, res) => {
    updateItem(res, 'posts', req.body, req.params.id);
}

exports.delete = (req, res) => {
    deleteItem(res, 'posts', req.params.id)
}