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

import React, { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { fetchSensors } from '../actions/sensors';

function SensorList() {
  const dispatch = useDispatch();
  const sensors = useSelector((state) => state.sensors);

  // useEffect(() => {
  //   dispatch(fetchSensors());
  // }, [dispatch]);

  return (
    <div className="container">
      <Container fluid>
        <Row>
          <Col>Title</Col>
          <Col>Add Device</Col>
        </Row>
        <Row>
          Table
          <Table striped bordered hover size="lg">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
      {/* <ul>
        {sensors.map(sensor => (
          <li key={sensor.id}>{`${sensor.name}: ${sensor.value}`}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default SensorList;
