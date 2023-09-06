'use client'
import { Box } from "@mui/material";
import InputLogin from "../../components/InputLogin";
import { useState, useEffect } from "react";

const UserForm = ({ userInfo }) => {
  const [newUserData, setNewUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    is_active: null,
  });

  useEffect(() => {
    if (userInfo) {
      const { username, first_name, last_name, email, password, is_active } =
        userInfo;
      setNewUserData({
        username,
        first_name,
        last_name,
        email,
        password,
        is_active,
      });
    }
  }, [userInfo]);
  const handleChangeInput = () => {};
  return (
    <Box sx={{ display: "grid", gap: "1rem" }}>
      <InputLogin
        name="username"
        type="text"
        handleChangeInput={handleChangeInput}
        value={newUserData.username}
      />
      <InputLogin
        name="first_name"
        type="text"
        handleChangeInput={handleChangeInput}
        value={newUserData.first_name}
      />
      <InputLogin
        name="last_name"
        type="text"
        handleChangeInput={handleChangeInput}
        value={newUserData.last_name}
      />
      <InputLogin
        name="email"
        type="email"
        handleChangeInput={handleChangeInput}
        value={newUserData.email}
      />
    </Box>
  );
};
export default UserForm;
