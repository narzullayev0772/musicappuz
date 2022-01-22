import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Music from "@mui/icons-material/MusicNote";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import IconButton from "@mui/material/IconButton";
import Loading from "./loading";

export default function MusicItem(props) {
  const [click, setClick] = React.useState(props.click);

  const [playing, setPlaying] = React.useState(false);
  return (
    <List
      className="file"
      sx={{ padding: "8px" }}
      onClick={() => {
        setClick(false);
        props.getUrl(props);
        setPlaying(false);
        props.getClick(true)
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
        {playing && (
          <>
            <a href={props.track} download={props.track}>
              <CloudDownloadIcon
                fontSize="small"
                sx={{ color: "#ececec", cursor: "pointer" }}
              />
            </a>
            <div style={{ position: "absolute", right: 20 }}>
              <Loading />
            </div>
          </>
        )}
      </ListItem>
    </List>
  );
}
