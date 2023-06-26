import './style/robotProfile.css';
import whiteAvatar from '../assets/avatars/white_robot.png';
import blackAvatar from '../assets/avatars/black_robot.png';
import blueAvatar from '../assets/avatars/blue_robot.png';
import brownAvatar from '../assets/avatars/brown_robot.png';
import greenAvatar from '../assets/avatars/green_robot.png';
import orangeAvatar from '../assets/avatars/orange_robot.png';
import pinkAvatar from '../assets/avatars/pink_robot.png';
import redAvatar from '../assets/avatars/red_robot.png';
import turquoiseAvatar from '../assets/avatars/turquoise_robot.png';
import yellowAvatar from '../assets/avatars/yellow_robot.png';
import { useRef } from "react";

function RobotProfile(props) {
    const avatarElement = useRef(null);

    const handleClick = () => {
        if (avatarElement.current.style.opacity === '1') {
            avatarElement.current.style.opacity = '0.4';

            if (avatarElement.current.getAttribute("alt").includes("white")) {
                props.setIsWhiteRobotVisible(false);
            } else if (avatarElement.current.getAttribute("alt").includes("black")) {
                props.setIsBlackRobotVisible(false);
            } else if (avatarElement.current.getAttribute("alt").includes("blue")) {
                props.setIsBlueRobotVisible(false);
            } else if (avatarElement.current.getAttribute("alt").includes("brown")) {
                props.setIsBrownRobotVisible(false);
            } else if (avatarElement.current.getAttribute("alt").includes("green")) {
                props.setIsGreenRobotVisible(false);
            } else if (avatarElement.current.getAttribute("alt").includes("orange")) {
                props.setIsOrangeRobotVisible(false);
            } else if (avatarElement.current.getAttribute("alt").includes("pink")) {
                props.setIsPinkRobotVisible(false);
            } else if (avatarElement.current.getAttribute("alt").includes("red")) {
                props.setIsRedRobotVisible(false);
            } else if (avatarElement.current.getAttribute("alt").includes("turquoise")) {
                props.setIsTurquoiseRobotVisible(false);
            } else if (avatarElement.current.getAttribute("alt").includes("yellow")) {
                props.setIsYellowRobotVisible(false);
            }
        } else {
            avatarElement.current.style.opacity = '1';

            if (avatarElement.current.getAttribute("alt").includes("white")) {
                props.setIsWhiteRobotVisible(true);
            } else if (avatarElement.current.getAttribute("alt").includes("black")) {
                props.setIsBlackRobotVisible(true);
            } else if (avatarElement.current.getAttribute("alt").includes("blue")) {
                props.setIsBlueRobotVisible(true);
            } else if (avatarElement.current.getAttribute("alt").includes("brown")) {
                props.setIsBrownRobotVisible(true);
            } else if (avatarElement.current.getAttribute("alt").includes("green")) {
                props.setIsGreenRobotVisible(true);
            } else if (avatarElement.current.getAttribute("alt").includes("orange")) {
                props.setIsOrangeRobotVisible(true);
            } else if (avatarElement.current.getAttribute("alt").includes("pink")) {
                props.setIsPinkRobotVisible(true);
            } else if (avatarElement.current.getAttribute("alt").includes("red")) {
                props.setIsRedRobotVisible(true);
            } else if (avatarElement.current.getAttribute("alt").includes("turquoise")) {
                props.setIsTurquoiseRobotVisible(true);
            } else if (avatarElement.current.getAttribute("alt").includes("yellow")) {
                props.setIsYellowRobotVisible(true);
            }
        }
    }

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
        <div>
            <div className="avatar" onClick={handleClick}>
                <img src={avatar} ref={avatarElement} alt={`${props.color} avatar`} style={{ opacity: 1 }} />
            </div>
            <div className="badge">
                <span>{props.model}</span>
            </div>
            {props.color === "white" && <div className="popup_robot">
            </div>}
        </div>
    );
}
export default RobotProfile;