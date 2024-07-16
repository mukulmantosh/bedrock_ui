import { useState, useEffect } from 'react';

const WEBSOCKET_URL = "ws://localhost:8080/ws/model";
const MODEL_ONLINE = {text: "Model Online", label: "has-text-success"};
const MODEL_OFFLINE = {text: "Model Offline", label: "has-text-danger"};
const availableModels = ["llama3", "anthropic"];

function useWebSocket() {
    const [connectionStatus, setConnectionStatus] = useState(MODEL_OFFLINE);
    const [isStreaming, setIsStreaming] = useState(false);
    const [message, setMessage] = useState("");
    const [webSocket, setWebSocket] = useState(null);
    const [textValue, setTextValue] = useState(""); // textarea
    const [selectedOption, setSelectedOption] = useState(availableModels[0]);

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
            console.log("WebSocket Connected! | Model ->" + selectedOption);
        };

    };

    useEffect(() => {
        const webSocketURL = `${WEBSOCKET_URL}?streaming=${isStreaming}&model=${selectedOption}`;
        const webSocketInstance = new WebSocket(webSocketURL);
        setWebSocket(webSocketInstance);
        initializeWebSocketHandlers(webSocketInstance);


        // cleanup
        return () => {
            webSocketInstance.close();
            setWebSocket(null);
            setConnectionStatus(MODEL_OFFLINE);
            setMessage("");

        };
    }, [selectedOption, isStreaming]);

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

    const handleStreamChange = (e) => {
        setMessage('')
        setIsStreaming(e.target.checked);
    }

    const handleDropdownChange = (event) => {
        console.log(event.target.value);
        setSelectedOption(event.target.value);
    }


    return {
            connectionStatus,
            selectedOption,
            textValue,
            setTextValue,
            message,
            isStreaming,
            availableModels,
            sendMessage,
            handleStreamChange,
            handleDropdownChange
    };
}

export default useWebSocket;
