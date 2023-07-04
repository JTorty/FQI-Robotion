import './style/robotMap.css';
import Stack from '@mui/material/Stack';
import compassImg from "../assets/icons/compass.png";
import batteryImg from "../assets/icons/battery-full.png";
import whiteAvatar from '../assets/avatars/map/white_robot.png';
import blackAvatar from '../assets/avatars/map/black_robot.png';
import blueAvatar from '../assets/avatars/map/blue_robot.png';
import brownAvatar from '../assets/avatars/map/brown_robot.png';
import greenAvatar from '../assets/avatars/map/green_robot.png';
import orangeAvatar from '../assets/avatars/map/orange_robot.png';
import pinkAvatar from '../assets/avatars/map/pink_robot.png';
import redAvatar from '../assets/avatars/map/red_robot.png';
import turquoiseAvatar from '../assets/avatars/map/turquoise_robot.png';
import yellowAvatar from '../assets/avatars/map/yellow_robot.png';
import openedEyes from '../assets/avatars/map/eyes/opened_eyes.png';
import halfOpenedEyes from '../assets/avatars/map/eyes/half_opened_eyes.png';
import closedEyes from '../assets/avatars/map/eyes/closed_eyes.png';

function RobotMap(props) {
    let avatar = whiteAvatar;
    let accent = "#e8e8e8";

    if (props.color === "black") {
        avatar = blackAvatar;
        accent = "#1f1f1f";
    } else if (props.color === "blue") {
        avatar = blueAvatar;
        accent = "#c9dff2";
    } else if (props.color === "brown") {
        avatar = brownAvatar;
        accent = "#6d592e";
    } else if (props.color === "green") {
        avatar = greenAvatar;
        accent = "#c8f0c6";
    } else if (props.color === "orange") {
        avatar = orangeAvatar;
        accent = "#c86b00";
    } else if (props.color === "pink") {
        avatar = pinkAvatar;
        accent = "#f2c9f2";
    } else if (props.color === "red") {
        avatar = redAvatar;
        accent = "#801e1e";
    } else if (props.color === "turquoise") {
        avatar = turquoiseAvatar;
        accent = "#168978";
    } else if (props.color === "yellow") {
        avatar = yellowAvatar;
        accent = "#fef601";
    }

    let eyes = openedEyes;
    let battery = 100; //da modificare prendendo i dati da backend

    if (battery < 50) {
        eyes = halfOpenedEyes;
    }
    if (battery === 0) {
        eyes = closedEyes;
    }

    const avatarSize = props.size && props.mapSize.width ? `${props.size * props.mapSize.width / 950}px` : '65px';
    const mapWidth = props.mapSize.width ? props.mapSize.width: 950;
    const mapHeight = props.mapSize.height ? props.mapSize.height : 600;

    const handlePopupHeight = () => {
        if (props.hasFilters.position && props.hasFilters.status && props.hasFilters.battery) {
            return 'calc(1.5vw * 2.25)';
        }

        if ((props.hasFilters.position && props.hasFilters.status) ||
            (props.hasFilters.position && props.hasFilters.battery) ||
            (props.hasFilters.status && props.hasFilters.battery)) {
            return 'calc(1.5vw * 1.75)';
        }

        return 'calc(1.5vw)';
    }

    const handleElHeight = () => {
        if (props.hasFilters.position && props.hasFilters.status && props.hasFilters.battery) {
            return '33%';
        }

        if ((props.hasFilters.position && props.hasFilters.status) ||
            (props.hasFilters.position && props.hasFilters.battery) ||
            (props.hasFilters.status && props.hasFilters.battery)) {
            return '50%';
        }

        return '100%';
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
        <div className="robot-map" style={{
            display: props.isVisible ? 'flex' : 'none',
            paddingTop: `${props.position.latitude.pixels * mapHeight / 600}px`,
            paddingLeft: `calc(${props.position.longitude.pixels * mapWidth / 950}px + (${avatarSize} / 2))`
        }}>
            <div className="robot-eyes"
                style={{ backgroundImage: `url(${eyes})`, width: `calc(${avatarSize}/2.5)`, height: `calc(${avatarSize}/5)`, marginTop: `calc(${avatarSize}/2.5)` }}>
            </div>
            <div className="robot-avatar"
                style={{ backgroundImage: `url(${avatar})`, width: avatarSize, height: avatarSize }}>
            </div>
            <Stack className="popup-map" direction="column" spacing="0.25vw"
                sx={{ border: `0.15vw solid ${accent}`, display: props.hasFilters.position || props.hasFilters.status || props.hasFilters.battery ? 'flex' : 'none', marginTop: `calc(${avatarSize}/1.15)`, height: handlePopupHeight() }}>
                <div className="position popup-element" style={{ display: props.hasFilters.position ? 'flex' : 'none', height: handleElHeight() }}>
                    <div className="icon-position popup-element-icon"
                        style={{ backgroundImage: `url(${compassImg})` }}></div>
                    <div className="position-coordinates popup-element-text">
                        <span>41° 24' 17.4" N</span> {/*prendere dati da backend*/}
                        <span>2° 10' 26.4" E</span> {/*prendere dati da backend*/}
                    </div>
                </div>
                <div className="status popup-element" style={{ display: props.hasFilters.status ? 'flex' : 'none', height: handleElHeight() }}>
                    <div className="popup-element-icon">
                        <div className="icon-status" style={{ backgroundColor: handleStatus() }}></div>
                    </div>
                    <div className="popup-element-text">
                        <span>operative</span> {/*prendere dati da backend*/}
                    </div>
                </div>
                <div className="battery popup-element" style={{ display: props.hasFilters.battery ? 'flex' : 'none', height: handleElHeight() }}>
                    <div className="icon-battery popup-element-icon"
                        style={{ backgroundImage: `url(${batteryImg})` }}></div>
                    <div className="popup-element-text">
                        <span>100%</span> {/*prendere dati da backend*/}
                    </div>
                </div>
            </Stack>
        </div>
    );
}

export default RobotMap;