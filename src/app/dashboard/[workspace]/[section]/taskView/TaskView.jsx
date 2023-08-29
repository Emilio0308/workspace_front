import ButtonCustom from "@/app/components/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Modal } from "@mui/material";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTaskToEdit } from "../../../../../redux/slices/user-slice";
import useFetch from "../../../../../utils/useFetch";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";

const TaskView = () => {
  const [open, setOpen] = useState(false);
  const { workspace } = useParams();
  const dispacth = useDispatch();
  const user = useSelector((store) => store.user);
  const { userId, currentWorkspace } = user.value;

  const url = `tasks/${userId}/workspace/${currentWorkspace.id || workspace}/`;
  const { data:tasks, error, fetching } = useFetch({ url });
  if (error) {
    return <div>ERROR</div>;
  }
  const handleClose = () => setOpen(!open);

  useEffect(() => {
    if (!open) dispacth(selectTaskToEdit(null));
  }, [open]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // const [Connected, setConnected] = useState(false);
  // const [tasks, setTasks] = useState([])
  // const [socket] = useState(
  //   new WebSocket(`ws://localhost:8000/ws/socket-server/${userId}`)
  // );

  // useEffect(() => {
  //   socket.onopen = () => {
  //     console.log("Connected to WebSocket server");
  //     setConnected(true);
  //   };

  //   socket.onclose = () => {
  //     console.log("Disconnected from WebSocket server");
  //   };

  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     if (data.event_type == 'tasks') {
  //       setTasks(data.tasks)
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   if (Connected) {
  //     const workspace_id = currentWorkspace.id;
  //     const event_type = "getTasks";

  //     socket.send(
  //       JSON.stringify({
  //         event_type,
  //         workspaceId: workspace_id,
  //       })
  //     );
  //   }
  // }, [Connected]);

  return (
    <section className="grid gap-10">
      <h5 className="m-5">Your Tasks:</h5>
      <div>FORMMMM</div>
      <section className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))]  gap-5">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            openModal={handleClose}
            refetch={() => fetching(url)}
          />
        ))}
      </section>
      <section>
        <div>
          <ButtonCustom
            icon={<AddCircleIcon style={{ fontSize: "35px" }} />}
            event={handleClose}
            message="Add task"
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <AddTask
                handleClose={handleClose}
                refetch={() => fetching(url)}
              />
            </Box>
          </Modal>
        </div>
      </section>
    </section>
  );
};
export default TaskView;
