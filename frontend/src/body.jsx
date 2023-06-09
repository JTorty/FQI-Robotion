import './style/body.css';
import Map from './components/map';
import RobotProfile from './components/robotProfile';

function Body() {
  return (
      <div className="main">
        <RobotProfile color="white"/>
        <RobotProfile color="green"/>
        <RobotProfile color="turquoise"/>
        <RobotProfile color="black"/>
        <RobotProfile color="brown"/>
        <RobotProfile color="yellow"/>
        <RobotProfile color="orange"/>
        <RobotProfile color="red"/>
        <RobotProfile color="pink"/>
        <RobotProfile color="blue"/>
          <Map />
      </div>
  );
}

export default Body;
