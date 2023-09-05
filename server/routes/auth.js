import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

// home route: http://localhost:3001/auth/

router.post("/login", login);

export default router;