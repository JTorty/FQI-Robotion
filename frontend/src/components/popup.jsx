import './style/popup.css';
import Stack from '@mui/material/Stack';
import compassImg from "../assets/icons/compass.png";
import batteryImg from "../assets/icons/battery-full.png";

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
            style={{ display: props.isVisible ? 'flex' : 'none', borderColor: accent }}>
            <div className="model" style={{ backgroundColor: accent }}><span>{props.model}</span></div>
            <Stack className="popup_body" direction="column" spacing="1vw">
                <div className="status popup_element">
                    <div className="icon_status"></div>
                    <span>operative</span>
                </div>
                <div className="position popup_element">
                    <img className="icon_position" src={compassImg} alt="compass icon"></img>
                    <div className="position_coordinates">
                        <span>41° 24' 17.4" N</span>
                        <span>2° 10' 26.4" E</span>
                    </div>
                </div>
                <div className="battery popup_element">
                    <img className="icon_battery" src={batteryImg} alt="battery icon"></img>
                    <span>100%</span>
                </div>
            </Stack>

        </div>
    );
}

export default Popup;