import styles from "./BarberSelector.module.css";

export default function BarberSelector({ chooseBarber }) {
  const barbers = [
    { name: "Indifferente", img: "/anon.png", value: "Nerio,Andrea" },
    { name: "Nerio", img: "/anon.png", value: "Nerio" },
    { name: "Andrea", img: "/anon.png", value: "Andrea" },
  ];
  return (
    <section className={styles.barberChoiceBox}>
      {/* <label className={styles.label}>Barbiere:</label> */}
      <div className={styles.barberOptions}>
        {barbers.map((barber) => {
          return (
            <h3
              onClick={() => chooseBarber(barber.value)}
              key={barber.name}
              className={styles.barber}
            >
              {barber.name}
            </h3>
          );
        })}
      </div>
    </section>
  );
}
