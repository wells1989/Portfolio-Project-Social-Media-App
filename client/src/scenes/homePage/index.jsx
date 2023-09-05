import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/Widgets/UserWidget";
import MyPostWidget from "scenes/Widgets/MyPostWidget";
import PostsWidget from "scenes/Widgets/PostsWidget";
import AdvertWidget from "scenes/Widgets/AdvertWidget";
import FriendListWidget from "scenes/Widgets/FriendListWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);


    return (
        <Box>
            <Navbar />

            <Box
            width="100%"
            padding= "2rem 6%"
            display={isNonMobileScreens ? "flex" : "block" } // on big screens place widgets next to each other, otherwise put them on top of each other
            gap="0.5rem"
            justifyContent="space-between"
            >
               <Box flexBasis={ isNonMobileScreens ? "26%" : undefined }>
                    <UserWidget userId={_id} picturePath={picturePath}/>
               </Box> 

               <Box
               flexBasis={ isNonMobileScreens ? "42%" : undefined }
               mt={ isNonMobileScreens ? undefined: "2rem"}
               >
                <MyPostWidget picturePath={picturePath} />
                <PostsWidget userId={_id} />

               </Box>
               {isNonMobileScreens && (
                <Box flexBasis="26%">
                    <AdvertWidget/>
                    <Box margin="2rem" />
                    <FriendListWidget userId={_id} />
                </Box> 
               )}
            </Box>
        </Box>
    )
}

export default HomePage;