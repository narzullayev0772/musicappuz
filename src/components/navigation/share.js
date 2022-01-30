import { IconButton } from "@mui/material";
import IconShare from "@mui/icons-material/Send";

const Share = (props) => {
  return (
    <IconButton
      onClick={() => {
        navigator
          .share({
            title: "MDN",
            text: props.trackName + props.trackAutor,
            url: "https://developer.mozilla.org",
          })
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log(error);
            alert("Can't send 😞");
          });
      }}
    >
      <IconShare htmlColor="#0088cc" />
    </IconButton>
  );
};

export default Share;
