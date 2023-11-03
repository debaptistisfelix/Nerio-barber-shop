import styles from "./AboutUs.module.css";
import Openings from "./OpeningTime/Openings";


export default function AboutUs() {
  return (
    <section id="aboutUs" className={styles.aboutUsContainer}>
      <main className={styles.aboutUs}>
        <h1 className={styles.title}>IL TUO BARBIERE DI FIDUCIA</h1>
        <p className={styles.intro}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, sed
          sapiente nobis, at facere est dignissimos maxime, exercitationem
          tempora optio rerum architecto quia itaque libero cum! Distinctio
          porro molestiae possimus.
        </p>
        <p className={styles.intro}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          suscipit beatae non illum illo distinctio pariatur deserunt maiores at
          commodi, aperiam tenetur perspiciatis quis impedit sequi facere atque!
          Laudantium, facere!
        </p>
      </main>
      <Openings />
    </section>
  );
}
