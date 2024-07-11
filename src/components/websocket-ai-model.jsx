import {useEffect, useState} from 'react';
import { GoDotFill } from "react-icons/go";
import '../styles/common.css'
import { ReactTyped } from "react-typed";


function WebSocketComponent() {
    const [connectionStatus, setConnectionStatus] = useState({});
    const [message, setMessage] = useState('');
    const [ws, setWs] = useState(null)
    const [textValue, setTextValue] = useState('')

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8080/ws/model');
        setWs(websocket);

        websocket.onmessage = (event) => {
            setMessage(prevState => prevState + event.data + "\n") // Append streaming text
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

    }, []);

    const sendMessage = () => {
        if (ws){
            // clear messages
            setMessage('')
            ws.send(textValue);
        }
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
                                <ReactTyped className="subtitle has-text-grey typing-text" strings={[message]} typeSpeed={10}  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default WebSocketComponent;