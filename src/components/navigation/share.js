import { IconButton } from "@mui/material";
import IconShare from "@mui/icons-material/Send";

const Share = (props) => {
  return (
    <IconButton
      onClick={() => {
        navigator
          .share({
            title: "MDN",
            text:
              "🎵"+props.trackName + " - "+
              props.trackAutor +
              `\n \n https://webersuz.netlify.app/share/${Buffer.from(
                props.trackName
              ).toString("base64")}&${Buffer.from(props.trackAutor).toString(
                "base64"
              )}&${Buffer.from(props.track).toString("base64")}\n`,
            url: "\n https://webersuz.netlify.app/",
          })
          .then(() => {
            console.log("success");
          })
          .catch((error) => {
            console.log("canceled");
          });
      }}
    >
      <IconShare htmlColor="#0088cc" />
    </IconButton>
  );
};

export default Share;
