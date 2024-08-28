import './globals.css';
import Navbar from '../components/Navbar';
import { poppins } from '../ui/fonts';
import GetAuthState from '@/wrappers/GetAuthState';

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
        <GetAuthState>
          <Navbar />
          {children}
        </GetAuthState>
      </body>
    </html>
  );
}
