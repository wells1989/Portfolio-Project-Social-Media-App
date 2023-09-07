import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { setSearchTerm } from "state";

const PostsWidget = ({ userId, isProfile = false, searchTerm = null }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getSearchResults = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/search/${searchTerm}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));

    if(response.ok){
      getSearchResults();
      dispatch(setSearchTerm({ searchTerm: null}));
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else if (searchTerm) {
      getSearchResults();
    }else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // sets state.posts as API response, either from all or a specific user, called on loading of a profile

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={firstName}
            description={description}
            subTitle={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            isProfile={isProfile}
          />
        )
      )}
    </>
  );
};

// above, for each post produces a post widget, passing all the props

export default PostsWidget;