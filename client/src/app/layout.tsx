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
        className={`overflow-x-hidden ${poppins.className}`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
