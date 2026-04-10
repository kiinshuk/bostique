import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

export const metadata: Metadata = {
  title: 'BOSTIQUE — Crafted to Carry Your Story',
  description: 'Premium bags and leather goods',
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