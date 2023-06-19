import "./globals.css";

import { Analytics } from '@vercel/analytics/react';
import Head from "@/components/Head";
import Navbar from "@/components/Navbar/Navbar";
import Player from "@/components/Player/Player";
import { Poppins } from "next/font/google";
import User from "@/components/User/User";
import { cookies } from "next/headers";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

function RootLayout({ children }) {
  const token = cookies().get("access_token");

  return (
    <html
      lang="en"
      className="flex w-screen items-center justify-center overflow-x-hidden"
    >
      <Head />
      <body
        className={[poppins.className + " ", " relative w-full md:w-[60vw]"]}
      >
        <header>
          <Navbar />
        </header>
        {children}
        <Player />
        <User token={token?.value} />
        <Analytics />
      </body>
    </html>
  );
}

export const metadata = {
  icons: {
    icon: "/public/favicon.ico",
  },
};

export default RootLayout;
