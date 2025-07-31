import styles from "./header.module.css";

export function Header() {
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
          <li>Help</li>
          <li>In Development</li>
        </ul>
      </div>
      <div className={styles.header_right}>
        <img src="public/brightness.svg" alt="brightness" />
        <button>Sign In</button>
      </div>
    </header>
  );
}
