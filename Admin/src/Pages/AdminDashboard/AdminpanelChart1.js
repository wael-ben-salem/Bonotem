import React from "react";
import ReactApexChart from "react-apexcharts";

const RadialChart1 = ({ value }) => {

    const percentageValue = (value / 100000) * 10000;

    const series = [percentageValue]; // Use the value passed from props
    const radialOptions = {
        chart: {
            type: 'radialBar',
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#0ab39c'],
        stroke: {
            lineCap: 'round'
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: '70%'
                },
                track: {
                    margin: 0,
                },
    
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: 5,
                        show: true
                    }
                }
            }
        }
    };
  
    return (
        <React.Fragment>
            <ReactApexChart
                options={radialOptions}
                series={series}
                type="radialBar"
                height="72"
                width="72"
            />
        </React.Fragment>
    );
};

export default RadialChart1;
