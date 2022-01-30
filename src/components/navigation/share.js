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
            url: "https://webersuz.netlify.app/",
          })
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            alert("Can't send 😞");
          });
      }}
    >
      <IconShare htmlColor="#0088cc" />
    </IconButton>
  );
};

export default Share;
