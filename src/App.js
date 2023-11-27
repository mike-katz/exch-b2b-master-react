import { PersistGate } from "redux-persist/es/integration/react";
import "./App.css";
import MainApp from "./app/index";
import { persistor, store } from "./app/redux/store";
import { Helmet } from "react-helmet";
const themeColor = store.getState().persist.themeColor;
// const { isLoggedIn } = store.getState().persist;
// const data = store.getState().persist;

function App() {
  const isLoading = false;

  return (
    <PersistGate loading={isLoading} persistor={persistor}>
      <Helmet>
        {console.log({ themeColor })}
        <link rel="icon" href={themeColor?.faviconUrl} />
        <link rel="apple-touch-icon" href={themeColor?.faviconUrl} />
      </Helmet>

      <MainApp />
    </PersistGate>
  );
}

export default App;
