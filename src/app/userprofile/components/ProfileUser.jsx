import useFetch from "@/utils/useFetch";
import { Avatar, Box } from "@mui/material";
import UserForm from "./UserForm";
import { logout } from "../../../redux/slices/user-slice";
import { useDispatch } from "react-redux";

const ProfileUser = ({ user }) => {
  const { data, error, fetching } = useFetch({ url: `users/${user.userId}/` });
  const dispatch = useDispatch();

  if (error) {
    dispatch(logout());
    return <div>error</div>;
  }

  return (
    <Box sx={{ display: "flex", gap: "2rem" }}>
      <Box>
        <Avatar
          alt={user.userName}
          title={user.userName}
          src="/user/avatarUser.jpg"
          sx={{ width: 150, height: 150 }}
        />
      </Box>
      {data && <UserForm userInfo={data} />}
    </Box>
  );
};
export default ProfileUser;
