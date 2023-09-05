import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from './controllers/auth.js';
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middleware/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";



/* express configuration */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// storing the files locally in public/assets
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// file storage (when saving e.g. images will be saved into the below folder, with the original file name)

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

/* routes with file upload */

app.post("/auth/register", upload.single("picture"), register);
// upload.single middleware uploads into picture storage, then calls the register controller function (NOTE not in routes folder due to needing the upload variable)
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* routes */

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.get("/", verifyToken, (req, res) => {
    res.json({msg: "home route"})
}); // test route for middleware


/* mongoose configuration */

const PORT = process.env.PORT || 6001 // if .env variable doesn't work port goes to 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // above 2, used in case of future deprecation, using new sevrer discovery and monitoring engine (unifiedTopology) and use new URL parser...
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port number ${PORT}`);
    
       /* manually inserting dummy data from data/index.js */
        // User.insertMany(users);
        // Post.insertMany(posts);

        // above, commented out because if not it would insert upon restarting the server, so inserted once then commented out
    
    })
}).catch((error) => console.log(`Connection issue, error: ${error}`)) 

