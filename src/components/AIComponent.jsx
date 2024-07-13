import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import "../styles/common.css";
import { ReactTyped } from "react-typed";

const WEBSOCKET_URL = "ws://localhost:8080/ws/model";
const MODEL_ONLINE = {text: "Model Online", label: "has-text-success"};
const MODEL_OFFLINE = {text: "Model Offline", label: "has-text-danger"};
const AVAILABLE_MODELS = ["llama3", "anthropic"];

function AIComponent() {
    const [connectionStatus, setConnectionStatus] = useState(MODEL_OFFLINE);
    const [isStreaming, setIsStreaming] = useState(false);
    const [message, setMessage] = useState("");
    const [webSocket, setWebSocket] = useState(null);
    const [textValue, setTextValue] = useState("");
    const [selectedOption, setSelectedOption] = useState(AVAILABLE_MODELS[0]);

    const initializeWebSocketHandlers = (webSocket) => {
        webSocket.onmessage = (event) => {
            if (isStreaming) {
                setMessage((prevState) => prevState + event.data + "\n"); // Append streaming text
            } else {
                setMessage(event.data + "\n");
            }
        };

        webSocket.onopen = () => {
            setConnectionStatus(MODEL_ONLINE);
            console.log("WebSocket Connected!");
        };

    };

    useEffect(() => {
        const webSocketURL =
            `${WEBSOCKET_URL}?streaming=${isStreaming}&model=${selectedOption}`;
        const webSocketInstance = new WebSocket(webSocketURL);
        setWebSocket(webSocketInstance);
        initializeWebSocketHandlers(webSocketInstance);


        // cleanup
        return () => {
            webSocketInstance.close();
            setWebSocket(null);
            setConnectionStatus(MODEL_OFFLINE);

        };
    }, [isStreaming, selectedOption]);

    const sendMessage = () => {
        if (webSocket){
            // clear messages
            clearMessages()
            webSocket.send(textValue);
        }
    }

    const clearMessages = () => {
        setMessage("");
    }

    const renderOptions = () => (
        AVAILABLE_MODELS.map(model => (<option key={model} value={model}>{model}</option>))
    );


    const renderContent = () => {
        if(isStreaming) {
            return (<p className="subtitle has-text-grey typing-text">{message}</p>)
        }else{
            return (<ReactTyped className="subtitle has-text-grey typing-text" strings={[message]} typeSpeed={10}  />)
        }
    }

    const handleStreamChange = (e) => {
        setIsStreaming(e.target.checked);
    }

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    }




    return (
        <div>
            <div className="container">
                <div className="columns">
                    <div className="column is-8">
                        <div className="card">
                            <div className="card-content">
                                <div className="select is-info mb-4">
                                    <select value={selectedOption} onChange={handleDropdownChange}>
                                        {renderOptions()}
                                    </select>
                                </div>

                                <div className="columns">
                                    <div className="column is-three-quarters">
                                    </div>
                                    <div className="column is-one-quarter is-flex is-justify-content-flex-end">
                                        <div><input type="checkbox" onChange={handleStreamChange}/><span className="ml-2">Stream</span></div>
                                    </div>
                                </div>


                                <textarea value={textValue}
                                          onChange={(event) => setTextValue(event.target.value)}
                                          className="textarea is-focused">
                                </textarea>

                                <div className="fixed-grid has-6-cols">
                                    <div className="grid">
                                        <div className="cell">
                                            <button className="button is-primary is-medium mt-4 has-text-white"
                                                    onClick={sendMessage}>
                                                Send Message
                                            </button>
                                        </div>
                                        <div className="cell is-col-span-4"></div>
                                        <div className="cell mt-4">
                                            <GoDotFill className={connectionStatus?.label}/>
                                            <span className={connectionStatus?.label}> {connectionStatus?.text}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-8">
                        <div className="card">
                            <div className="card-content">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AIComponent;