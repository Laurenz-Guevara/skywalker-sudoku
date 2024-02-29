import styles from "@/app/page.module.scss";
import SudokuBoard from "@/components/SudokuBoard";

export default function Home() {
  return (
    <main className={styles.main}>
      <SudokuBoard />
    </main>
  );
}
