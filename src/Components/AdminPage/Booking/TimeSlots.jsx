import styles from "./TimeSlots.module.css";
import { v4 as uuidv4 } from "uuid";

import SingleSlot from "./SingleSlot";

export default function TimeSlots({ availableSlots, chooseTimeSlot }) {
  return (
    <section className={styles.timeSlots}>
      <label className={styles.label}>Orari disponbibili:</label>
      <main className={styles.timeSlotsContainer}>
        {availableSlots.map((slot) => {
          return (
            <SingleSlot
              key={uuidv4()}
              slot={slot}
              chooseTimeSlot={chooseTimeSlot}
            />
          );
        })}
      </main>
    </section>
  );
}
