import SocketsProvider from "./context/socket.context";
import Home from "./pages/Home";

function App({ Component, pageProps }) {
  return (
    <SocketsProvider>
      <Component {...pageProps} />
    </SocketsProvider>
  );
}

export default App;
