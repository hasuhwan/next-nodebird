import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import wrapper from "../store/configureStore";

function NodeBird({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBrid</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default wrapper.withRedux(NodeBird);
