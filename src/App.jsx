import React, { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import store, { persistor } from "./store/store";
import AppRoutes from "./routes/AppRoutes";
import SplashScreen from "./components/ui/SplashScreen";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {showSplash ? (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        ) : (
          <AppRoutes />
        )}
      </PersistGate>
    </Provider>
  );
};

export default App;
