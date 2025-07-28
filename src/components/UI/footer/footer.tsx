import style from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footer_text}>
        <ul className={style.footer_ul}>
          <li>Contacts</li>
          <li>About</li>
        </ul>
        <p className={style.footer_mark}>
          Shortli ©2025 <br />
          User agreement
        </p>
      </div>
    </footer>
  );
}
