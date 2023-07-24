import { PersistGate } from "redux-persist/es/integration/react";
import "./App.css";
import MainApp from "./app/index";
import { persistor, store } from "./app/redux/store";
import { Helmet } from "react-helmet";
const color = store.getState().persist.themeColor;

function App() {
  const isLoading = false;
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
      <div className=" bg-[#eeeeee] h-[100vh]">
        <MainApp />
      </div>
    </PersistGate>
  );
}

export default App;
