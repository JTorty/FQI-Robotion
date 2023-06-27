import './style/popup.css';

function Popup(props) {
    let accent = "#fff";

    if (props.color === "white") {
        accent = "#e8e8e8";
    } else if (props.color === "black") {
        accent = "#1f1f1f";
    } else if (props.color === "blue") {
        accent = "#c9dff2";
    } else if (props.color === "red") {
        accent = "#801e1e";
    } else if (props.color === "yellow") {
        accent = "#fef601";
    } else if (props.color === "pink") {
        accent = "#f2c9f2";
    } else if (props.color === "turquoise") {
        accent = "#168978";
    } else if (props.color === "orange") {
        accent = "#c86b00";
    } else if (props.color === "green") {
        accent = "#c8f0c6";
    } else if (props.color === "brown") {
        accent = "#6d592e";
    }

    return (
        <div className={`popup popup_${props.position}`}
             style={{display: props.isVisible ? 'flex' : 'none', borderColor: accent}}>
            <div className="model" style={{backgroundColor: accent}}><span>{props.model}</span></div>
            <div className="popup_body"></div>
        </div>
    );
}

export default Popup;