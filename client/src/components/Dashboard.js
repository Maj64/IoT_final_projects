// import { hasPermission } from '../services/userService';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Col, Container, Row } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

import { getSensorDataList } from "../service/sensorData";
import { useEffect, useState } from "react";
import MyChart from "./Chart";
import SensorDropdown from "./DropDown";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sensor",
    },
  },
};


const Dashboard = ({ user }) => {
  const history = useHistory();
  const sensors = useSelector(state => state.sensor.sensorList)
  const [sensorId, setSensorId] = useState()

  const handleSelected = (id) => {
    console.log("dashboard", id);
    setSensorId(id)
  }
  
  return (
    <div className="container">
      <Container>
        <Row>
          <Col><h2>Dashboard</h2><br /></Col>
        </Row>
        <Row>
          <SensorDropdown sensorList={ sensors } onSelect={handleSelected} />
        </Row>
        <Row>
          <Col>
            {/* <Line options={options} data={data} /> */}
            <MyChart sensorId={sensorId} />
          </Col>
        </Row>
      </Container>
      {/* {hasPermission(user.role, ['admin']) && (
        <Link to="/users">Manage Users</Link>
      )} */}
    </div>
  );
};

export default Dashboard;
