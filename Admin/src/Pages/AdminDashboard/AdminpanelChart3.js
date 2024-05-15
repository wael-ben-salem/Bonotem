import { replace } from "formik";
import React from "react";
import ReactApexChart from "react-apexcharts";

const RadialChart3 = ({ value }) => {
    // Calculez la valeur en pourcentage par rapport à 1000 %
    const percentageValue = (value / 100000) * 1000;

    // Séries pour le graphique radial
    const series = [percentageValue];

    // Options du graphique radial avec le formatter
    const radialOptions = {
        chart: {
            type: 'radialBar',
            sparkline: {
                enabled: true
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toLocaleString('fr-FR', { style: 'currency', currency: 'GBP' });
            }
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

export default RadialChart3;
