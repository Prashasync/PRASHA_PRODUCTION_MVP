import React, { useEffect } from "react";
import Header from "./partials/HeaderIcons";
import "./header.css";
import { useDarkMode } from "usehooks-ts";
import ThemeToggle from "../utils/ThemeToggle";

const Nav = () => {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);
  return (
    <div>
      <Header />
      <ThemeToggle />
    </div>
  );
};

export default Nav;
