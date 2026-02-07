// app/layout.jsx
import "./globals.css";;
import { Poppins, Montserrat, Inter } from "next/font/google";
import WhatsAppButton from "@/components/website/WhatsAppButton";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: {
    template: "%s | CA Vakil",
    default: "CA Vakil",
  },
  description: "Simplifying Tax, GST, trademarks, and compliance for modern businesses across India.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${montserrat.variable} ${inter.variable} antialiased`}
      >
        <main>{children}</main>
        {/* <WhatsAppButton /> */}
      </body>
    </html>
  );
}
