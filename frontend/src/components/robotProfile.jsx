import './style/robotProfile.css';
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

function RobotProfile(props) {
    let avatar = whiteAvatar;

    if (props.color === "green") {
        avatar = greenAvatar;
    }
    else if (props.color === "black") {
        avatar = blackAvatar;    
    } 
    else if (props.color === "blue") {
        avatar = blueAvatar;
    }
    else if (props.color === "black") {
        avatar = blackAvatar;    
    }
    else if (props.color === "brown") {
        avatar = brownAvatar;    
    } 
    else if (props.color === "orange") {
        avatar = orangeAvatar;    
    } 
    else if (props.color === "pink") {
        avatar = pinkAvatar;    
    } 
    else if (props.color === "red") {
        avatar = redAvatar;    
    } 
    else if (props.color === "turquoise") {
        avatar = turquoiseAvatar;    
    } 
    else if (props.color === "yellow") {
        avatar = yellowAvatar;
    } 
    return (
        <div className="avatar">
            <img src={avatar} alt={props.color}/>
        </div>
        

    //     <>
    //         {props.color==="white" ? <div className="avatar"><img src={whiteAvatar} alt={props.color}/></div> : null}
    //         {props.color==="black" ? <div className="avatar"><img src={blackAvatar} alt={props.color}/></div> : null}
    //         {props.color==="blue" ? <div className="avatar"><img src={blueAvatar} alt={props.color}/></div> : null}
    //         {props.color==="brown" ? <div className="avatar"><img src={brownAvatar} alt={props.color}/></div> : null}
    //         {props.color==="green" ? <div className="avatar"><img src={greenAvatar} alt={props.color}/></div> : null}
    //         {props.color==="orange" ? <div className="avatar"><img src={orangeAvatar} alt={props.color}/></div> : null}
    //         {props.color==="pink" ? <div className="avatar"><img src={pinkAvatar} alt={props.color}/></div> : null}
    //         {props.color==="red" ? <div className="avatar"><img src={redAvatar} alt={props.color}/></div> : null}
    //         {props.color==="turquoise" ? <div className="avatar"><img src={turquoiseAvatar} alt={props.color}/></div> : null}
    //         {props.color==="yellow" ? <div className="avatar"><img src={yellowAvatar} alt={props.color}/></div> : null}
    //    </>
    );
}

const SerialNumber = ({ serialNumber }) => {
    return (
      <div style={{ border: '1px solid black', width: 'fit-content', maxWidth: '100%' }}>
        {serialNumber}
      </div>
    );
  };

export default RobotProfile;