import useWebSocket from "../hooks/useWebSocket";
import AIResponse from "./AIResponse.jsx";
import ConnectionStatusComponent from '../components/ConnectionStatusComponent';
import StreamCheckbox from '../components/StreamCheckbox';

function AIComponent() {
    const {
        connectionStatus,
        selectedOption,
        textValue,
        setTextValue,
        message,
        isStreaming,
        sendMessage,
        renderOptions,
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
                                        {renderOptions()}
                                    </select>
                                </div>

                                <div className="columns">
                                    <div className="column">
                                        <StreamCheckbox handleStreamChange={handleStreamChange} />
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
                                        <ConnectionStatusComponent connectionStatus={connectionStatus} />
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