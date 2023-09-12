import { useState } from "react";
import { 
    Box,
     IconButton,
     InputBase,
     Typography,
     Select,
     MenuItem,
     FormControl,
     useTheme,
     useMediaQuery,
} from "@mui/material";
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
} from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

export const Navbar = () => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false); // for small mobile screens
    const dispatch = useDispatch(); // allows you to dispatch actions from the state reducer (in state/index.js)
    const navigate = useNavigate();
    const user = useSelector((state) => state.user) // grabs the user info from the state
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)") // using media query from mui
    
    /* setting up theme and appliying colours */ 
    const theme = useTheme(); // allows access to theme.js (set as theme in app.js)
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    // above e.g's all point to a specific colour in theme.js file ...

    const fullName = `${user.firstName} ${user.lastName}` // DEV NOTE: `${user.firstName} ${user.lastName}` (for testing, as for deployment only see the navbar once logged in with a user state, cannot read null properties)
    
    // grabs user from the state index.js file, e.g. see login payload, which becomes the user ...

    const searchSetting = () => {
      navigate('/home/search')
    }

    return (
        /* site logo / search bar */
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
          <FlexBetween gap="1.75rem">
            <Typography
              fontWeight="bold"
              fontSize="clamp(1rem, 2rem, 2.25rem)"
              color="primary"
              onClick={() => navigate("/home")}
              sx={{
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
            >
              Socialpedia
            </Typography>

        {/*search bar, only shows for non-mobile screens*/}
            {isNonMobileScreens && (
              <FlexBetween
                backgroundColor={neutralLight}
                borderRadius="9px"
                gap="3rem"
                padding="0.1rem 1.5rem"
              >
                <InputBase placeholder="Search..." />
                <IconButton>
                  <Search onClick={searchSetting}/>
                </IconButton>
              </FlexBetween>
            )}
          </FlexBetween>
    
        {/* DESKTOP NAV */}
          {isNonMobileScreens ? (
            <FlexBetween gap="2rem">
              
              {/*dark / light mode switching button*/}

                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                    <DarkMode sx={{ fontSize: "25px" }} />
                    ) : (
                    <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    )}
                </IconButton> 

            {/*other nav buttons, for messages / notifications / help*/}

              <Message sx={{ fontSize: "25px" }} />
              <Notifications sx={{ fontSize: "25px" }} />
              <Help sx={{ fontSize: "25px" }} />

            {/*form control element, text box with fullName */}

              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                {/*drop down menu*/}
            
                  <MenuItem value={fullName}><Typography>{fullName}</Typography></MenuItem>

                  <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          ) : (
            //(below) if is mobile screen, change above to a simple ... menu item with dropdown onClick property
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Menu />
            </IconButton>
          )}

        {/* Mobile Navigation*/}
            {/*when menu button is toggled in mobile navigation*/}
          {"isNonMobileScreen" && isMobileMenuToggled && (
            <Box
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor ={background}
            >
                {/*close icon*/}
                <Box display="flex" justifyContent="flex-end" p="1rem">
                   <IconButton 
                   onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                   sx={{ fontSize: "25px" }}
                   >
                       <Close/> 
                    </IconButton>
                </Box>

                {/*menu items*/}
            <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
              
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>

              <Message sx={{ fontSize: "25px" }} />
              <Notifications sx={{ fontSize: "25px" }} />
              <Help sx={{ fontSize: "25px" }} />

              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
            </Box>
          )}
        </FlexBetween>
      );
    };
    