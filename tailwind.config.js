const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  //css
  theme: {
    extend: {
      colors: {
        customGreen: "#56F27D",
        customBlue: "#0004FF",
        customBlue2: "#3FA6EF", 
      },
      textShadow: {
        custom: "1px 1px 2px rgba(0, 0, 0, 0.5)", // เงาบางๆ ตามตัวอักษร
      },
    },
  },
  plugins: [
    flowbite.plugin(),

    // เพิ่ม plugin รองรับ text-shadow
    require("tailwindcss-textshadow"),
  ],
};
