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
            const formatted = event.data.replace(/\s+/g, ' ').trim();
            setMessage(prevState => prevState + formatted + "\n") // Append streaming text
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
                         <textarea value={textValue}
                                   onChange={(event) => setTextValue(event.target.value)}
                                   className="textarea is-focused">
                         </textarea>
                        <div className="fixed-grid has-6-cols">
                            <div className="grid">
                                <div className="cell">
                                    <button className="button is-primary mt-4" onClick={sendMessage}>
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
                        <div className="column is-three-quarters is-left">


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