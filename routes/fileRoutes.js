const e = require("express");

const router = e.Router();

const {imageUpload, videoUpload, imageReducerUpload, localFileUpload} = require('../controllers/fileUpload');

router.post('/localFileUpload', localFileUpload);
router.post('/imageUpload', imageUpload);
router.post('/videoUpload', videoUpload);
router.post('/imageReducerUpload',imageReducerUpload);

module.exports = router;
