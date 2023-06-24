import './style/robotMap.css';
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

  return (
    <div style={{display: props.isVisible ? 'block' : 'none'}}>
      <img
        src={avatar}
        alt={`${props.color} avatar`}
        className="robot-map"
        style={{margin: `${props.position.latitude}px ${props.position.longitude}px`}}
    />
    </div>
);
}

export default RobotMap;