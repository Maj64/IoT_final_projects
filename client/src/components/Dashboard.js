// import { hasPermission } from '../services/userService';
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Oxygen",
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  
  return (
    <div className="container">
      <Container>
        <Row>
          <Col>Dashboard</Col>
        </Row>
        <Row>
          <Col>
            <Line options={options} data={data} />
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
