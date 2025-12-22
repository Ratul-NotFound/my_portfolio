import './globals.css'

export const metadata = {
  title: 'AI Engineer & Full Stack Developer',
  description: 'Portfolio of an AI Engineer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}