// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addSensor, editSensor } from '../../actions/sensors';

// const SensorForm = ({ sensor, onSubmit }) => {
//   const dispatch = useDispatch();
//   const [name, setName] = useState(sensor ? sensor.name : '');
//   const [location, setLocation] = useState(sensor ? sensor.location : '');
//   const [value, setValue] = useState(sensor ? sensor.value : '');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newSensor = {
//       name,
//       location,
//       value
//     };
//     if (sensor) {
//       dispatch(editSensor(sensor.id, newSensor));
//     } else {
//       dispatch(addSensor(newSensor));
//     }
//     if (onSubmit) {
//       onSubmit();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//       </label>
//       <label>
//         Location:
//         <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
//       </label>
//       <label>
//         Value:
//         <input type="number" value={value} onChange={(e) => setValue(parseFloat(e.target.value))} />
//       </label>
//       <button type="submit">{sensor ? 'Save' : 'Create'}</button>
//     </form>
//   );
// };

// export default SensorForm;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSensor } from '../actions/sensors';

function SensorForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(createSensor(name, value));
    setName('');
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={event => setName(event.target.value)} />
      </label>
      <br />
      <label>
        Value:
        <input type="text" value={value} onChange={event => setValue(event.target.value)} />
      </label>
      <br />
      <button type="submit">Create</button>
    </form>
  );
}

export default SensorForm;
