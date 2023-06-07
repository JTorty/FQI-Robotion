import './style/body.css';
import Map from './components/map';

function Body() {
  return (
      <div className="main">
        {/*<img src={map} className="map" alt="map" />*/}
          <Map />
      </div>
  );
}

export default Body;
