import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Scans from "./pages/Scans";
import Bench from "./pages/Bench";
import Vulns from "./pages/Vulns";
import Fixer from "./pages/Fixer";
import Settings from "./pages/Settings";
import Scan from "./pages/Scan";

const theme1 = createTheme({
  typography: {
    h1: {
      fontFamily: "AirbnbCerealMedium",
    },
    h2: {
      fontFamily: "AirbnbCerealMedium",
    },
    h3: {
      fontFamily: "AirbnbCerealMedium",
    },
    h4: {
      fontFamily: "AirbnbCerealMedium",
    },
    h5: {
      fontFamily: "AirbnbCerealMedium",
    },
    h6: {
      fontFamily: "AirbnbCerealBook",
    },
    body1: {
      fontFamily: "AirbnbCerealBook",
    },
    body2: {
      fontFamily: "AirbnbCerealBook",
    },
    p: {
      fontFamily: "AirbnbCerealBook",
    },
    overline: {
      fontFamily: "AirbnbCerealMedium",
    },
    button: { fontFamily: "AirbnbCerealBook" },
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: "#0066ff",
    },
    secondary: {
      main: "#B2BEB5",
    },
  },
});

let theme = responsiveFontSizes(theme1);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {/* 
              <Route exact path="/" component={Landing} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/" element={<Home />} />
            <Route path="/scans" element={<Scans />} />
            <Route path="/scan/:id" element={<Scan />} />
            <Route path="/bench" element={<Bench />} />
            <Route path="/vulns" element={<Vulns />} />
            <Route path="/fixer" element={<Fixer />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
