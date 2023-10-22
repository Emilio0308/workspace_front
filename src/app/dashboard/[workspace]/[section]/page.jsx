"use client";
import { useParams } from "next/navigation"; // Importa useRouter desde next/router

import TaskView from "./taskView/TaskView";
import MembersView from "./members/MembersView";
import TablesView from "./tables/TablesView";
import { useEffect, useState } from "react";

export default function Section() {
  const [currentSection, setCurrentSection] = useState("members");
  const routerQuery = useParams();

  useEffect(() => {
    if (routerQuery) {
      const { section } = routerQuery;
      setCurrentSection(section);
    }
  }, [routerQuery]);

  const views = {
    tasks: <TaskView />,
    members: <MembersView />,
    tables: <TablesView />,
  };

  return <div className="overflow-x-auto">{views[currentSection]}</div>;
}
