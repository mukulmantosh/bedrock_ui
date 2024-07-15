import { GoDotFill } from "react-icons/go";

const ConnectionStatusComponent = ({ connectionStatus }) => (
    <div className="mt-4">
        <GoDotFill className={connectionStatus?.label}/>
        <span className={connectionStatus?.label}> {connectionStatus?.text}</span>
    </div>
);

export default ConnectionStatusComponent;