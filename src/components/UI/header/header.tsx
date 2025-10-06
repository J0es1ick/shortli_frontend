import styles from "./header.module.css";
import { useTheme } from "../../../context/ThemeContext.tsx";

export function Header() {
  const { toggleTheme } = useTheme();

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
        </ul>
      </div>
      <div className={styles.header_right}>
        <img
          className={styles.brightness}
          src="public/brightness.svg"
          alt="brightness"
          onClick={() => toggleTheme()}
        />
      </div>
    </header>
  );
}
