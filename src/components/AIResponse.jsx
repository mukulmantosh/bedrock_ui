import {ReactTyped} from "react-typed";

function AIResponse({streaming, message, className}) {
    const streamingOutput = <p className={className}>{message}</p>;
    const nonStreamingOutput = <ReactTyped className={className} strings={[message]} typeSpeed={10}/>;

    return (
        <div>
            {streaming ? streamingOutput : nonStreamingOutput}
        </div>
    );
}
export default AIResponse;