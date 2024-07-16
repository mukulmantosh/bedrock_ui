
function sendMessage({message}) {
    return (
        <button className="button is-primary is-medium mt-4 has-text-white"
            onClick={message}>
        Send Message
    </button>
    )
}

export default sendMessage;