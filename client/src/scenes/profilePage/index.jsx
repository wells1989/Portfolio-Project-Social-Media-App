import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/Widgets/FriendListWidget";
import MyPostWidget from "scenes/Widgets/MyPostWidget";
import PostsWidget from "scenes/Widgets/PostsWidget";
import UserWidget from "scenes/Widgets/UserWidget";

const ProfilePage = () => {

    const [user, setUser] = useState(null);
    const { userId } = useParams(); // gets the userId from params, i.e. in app-js <Route path = "/profile/:userId" ...
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

    const getUser = async() => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json();
        setUser(data);
    }
    // gets specific user data based on url params, and called function below
 
    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null; // to prevent errors if no user present / found

    return (
        <Box>
            <Navbar />

            <Box
            width="100%"
            padding= "2rem 6%"
            display={isNonMobileScreens ? "flex" : "block" } // on big screens place widgets next to each other, otherwise put them on top of each other
            gap="2rem"
            justifyContent="center"
            >
               <Box flexBasis={ isNonMobileScreens ? "26%" : undefined }>
                    <UserWidget userId={userId} picturePath={user.picturePath}/>
                    <Box margin="2rem 0" />
                    <FriendListWidget userId={userId} />
                    
               </Box> 

               <Box
               flexBasis={ isNonMobileScreens ? "42%" : undefined }
               mt={ isNonMobileScreens ? undefined: "2rem"}
               >
                <MyPostWidget picturePath={user.picturePath} />
                <Box margin="2rem 0" />
                <PostsWidget userId={userId} isProfile /> {/*in PostsWidget only calls all if isProfile is false, otherwise makes a specific call with only that user's posts*/}

               </Box>
            </Box>
        </Box>
    )
}

export default ProfilePage;