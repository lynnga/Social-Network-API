const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  postFriend,
  deleteFriend,
} = require("../../controllers/userController.js");

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);

router
  .route("/:userId/friends/:friendId")
  .post(postFriend)
  .delete(deleteFriend);

module.exports = router;
