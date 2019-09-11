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
        const { data, title, yAxis } = this.props;

        const style = styler([
            { key: yAxis, color: '#A5C8E1', selected: '#2CB1CF' },
        ]);
        const sequentialData = data.sort((a, b) => {
            return new Date(a[0]) - new Date(b[0]);
        });

        const series = new TimeSeries({
            name: title,
            columns: ['index', yAxis],
            points: sequentialData.map(([d, value]) => [
                Index.getIndexString('1h', new Date(d)),
                value,
            ]),
        });
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <b>{title}</b>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <Resizable>
                            <ChartContainer
                                timeRange={series.range()}
                                format="month"
                            >
                                <ChartRow height="150">
                                    <YAxis
                                        id="count"
                                        label="Rainfall (inches/hr)"
                                        min={0}
                                        format=".2f"
                                        width="70"
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
                    </div>
                </div>
            </div>
        );
    }
}

AppointmentChart.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default AppointmentChart;
