import './style/popup.css';
import Stack from '@mui/material/Stack';
import compassImg from "../assets/icons/compass.png";
import batteryImg from "../assets/icons/battery-full.png";

function Popup(props) {
    let accent = "#e8e8e8";
    let contrast = "#1F344C";

    if (props.color === "black") {
        accent = "#1f1f1f";
        contrast = "#e8e8e8";
    } else if (props.color === "blue") {
        accent = "#c9dff2";
        contrast = "#1F344C";
    } else if (props.color === "red") {
        accent = "#801e1e";
        contrast = "#e8e8e8";
    } else if (props.color === "yellow") {
        accent = "#fef601";
        contrast = "#1F344C";
    } else if (props.color === "pink") {
        accent = "#f2c9f2";
        contrast = "#1F344C";
    } else if (props.color === "turquoise") {
        accent = "#168978";
        contrast = "#e8e8e8";
    } else if (props.color === "orange") {
        accent = "#c86b00";
        contrast = "#1F344C";
    } else if (props.color === "green") {
        accent = "#c8f0c6";
        contrast = "#1F344C";
    } else if (props.color === "brown") {
        accent = "#6d592e";
        contrast = "#e8e8e8";
    }

    const handleStatus = () => {
        const status = 'operative'; //da modificare prendendo i dati da backend

        if (status === 'operative') {
            return '#31BC00';
        } else if (status === 'idle') {
            return '#0075CA';
        } else if (status === 'offline') {
            return '#7E7E7E';
        }
    };

    return (
        <div style={{display: props.isVisible ? 'flex' : 'none'}}>
        <div className={`popup popup-${props.position}`}
            style={{ borderColor: accent }}>
            <div className="model" style={{ backgroundColor: accent }}>
                <span style={{ color: contrast }}>{props.model}</span>
            </div>
            <Stack className="popup-body" direction="column" spacing="0.45vw">
                <div className="position popup-element">
                    <div className="icon-position popup-element-icon"
                        style={{ backgroundImage: `url(${compassImg})` }}></div>
                    <div className="position-coordinates popup-element-text">
                        <span>41° 24' 17.4" N</span> {/*prendere dati da backend*/}
                        <span>2° 10' 26.4" E</span> {/*prendere dati da backend*/}
                    </div>
                </div>
                <div className="status popup-element">
                    <div className="popup-element-icon">
                        <div className="icon-status" style={{ backgroundColor: handleStatus() }}></div>
                    </div>
                    <div className="popup-element-text">
                        <span>operative</span> {/*prendere dati da backend*/}
                    </div>
                </div>
                <div className="battery popup-element">
                    <div className="icon-battery popup-element-icon"
                        style={{ backgroundImage: `url(${batteryImg})` }}></div>
                    <div className="popup-element-text">
                        <span>100%</span> {/*prendere dati da backend*/}
                    </div>
                </div>
            </Stack>
        </div>
            <div className="arrowIcon" style={{ transform: `${props.position === 'left' ? 'rotate(135deg)' : 'rotate(315deg)'}`, margin: `${props.position === 'left' ? '-1.25vw -1.9vw' : '-1.25vw 6.5vw'}` }}></div>
        </div>
    );
}

export default Popup;