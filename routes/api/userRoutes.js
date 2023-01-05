const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/userController.js');

// /api/courses
// router.route('/').get(getUsers);
router.route('/').get(getUsers).post(createUser);
router.route('/:id')
              .get(getUserById)
              .delete(deleteUser)
              // .put(updateUser);

// /api/courses/:courseId
// router
//   .route('/:courseId')
//   .get(getSingleCourse)
//   .put(updateCourse)
//   .delete(deleteCourse);

module.exports = router;
