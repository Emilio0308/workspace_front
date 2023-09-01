import EqualizerIcon from "@mui/icons-material/Equalizer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import GroupIcon from "@mui/icons-material/Group";
import TaskIcon from "@mui/icons-material/Task";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addCurrentWorkspace } from "../../../redux/slices/user-slice";
import { formatDate } from "../../../utils/formatDate";

const ItemOfList = ({ icon, title, secondary, href, workspace }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleSelectCurrentWorkspace = (workspace) => {
    dispatch(addCurrentWorkspace(workspace));
  };
  return (
    <ListItem
      onClick={() => handleSelectCurrentWorkspace(workspace)}
      sx={{
        "&:hover": {
          background: theme.palette.primary[400],
        },
        borderRadius: "10px",
      }}
    >
      <Link href={href} className="flex w-full items-center justify-center">
        <ListItemAvatar>
          <Avatar>{icon}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={title} secondary={secondary} />
      </Link>
    </ListItem>
  );
};

const MenuLink = ({ workspace }) => {
  const theme = useTheme();
  return (
    <Accordion sx={{ backgroundColor: theme.palette.primary[600] }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <FolderIcon />
        <Typography sx={{ pl: "20px" }}>{workspace.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          <ItemOfList
            icon={<TaskIcon />}
            title="Tasks"
            secondary={formatDate(Date.now())}
            workspace={workspace}
            href={`/dashboard/${workspace.id}/tasks`}
          />
          <ItemOfList
            icon={<EqualizerIcon />}
            title="Tables"
            secondary={formatDate(Date.now())}
            workspace={workspace}
            href={`/dashboard/${workspace.id}/tables/`}
          />
          <ItemOfList
            icon={<GroupIcon />}
            title="Members"
            secondary={formatDate(Date.now())}
            workspace={workspace}
            href={`/dashboard/${workspace.id}/members/`}
          />
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
export default MenuLink;
