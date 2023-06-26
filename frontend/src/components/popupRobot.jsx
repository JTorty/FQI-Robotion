import whiteAvatar from '../assets/avatars/robot.png';

function PopUpRobot(props) {
    return (
        <div onClick={handleClick}>
            <img src={whiteAvatar} alt="Avatar" />
            {clicked && <p>Avatar cliccato!</p>}
        </div>
    );
}

export default PopUpRobot;