import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { useMemo } from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "./containers/Dashboard/Dashboard";

function App() {
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark"
        }
      }),
    []
  );

  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Dashboard />
        </div>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
