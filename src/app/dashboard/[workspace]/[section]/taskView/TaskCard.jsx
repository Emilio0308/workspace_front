import AssignmentIcon from "@mui/icons-material/Assignment";
import { Box, Paper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { formatDate } from "../../../../../utils/formatDate";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ButtonCustom from "@/app/components/Button";
import { useSelector, useDispatch } from "react-redux";
import { selectTaskToEdit } from "../../../../../redux/slices/user-slice";
import { workspaceApi, getAuthorization } from "@/utils/workspaceApi";
import "awesome-notifications/dist/style.css";
import AWN from "awesome-notifications";
let notifier = new AWN();

const TaskCard = ({ task, openModal, refetch }) => {
  const { value } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const currentTaskEdit = () => {
    dispatch(selectTaskToEdit(task));
    openModal();
  };
  const deleteTask = async () => {
    let onOk = async () => {
      const { userId, currentWorkspace } = value;
      await workspaceApi.delete(
        `tasks/${userId}/workspace/${currentWorkspace.id}/${task.id}/`,
        { headers: getAuthorization() }
      );
      refetch();
      notifier.info("You pressed delete");
    };
    let onCancel = () => {
      notifier.info("You pressed Cancel");
    };
    notifier.confirm("Are you sure?", onOk, onCancel, {
      labels: {
        confirm: "Dangerous action",
      },
    },  );
  };
  return (
    <Box sx={{ boxShadow: "5px 8px 5px 5px black", display: "grid" }}>
      <Paper className="rounded-lg p-5 grid gap-3 h-full">
        <Box display={"flex"} gap={"5px"}>
          <Typography
            variant="h4"
            fontSize={"1.2rem"}
            textTransform={"capitalize"}
            flex={"1"}
          >
            {task.title}
          </Typography>
          <AssignmentIcon />
        </Box>
        <Box display={"grid"} sx={{ width: "100%", minHeight: "150px" }}>
          <Typography>Description:</Typography>
          <Typography sx={{ paddingRight: "5px" }}>
            {task.description}
          </Typography>
        </Box>
        <Box display={"flex"} alignSelf={"end"}>
          <Typography flex={1}>Done</Typography>
          {task.done ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon color="warning" />
          )}
        </Box>
        <span
          className="self-end text-sm"
          title={`at ${formatDate(task.created)}`}
        >
          created by: {task.owner}
        </span>
      </Paper>
      <Paper sx={{ display: "flex", gap: "1rem", padding: "5px 8px" }}>
        <ButtonCustom
          icon={<ModeEditOutlineIcon style={{ fontSize: "35px" }} />}
          message="Edit Task"
          sx={{ backgroundColor: "#02c0a0" }}
          event={currentTaskEdit}
        />
        <ButtonCustom
          icon={<DeleteForeverIcon style={{ fontSize: "35px" }} />}
          message="Delete Task"
          sx={{ backgroundColor: "#c50808" }}
          event={deleteTask}
        />
      </Paper>
    </Box>
  );
};
export default TaskCard;
