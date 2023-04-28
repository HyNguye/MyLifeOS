import { HomeContext, actions } from "~/homepage-store";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
function LockScreen() {
  const [state, dispatch] = useContext(HomeContext);
  const [author, setAuthor] = useState("");
  const [quotes, setQuote] = useState("");
  const [colorBG, setColor] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const colors = ["#FF5757", "#5757FF", "brown",  "orange", "#FF57FF", "#CDCDCD","black"];
  const randomColor = Math.floor(Math.random() * colors.length);
  const randomQuote = Math.floor(Math.random() * data.length);
  const handleLockScreen = () => {
    navigate("/Home", { replace: true });
    dispatch(actions.lockScreen(false));
  };
  async function fetchQuote() {
    const response = await fetch("https://type.fit/api/quotes");
    setData(await response.json());
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleLockScreen);
    window.addEventListener("click", handleLockScreen);
    window.addEventListener("keydown", handleLockScreen);
    fetchQuote();
    return () => {
      window.removeEventListener("mousemove", handleLockScreen);

      window.removeEventListener("click", handleLockScreen);

      window.removeEventListener("keydown", handleLockScreen);
    };
  }, []);
  useEffect(() => {
    const autoChange = setTimeout(() => {
      setQuote(data[randomQuote].text);
      setAuthor(data[randomQuote].author);
      setColor(colors[randomColor]);
    }, 3000);
    return () => {
      clearTimeout(autoChange);
    };
  });

  return (
    <div
      className="text-white text-4xl flex w-screen h-screen justify-center items-center"
      style={{ backgroundColor: `${colorBG || "black"}` }}
    >
      <div className=" h-fit w-3/4 flex flex-col border-white border-2 rounded">
        <div className="max-w-full w-fit self-center text-center p-7">
          {quotes || `Loading...`}
        </div>
        <div className="self-end w-fit text-center p-7">{`--${
          author || ""
        }`}</div>
      </div>
    </div>
  );
}

export default LockScreen;
