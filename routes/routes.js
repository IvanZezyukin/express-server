const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.KEY,
  endpoint: 'storage.yandexcloud.net',
  region: 'ru-central1'
})

const uploadFile = (fileName) => {
  const params = {
    Bucket: 'emails',
    Key: fileName,
    Body: ''
  };
  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully`);
  });
};

const router = app => {

  app.get('/', (request, response) => {
    response.send({
      message: 'Node.js and Express REST API'
    });
  });

  app.post('/', function(req, res) {
    if(!req.body) return res.sendStatus(400);

    uploadFile(req.body[0].value);

    res.send(`Email ${req.body[0].value} saved!`);
  });

}

// Export the router
module.exports = router;
//export default router;
