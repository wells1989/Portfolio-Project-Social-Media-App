import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    searchTerm: "",
};

// setting initial state globally i.e. light mode, null auth and posts to start

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"; // switching between light and dark modes (changing mode property of initialState)
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        // above 2, setting global user and token on the payload, then removing them on logout
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
               console.error("user friends non-existent") 
            }
        },
        // above, takes friends from the payload and globally applies them, if there is a relevant user
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        // globally setting the posts to the payload input
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
        // i.e. only updating relevant post, identified by the payload, all others return original post
            });
            state.posts = updatedPosts;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload.searchTerm
        },
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setLocation, setSearchTerm } = authSlice.actions; // allows the dispatch method to be used elsewhere
export default authSlice.reducer;

// setting global state (so you can use it instead of importing it across multiple components etc)
