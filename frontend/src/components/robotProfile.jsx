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
import Popup from './popup';
import {useRef, useState} from "react";

function RobotProfile(props) {
    const avatarEl = useRef(null);

    const handleAvatarClick = () => {
        if (avatarEl.current.style.opacity === '1') {
            avatarEl.current.style.opacity = '0.4';

            if (avatarEl.current.getAttribute("alt").includes("white")) {
                props.setIsWhiteRobotVisible(false);
            } else if (avatarEl.current.getAttribute("alt").includes("black")) {
                props.setIsBlackRobotVisible(false);
            } else if (avatarEl.current.getAttribute("alt").includes("blue")) {
                props.setIsBlueRobotVisible(false);
            } else if (avatarEl.current.getAttribute("alt").includes("brown")) {
                props.setIsBrownRobotVisible(false);
            } else if (avatarEl.current.getAttribute("alt").includes("green")) {
                props.setIsGreenRobotVisible(false);
            } else if (avatarEl.current.getAttribute("alt").includes("orange")) {
                props.setIsOrangeRobotVisible(false);
            } else if (avatarEl.current.getAttribute("alt").includes("pink")) {
                props.setIsPinkRobotVisible(false);
            } else if (avatarEl.current.getAttribute("alt").includes("red")) {
                props.setIsRedRobotVisible(false);
            } else if (avatarEl.current.getAttribute("alt").includes("turquoise")) {
                props.setIsTurquoiseRobotVisible(false);
            } else if (avatarEl.current.getAttribute("alt").includes("yellow")) {
                props.setIsYellowRobotVisible(false);
            }
        } else {
            avatarEl.current.style.opacity = '1';

            if (avatarEl.current.getAttribute("alt").includes("white")) {
                props.setIsWhiteRobotVisible(true);
            } else if (avatarEl.current.getAttribute("alt").includes("black")) {
                props.setIsBlackRobotVisible(true);
            } else if (avatarEl.current.getAttribute("alt").includes("blue")) {
                props.setIsBlueRobotVisible(true);
            } else if (avatarEl.current.getAttribute("alt").includes("brown")) {
                props.setIsBrownRobotVisible(true);
            } else if (avatarEl.current.getAttribute("alt").includes("green")) {
                props.setIsGreenRobotVisible(true);
            } else if (avatarEl.current.getAttribute("alt").includes("orange")) {
                props.setIsOrangeRobotVisible(true);
            } else if (avatarEl.current.getAttribute("alt").includes("pink")) {
                props.setIsPinkRobotVisible(true);
            } else if (avatarEl.current.getAttribute("alt").includes("red")) {
                props.setIsRedRobotVisible(true);
            } else if (avatarEl.current.getAttribute("alt").includes("turquoise")) {
                props.setIsTurquoiseRobotVisible(true);
            } else if (avatarEl.current.getAttribute("alt").includes("yellow")) {
                props.setIsYellowRobotVisible(true);
            }
        }
    }

    const badgeEl = useRef(null);
    const [isWhitePopupVisible, setIsWhitePopupVisible] = useState(false);
    const [isBlackPopupVisible, setIsBlackPopupVisible] = useState(false);
    const [isBluePopupVisible, setIsBluePopupVisible] = useState(false);
    const [isBrownPopupVisible, setIsBrownPopupVisible] = useState(false);
    const [isGreenPopupVisible, setIsGreenPopupVisible] = useState(false);
    const [isOrangePopupVisible, setIsOrangePopupVisible] = useState(false);
    const [isPinkPopupVisible, setIsPinkPopupVisible] = useState(false);
    const [isRedPopupVisible, setIsRedPopupVisible] = useState(false);
    const [isTurquoisePopupVisible, setIsTurquoisePopupVisible] = useState(false);
    const [isYellowPopupVisible, setIsYellowPopupVisible] = useState(false);

    const handleBadgeClick = () => {
        if (badgeEl.current.style.opacity === '1') {
            badgeEl.current.style.opacity = '0';

            if (badgeEl.current.classList.contains("badge-white")) {
                setIsWhitePopupVisible(true);
            } else if (badgeEl.current.classList.contains("badge-black")) {
                setIsBlackPopupVisible(true);
            } else if (badgeEl.current.classList.contains("badge-blue")) {
                setIsBluePopupVisible(true);
            } else if (badgeEl.current.classList.contains("badge-brown")) {
                setIsBrownPopupVisible(true);
            } else if (badgeEl.current.classList.contains("badge-green")) {
                setIsGreenPopupVisible(true);
            } else if (badgeEl.current.classList.contains("badge-orange")) {
                setIsOrangePopupVisible(true);
            } else if (badgeEl.current.classList.contains("badge-pink")) {
                setIsPinkPopupVisible(true);
            } else if (badgeEl.current.classList.contains("badge-red")) {
                setIsRedPopupVisible(true);
            } else if (badgeEl.current.classList.contains("badge-turquoise")) {
                setIsTurquoisePopupVisible(true);
            } else if (badgeEl.current.classList.contains("badge-yellow")) {
                setIsYellowPopupVisible(true);
            }
        } else {
            badgeEl.current.style.opacity = '1';

            if (badgeEl.current.classList.contains("badge-white")) {
                setIsWhitePopupVisible(false);
            } else if (badgeEl.current.classList.contains("badge-black")) {
                setIsBlackPopupVisible(false);
            } else if (badgeEl.current.classList.contains("badge-blue")) {
                setIsBluePopupVisible(false);
            } else if (badgeEl.current.classList.contains("badge-brown")) {
                setIsBrownPopupVisible(false);
            } else if (badgeEl.current.classList.contains("badge-green")) {
                setIsGreenPopupVisible(false);
            } else if (badgeEl.current.classList.contains("badge-orange")) {
                setIsOrangePopupVisible(false);
            } else if (badgeEl.current.classList.contains("badge-pink")) {
                setIsPinkPopupVisible(false);
            } else if (badgeEl.current.classList.contains("badge-red")) {
                setIsRedPopupVisible(false);
            } else if (badgeEl.current.classList.contains("badge-turquoise")) {
                setIsTurquoisePopupVisible(false);
            } else if (badgeEl.current.classList.contains("badge-yellow")) {
                setIsYellowPopupVisible(false);
            }
        }
    }

    let avatar = whiteAvatar;
    let isPopupVisible = isWhitePopupVisible;
    let popupPos = 'left';

    if (props.color === "black") {
        avatar = blackAvatar;
        isPopupVisible = isBlackPopupVisible;
    } else if (props.color === "blue") {
        avatar = blueAvatar;
        isPopupVisible = isBluePopupVisible;
        popupPos = 'right';
    } else if (props.color === "brown") {
        avatar = brownAvatar;
        isPopupVisible = isBrownPopupVisible;
    } else if (props.color === "green") {
        avatar = greenAvatar;
        isPopupVisible = isGreenPopupVisible;
    } else if (props.color === "orange") {
        avatar = orangeAvatar;
        isPopupVisible = isOrangePopupVisible;
        popupPos = 'right';
    } else if (props.color === "pink") {
        avatar = pinkAvatar;
        isPopupVisible = isPinkPopupVisible;
        popupPos = 'right';
    } else if (props.color === "red") {
        avatar = redAvatar;
        isPopupVisible = isRedPopupVisible;
        popupPos = 'right';
    } else if (props.color === "turquoise") {
        avatar = turquoiseAvatar;
        isPopupVisible = isTurquoisePopupVisible;
    } else if (props.color === "yellow") {
        avatar = yellowAvatar;
        isPopupVisible = isYellowPopupVisible;
        popupPos = 'right';
    }

    return (
        <div>
            <div className="avatar" onClick={handleAvatarClick}>
                <img src={avatar} ref={avatarEl} alt={`${props.color} avatar`} style={{ opacity: 1 }} />
            </div>
            <div className={`badge badge-${props.color}`} onClick={handleBadgeClick} ref={badgeEl} style={{ opacity: 1 }} >
                <span>{props.model}</span>
            </div>
            <Popup color={props.color} isVisible={isPopupVisible} position={popupPos}/>
        </div>
    );
}
export default RobotProfile;