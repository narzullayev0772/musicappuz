import * as React from "react";
import Microwave from "@mui/icons-material/Mic";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#0088CC",
  boxShadow: 24,
  p: 4,
};

const Speech = ({ setSpeechText, setStop, lang }) => {
  const commands = [
    {
      command: "exit *",
      callback: () => {
        window.close();
      },
    },
    {
      command: "open *",
      callback: (website) => {
        window.open("http://" + website.split(" ").join(""));
      },
    },
  ];

  const { transcript, listening } = useSpeechRecognition(commands);
  const microphoneRef = useRef(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(listening);
    setSpeechText(transcript);
    setStop(listening);
    console.log(lang);
  }, [listening, setSpeechText, transcript, setStop, lang]);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return alert("Sizning browseringizda ushbu funksiya yo'q 😞");
  }
  const handleListing = () => {
    setOpen(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      language: lang,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div
      className="microphone-wrapper"
      style={{
        position: "absolute",
        right: "18%",
      }}
    >
      <div className="mircophone-container">
        <IconButton ref={microphoneRef} onClick={handleListing}>
          <Microwave htmlColor="#fff" />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color={"#fff"}
            >
              Gapiring....
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              color={"#fff"}
            >
              {transcript}
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Speech;
