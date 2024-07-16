/* Shows the list of all supported AI models */

function AIModel({models}){
    return models.map(model => (
        <option key={model} value={model}>{model}</option>)
    )
}

export default AIModel