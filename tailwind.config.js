/** @type {import('twrnc').TwConfig} */
module.exports = {
  content: [`**/*.{js,ts,jsx,tsx}`],
  theme: {
    extend: {
      colors: {
        lightBackground: "#FFFFFF",
        darkBackground: "#000000",
        lightText: "#000000",
        darkText: "#FFFFFF",
      },
      screens: {
        sm: '380px',
        md: '420px',
        lg: '680px',
        tablet: '1024px',
      },
    },
    fontFamily: {
      "HKGrotesk-Black": ["HankenGrotesk-Black"],
      "HKGrotesk-BlackItalic": ["HankenGrotesk-BlackItalic"],
      "HKGrotesk-Bold": ["HankenGrotesk-Bold"],
      "HKGrotesk-BoldItalic": ["HankenGrotesk-BoldItalic"],
      "HKGrotesk-Italic": ["HankenGrotesk-Italic"],
      "HKGrotesk-LightItalic": ["HankenGrotesk-LightItalic"],
      "HKGrotesk-Medium": ["HankenGrotesk-Medium"],
      "HKGrotesk-MediumItalic": ["HankenGrotesk-MediumItalic"],
      "HKGrotesk-Regular": ["HankenGrotesk-Regular"],
      "HKGrotesk-SemiBold": ["HankenGrotesk-SemiBold"],
      "HKGrotesk-SemiBoldItalic": ["HankenGrotesk-SemiBoldItalic"],
    },
  },
  plugins: [],
};
