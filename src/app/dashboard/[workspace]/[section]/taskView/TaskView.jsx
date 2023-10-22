"use client"
import ButtonCustom from "@/app/components/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Modal } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTaskToEdit } from "../../../../../redux/slices/user-slice";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const TaskView = () => {
  const dispacth = useDispatch();
  const { workspace } = useParams();
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const { userId, currentWorkspace } = user.value;

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

  const [Connected, setConnected] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [socket] = useState(
    new WebSocket(`ws://localhost:8000/ws/socket-server/${userId}/${workspace}`)
  );
  useEffect(() => {
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      setConnected(true);
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event_type == "tasks" || data.event_type == "updatedTasks") {
        setTasks(data.tasks);
      }
    };
  }, []);

  useEffect(() => {
    if (Connected && workspace) {
      const workspace_id = workspace;
      const event_type = "getTasks";

      socket.send(
        JSON.stringify({
          event_type,
          workspaceId: workspace_id,
        })
      );
    }
  }, [Connected]);

  const refetchSocket = () => {
    const event_type = "updated_tasks";
    const workspace_id = currentWorkspace.id;
    socket.send(
      JSON.stringify({
        event_type,
        workspaceId: workspace_id,
      })
    );
  };

  return (
    <section className="grid gap-10">
      <h5 className="m-5">Your Tasks:</h5>
      <div>FORMMMM</div>
      <section className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))]  gap-5">
        {tasks.length ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              openModal={handleClose}
              // refetch={() => fetching(url)}
              refetch={refetchSocket}
            />
          ))
        ) : (
          <LoadingSkeleton quantity={3} />
        )}
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
                // refetch={() => fetching(url)}
                refetch={refetchSocket}
              />
            </Box>
          </Modal>
        </div>
      </section>
    </section>
  );
};
export default TaskView;
