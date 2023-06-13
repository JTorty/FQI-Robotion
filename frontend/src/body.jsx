import './style/body.css';
import RobotProfile from './components/robotProfile';
import Map from './components/map';

function Body() {
  return (
      <div className="main">
        <RobotProfile color="white"/>
        <RobotProfile color="green"/>
        <RobotProfile color="turquoise"/>
        <RobotProfile color="black"/>
        <RobotProfile color="brown"/>
        <Map />
        <RobotProfile color="yellow"/>
        <RobotProfile color="orange"/>
        <RobotProfile color="red"/>
        <RobotProfile color="pink"/>
        <RobotProfile color="blue"/>
      </div>
  );
}

export default Body;
