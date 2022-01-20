import Main from "./pages/main/main";
import { Routes, Route } from "react-router-dom";
import MainRu from "./pages/main/mainru";
import MainEuro from "./pages/main/maineuro";
import MainTurk from "./pages/main/mainturk";
import MainSearch from "./pages/main/mainSearch";
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" exact element={<Main type={"Uzbek"} />} />
        <Route path="/uzmusic" exact element={<Main type={"Uzbek"} />} />
        <Route path="/rumusic" element={<MainRu  type={"Rus"}/>} />
        <Route path="/euromusic" element={<MainEuro type={"Euro"} />} />
        <Route path="/turkmusic" element={<MainTurk type={"Turk"}/>}/>
        <Route path="/search" element={<MainSearch type={false}/>} />
      </Routes>
    </div>
  );
}

export default App;
