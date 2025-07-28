import { ShortenerForm } from "../../components/shortenerForm/shortenerForm";
import Footer from "../../components/UI/footer/footer";
import { Header } from "../../components/UI/header/header";
import styles from "./home.module.css";

export function Home() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <ShortenerForm />
      </main>
      <Footer />
    </div>
  );
}
