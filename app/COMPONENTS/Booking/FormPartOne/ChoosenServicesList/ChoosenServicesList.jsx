import styles from "./ChoosenServicesList.module.css";
import { useBookingContext } from "@/app/COMPONENTS/Context/BookingContext";
import { v4 as uuidv4 } from "uuid";
import ChoiceBlock from "./ChoiceBlock/ChoiceBlock";


export default function ChoosenServicesList({choicesListRef}) {
    const {booking} = useBookingContext();
  return (
    <section ref={choicesListRef} className={styles.choicesList} >
    {booking?.services !== null &&
      booking?.services.map((service) => {
        return <ChoiceBlock service={service} key={uuidv4()} />;
      })}
  </section>
  )
}
