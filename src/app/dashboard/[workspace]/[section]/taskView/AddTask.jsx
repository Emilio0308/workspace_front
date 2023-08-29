import InputLogin from "@/app/components/InputLogin";
import { getAuthorization, workspaceApi } from "@/utils/workspaceApi";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonCustom from "../../../../components/Button";

const AddTask = ({ handleClose, refetch }) => {
  const { value } = useSelector((store) => store.user);
  const userId = value.userId;
  const workSpaceId = value.currentWorkspace.id;
  const taskToEdit = value.currentTaskToEdit;

  const [taskData, setTaskData] = useState({
    id: null,
    title: "",
    description: "",
    done: false,
  });

  useEffect(() => {
    if (taskToEdit) {
      const { id, title, description, done } = taskToEdit;
      setTaskData({ id, title, description, done });
    }
  }, [taskToEdit]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    let urlApi = `tasks/${userId}/workspace/${workSpaceId}/`;
    try {
      if (taskToEdit) {
        urlApi += `${taskData.id}/`;
        await workspaceApi.put(urlApi, taskData, {
          headers: getAuthorization(),
        });
      } else {
        await workspaceApi.post(urlApi, taskData, {
          headers: getAuthorization(),
        });
      }
      setTaskData({ id: null, title: "", description: "", done: false });
      handleClose();
      refetch();
    } catch (error) {
      console.log(err);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value, checked } = e.target;
    setTaskData({ ...taskData, [name]: value == "on" ? checked : value });
  };

  return (
    <Paper sx={{ padding: "10px 15px" }}>
      <Typography
        variant="h3"
        fontSize={"2rem"}
        sx={{ textAlign: "center", padding: "20px 5px" }}
      >
        {taskToEdit ? "Edit your Task" : "Create a task"}
      </Typography>
      <Box
        component={"form"}
        onSubmit={handleAddTask}
        margin={"10px 0px 20px 0px"}
        display={"grid"}
        gap={"1rem"}
        padding={"5px 24px"}
      >
        <InputLogin
          name="title"
          type="text"
          handleChangeInput={handleChangeInput}
          value={taskData.title}
        />
        <InputLogin
          name="description"
          type="text"
          handleChangeInput={handleChangeInput}
          value={taskData.description}
        />
        <FormControlLabel
          label="Done"
          control={
            <Checkbox
              name="done"
              checked={taskData.done}
              onChange={handleChangeInput}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
        />
        <ButtonCustom icon={<AddTaskIcon />} event={null} type="submit" />
      </Box>
    </Paper>
  );
};
export default AddTask;
