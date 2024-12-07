import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

// import styles from "./styles/main.scss";
import "./styles/main.scss";

//COMPONENTS
import Footer from "./components/layouts/footer/Footer";
import Header from "./components/layouts/header/Header";
import Modal from "./components/modal/Modal";

// PAGES
import Main from "./pages/Main";

//HELPER
import ThemeDetector from "./helpers/ThemeDetector";

// STORE
import { gameActions } from "./store/redux-store";

function App() {
  const dispatch = useDispatch();
  const { gameStarted } = useSelector((state) => state.game);
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const fetchWords = async () => {
      // DODATI LOADING

      // FETCHANJE RIJECI
      try {
        const response = await fetch("/words/filtered_words.json");
        if (!response.ok) {
          throw new Error("Failed to load words!");
        }

        const data = await response.json();

        dispatch(gameActions.setWords({ data }));
      } catch (e) {
        console.log(e);
      } finally {
        // SKLONITI LOADDING
      }
    };

    fetchWords();
  }, [dispatch]);

  useEffect(() => {
    const themeLS = localStorage.getItem("Theme");

    if (themeLS) setCurrentTheme(themeLS);
  }, []);

  return (
    <div className={`${currentTheme}`}>
      <ThemeDetector setTheme={setCurrentTheme} />
      <div className="background flex">
        {!gameStarted && <Modal />}
        <Header theme={{ set: setCurrentTheme, get: currentTheme }} />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
