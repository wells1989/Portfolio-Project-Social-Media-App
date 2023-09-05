import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const redirectRoute = () =>{ 
      let url = "https://blog.hootsuite.com/best-facebook-ad-examples/"; 
      window.open(url, '_blank')
    }

    return (
        <WidgetWrapper sx={{"&:hover": {cursor: "pointer"}}}>
          <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">Sponsors</Typography>
                <Typography color={medium}>Create Ad</Typography>
            </FlexBetween>  

           <img
           width="100%"
           height="auto"
           alt="advert"
           sx={{
            borderRadius: "0.75rem",
            margin: "0.75 rem 0",
            }}
           src="https://blog.hootsuite.com/wp-content/uploads/2022/05/Facebook-Ads-23.png"
           onClick={redirectRoute}
            /> 
            <FlexBetween>
                <Typography color={main}>e-book</Typography>
                <Typography>Contact: e-book_advertising@gmail.com</Typography>
            </FlexBetween>   
        </WidgetWrapper>
    )

}

export default AdvertWidget;

