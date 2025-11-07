import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mustafizur Chat',
  description: 'A WhatsApp-style chat application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
