import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import AppRouter from "./routes/Router";
import Layout from "./pages/components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { ThemeProviderWithContext } from "./themes/ThemeContext";
import ClassFetcher from "./pages/components/classFatcher/classFetcher";

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProviderWithContext>
      <BrowserRouter>
        <ClassFetcher>
          <Layout>
            <AppRouter />
          </Layout>
        </ClassFetcher>
      </BrowserRouter>
    </ThemeProviderWithContext>
  </Provider>
);

export default App;
