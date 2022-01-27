import { useEffect, useState } from "react";
import MainController from "../../components/navigation/mainController";
// import SignUp from "./signUp";
const MainSearch = ({ type }) => {
  const [result, setResult] = useState(null);

  const [value, setvalue] = useState("");
  useEffect(() => {
    const data = { name: value };
    SearchData(data);
  }, [value]);

  const SearchData = async (data) => {
    console.log(data);
    const response = await fetch(`${process.env.REACT_APP_URL}music/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    setResult(result);
  };
  return (
    <>
      {/* {result && result.status !== "fail" ? ( */}
      <MainController
        data={value && result}
        type={type}
        parentFunc={setvalue}
      />
      {/* ) : (
        <>
        <SignUp/>
        </>
      )} */}
    </>
  );
};

export default MainSearch;
