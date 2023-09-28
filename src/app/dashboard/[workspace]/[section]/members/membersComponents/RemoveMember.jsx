import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthorization,
  workspaceApi,
} from "../../../../../../utils/workspaceApi";
import { addCurrentWorkspace } from "../../../../../../redux/slices/user-slice";

const RemoveMember = ({ info }) => {
  const user = useSelector((store) => store.user.value);
  const dispatch = useDispatch()

  const { currentWorkspace, userId } = user;

  const updateWorkSpace = async (newWorkSpce) => {
    try {
      const data = await workspaceApi.put(
        `workspace/${userId}/${currentWorkspace.id}/`,
        newWorkSpce,
        { headers: getAuthorization() }
      );
      dispatch(addCurrentWorkspace())

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveMember = () => {
    const newMembers = currentWorkspace.menbers.reduce((acc, menber) => {
      if (menber.id != info.id) acc.push(menber.id);
      return acc;
    }, []);
    const newWorkSpce = { name: currentWorkspace.name, menbers: newMembers };
    updateWorkSpace(newWorkSpce);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyItems: "center",
        width: "100%",
        justifyContent: "center",
      }}
      onClick={handleRemoveMember}
    >
      <PersonRemoveIcon />
    </Box>
  );
};
export default RemoveMember;
