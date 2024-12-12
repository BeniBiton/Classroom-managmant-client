import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import AppRouter from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import { ThemeProviderWithContext } from "./themes/ThemeContext";
import Layout from "./pages/components/Layout/Layout";

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProviderWithContext>
      <BrowserRouter>
        <Layout>
          <AppRouter />
        </Layout>
      </BrowserRouter>
    </ThemeProviderWithContext>
  </Provider>
);

export default App;
