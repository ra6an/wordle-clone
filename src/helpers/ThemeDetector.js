import React, { useEffect } from "react";

const ThemeDetector = (props) => {
  useEffect(() => {
    const checkTheme = (theme) => {
      if (localStorage.getItem("Theme")) return;

      if (theme) {
        props.setTheme("dark");
        localStorage.setItem("Theme", "dark");
      } else {
        props.setTheme("light");
        localStorage.setItem("Theme", "light");
      }
    };

    // Funkcija koja proverava trenutno aktivnu temu
    const handleThemeChange = (event) => {
      checkTheme(event.matches);
    };

    // Osluškivanje promene teme koristeći matchMedia
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Inicijalno proveravanje teme prilikom montiranja komponente
    checkTheme(mediaQuery.matches);

    // Dodavanje event listenera za promenu teme
    mediaQuery.addEventListener("change", handleThemeChange);

    // Cleanup funkcija za uklanjanje event listenera kada komponenta bude demontirana
    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, [props]); // Ovaj useEffect se izvršava samo jednom, prilikom montiranja komponente

  return null; // Ova komponenta samo osluškuje promene, nema UI
};

export default ThemeDetector;
