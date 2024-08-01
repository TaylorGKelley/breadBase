import { Poppins, Metamorphous } from 'next/font/google';

export const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metamorphous = Metamorphous({
  weight: ['400'],
  subsets: ['latin'],
});

// use with <element className={`${poppins.className}`} />
