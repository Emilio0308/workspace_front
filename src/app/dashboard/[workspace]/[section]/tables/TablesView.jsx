"use client"
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonCustom from "../../../../components/Button";
import GraphTable from "./tablesComponenets/GraphTable";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const TablesView = () => {
  const { workspace } = useParams();
  const { value } = useSelector((store) => store.user);
  const [connect, setconnect] = useState(false);
  const [tables, setTables] = useState([]);

  const [socket] = useState(
    new WebSocket(
      `ws://localhost:8000/ws/socket-server/${value.userId}/${workspace}`
    )
  );

  useEffect(() => {
    socket.onopen = () => {
      console.log("conectado");
      setconnect(true);
    };
    socket.onclose = () => {
      console.log("desconectado");
      setconnect(false);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event_type == "tables") {
        setTables(data.tables);
      }
      if (data.event_type == "tablas_actualizadas") {
        setTables(data.list_tables);
      }
    };
  }, []);

  useEffect(() => {
    if (connect) {
      const socketEvent = {
        event_type: "getTables",
        workspaceId: workspace,
      };
      socket.send(JSON.stringify(socketEvent));
    }
  }, [connect]);

  const reFetchTables = () => {
    const eventInfo = {
      event_type: "updating_tables",
      workspaceId: workspace,
    };
    socket.send(JSON.stringify(eventInfo));
  };

  const addNewTable = () => {
    const newTable = {
      title: "titulo de tu nueva tabla",
      description: "descripcion de la tabla",
      data: [{ id: 1 }],
    };
    setTables([...tables, newTable]);
  };

  return (
    <div>
      <h2>Grahps</h2>
      <ButtonCustom message={"add table"} event={addNewTable} />
      <Box sx={{ display: "grid", gap: "2rem", margin: "2rem 0" }}>
        {tables.length ? (
          tables.map((table) => (
            <GraphTable
              key={table.id}
              table={table}
              reFetchTables={reFetchTables}
            />
          ))
        ) : (
          <LoadingSkeleton quantity={3} />
        )}
      </Box>
    </div>
  );
};
export default TablesView;
