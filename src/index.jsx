import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-layouts/styles/material.css";
import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../node_modules/@syncfusion/ej2/material.css";
import "./index.css";
import AboutPage from "./pages/aboutPage";

import DashboardPage from "./pages/dashboard";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPiPage from "./pages/registerPiPage";
import SignUpPage from "./pages/signUpPage";

const App = () => {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/registerPi" element={<RegisterPiPage />} />

            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
};

createRoot(document.getElementById("root")).render(<App />);
