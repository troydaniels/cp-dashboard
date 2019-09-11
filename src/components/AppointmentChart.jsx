import React from 'react';
import PropTypes from 'prop-types';
import { TimeSeries, Index } from 'pondjs';
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    BarChart,
    Resizable,
    styler,
} from 'react-timeseries-charts';
import '../styles/AppointmentChart.css';

class AppointmentChart extends React.Component {
    render() {
        const { data, title, yAxis, yAxisLabel, max } = this.props;

        const style = styler([{ key: yAxis, color: '#6eb99b' }]);
        // Sort... isn't `really` a prop in this case
        // eslint-disable-next-line react/prop-types
        const sequentialData = data.sort((a, b) => {
            return new Date(a[0]) - new Date(b[0]);
        });

        const series = new TimeSeries({
            name: title,
            columns: ['index', yAxis],
            points: sequentialData.map(([d, value]) => [
                Index.getIndexString('30d', new Date(d)),
                value,
            ]),
        });
        return (
            <>
                <div className="appointment-chart-title">{title}</div>
                <hr />
                <Resizable>
                    <ChartContainer
                        timeRange={series.range()}
                        format="month"
                        timeAxisAngledLabels
                    >
                        <ChartRow height="150">
                            <YAxis
                                id="count"
                                label={yAxisLabel}
                                min={0}
                                max={max}
                                format=".2f"
                                width="50"
                                type="linear"
                            />
                            <Charts>
                                <BarChart
                                    axis="count"
                                    style={style}
                                    spacing={1}
                                    columns={[yAxis]}
                                    series={series}
                                    minBarHeight={1}
                                />
                            </Charts>
                        </ChartRow>
                    </ChartContainer>
                </Resizable>
            </>
        );
    }
}

AppointmentChart.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    yAxis: PropTypes.string.isRequired,
    yAxisLabel: PropTypes.string.isRequired,
    max: PropTypes.number.isRequired,
};

export default AppointmentChart;
