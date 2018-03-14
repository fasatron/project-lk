const router = require('express').Router();

const {
  profile: { showUpdatePage, updateProfile, showDeletePage, deleteProfile },
} = require('../controllers');

router
  .route('/')
  .get(showUpdatePage)
  .post(updateProfile);

router
  .route('/delete')
  .get(showDeletePage)
  .post(deleteProfile);

module.exports = router;
