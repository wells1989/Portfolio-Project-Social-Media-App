import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
        },
        lastname: {
            type: String,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean,
        }, // map of Boolean values, i.e. if someone liked it or not (quicker than using an array of userId's who liked it)
        comments: {
            type: Array,
            default: []
        }
    }, { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;