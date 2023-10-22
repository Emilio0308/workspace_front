import { useRouter } from 'next/router'; // Importa useRouter desde next/router

import TaskView from "./taskView/TaskView";
import MembersView from "./members/MembersView";
import TablesView from "./tables/TablesView";

const Page = () => {
  const router = useRouter();
  const { section } = router.query;

  const views = {
    tasks: <TaskView />,
    members: <MembersView />,
    tables: <TablesView />,
  };

  return (
    <div className="overflow-x-auto">
      {views[section]}
    </div>
  );
};

export default Page;
