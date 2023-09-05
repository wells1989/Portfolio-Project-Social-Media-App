import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px"}) => {

    return (
        <Box width={size} height={size}> {/* default width and size, determined by above parameters*/}
            {image && (
            <img
            style={({ objectFit: "cover", borderRadius: "50%"})} 
            width={size}
            height={size}
            alt="user"
            src={image.startsWith("http") ? `${image}` : `http://localhost:3001/assets/${image}`} // ternary operator, either the http link or the local storage
            />
            )}
        </Box>
    )
}



export default UserImage;