// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { deleteSensor } from '../../actions/sensors';
// import { Link } from 'react-router-dom';

// const Sensor = ({ sensor }) => {
//   const dispatch = useDispatch();

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this sensor?')) {
//       dispatch(deleteSensor(sensor.id));
//     }
//   };

//   return (
//     <div>
//       <Link to={`/sensors/${sensor.id}`}>
//         {sensor.name} ({sensor.value})
//       </Link>{' '}
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// };

// export default Sensor;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchSensors } from '../actions/sensors';

function SensorList() {
  const dispatch = useDispatch();
  const sensors = useSelector(state => state.sensors);

  // useEffect(() => {
  //   dispatch(fetchSensors());
  // }, [dispatch]);

  return (
    <div className='container'>
      <h2>Sensor</h2>
      {/* <ul>
        {sensors.map(sensor => (
          <li key={sensor.id}>{`${sensor.name}: ${sensor.value}`}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default SensorList;
