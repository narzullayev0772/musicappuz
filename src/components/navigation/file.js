import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Music from "@mui/icons-material/MusicNote";
import IconButton from "@mui/material/IconButton";
// import { Favorite, FavoriteBorder } from "@mui/icons-material";
// import { red } from "@mui/material/colors";

export default function MusicItem(props) {
  const [click, setClick] = React.useState(props.click);
  // const [like, setLike] = React.useState(0);
  // const LoadLike = async () => {
  //   console.log(props.full);
  //   const response = await fetch(
  //     "https://api-music-uz.herokuapp.com/music/api/like",
  //     {
  //       method: "PATCH",
  //       body: JSON.stringify({
  //         track: props.track,
  //         like: like,
  //       }),
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data);
  // };

  const [playing, setPlaying] = React.useState(false);
  return (
    <>
      {props.track ? (
        <List
          className="file"
          sx={{ padding: "8px" }}
          onClick={() => {
            setClick(false);
            props.getUrl(props);
            setPlaying(!playing);
            props.getClick(true);
          }}
        >
          <ListItem
            style={{
              background:
                "linear-gradient(300deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
              margin: "5px 0",
              padding: "10px",
              borderRadius: "10px",
            }}
            disableGutters
          >
            <IconButton
              onClick={() => {
                if (click) {
                  setClick(false);
                } else {
                  setClick(true);
                }
              }}
              sx={{ color: "#0088cc", fontSize: "large" }}
              size="large"
            >
              <Music sx={{ fontSize: 30 }} />
            </IconButton>
            {props && (
              <ListItemText
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  maxWidth: "70%",
                }}
                primary={props.trackName}
                secondary={props.trackAutor}
              />
            )}
            {/* <div
            style={{
              position: "absolute",
              right: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton
              size="small"
              onClick={() => {
                !playing
                  ? setLike((prev) => prev + 1)
                  : setLike((prev) => prev - 1);
              }}
            >
              {playing ? (
                <Favorite sx={{ color: red[500] }} fontSize="small" />
              ) : (
                <FavoriteBorder fontSize="small" />
              )}
            </IconButton>
            <p style={{ fontSize: 14, color: "#0088ccc", fontWeight: "bolder" }}>
              {props.full.like}
            </p>
          </div> */}
          </ListItem>
        </List>
      ) : (
        ""
      )}
    </>
  );
}
