/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        tan: {
          300: '#d79772',
          400: '#c8876f',
          600: '#733c1d',
          950: '#260801',
        },
        yellow: '#eaa827',
      },
      // screens: {
      //   hxs: { raw: '(min-height: 350px)' },
      //   hsm: { raw: '(min-height: 500px)' },
      //   hmd: { raw: '(min-height: 750px)' },
      //   hlg: { raw: '(min-height: 900px)' },
      //   hxl: { raw: '(min-height: 1200px)' },
      // },
      fontSize: {
        base: '1rem',
        lg: '1.5rem',
        xl: '2.25rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
      },
      fontFamily: {
        poppins: 'Poppins',
        metamorphous: 'Metamorphous',
      },
      boxShadow: {
        DropShadow: '4px 4px 4px 0px rgba(0,0,0,0.25)',
      },
      borderRadius: {
        'rounded-0': '0rem',
        'rounded-1': '0.02672692947089672rem',
        'rounded-2': '0.1906779706478119rem',
        'rounded-3': '0.3125rem',
        'rounded-4': '0.625rem',
        'rounded-5': '0.9375rem',
        'rounded-6': '1.25rem',
        'rounded-7': '1.5625rem',
        'rounded-8': '2.1875rem',
        'rounded-9': '3.125rem',
        'rounded-10': '4.1875rem',
      },
    },
  },
  plugins: [],
};
