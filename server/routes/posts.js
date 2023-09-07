import express from "express";
import { getFeedPosts, getUserPosts, likePost, deletePost, addComment, deleteComment, searchPosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// home route http://localhost:3001/posts/

router.get("/", verifyToken, getFeedPosts);

router.get("/:userId/posts", verifyToken, getUserPosts);

router.get("/search/:key", verifyToken, searchPosts)

router.patch("/:id/like", verifyToken, likePost);

router.delete("/delete/:id", verifyToken, deletePost);

router.post("/comments/:id", verifyToken, addComment);

router.delete("/comments/:id", verifyToken, deleteComment);

export default router;