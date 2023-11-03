
import './globals.css'
import Provider from './COMPONENTS/Context/AuthContenxt'
import ToastContext from './COMPONENTS/Context/ToastContext'
import TouchContextProvider from './COMPONENTS/Context/TouchContext'
import { Oswald } from 'next/font/google'

const oswald = Oswald({ subsets: ['latin'] });


export const metadata = {
  title: 'Nerio Barber-shop',
  description: 'Barber-shop with Booking system, price list and more',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
           <body className={oswald.className}>
              <Provider>
                <TouchContextProvider>
                  <ToastContext />
            {children}
                </TouchContextProvider>
              </Provider>
            </body>
    </html>
  )
}
