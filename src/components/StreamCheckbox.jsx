const StreamCheckbox = ({ handleStreamChange }) => (
    <div>
        <input type="checkbox" onChange={handleStreamChange} />
        <span className="ml-2">Stream</span>
    </div>
);

export default StreamCheckbox;