import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header/page';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Allure',
  description: 'Allure',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}