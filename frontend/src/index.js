import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./globals.css";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="954731036862-j96mm89utakkk4dri0s2ehm071ffgloh.apps.googleusercontent.com">
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChakraProvider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
