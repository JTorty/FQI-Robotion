import './style/robotMap.css';
import whiteAvatar from '../assets/avatars/robot.png';
import blackAvatar from '../assets/avatars/black_robot.png';
import blueAvatar from '../assets/avatars/blue_robot.png';
import brownAvatar from '../assets/avatars/brown_robot.png';
import greenAvatar from '../assets/avatars/green_robot.png';
import orangeAvatar from '../assets/avatars/orange_robot.png';
import pinkAvatar from '../assets/avatars/pink_robot.png';
import redAvatar from '../assets/avatars/red_robot.png';
import turquoiseAvatar from '../assets/avatars/turquoise_robot.png';
import yellowAvatar from '../assets/avatars/yellow_robot.png';

function RobotMap(props) {
return (
    <div>
    <img
      src={whiteAvatar}
      alt="white_avatar"
      className="robot-map"
    style={{margin: props.position.latitude props.position.longitude}}
    />
    </div>
);
}

export default RobotMap;