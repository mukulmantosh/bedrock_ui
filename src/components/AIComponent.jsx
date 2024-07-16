import useWebSocket from "../hooks/useWebSocket";
import AIResponse from "../components/AIResponse.jsx";
import ConnectionStatus from '../components/ConnectionStatus.jsx';
import StreamCheckbox from '../components/StreamCheckbox';
import AIModel from "../components/AIModel";
import SendMessage from "../components/SendMessage";
import TextArea from "../components/TextArea";

function AIComponent() {
    const {
        connectionStatus,
        selectedOption,
        textValue,
        setTextValue,
        message,
        isStreaming,
        availableModels,
        sendMessage,
        handleStreamChange,
        handleDropdownChange } = useWebSocket();

    return (
        <div>
            <div className="container">
                <div className="columns">
                    <div className="column is-6">
                        <div className="card">
                            <div className="card-content">
                                <div className="select is-info mb-4">
                                    <select value={selectedOption} onChange={handleDropdownChange}>
                                        <AIModel models={availableModels}/>
                                    </select>
                                </div>

                                <div className="columns">
                                    <div className="column">
                                        <StreamCheckbox handleStreamChange={handleStreamChange} />
                                    </div>
                                </div>
                                <TextArea textValue={textValue} setTextValue={setTextValue}/>
                                <div className="fixed-grid has-6-cols">
                                    <div className="grid">
                                        <div className="cell">
                                            <SendMessage message={sendMessage}/>
                                        </div>
                                        <div className="cell is-col-span-4"></div>
                                        <ConnectionStatus status={connectionStatus} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-8">
                        <div className="card">
                            <div className="card-content">
                                <AIResponse message={message} className="subtitle has-text-grey typing-text" streaming={isStreaming}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AIComponent;