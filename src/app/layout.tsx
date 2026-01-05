import './globals.css'

export const metadata = {
  title: 'DSA Learn',
  description: 'Learn Trees, Graphs, BSTs & more'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
