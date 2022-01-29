import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Music from "@mui/icons-material/MusicNote";
import IconButton from "@mui/material/IconButton";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
// import axios from "axios";

export default function MusicItem(props) {
  const [click, setClick] = React.useState(props.click);
  const [likeBool, setLikeBool] = React.useState(false);
  const ref = React.useRef();
  const [like, setLike] = React.useState(Math.round(Math.random() * 500));

  // props.like.then((e) => e && setLike(e[0] === props.track && e[1]));

  const fetchLike = () => {
    // axios.post(`${process.env.REACT_APP_URL}music/like`, {
    //   track: props.track,
    //   like: !likeBool ? like + 1 : like - 1,
    // });
    !likeBool ? setLike(like + 1) : setLike(like - 1);
    setLikeBool(!likeBool);
  };

  const [playing, setPlaying] = React.useState(false);
  return (
    <>
      {props.track ? (
        <List
          className="file"
          sx={{
            padding: "8px",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <ListItem
            onClick={() => {
              setClick(false);
              props.getUrl(props);
              setPlaying(!playing);
              props.getClick(true);
            }}
            style={{
              background:
                "linear-gradient(300deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
              margin: "5px 0",
              padding: "10px",
              borderRadius: "10px",
              position: "relative",
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
          </ListItem>
          <div
            style={{
              position: "absolute",
              right: "2%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 0,
              bottom:"25%",
              width:"4rem"
            }}
          >
            <IconButton onClick={fetchLike}>
              {!likeBool ? (
                <FavoriteBorder htmlColor="#fff" />
              ) : (
                <Favorite htmlColor="red" className={"anim"} />
              )}
            </IconButton>
            <p style={{ fontSize: 12, color: "#00000050" }} ref={ref}>
              {like}
            </p>
          </div>
        </List>
      ) : (
        ""
      )}
    </>
  );
}
