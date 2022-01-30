import { useParams } from "react-router-dom";
import LabelBottomNavigation from "../../components/bottom";
import MenuAppBar from "../../components/navigation/navigation";
import Player from "../../components/navigation/player";

const SharePage = () => {
  let { sharedUrl } = useParams();
  let [trackName, trackAutor, track] = sharedUrl.split("&");

  const bool = false;

  return (
    <>
      <div
        style={{
          width: "100%",
          background: "rgb(172 206 239)",
          height: "92vh",
        }}
      >
        <MenuAppBar width={bool} type={true} />
        <a href="/" style={{ position: "absolute", top: "50%", left: "35%" }}>
          Go to home page{" "}
        </a>
      </div>
      <Player
        trackName={Buffer.from(trackName, "base64").toString("ascii")}
        tracks={Buffer.from(track, "base64").toString("ascii")}
        trackAutor={Buffer.from(trackAutor, "base64").toString("ascii")}
        // url={played}
        click={true}
        // items={items}
      />
      {!bool && <LabelBottomNavigation />}
    </>
  );
};

export default SharePage;
