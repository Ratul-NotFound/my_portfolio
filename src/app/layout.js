import './globals.css'

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
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}