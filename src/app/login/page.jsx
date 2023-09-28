"use client";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { workspaceApi } from "../../utils/workspaceApi";
import InputLogin from "../components/InputLogin";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/user-slice";

const Login = () => {
  const router = useRouter();
  const user = useSelector((store) => store.user.value);
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    workspaceApi
      .post("login/", loginData)
      .then((res) => {
        dispatch(login(res.data));
        router.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <Grid
      sx={{
        height: "100%",
        width: '100%',
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        padding: "80px 12px",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{ padding: "1.5rem 1rem", borderRadius: "1rem", width: "100%" }}
        >
          <Typography
            variant="h3"
            fontSize={"2rem"}
            margin={"10px 0px 20px 0px"}
          >
            Iniciar Session
          </Typography>
          <Grid
            component={"form"}
            onSubmit={handleLogin}
            className="grid gap-5"
          >
            <InputLogin
              handleChangeInput={handleChangeInput}
              name={"username"}
              type={"text"}
              value={loginData.username}
            />
            <InputLogin
              handleChangeInput={handleChangeInput}
              name={"email"}
              type={"text"}
              value={loginData.email}
            />
            <InputLogin
              handleChangeInput={handleChangeInput}
              name={"password"}
              type={"password"}
              value={loginData.password}
            />
            <Button type="submit" variant="contained" sx={{ padding: "10px" }}>
              Login
            </Button>
          </Grid>
        </Paper>
      </Container>
    </Grid>
  );
};
export default Login;
