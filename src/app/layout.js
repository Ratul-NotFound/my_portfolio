import './globals.css'

export const metadata = {
  title: 'Mahmud Hasan Ratul | Full Stack & AI Engineer',
  description: 'Full Stack Developer & AI Engineer. Specialized in Next.js, React, Node.js, and AI solutions. Based in Bangladesh.',
  keywords: 'full stack developer, AI engineer, Next.js, React, Node.js, portfolio',
  authors: [{ name: 'Mahmud Hasan Ratul' }],
  creator: 'Mahmud Hasan Ratul',
  openGraph: {
    title: 'Mahmud Hasan Ratul | Full Stack & AI Engineer',
    description: 'Explore my portfolio of production-ready web and AI applications.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahmud Hasan Ratul | Full Stack & AI Engineer',
    description: 'Full Stack Developer & AI Engineer Portfolio',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
