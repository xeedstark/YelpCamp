const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { validateCampground } = require('../middleware/validateCampground')
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { isAuthor } = require('../middleware/isAuthor');
//const { index } = require('../controllers/campgrounds');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');

const { storage } = require('../cloudinary') //no need to write ../cloudinary/index as node automatically
//looks for an index.js file in a folder.
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, campgrounds.deleteCampground);

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;