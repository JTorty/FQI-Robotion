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

  if (props.color === "black") {
    avatar = blackAvatar;
  } else if (props.color === "blue") {
    avatar = blueAvatar;
  } else if (props.color === "brown") {
    avatar = brownAvatar;
  } else if (props.color === "green") {
    avatar = greenAvatar;
  } else if (props.color === "orange") {
    avatar = orangeAvatar;
  } else if (props.color === "pink") {
    avatar = pinkAvatar;
  } else if (props.color === "red") {
    avatar = redAvatar;
  } else if (props.color === "turquoise") {
    avatar = turquoiseAvatar;
  } else if (props.color === "yellow") {
    avatar = yellowAvatar;
  }

  const vwTot = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  return (
    <div style={{ display: props.isVisible ? 'flex' : 'none', position: 'absolute', zIndex: 95, margin: `${props.position.latitude.pixels / vwTot * 100}vw  ${props.position.longitude.pixels / vwTot * 100}vw`}}>
      <img
        src={avatar}
        alt={`${props.color} avatar`}
        className="robot-map"
        style={{ }}
      />
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

export default RobotMap;