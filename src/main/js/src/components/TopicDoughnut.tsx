import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const TopicDoughnut = props => {
  const labels = props.content.map(arr => {
    return arr[0];
  });

  const partitions = props.content.map(arr => {
    return arr[2];
  });

  const data = {
    labels: labels,
    datasets: [
      {
        data: partitions,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  return <Doughnut data={data} width={500} />;
};

export default TopicDoughnut;
