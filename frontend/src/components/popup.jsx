import './style/popup.css';

function Popup(props) {
    const isShowed = props.isVisible ? 'block' : 'none';

    return (
        <div className={`popup_robot popup_robot_${props.position}`} style={{display: isShowed}}>
        </div>
    );
}

export default Popup;