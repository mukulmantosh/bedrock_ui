
function sendMessage({message}) {
    return (
        <button className="button is-primary is-medium has-text-white"
            onClick={message}>
        Send Message
    </button>
    )
}

export default sendMessage;