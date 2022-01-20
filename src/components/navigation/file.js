import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Play from "@mui/icons-material/PlayCircle";
import Pause from "@mui/icons-material/PauseCircle";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function MusicItem(props) {
  const [click, setClick] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const ref = React.useRef();

  function getDuration(cb) {
    ref.current.addEventListener("loadedmetadata", function () {
      cb(ref.current.duration);
    });
    ref.current.addEventListener("ended", function () {
      setClick(false);
    });
  }

  function DiscreteSliderLabel() {
    const [position, setPosition] = React.useState(0);
    function formatDuration(value) {
      const minute = Math.floor(value / 60);
      const secondLeft = value - minute * 60;
      return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }
    React.useEffect(() => {
      const timer = setInterval(() => {
        setPosition(prev=>prev+1)
      },1000);
      return () => {
        clearTimeout(timer);
      }
    }, []);
    return (
      <Box
        sx={{
          width: "80%",
          marginLeft: "10%",
          position: "absolute",
          bottom: "-20px",
          fontSize: 2,
        }}
      >
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => {
            setPosition(value);
            ref.current.currentTime = value;
          }}
          sx={{
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
      </Box>
    );
  }

  return (
    <List className="file" sx={{ padding: "8px" }}>
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
              ref.current.pause();
            } else {
              setClick(true);
              ref.current.play();
              getDuration(function (length) {
                setDuration(Math.floor(length));
              });
            }
          }}
          sx={{ color: "#0088cc", fontSize: "large" }}
          size="large"
        >
          {click ? <Pause fontSize="large" /> : <Play fontSize="large" />}
        </IconButton>
        <ListItemText
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
          primary={props.name
            .replaceAll("&#039;", "'")
            .replaceAll("&amp;", "&")}
          secondary={props.author
            .replaceAll("&#039;", "'")
            .replaceAll("&amp;", "&")}
        />
        <audio
          style={{ display: "none" }}
          src={props.url}
          controls
          preload="none"
          ref={ref}
        ></audio>
        {click && <DiscreteSliderLabel />}
      </ListItem>
    </List>
  );
}
