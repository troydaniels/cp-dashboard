import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-charts';
import '../styles/AppointmentChart.css';

const AppointmentChart = ({ type, title }) => {
    const data = React.useMemo(
        () => [
            {
                label: title,
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
            <div className="chart-title">{title}</div>
            <div className="chart-container">
                <Chart data={data} axes={axes} series={{ type }} tooltip />
            </div>
        </>
    );
};

AppointmentChart.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default AppointmentChart;
