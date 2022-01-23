import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import { Loop } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

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
  paddingTop: 5,
  paddingBottom:5,
});

export default function Player(props) {
  const ref = React.useRef();

  const [duration, setDuration] = React.useState(0);
  const [color, setColor] = React.useState("#000");
  const [loop, setloop] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [position, setPosition] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  function getDuration(cb) {
    ref.current.addEventListener("loadedmetadata", function () {
      cb(ref.current.duration);
      setLoading(false);
      ref.current.onended = () => {
        setPaused(false);
      };
    });
  }

  React.useEffect(() => {
    if (props.click) {
      setProgress(0);
      ref.current.onsuspend = (event) => {
        setLoading(false);
        console.log("Data loading has been suspended.");
      };
    }

    setProgress((prev) => prev);
    setLoading((prev) => prev);

    setPaused(!props.click);
    const timer = setInterval(() => {
      setPosition(Math.round(ref.current.currentTime));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [props]);

  const theme = useTheme();
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
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
        <audio
          src={props.tracks}
          style={{ display: "none" }}
          loop={loop}
          controls
          preload="metadate"
          ref={ref}
          onProgress={(e) => {
            for (var i = 0; i < e.target.buffered.length; i++)
              setProgress(
                (e.target.buffered.end(e.target.buffered.length - 1 - i) /
                  duration) *
                  100
              );
          }}
        ></audio>

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
          <Box sx={{ pt: 0.5, minWidth: 0, flex: 3 }}>
            <p
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "90%",
              }}
            >
              {props.trackName}
            </p>
            <Typography
              style={{
                maxWidth: "90%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: "500",
                color: "#00000095",
              }}
              noWrap
              letterSpacing={-0.25}
            >
              {props.trackAutor}
            </Typography>
          </Box>
          <div style={{ flex: 1 }}>
            <IconButton
              onClick={() => {
                color !== "#000" ? setColor("#000") : setColor("#0088cc");
                setloop(!loop);
              }}
            >
              <Loop htmlColor={color} fontSize="small" />
            </IconButton>
            <IconButton
              aria-label={paused ? "play" : "pause"}
              onClick={() => {
                if (!paused) {
                  setPaused(true);
                  ref.current.play().catch(() => {
                    console.log("some wait loading....");
                  });
                  getDuration(function (length) {
                    setDuration(Math.round(length));
                  });
                } else {
                  ref.current.pause();
                  setPaused(false);
                }
              }}
            >
              {paused &&
                (!loading ? (
                  <CircularProgress
                    variant="determinate"
                    value={progress}
                    sx={{ position: "absolute" }}
                  />
                ) : (
                  <CircularProgress sx={{ position: "absolute" }} />
                ))}
              {!paused ? (
                <PlayArrowRounded htmlColor={mainIconColor} />
              ) : (
                <PauseRounded htmlColor={mainIconColor} />
              )}
            </IconButton>
          </div>
        </Box>
      </Widget>
    </Box>
  );
}
