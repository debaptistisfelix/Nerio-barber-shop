import { AdminBookingProvider } from "@/app/COMPONENTS/Context/AdminBookingContext"
import Provider from "@/app/COMPONENTS/Context/AuthContenxt"
import TouchContextProvider from "@/app/COMPONENTS/Context/TouchContext"
export default function DashboardLayout({ children }) {
  return (
    <section>
        <Provider>
          <TouchContextProvider>
        <AdminBookingProvider>
      {children}
    
        </AdminBookingProvider>
        </TouchContextProvider>
        </Provider>
    </section>
  
  )
}