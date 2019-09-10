import React from 'react';
import { Chart } from 'react-charts';
import '../styles/PractitionerChart.css';

const PractitionerChart = props => {
    const data = React.useMemo(
        () => [
            {
                label: props.title,
                data: [
                    ['JAN', 1],
                    ['FEB', 2],
                    ['MAR', 4],
                    ['APR', 2],
                    ['MAY', 7],
                ],
            },
        ],
        [],
    );

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'ordinal', position: 'bottom' },
            { type: 'linear', position: 'left' },
        ],
        [],
    );

    return (
        <>
            <div className="chart-title">{props.title}</div>
            <div className="chart-container">
                <Chart
                    data={data}
                    axes={axes}
                    series={{ type: props.type }}
                    tooltip
                />
            </div>
        </>
    );
};

export default PractitionerChart;
