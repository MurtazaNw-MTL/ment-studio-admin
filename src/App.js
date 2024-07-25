import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import Router from "./routes/Router";
import "./styles/global.css";
import "./styles/tooltip.css";
import "./styles/users.css";
import "./styles/product.css";
import "react-image-gallery/styles/css/image-gallery.css";

import "react-toastify/dist/ReactToastify.css";

import { baselightTheme } from "./theme/DefaultColors";
import { Provider } from "react-redux";
import { store } from "../src/Redux/Store";
import MetamaskLogin from "./components/metamask/metamasklogin";
import { ToastContainer } from "react-toastify";
// dfd
function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* <MetamaskLogin /> */}
        <CssBaseline />
        {routing}
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
