import "../styles/globals.css";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          // Custom fetcher function for SWR
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
        }}
      >
        {/* Render the main component with props */}
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
