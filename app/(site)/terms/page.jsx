import styles from './page.module.css'
import Terms from '@/app/COMPONENTS/Terms/Terms'


export const metadata = {
    title: "Termini a Condizioni D'uso",
    description: "Termini e condizioni d'uso per il Booking-system di Nerio Barber-shop"  }

export default function TermsAndConditionsPage(){
    return (
        <main className={styles.termsPage}>
            <Terms />
        </main>
    )
}