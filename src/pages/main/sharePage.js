// import { useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import LabelBottomNavigation from "../../components/bottom";
// import MenuAppBar from "../../components/navigation/navigation";
// import Player from "../../components/navigation/player";
import Share from "./../../components/navigation/share";

const SharePage = (props) => {
//   let { sharedUrl } = useParams();
//   let [trackName, trackAutor, track] = sharedUrl.split("&");

//   console.log(trackName);
//   const [bool, setBool] = useState(false);

  return (
    <>
      {/* <div style={{ width: "100%" }}>
        <MenuAppBar width={bool} type={true} />
      </div> */}
      <Share />

      {/* <Player
        trackName={trackName}
        tracks={track}
        trackAutor={trackAutor}
        // url={played}
        click={true}
        // items={items}
      />
      {!bool && <LabelBottomNavigation />} */}
    </>
  );
};

export default SharePage;
