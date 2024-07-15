import { useState, useEffect } from 'react';
import {ReactTyped} from "react-typed";

const WEBSOCKET_URL = "ws://localhost:8080/ws/model";
const MODEL_ONLINE = {text: "Model Online", label: "has-text-success"};
const MODEL_OFFLINE = {text: "Model Offline", label: "has-text-danger"};
const AVAILABLE_MODELS = ["llama3", "anthropic"];

function useWebSocket() {
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

    const handleStreamChange = (e) => {
        setIsStreaming(e.target.checked);
    }

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    }


    return {
            connectionStatus,
            selectedOption,
            textValue,
            setTextValue,
            sendMessage,
            message,
            isStreaming,
            renderOptions,
            handleStreamChange,
            handleDropdownChange
    };
}

export default useWebSocket;
