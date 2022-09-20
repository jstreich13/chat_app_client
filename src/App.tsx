import SocketsProvider from "./context/socket.context";
import "../src/styles/globals.scss";
import React from "react";

function App({ Component, pageProps }) {
  return (
    <SocketsProvider>
      <Component {...pageProps} />
    </SocketsProvider>
  );
}

export default App;
