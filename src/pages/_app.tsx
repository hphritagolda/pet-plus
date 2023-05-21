import "@/styles/globals.css";
import "@shoelace-style/shoelace/dist/themes/light.css";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";

const rubik = Rubik({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${rubik.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
