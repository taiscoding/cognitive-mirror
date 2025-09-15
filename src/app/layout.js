import './globals.css'

export const metadata = {
  title: 'Cognitive Mirror - Diagnostic Skill Development',
  description: 'Interactive platform for medical students and residents to track and improve diagnostic reasoning skills',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-medical">
        <div className="min-h-screen bg-gradient-to-br from-medical-light to-blue-50">
          {children}
        </div>
      </body>
    </html>
  )
}
