import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// f8f8f8

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#141414",
    },
    primary: {
      main: "#013958",
      100: "#ccd7de",
      200: "#99b0bc",
      300: "#67889b",
      400: "#346179",
      500: "#013958",
      600: "#012e46",
      700: "#012235",
      800: "#001723",
      900: "#000b12",
    },
    warning: {
      main: '#c50808'
    },
    success:{
      main: '#02c0a0'
    }
    // {
    //     main: "#0d42b6",
    //     100: "#cfd9f0",
    //     200: "#9eb3e2",
    //     300: "#6e8ed3",
    //     400: "#3d68c5",
    //     500: "#0d42b6",
    //     600: "#0a3592",
    //     700: "#08286d",
    //     800: "#051a49",
    //     900: "#030d24",
    //   },
  },
});

export const ThemeConfig = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
