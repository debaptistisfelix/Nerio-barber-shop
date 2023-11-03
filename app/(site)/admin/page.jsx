import styles from './page.module.css'
import AdminSection from '@/app/COMPONENTS/Admin/AdminSection'
export const metadata = {
    title: 'Nerio Dashboard',
    description: 'Gestisci il tuo Barber-shop'  }


    export default function Admin(){
        return (
            <main className={styles.AdminDashboard}>
                <AdminSection/>
            </main>
        )
    }