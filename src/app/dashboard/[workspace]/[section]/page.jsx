"use client";
import { useParams } from "next/navigation";
import TaskView from "./taskView/TaskView";
import MembersView from "./members/MembersView";
import TablesView from "./tables/TablesView";

const page = () => {
  const { section } = useParams();
  const views = {
    tasks: <TaskView />,
    members: <MembersView />,
    tables: <TablesView />,
  };
  return (
    <div className="overflow-x-auto">
      <h4>{section}</h4>
      {views[section]}
    </div>
  );
};
export default page;
