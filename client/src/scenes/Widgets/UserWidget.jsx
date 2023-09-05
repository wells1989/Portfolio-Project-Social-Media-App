import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null); // setting user as null initially
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token); // grabs the token from redux state
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        // in api, removes the "Bearer " part, leaving just the token
        const data = await response.json();
        setUser(data); // user is now the setUser state (when logging in, set's id and token)
      };
    
      useEffect(() => {
        getUser();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
      // calls function automatically upon loading the page

      if (!user) {
        return null;
      }
    
      const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
      } = user;
      // object destructuring to get individual values
      
    
        return (
            <WidgetWrapper>
              {/* FIRST ROW */}
              <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
              > {/*on clicking on 1st row, navigates to user profile*/}
        
                <FlexBetween gap="1rem">
                  <UserImage image={picturePath} /> {/*profile picture*/}
                  
                  {/* name and number of friends*/}
                  <Box>
                    <Typography
                      variant="h4"
                      color={dark}
                      fontWeight="500"
                      sx={{
                        "&:hover": {
                          color: palette.primary.light,
                          cursor: "pointer",
                        },
                      }}
                    >
                      {firstName} {lastName}
                    </Typography>
                    <Typography color={medium}>{friends.length} friends</Typography>
                  </Box>

                </FlexBetween>
                <ManageAccountsOutlined /> {/*icon*/}
              </FlexBetween>
        
              <Divider />
        
              {/* SECOND ROW */}
              <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                  <LocationOnOutlined fontSize="large" sx={{ color: main }} /> {/*location icon*/}
                  <Typography color={medium}>{location}</Typography> {/*location*/}
                </Box>

                <Box display="flex" alignItems="center" gap="1rem">
                  <WorkOutlineOutlined fontSize="large" sx={{ color: main }} /> {/*occupation icon*/}
                  <Typography color={medium}>{occupation}</Typography> {/*occupation*/}
                </Box>
              </Box>
        
              <Divider />
        
              {/* THIRD ROW */}
              <Box p="1rem 0">
                {/*FlexBetween 1, who's viewed your profile then number*/}
                <FlexBetween mb="0.5rem">
                  <Typography color={medium}>Who's viewed your profile</Typography>
                  <Typography color={main} fontWeight="500">{viewedProfile}</Typography>
                </FlexBetween>

                {/*FlexBetween 2, impressions of your profile then number*/}
                <FlexBetween>
                  <Typography color={medium}>Impressions of your post</Typography>
                  <Typography color={main} fontWeight="500">{impressions}</Typography>
                </FlexBetween>
              </Box>
        
              <Divider />
        
              {/* FOURTH ROW */}
                {/*subheading*/}
              <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                  Social Profiles
                </Typography>
        
                {/*twitter*/}
                <FlexBetween gap="1rem" mb="0.5rem">
                  <FlexBetween gap="1rem">
                    <img src="../assets/twitter.png" alt="twitter" /> {/*logo*/}
                    <Box>
                      <Typography color={main} fontWeight="500">Twitter</Typography> 
                      <Typography color={medium}>Social Network</Typography>
                    </Box> {/*box, with two on top of each other*/}
                  </FlexBetween>
                  <EditOutlined sx={{ color: main }} /> {/*icon*/}
                </FlexBetween>
        
                {/*Linkedin*/}
                <FlexBetween gap="1rem">
                  <FlexBetween gap="1rem">
                    <img src="../assets/linkedin.png" alt="linkedin" /> {/*logo*/}
                    <Box>
                      <Typography color={main} fontWeight="500">Linkedin</Typography>
                      <Typography color={medium}>Network Platform</Typography>
                    </Box> {/*box, with two on top of each other*/}
                  </FlexBetween>
                  <EditOutlined sx={{ color: main }} /> {/*box, with two on top of each other*/}
                </FlexBetween>
              </Box>
            </WidgetWrapper>
          );
    };

    export default UserWidget;