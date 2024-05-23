import React from "react";
import Chart from "react-apexcharts";

const RadialChart = ({ totalchargefix, totalchargevariable, chiffre_total, benefice }) => {
  // Find the maximum value among the values to display
  const maxValue = Math.max(totalchargefix, totalchargevariable, chiffre_total, benefice);

  // Normalize the values to make them proportional and not exceed 100%
  const normalize = (value) => (value / maxValue) * 10;

  // Normalize and format the values to two decimal places
  const normalizedTotalchargefix = normalize(totalchargefix).toFixed(2);
  const normalizedTotalchargevariable = normalize(totalchargevariable).toFixed(2);
  const normalizedChiffreTotal = normalize(chiffre_total).toFixed(2);
  const normalizedBenefice = normalize(benefice).toFixed(2);

  // Calculate the total as chiffre_total - (totalchargefix + totalchargevariable) and format it to two decimal places
  const totalValue = (chiffre_total - (totalchargefix + totalchargevariable)).toFixed(2);

  // Determine icon and color based on benefice value
  const beneficeIcon = benefice >= 0 ? 'bx bx-up-arrow-alt' : 'bx bx-down-arrow-alt';
  const beneficeColor = benefice >= 0 ? 'green' : 'red';
  const beneficeDifference = Math.abs(benefice).toFixed(2);  // Difference from 0

  const chartOptions = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            show: false,  // Show the value under the labels
            formatter: function (val) {
              return parseFloat(val).toFixed(2);  // Ensure values are formatted to two decimal places
            }
          },
          total: {
            show: true,
            label: 'Charges et Vente',
            formatter: function () {
              return totalValue;  // Display the total value formatted to two decimal places
            },
            color: 'black',
            fontSize: '16px',
            fontWeight: 600,
          }
        }
      }
    },
    labels: ['Charges Fixes', 'Charges Variables', 'Total des Ventes', 'Bénéfice'],
  };

  const chartSeries = [
    parseFloat(normalizedTotalchargefix),
    parseFloat(normalizedTotalchargevariable),
    parseFloat(normalizedChiffreTotal),
    parseFloat(normalizedBenefice)
  ];

  return (
    <div id="chart">
      <Chart options={chartOptions} series={chartSeries} type="radialBar" height={350} />
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', color: beneficeColor }}>
          <i className={beneficeIcon} style={{ fontSize: '24px', marginRight: '8px' }}></i>
          <span>{`Bénéfice: ${beneficeDifference}`}</span>
        </div>
      </div>
    </div>
  );
};

export default RadialChart;
