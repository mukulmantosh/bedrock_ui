import AIComponent from "./components/AIComponent";
import AILogoComponent from "./components/AILogoComponent";
import styles from './styles/modules/BackgroundImage.module.css';
import 'bulma/css/bulma.css';



function App() {

  return (
      <div className={styles.backgroundImage}>
          <section className="hero">
              <div className="hero-body">
                  <p className="title">AWS Bedrock with Go</p>
              </div>
          </section>

          <AIComponent/>
          <AILogoComponent/>
      </div>
  )
}

export default App
