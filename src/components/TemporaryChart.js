import React from 'react';
import { Chart } from 'react-charts';

const TemporaryChart = () => {
    const data = React.useMemo(
        () => [
            {
                label: 'Series 1',
                data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]],
            },
            {
                label: 'Series 2',
                data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]],
            },
        ],
        [],
    );

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' },
        ],
        [],
    );

    return <Chart data={data} axes={axes} />;
};

export default TemporaryChart;
