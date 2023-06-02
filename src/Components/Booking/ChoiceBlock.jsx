import styles from "./ChoiceBlock.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { BookingContext } from "../Contexts/BookingContext";

export default function ChoiceBlock({ service }) {
  const { removeServiceFromServiceList } = useContext(BookingContext);
  return (
    <section className={styles.choiceBlock}>
      <h3 className={styles.service}>{service.service}</h3>
      <FontAwesomeIcon
        onClick={() => removeServiceFromServiceList(service.id)}
        icon={faX}
        className={styles.xIcon}
      />
    </section>
  );
}
