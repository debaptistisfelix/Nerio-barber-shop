import styles from './page.module.css'
import CancelBooking from '@/app/COMPONENTS/CancelBooking/CancelBooking'

export const metadata = {
    title: 'Annulla Prenotazione',
    description: 'Cancella la tua prenotazione presso il nostro Barber-shop'  }


    export default function CancelBookingPage(){
      

        return (
            <main className={styles.cancelBooking}>
          <CancelBooking />
            </main>
        )
    }