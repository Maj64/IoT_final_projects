// import { hasPermission } from '../services/userService';
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Bar } from 'react-chartjs-2';
import { Col, Container, Row } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { faker } from '@faker-js/faker';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const Dashboard = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };
  return (
    <div className="container">
      <Container>
        <Row>
          <Col>Dashboard</Col>
        </Row>
        <Row>
          <Col>
            <Bar options={options} data={data} />;
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
