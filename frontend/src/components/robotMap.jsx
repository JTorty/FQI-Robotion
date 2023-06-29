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

    const vwTot = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const popupWidth = props.hasFilters.position || props.hasFilters.status || props.hasFilters.battery ? '6.6vw' : '0vw';
    const avatarWidth = '5vw';

    const handleHeight = () => {
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
        const status = 'operative';

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
          margin: `${props.position.latitude.pixels / vwTot * 100}vw calc(${props.position.longitude.pixels / vwTot * 100}vw - ((${popupWidth} - ${avatarWidth}) / 2))`
        }}>
            <img
                src={avatar}
                alt={`${props.color} avatar`}
                className="robot-map"
            />
            <Stack className="popup_map" direction="column" spacing="0.25vw"
                sx={{border: `0.15vw solid ${accent}`, display: props.hasFilters.position || props.hasFilters.status || props.hasFilters.battery ? 'flex' : 'none'}}>
                <div className="position popup_element" style={{display: props.hasFilters.position ? 'flex' : 'none', height: handleHeight()}}>
                    <div className="icon_position popup_element_icon"
                         style={{backgroundImage: `url(${compassImg})`}}></div>
                    <div className="position_coordinates popup_element_text">
                        <span>41° 24' 17.4" N</span>
                        <span>2° 10' 26.4" E</span>
                    </div>
                </div>
                <div className="status popup_element" style={{display: props.hasFilters.status ? 'flex' : 'none', height: handleHeight()}}>
                    <div className="popup_element_icon">
                        <div className="icon_status" style={{backgroundColor: handleStatus()}}></div>
                    </div>
                    <div className="popup_element_text">
                        <span>operative</span>
                    </div>
                </div>
                <div className="battery popup_element" style={{display: props.hasFilters.battery ? 'flex' : 'none', height: handleHeight()}}>
                    <div className="icon_battery popup_element_icon"
                         style={{backgroundImage: `url(${batteryImg})`}}></div>
                    <div className="popup_element_text">
                        <span>100%</span>
                    </div>
                </div>
            </Stack>
        </div>
    );
}

export default RobotMap;