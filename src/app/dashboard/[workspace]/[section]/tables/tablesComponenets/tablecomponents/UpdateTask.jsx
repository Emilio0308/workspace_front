import ButtonCustom from "@/app/components/Button";
import { workspaceApi, getAuthorization } from "@/utils/workspaceApi";
import { useSelector } from "react-redux";

const UpdateTask = ({ tableData, table, reFetchTables }) => {
  const { userId, currentWorkspace } = useSelector((store) => store.user.value);
  const { title, description, id } = table;

  const infoTable = {
    title,
    description,
    data: tableData,
  };

  const saveTableChange = () => {
    const url = `table/${currentWorkspace.id}/${userId}/${id}/`;
    workspaceApi
      .put(url, infoTable, { headers: getAuthorization() })
      .then((res) => {
        console.log(res.data);
        reFetchTables();
      })
      .catch((err) => console.log(err));
  };
  return (
    <ButtonCustom event={saveTableChange} message={"Save Changes"} sx={""} />
  );
};
export default UpdateTask;
