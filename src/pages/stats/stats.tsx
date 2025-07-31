import Footer from "../../components/UI/footer/footer";
import { Header } from "../../components/UI/header/header";
import URLList from "../../components/urls/urlList";
import styles from "./stats.module.css";

export default function Stats() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <URLList />
      </main>
      <Footer />
    </div>
  );
}
