"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import NavBar from "../app/components/NavBar"
import { ThemeConfig } from "../themeConfig/theme.config";


export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeConfig>
        <NavBar />
        {children}
      </ThemeConfig>
    </Provider>
  );
}
