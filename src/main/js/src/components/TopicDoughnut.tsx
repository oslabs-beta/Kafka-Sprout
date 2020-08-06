import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const TopicDoughnut = props => {
  const labels = props.content.map(arr => {
    return arr[0];
  });

  const partitions = props.content.map(arr => {
    return arr[2];
  });

  const colors = partitions.map(() => {
    const h = 150 - Math.floor(Math.random() * (50/10+1)) * 10; // range 180-250 interval of 10
    const s = 60 - Math.floor(Math.random() * (30/5+1)) * 5;
    const l = 80 - Math.floor(Math.random() * (30/5+1)) * 5; // range 50 - 80 interval of 10
    return `hsl(${h},${s}%,${l}%)`;
  })

  const data = {
    labels: labels,
    datasets: [
      {
        data: partitions,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
  return <Doughnut data={data} width={500} />;
};

export default TopicDoughnut;
