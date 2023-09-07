import { Box, useMediaQuery, Typography, Divider } from "@mui/material";
import { useSelector } from "react-redux"; 
import { Navbar } from "scenes/navbar";
import UserWidget from "scenes/Widgets/UserWidget";

import PostsWidget from "scenes/Widgets/PostsWidget";
import AdvertWidget from "scenes/Widgets/AdvertWidget";
import FriendListWidget from "scenes/Widgets/FriendListWidget";
import { setSearchTerm } from "state";
import { useDispatch } from "react-redux";

const SearchPage = () => {

    const dispatch = useDispatch();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    const searchTerm = useSelector((state) => state.searchTerm)
    dispatch(setSearchTerm({ searchTerm: "simon" }));

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
                <Typography
                sx={{
                    textAlign: "center",
                    fontWeight: "500",
                    fontSize: "3rem",
                    margin: "2rem"
                }}
                >

                <Divider/>
                    
                    Search Results:
                    <Divider/> 
                    {searchTerm}
                </Typography>
                <PostsWidget userId={_id} searchTerm={searchTerm}/>

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

export default SearchPage;