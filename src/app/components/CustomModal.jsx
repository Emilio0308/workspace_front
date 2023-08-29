"use client";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import AddTask from '../dashboard/[workspace]/[section]/taskView/AddTask';
import ButtonCustom from './Button';

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

const CustomModal = ({ icon , content, fetching }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(!open);

  return (
    <div>
      <ButtonCustom icon={icon} event={handleClose} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddTask handleClose= {handleClose} />
        </Box>
      </Modal>
    </div>
  );
};
export default CustomModal;
