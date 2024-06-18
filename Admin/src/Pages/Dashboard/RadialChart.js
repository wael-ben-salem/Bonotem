import React from "react";
import Chart from "react-apexcharts";

const RadialChart = ({ totalchargefix, totalchargevariable, chiffre_total, benefice }) => {
  // Calculate the maximum value among the provided data
  const maxValue = Math.max(totalchargefix, totalchargevariable, chiffre_total, benefice);

  // Normalize the values to a range from 0 to 10
  const normalize = (value) => (value / maxValue) * 10;

  // Format normalized values to two decimal places
  const formattedValues = {
    totalchargefix: normalize(totalchargefix).toFixed(2),
    totalchargevariable: normalize(totalchargevariable).toFixed(2),
    chiffre_total: normalize(chiffre_total).toFixed(2),
    benefice: normalize(benefice).toFixed(2),
  };

  // Calculate the total value (total sales minus total charges) formatted to two decimal places
  const totalValue = (chiffre_total - (totalchargefix + totalchargevariable)).toFixed(2);

  // Determine icon and color based on benefice value
  const beneficeIcon = benefice >= 0 ? 'bx bx-up-arrow-alt' : 'bx bx-down-arrow-alt';
  const beneficeColor = benefice >= 0 ? 'green' : 'red';
  const beneficeDifference = Math.abs(benefice).toFixed(2);

  // Define chart options and series
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
            show: true,
            formatter: (val) => `TND${parseFloat(val).toFixed(2)}`,
          },
          total: {
            show: true,
            label: 'Bénéfice',
            formatter: () => `TND${totalValue}`,
            color: 'black',
            fontSize: '16px',
            fontWeight: 600,
          },
        },
      },
    },
    labels: ['Charges Fixes', 'Charges Variables', 'Total des Ventes', 'Bénéfice'],
  };

  const chartSeries = [
    parseFloat(formattedValues.totalchargefix),
    parseFloat(formattedValues.totalchargevariable),
    parseFloat(formattedValues.chiffre_total),
    parseFloat(formattedValues.benefice),
  ];

  return (
    <div id="chart">
      <h2>Performance Financière</h2>
      <Chart options={chartOptions} series={chartSeries} type="radialBar" height={350} />
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', color: beneficeColor }}>
        <i className={beneficeIcon} style={{ fontSize: '24px', marginRight: '8px' }}></i>
        <span>{`Bénéfice: TND${beneficeDifference}`}</span>
      </div>
    </div>
  );
};

export default RadialChart;
