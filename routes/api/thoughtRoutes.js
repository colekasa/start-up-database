const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

router
  .route("/")
  .get(getThoughts)
  .get(getSingleThought)
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought);

///api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions")
  .put(createReaction)
  .delete(removeReaction);
module.exports = router;
