import './globals.css';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
