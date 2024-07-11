import WebSocketComponent from "./components/websocket-ai-model.jsx";
import 'bulma/css/bulma.min.css'


function App() {

  return (
      <div>
          <section className="hero">
              <div className="hero-body">
                  <p className="title">AWS Bedrock with Go</p>
                  <p className="subtitle">Playing with foundational AI models</p>
              </div>
          </section>

          <WebSocketComponent/>
      </div>
  )
}

export default App
