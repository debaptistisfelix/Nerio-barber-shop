import styles from "./Banner.module.css";

import "../CSS/variables.css";
import Logo from "./Logo";
export default function Banner() {
  return (
    <>
      <main className={styles.banner}>
        <div className={styles.shader}></div>
        <Logo />
      </main>
    </>
  );
}
