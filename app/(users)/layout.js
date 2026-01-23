import '../globals.css';
import Navigation from './Navigation';
export default function RootLayout({
  children
}) {
  return (
    <html lang="en">
      <body>
        <Navigation/> 
        <h1>Dashboard..<br/><br/></h1>
        {children}
      </body>
    </html>
  )
}