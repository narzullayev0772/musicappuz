// import { useState } from "react";

const Music = (props) => {
    // const [play,setPlay] = useState(false);
    // let music = new Audio(props.url);
    // music.preload="auto"
    return (
        <>
        <button onClick={()=>{
            // if(play){
            //     music.pause()
            //     setPlay(false)
            //     console.log("paused");
            // }
            // else{
            //     music.play();
            //     setPlay(true);
            //     console.log("played");
            // }

      }}>
          {props.title}
      </button>
      <audio src={Buffer.from(props.url,"base64").toString("ascii").replaceAll(`"`,"")} controls preload="none"></audio><br />
      </>
  );
};

export default Music;
