import useWebSocket from "../hooks/useWebSocket";
import { GoDotFill } from "react-icons/go";


function AIComponent() {
    const {
        connectionStatus,
        selectedOption,
        textValue,
        setTextValue,
        sendMessage,
        renderOptions,
        renderContent,
        handleStreamChange,
        handleDropdownChange } = useWebSocket();

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