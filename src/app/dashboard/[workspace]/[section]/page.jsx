"use client"
import { useRouter } from "next/navigation"; // Importa useRouter desde next/router

import TaskView from "./taskView/TaskView";
import MembersView from "./members/MembersView";
import TablesView from "./tables/TablesView";

export default function Section() {
  const router = useRouter();
  const routerQuery = router.query;
  const [currentSection, setCurrentSection] = useState(null)

  useEffect(() => {
    if(routerQuery){
      const { section } =  routerQuery
      setCurrentSection(section)
    }
  }, [routerQuery])
  

  const views = {
    tasks: <TaskView />,
    members: <MembersView />,
    tables: <TablesView />,
  };

  return <div className="overflow-x-auto">{views[currentSection]}</div>;
}
