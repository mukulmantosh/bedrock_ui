import WebSocketComponent from "./components/websocket-ai-model";
import ImagesComponent from "./components/images";
import Background from "./images/background.jpg";
import './styles/common.css';
import 'bulma/css/bulma.min.css';



function App() {

  return (
      <div className="background" style={{ backgroundImage: `url(${Background})` }}>
          <section className="hero">
              <div className="hero-body">
                  <p className="title text">AWS Bedrock with Go</p>
              </div>
          </section>

          <WebSocketComponent/>
          <ImagesComponent/>
      </div>
  )
}

export default App
