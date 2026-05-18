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
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900;1,14..32,300;1,14..32,400;1,14..32,500;1,14..32,600;1,14..32,700;1,14..32,800;1,14..32,900&family=Fira+Code:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Dancing+Script:wght@400..700&family=Alex+Brush&family=Caveat:wght@400..700&family=Sacramento&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}