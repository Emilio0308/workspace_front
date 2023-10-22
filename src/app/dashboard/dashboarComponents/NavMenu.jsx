"use client";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "awesome-notifications/dist/style.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allWorkspaces } from "../../../redux/slices/user-slice";
import { getAuthorization, workspaceApi } from "../../../utils/workspaceApi";
import MenuLink from "./MenuLink";

const NavMenu = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [showMenu, setShowMenu] = useState(true);
  const { userName, userId } = useSelector((store) => store.user.value);
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const [notifier, setnotifier] = useState();

  useEffect(() => {
    const importAWN = async () => {
      const AWN = await (await import("awesome-notifications")).default;
      const not = new AWN();
      setnotifier(not);
    };

    importAWN();
  }, []);

  useEffect(() => {
    if (notifier) {
      const options = {
        durations: {
          alert: 2000,
        },
      };
      notifier.asyncBlock(
        workspaceApi.get(`workspace/${userId}/`, {
          headers: getAuthorization(),
        }),
        (res) => {
          null;
          setWorkspaces(res.data);
          dispatch(allWorkspaces(res.data));
        },
        (err) => {
          notifier.alert("session expired, please log in again", options);
          setTimeout(() => router.push("/login"), 500);
        }
      );
    }
  }, [notifier]);

  return (
    <Box
      className={`fixed ${
        showMenu ? "translate-x-0" : "translate-x-[-100%]"
      }  sm:sticky z-40 sm:translate-x-0 w-full max-w-xs sm:min-w-[350px] min-h-screen`}
      sx={{ backgroundColor: theme.palette.primary[700], p: "0px 5px" }}
    >
      <IconButton
        aria-label="show-menu"
        onClick={() => setShowMenu(!showMenu)}
        className="sm:invisible absolute right-0 top-0 !important"
        sx={{
          position: "absolute",
          right: "-39px",
          top: "0",
          backgroundColor: theme.palette.primary[700],
          borderRadius: "0 50% 50% 0",
          "&:hover": {
            background: `linear-gradient(to right ,${theme.palette.primary[700]}, ${theme.palette.primary[600]}) `,
          },
        }}
      >
        {showMenu ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </IconButton>
      <div>
        <Stack
          direction="column"
          width="100%"
          justifyContent="center"
          alignItems="center"
          p="25px 0"
          spacing={2}
        >
          <Avatar
            alt='user picture'
            src="/user/avatarUser.jpg"
            sx={{ width: 56, height: 56 }}
          />
          <Typography
            variant="h3"
            sx={{ textTransform: "capitalize", fontSize: "1rem" }}
          >
            {userName}
          </Typography>
        </Stack>
        <ul className=" grid gap-5">
          {workspaces.map((workspace) => (
            <li key={workspace.id}>
              <MenuLink workspace={workspace} />
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );
};
export default NavMenu;
