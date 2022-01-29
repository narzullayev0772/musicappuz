import LabelBottomNavigation from "../../components/bottom";
import MusicItem from "../../components/navigation/file";
import MenuAppBar from "../../components/navigation/navigation";
// import Player from "../../components/navigation/player";
import Loading from "../../components/navigation/loading";
import { useEffect, useRef, useState } from "react";
import "../../pages/main/main.css";
import Player from "./player";
// import axios from "axios";
const MainController = ({ data, type, parentFunc }) => {
  // const likeLoad = async (track) => {
  //   const likes = await axios.get(`${process.env.REACT_APP_URL}music/like`);
  //   const allLikedMusicArray = likes.data.comments;
  //   const el = allLikedMusicArray.find((e) => e.track === track);
  //   if (el) return [track, el.like];
  // };

  const [bool, setBool] = useState(true);
  const widthLength = useRef(window.innerWidth);

  const [items, setItems] = useState(null);
  const [url, setUrl] = useState({
    track:
      "https://uzbmusic.net/uploads/files/otabek_mutalxojayev__otajon.mp3 \r",
    trackName: "Otabek Mutalxo'jayev ",
    trackAutor: " Otajon ",
  });

  const [played, setPlayed] = useState(url);

  useEffect(() => {
    widthLength.current > 678 ? setBool(true) : setBool(false);
    setItems(data);
    setPlayed(url);
  }, [widthLength, data, played, url]);

  const [click, getClick] = useState(false);

  return (
    <div className="main">
      <MenuAppBar width={bool} type={type} parentFunc={parentFunc} />
      <div className="main__player">
        <div className="player"></div>
        <div className="main__file">
          {data && data !== null ? (
            data.tracks.map(
              (music, index) =>
                music &&
                music.trackAutor !== " " && (
                  <MusicItem
                    getClick={getClick}
                    getUrl={setUrl}
                    key={index}
                    index={index}
                    full={music}
                    trackAutor={music.trackAutor}
                    track={music.track}
                    trackName={music.trackName}
                    // like={likeLoad(music.track)}
                  />
                )
            )
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <div style={{ position: "fixed", width: "100%" }}>
        {click && (
          <Player
            trackName={url.trackName}
            tracks={url.track}
            trackAutor={url.trackAutor}
            url={played}
            click={click}
            items={items}
          />
        )}
      </div>
      {!bool && <LabelBottomNavigation />}
    </div>
  );
};

export default MainController;
