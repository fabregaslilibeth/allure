import './globals.css'
import { Aboreto , Assistant } from 'next/font/google'
import Header from '../components/Header/page';

const aboreto = Aboreto({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-aboreto'
})

const assistant = Assistant({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-assistant'
})

export const metadata = {
  title: 'Allure',
  description: 'Allure',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${aboreto.className}`}>
        <Header />
        {children}
      </body>
    </html>
  )
}