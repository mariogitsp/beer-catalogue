import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function BeerFingerprint({ abv, ibu }) {
  // Normalize: ABV (0-15%) -> 0-100, IBU (0-120) -> 0-100
  const normABV = Math.min((abv / 15) * 100, 100);
  const normIBU = Math.min((ibu / 120) * 100, 100);
  
  // Placeholder for a 3rd dimension (e.g., Malt/Sweetness balance)
  const normBalance = 50; 

  const data = {
    labels: ['ABV Strength', 'Bitterness (IBU)', 'Balance'],
    datasets: [
      {
        label: 'Beer Fingerprint',
        data: [normABV, normIBU, normBalance],
        backgroundColor: 'rgba(184, 134, 11, 0.4)',
        borderColor: '#b8860b',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
        angleLines: { color: 'rgba(255,255,255,0.2)' },
        grid: { color: 'rgba(255,255,255,0.2)' },
        pointLabels: { color: 'white', font: { size: 12 } },
        ticks: { display: false },
      },
    },
    plugins: { legend: { labels: { color: 'white' } } },
  };

  return (
    <div style={{ width: '300px', margin: '0 auto' }}>
      <Radar data={data} options={options} />
    </div>
  );
}

export default BeerFingerprint;
