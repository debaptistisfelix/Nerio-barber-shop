import { AdminBookingProvider } from "@/app/COMPONENTS/Context/AdminBookingContext"
import Provider from "@/app/COMPONENTS/Context/AuthContenxt"
import TouchContextProvider from "@/app/COMPONENTS/Context/TouchContext"
import BugDetector from "@/app/COMPONENTS/BugDetector/BugDetector"
export default function DashboardLayout({ children }) {
  return (
    <section>
        <Provider>
          <TouchContextProvider>
        <AdminBookingProvider>
      {children}
      <BugDetector />
        </AdminBookingProvider>
        </TouchContextProvider>
        </Provider>
    </section>
  
  )
}