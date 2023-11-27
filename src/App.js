import { PersistGate } from "redux-persist/es/integration/react";
import "./App.css";
import MainApp from "./app/index";
import { persistor } from "./app/redux/store";
// const { isLoggedIn } = store.getState().persist;
// const data = store.getState().persist;

function App() {
  const isLoading = false;

  return (
    <PersistGate loading={isLoading} persistor={persistor}>
      <MainApp />
    </PersistGate>
  );
}

export default App;
