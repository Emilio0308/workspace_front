"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavList from "./NavList";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function NavBar() {
  const { value } = useSelector((store) => store.user);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", zIndex: "100" }}>
      <AppBar position="static" sx={{ background: "black" }}>
        <Toolbar>
          <NavList />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isClient && (
            <Button color="inherit">
              {value.isAuth ? (
                <Link href="/userprofile">Profile</Link>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
