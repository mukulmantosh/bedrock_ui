import { GoDotFill } from "react-icons/go";

const ConnectionStatus = ({ status }) => (
    <div className="mt-4">
        <GoDotFill className={status?.label}/>
        <span className={status?.label}> {status?.text}</span>
    </div>
);

export default ConnectionStatus;