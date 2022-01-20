import { useEffect, useState } from "react";
import MainController from "../../components/navigation/mainController";
const MainSearch = ({ type }) => {

    // console.log(SearchInput("el"));
  const [result, setResult] = useState(null);
  const [value,setvalue] = useState("");
  useEffect(() => {
    const data = { name: value };

    fetch('https://api-music-uz.herokuapp.com/music/api/search', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
          setResult(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [value]);
  return <MainController data={result} type={type} parentFunc={setvalue} />;
};

export default MainSearch;
