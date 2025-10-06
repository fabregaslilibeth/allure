import './globals.css'
import Header from '../components/Header/page';
import { aboreto } from '@/fonts/index';

export const metadata = {
  title: 'Allure',
  description: 'Allure',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={aboreto.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}