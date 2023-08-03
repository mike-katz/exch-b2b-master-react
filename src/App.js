import { PersistGate } from "redux-persist/es/integration/react";
import "./App.css";
import MainApp from "./app/index";
import { persistor, store } from "./app/redux/store";
import { Helmet } from "react-helmet";
const color = store.getState().persist.themeColor;
// const { isLoggedIn } = store.getState().persist;
// const data = store.getState().persist;
// console.log({ data });

function App() {
  const isLoading = false;
  // console.log({ isLoggedIn });
  return (
    <PersistGate loading={isLoading} persistor={persistor}>
      <Helmet>
        <link
          rel="icon"
          type="image/png"
          href={color?.faviconUrl}
          sizes="16x16"
        />
      </Helmet>

      <MainApp />
    </PersistGate>
  );
}

export default App;
