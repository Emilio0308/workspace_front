import AWN from "awesome-notifications";
import "awesome-notifications/dist/style.css";

function TerminalComponent() {
    

    const [notifier, setnotifier] = useState(new AWN())

    console.log(notifier)
    
    return <>{notifier}</>
}

export default TerminalComponent