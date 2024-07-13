import AnthropicLogo from '/images/Anthropic_logo.svg'
import LlamaLogo from '/images/llama.png'
import AI21Logo from '/images/ai21.png'
import MistralAiLogo from '/images/mistral_ai.png'

function AILogoComponent() {
    return (

        <div className="columns is-mobile mt-6">
            <div className="column"></div>
            <div className="column">
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img
                                src={AnthropicLogo}
                                alt="Placeholder image"
                            />
                        </figure>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by2">
                            <img
                                src={LlamaLogo}
                                alt="Placeholder image"
                            />
                        </figure>
                    </div>
                </div>
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by2">
                            <img
                                src={AI21Logo}
                                alt="Placeholder image"
                            />
                        </figure>
                    </div>
                </div>
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by2">
                            <img
                                src={MistralAiLogo}
                                alt="Placeholder image"
                            />
                        </figure>
                    </div>
                </div>
            </div>
            <div className="column"></div>
        </div>

    )
}

export default AILogoComponent