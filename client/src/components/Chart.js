import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { getSensorDataList } from "../service/sensorData";

const MyChart = ({ sensorId }) => {
  console.log("chart", sensorId);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature",
        data: [],
        borderColor: "red",
        fill: false,
      },
      {
        label: "pH",
        data: [],
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Acidity",
        data: [],
        borderColor: "green",
        fill: false,
      },
      {
        label: "Chlorine",
        data: [],
        borderColor: "purple",
        fill: false,
      },
      {
        label: "Oxygen",
        data: [],
        borderColor: "orange",
        fill: false,
      },
    ],
  });

  const fetchData = useCallback(async () => {
    try {
      const { data } = await getSensorDataList(sensorId);
      const arrayOfObjects = Object.values(data);
      console.log(arrayOfObjects);
      const newSensorList = [...arrayOfObjects];

      const updatedChartData = newSensorList.reduce(
        (prevChartData, newData) => ({
          ...prevChartData,
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: [...prevChartData.datasets[0].data, newData.temperature],
            },
            {
              ...prevChartData.datasets[1],
              data: [...prevChartData.datasets[1].data, newData.pH],
            },
            {
              ...prevChartData.datasets[2],
              data: [...prevChartData.datasets[2].data, newData.acidity],
            },
            {
              ...prevChartData.datasets[3],
              data: [...prevChartData.datasets[3].data, newData.chlorine],
            },
            {
              ...prevChartData.datasets[4],
              data: [...prevChartData.datasets[4].data, newData.oxygen],
            },
          ],
          labels: [...prevChartData.labels, newData.createdAt],
        }),
        chartData
      );

      setChartData(updatedChartData);
    } catch (error) {
      console.log(error);
    }
  }, [chartData]);

  useEffect(() => {
    const timerId = setInterval(fetchData, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, [fetchData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Line data={chartData} options={options} />;
};

export default MyChart;
