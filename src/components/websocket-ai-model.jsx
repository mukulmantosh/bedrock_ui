import {useEffect, useState} from 'react';
import { GoDotFill } from "react-icons/go";
import '../styles/common.css'
import { ReactTyped } from "react-typed";


function WebSocketComponent() {
    const [connectionStatus, setConnectionStatus] = useState({});
    const [Streaming, setStreaming] = useState(false);
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState(null)
    const [textValue, setTextValue] = useState('')

    useEffect(() => {
        let webSocketURL = 'ws://localhost:8080/ws/model?streaming=' + Streaming.toString()
        const websocket = new WebSocket(webSocketURL);
        setWs(websocket);

        websocket.onmessage = (event) => {
            if (Streaming) {
                setMessage(prevState => prevState + event.data + "\n") // Append streaming text
            }else{
                setMessage(event.data + "\n")
            }
        }
        websocket.onopen = () => {
            setConnectionStatus({
                "text": "Model Online",
                "label": "has-text-success"
            });
            console.log('WebSocket Connected!');
        }




        // cleanup
        return () => {
            websocket.close();
            setWs(null);
            setConnectionStatus({
                "text": "Model Offline",
                "label": "has-text-danger"
            });
        };

    }, [Streaming]);

    const sendMessage = () => {
        if (ws){
            // clear messages
            setMessage('')
            ws.send(textValue);
        }
    }

    const renderContent = () => {
        if(Streaming) {
            return (<p className="subtitle has-text-grey typing-text">{message}</p>)
        }else{
            return (<ReactTyped className="subtitle has-text-grey typing-text" strings={[message]} typeSpeed={10}  />)
        }
    }

    const handleStreamChange = (e) => {
        setStreaming(e.target.checked);
    }



    return (
        <div>
            <div className="container">
                <div className="columns">
                    <div className="column is-8">
                        <div className="card">
                            <div className="card-content">
                                <div className="select is-info mb-4">
                                    <select>
                                        <option>Amazon Titan Text G1 - Lite</option>
                                        <option>Titan Text G1 - Express</option>
                                        <option>Claude 3 Sonnet</option>
                                        <option>Claude 3 Haiku</option>
                                        <option>Llama3 8B</option>
                                        <option>Llama3 70B</option>
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

export default WebSocketComponent;