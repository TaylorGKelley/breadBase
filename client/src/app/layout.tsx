import './globals.css';
import Navbar from '../components/Navbar';
import { poppins } from '../ui/fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={poppins.className}
        suppressHydrationWarning
        style={{ overflowX: 'hidden' }}
      >
        <Navbar simple />
        {children}
      </body>
    </html>
  );
}
