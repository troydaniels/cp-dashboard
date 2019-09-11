import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import FadeLoader from 'react-spinners/FadeLoader';
import '../styles/AppointmentStatistics.css';
import { autorun } from 'mobx';
import AppointmentChart from './AppointmentChart';
import appointmentsStore from '../stores/AppointmentsStore';

@observer
class AppointmentStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalAppointments: null,
            totalCost: null,
            totalRevenue: null,
            appointmentGrowthData: [],
            costGrowthData: [],
            revenueGrowthData: [],
            maxGrowth: null,
            maxCost: null,
            maxRevenue: null,
        };
    }

    componentDidMount() {
        const { practitionerID } = this.props;

        // When we have finished fetching our appointments, we can update our statistics
        this.dispose = autorun(() => {
            const appointments = appointmentsStore.appointmentMap.get(
                practitionerID,
            );
            if (appointments !== undefined) {
                this.getStatisticsTotals(appointments);

                // For graphing purposes, lets first group our appointments by month
                const groupedAppointments = lodash.groupBy(
                    appointments,
                    appointment => moment(appointment.date).startOf('month'),
                );

                console.log('groupedAppointments', groupedAppointments);
                this.getAppointmentGrowthData(groupedAppointments);
                this.getCostGrowthData(groupedAppointments);
                this.getRevenueGrowthData(groupedAppointments);
            }
        });
    }

    componentWillUnmount() {
        this.dispose && this.dispose();
    }

    getStatisticsTotals = appointments => {
        let totalCost = 0;
        let totalRevenue = 0;
        this.setState({ totalAppointments: appointments.length });
        appointments.forEach(appointment => {
            const { cost, revenue } = appointment;
            totalCost += cost;
            totalRevenue += revenue;
        });
        this.setState({ totalCost, totalRevenue });
    };

    getAppointmentGrowthData = groupedAppointments => {
        const { appointmentGrowthData } = this.state;
        let maxGrowth = null;

        // ESlint really doesnt want me to use this for..in loop
        // however I'm explicitly checking for properties
        // eslint-disable-next-line no-restricted-syntax, no-unused-vars
        for (const key in groupedAppointments) {
            // eslint-disable-next-line no-prototype-builtins
            if (groupedAppointments.hasOwnProperty(key)) {
                // The height of each bar is simply the number of appointments in that month
                appointmentGrowthData.push([
                    key,
                    groupedAppointments[key].length,
                ]);
            }
        }
        // Lets find the vertical scale for our graph
        appointmentGrowthData.forEach(entry => {
            if (entry[1] > maxGrowth) {
                [, maxGrowth] = entry;
            }
        });
        this.setState({ maxGrowth });
    };

    getCostGrowthData = groupedAppointments => {
        const { costGrowthData } = this.state;
        let maxCost = null;

        // eslint-disable-next-line no-restricted-syntax, no-unused-vars
        for (const key in groupedAppointments) {
            // eslint-disable-next-line no-prototype-builtins
            if (groupedAppointments.hasOwnProperty(key)) {
                // The height of each bar is the sum of the appointment costs that month
                let sum = 0;
                for (
                    let i = 0, { length } = groupedAppointments[key];
                    i < length;
                    i += 1
                ) {
                    sum += groupedAppointments[key][i].cost;
                }
                costGrowthData.push([key, sum]);
            }
        }
        costGrowthData.forEach(entry => {
            if (entry[1] > maxCost) {
                [, maxCost] = entry;
            }
        });
        this.setState({ maxCost });
    };

    getRevenueGrowthData = groupedAppointments => {
        const { revenueGrowthData } = this.state;
        let maxRevenue = null;

        // eslint-disable-next-line no-restricted-syntax, no-unused-vars
        for (const key in groupedAppointments) {
            // eslint-disable-next-line no-prototype-builtins
            if (groupedAppointments.hasOwnProperty(key)) {
                // The height of each bar is the sum of the appointment revenue that month
                let sum = 0;
                for (
                    let i = 0, { length } = groupedAppointments[key];
                    i < length;
                    i += 1
                ) {
                    sum += groupedAppointments[key][i].revenue;
                }
                revenueGrowthData.push([key, sum]);
            }
        }
        revenueGrowthData.forEach(entry => {
            if (entry[1] > maxRevenue) {
                [, maxRevenue] = entry;
            }
        });
        this.setState({ maxRevenue });
    };

    render() {
        const {
            totalAppointments,
            totalCost,
            totalRevenue,
            appointmentGrowthData,
            costGrowthData,
            revenueGrowthData,
            maxGrowth,
            maxCost,
            maxRevenue,
        } = this.state;
        return (
            <div className="appointment-statistics-container">
                <div className="appointment-statistics appointment-statistics-totals">
                    {!totalAppointments && (
                        <FadeLoader
                            sizeUnit="px"
                            size={150}
                            color="#ffffff"
                            loading
                        />
                    )}
                    {totalAppointments && (
                        <>
                            <div className="total-text">TOTAL APPOINTMENTS</div>
                            <div className="total-value">
                                {totalAppointments}
                            </div>
                            <div className="total-text">TOTAL COST</div>
                            <div className="total-value">${totalCost}</div>
                            <div className="total-text">TOTAL REVENUE</div>
                            <div className="total-value">${totalRevenue}</div>
                        </>
                    )}
                </div>
                <div className="appointment-statistics">
                    {appointmentGrowthData.length !== 0 && (
                        <AppointmentChart
                            title="APPOINTMENTS"
                            data={appointmentGrowthData}
                            yAxis="appointments"
                            yAxisLabel="Monthly Appointments"
                            max={maxGrowth}
                        />
                    )}
                </div>
                <div className="appointment-statistics">
                    {costGrowthData.length !== 0 && (
                        <AppointmentChart
                            title="COST"
                            data={costGrowthData}
                            yAxis="cost"
                            yAxisLabel="Monthly Cost in $"
                            max={maxCost}
                        />
                    )}
                </div>
                <div className="appointment-statistics">
                    {revenueGrowthData.length !== 0 && (
                        <AppointmentChart
                            title="REVENUE"
                            data={revenueGrowthData}
                            yAxis="revenue"
                            yAxisLabel="Monthly Revenue in $"
                            max={maxRevenue}
                        />
                    )}
                </div>
            </div>
        );
    }
}

AppointmentStatistics.propTypes = {
    practitionerID: PropTypes.number.isRequired,
};

export default AppointmentStatistics;
