import LabelBottomNavigation from "../../components/bottom";
import MusicItem from "../../components/navigation/file";
import MenuAppBar from "../../components/navigation/navigation";
// import Player from "../../components/navigation/player";
import Loading from "../../components/navigation/loading";
import { useEffect, useRef, useState } from "react";
import "../../pages/main/main.css"
const MainController = ({data,type,parentFunc}) => {
  const ref = document.getElementsByClassName("main__file")[0];
  const [bool, setBool] = useState(true);
  const widthLength = useRef(window.innerWidth);
  useEffect(() => {
    widthLength.current > 678 ? setBool(true) : setBool(false);
  }, [widthLength,bool,ref]);
  return ( 
    <div className="main">
        <MenuAppBar width={bool} type={type} parentFunc={parentFunc}/>
        <div className="main__player">
          <div className="player"></div>
            <div className="main__file">
              {(data && data!==undefined ) ? (
                 data.tracks.map(
                    (music, index) =>
                    music && (
                      <MusicItem
                      key={index}
                      name={music.trackAutor}
                      url={music.track}
                      author={music.trackName}
                      />
                      )
                      )
              ) : (
                <Loading />
              )}
            </div>
        </div>
        {!bool && <LabelBottomNavigation />}
      </div>
     );
}
 
export default MainController;