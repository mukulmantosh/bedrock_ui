function TextArea({textValue, setTextValue}) {
    return (
        <textarea
        value={textValue}  onChange={(event) => setTextValue(event.target.value)}
        className="textarea is-focused">
        </textarea>
    )
}

export default TextArea;