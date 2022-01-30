import { IconButton } from "@mui/material";
import IconShare from "@mui/icons-material/Share";

const Share = () => {
  const props = {
    track: "A",
    trackName: "B",
    trackAutor: "C",
  };
  return (
    <IconButton
      onClick={(e) => {
        e.target.addEventListener("click", async () => {
          try {
            await navigator.share({
              title: "Webers.uz",
              text: props.trackName + props.trackAutor,
              url:
                "https://webersuz.netlify.app/share/" +
                Buffer.from(props.trackName).toString("base64") +
                "&" +
                Buffer.from(props.trackAutor).toString("base64") +
                "&" +
                Buffer.from(props.track).toString("base64"),
            });
            console.log("success");
          } catch (error) {
            console.log(error);
          }
        });
      }}
    >
      <IconShare />
    </IconButton>
  );
};

export default Share;
