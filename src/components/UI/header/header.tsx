import styles from "./header.module.css";
import { useTheme } from "../../../context/ThemeContext.tsx";
import { useState } from "react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        <img src="public/logo.svg" alt="logo" />
        <a href="/" target="_parent">
          Shortli
        </a>
      </div>
      <div className={styles.header_center}>
        <ul>
          <li>
            <a href="/stats">Stats</a>
          </li>
          <li>In Development</li>
        </ul>
      </div>
      <div className={styles.header_right}>
        <img
          src="public/brightness.svg"
          alt="brightness"
          onClick={() => setShowThemeMenu(!showThemeMenu)}
        />
        {showThemeMenu && (
          <div className={styles.theme_menu}>
            <button
              onClick={() => {
                toggleTheme();
                setShowThemeMenu(false);
              }}
              className={theme === "light" ? styles.active : ""}
            >
              Light
            </button>
            <button
              onClick={() => {
                toggleTheme();
                setShowThemeMenu(false);
              }}
              className={theme === "dark" ? styles.active : ""}
            >
              Dark
            </button>
          </div>
        )}
        <button>Sign In</button>
      </div>
    </header>
  );
}
