import './globals.css'
import { ThemeProvider } from '../context/ThemeContext'

export const metadata = {
  title: 'Mahmud Hasan Ratul | Full Stack & AI Engineer',
  description: 'Full Stack Developer & AI Engineer Portfolio - Building scalable systems with precision',
  keywords: 'Full Stack Developer, AI Engineer, React, Next.js, Machine Learning',
  authors: [{ name: 'Mahmud Hasan Ratul' }],
  openGraph: {
    title: 'Mahmud Hasan Ratul | Full Stack & AI Engineer',
    description: 'Full Stack Developer & AI Engineer Portfolio',
    type: 'website',
  }
  ,
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}