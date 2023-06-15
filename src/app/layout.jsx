import "./globals.css";

import Head from "@/components/Head";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Player from "@/components/Player/Player";
import User from "@/components/User/User";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }) {
  const token = cookies().get("access_token");

  console.log(token.value);

  return (
    <html
      lang="en"
      className="flex w-screen items-center justify-center overflow-x-hidden"
    >
      <Head />
      <body className={[inter.className, " relative w-full md:w-[40vw]"]}>
        <header>
          <Navbar />
        </header>
        {children}
        <Player />
        <User token={token?.value} />
      </body>
    </html>
  );
}

export default RootLayout;
