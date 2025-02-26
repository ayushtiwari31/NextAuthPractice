
import { Inter } from 'next/font/google';
import './globals.css';
import  { Toaster } from 'react-hot-toast';


import AuthProvider from './context/AuthProvider';

const inter = Inter({ subsets: ['latin'] });


// export const metadata: Metadata = {
//   title: 'NextAuth Practice',
//   description: 'Practice for NextAuth.',
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
      <body
       className={inter.className}
      >
    
      {children}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      </body>
</AuthProvider>

    </html>
  );
}
