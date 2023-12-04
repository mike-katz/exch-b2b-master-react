import { PersistGate } from "redux-persist/es/integration/react";
import "./App.css";
import MainApp from "./app/index";
import { persistor } from "./app/redux/store";
import { BrowserRouter as Router } from "react-router-dom";
// const { isLoggedIn } = store.getState().persist;
// const data = store.getState().persist;

function App() {
  const isLoading = false;

  return (
    <PersistGate loading={isLoading} persistor={persistor}>
      <Router>
        <MainApp />
      </Router>
    </PersistGate>
  );
}

export default App;
