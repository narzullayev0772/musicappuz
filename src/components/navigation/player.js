import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import { Download, Loop } from "@mui/icons-material";

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  maxWidth: 550,
  width: "100%",
  margin: "auto",
  position: "fixed",
  bottom: "50px",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  marginTop: "2vh",
}));

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function Player(props) {
  const ref = React.useRef();

  const [duration, setDuration] = React.useState(0);
  const [color, setColor] = React.useState("#000");
  const [loop,setloop] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [position, setPosition] = React.useState(0);

  function getDuration(cb) {
    ref.current.addEventListener("loadedmetadata", function () {
      cb(ref.current.duration);
      ref.current.onended=()=>{
        setPaused(false);
      }
    });
  }
  React.useEffect(()=>{
    const timer = setInterval(() => {
      setPosition(Math.round(ref.current.currentTime));
    }, 1000);
    return () => {
      clearInterval(timer)
    }
  },[])

  const theme = useTheme();
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Widget>
        <audio src={props.tracks} style={{display:"none"}} loop={loop} controls preload="none" ref={ref}></audio>
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
            color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === "dark"
                    ? "rgb(255 255 255 / 16%)"
                    : "rgb(0 0 0 / 16%)"
                }`,
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -1,
          }}
        >
          <Box sx={{ mr: 5.5, pt: 0.5, minWidth: 0 }}>
            <p
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: "500",
                color: "#00000095", maxWidth:"200px"
              }}
            >
              {props.trackName}
            </p>
            <Typography noWrap letterSpacing={-0.25}>
              {props.trackAutor}
            </Typography>
          </Box>
          <div>
            <IconButton
              onClick={() =>{

                color !== "#000" ? setColor("#000") : setColor("#0088cc")
                setloop(!loop);
              }
              }
            >
              <Loop htmlColor={color} fontSize="small" />
            </IconButton>
            <IconButton
              aria-label={paused ? "play" : "pause"}
              onClick={() => {
                setPaused(!paused);
                if (!paused) {
                  ref.current.play();
                  getDuration(function (length) {
                    setDuration(Math.round(length));
                  });
                } else {
                  ref.current.pause();
                }
              }}
            >
              {!paused ? (
                <PlayArrowRounded htmlColor={mainIconColor} />
              ) : (
                <PauseRounded htmlColor={mainIconColor} />
              )}
            </IconButton>
            <IconButton>
              <a href={props.tracks} download>
              <Download htmlColor={mainIconColor} fontSize="small" />
              </a>
            </IconButton>
          </div>
        </Box>
      </Widget>
    </Box>
  );
}
