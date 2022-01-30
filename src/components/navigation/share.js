import { IconButton } from "@mui/material";
import IconShare from "@mui/icons-material/Send";

const Share = (props) => {
  return (
    <IconButton
      onClick={(e) => {
        e.currentTarget.addEventListener("click", async () => {
          try {
            if (navigator.canShare()) console.log("can share");
            await navigator.share({
              title: "Webers.uz",
              text: props.trackName + " - " + props.trackAutor + "\n",
              url: `https://webersuz.netlify.app/share/${Buffer.from(
                props.trackName
              ).toString("base64")}&${Buffer.from(props.trackAutor).toString(
                "base64"
              )}&${Buffer.from(props.track).toString("base64")}`,
            });
            console.log("success");
          } catch (error) {
            console.log(error);
            alert("Can't send 😞");
          }
        });
      }}
    >
      <IconShare htmlColor="#0088cc" />
    </IconButton>
  );
};

export default Share;
