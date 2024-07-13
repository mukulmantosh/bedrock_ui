import AIComponent from "./components/AIComponent";
import AILogoComponent from "./components/AILogoComponent";
import Background from "./images/background.jpg";
import './styles/common.css';
import 'bulma/css/bulma.css';



function App() {

  return (
      <div className="background" style={{ backgroundImage: `url(${Background})` }}>
          <section className="hero">
              <div className="hero-body">
                  <p className="title text">AWS Bedrock with Go</p>
              </div>
          </section>

          <AIComponent/>
          <AILogoComponent/>
      </div>
  )
}

export default App
