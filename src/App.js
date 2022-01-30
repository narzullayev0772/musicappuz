import Main from "./pages/main/main";
import { Routes, Route } from "react-router-dom";
import MainRu from "./pages/main/mainru";
import MainEuro from "./pages/main/maineuro";
import MainTurk from "./pages/main/mainturk";
import MainSearch from "./pages/main/mainSearch";
import Comment from "./pages/main/comment";
import SharePage from "./pages/main/sharePage";
function App() {
  document.cookie =
    "Set-Cookie: promo_shown=1; _gid=GA1.2.2049018004.1642851236; SameSite=Strict";

  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Main type={"Uzbek"} />} />
        <Route path="/uzmusic" exact element={<Main type={"Uzbek"} />} />
        <Route path="/rumusic" element={<MainRu type={"Rus"} />} />
        <Route path="/euromusic" element={<MainEuro type={"Euro"} />} />
        <Route path="/turkmusic" element={<MainTurk type={"Turk"} />} />
        <Route path="/search" element={<MainSearch type={false} />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/share/:sharedUrl" element={<SharePage />} />
      </Routes>
    </div>
  );
}

export default App;
