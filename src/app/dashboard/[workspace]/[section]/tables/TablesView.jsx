import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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

  console.log(tables);

  return (
    <div>
      <h2>Grahps</h2>
      {tables.map((table) => (
        <div>{table.title}</div>
      ))}
    </div>
  );
};
export default TablesView;
