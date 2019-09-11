import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
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
                this.getAppointmentGrowthData(appointments);
                this.getCostGrowthData(appointments);
                this.getRevenueGrowthData(appointments);
            }
        });
    }

    componentWillUnmount() {
        this.dispose && this.dispose();
    }

    getStatisticsTotals = appointments => {
        let totalCost = 0, totalRevenue = 0;
        this.setState({ totalAppointments: appointments.length });
        appointments.forEach(appointment => {
            const { cost, revenue } = appointment;
            totalCost += cost;
            totalRevenue += revenue
        });
        this.setState({totalCost, totalRevenue});
    };

    getAppointmentGrowthData = appointments => {
        const { appointmentGrowthData } = this.state;
        appointments.forEach(appointment => {
            appointmentGrowthData.push([appointment.date, 1]);
        });
    };

    getCostGrowthData = appointments => {
        const { costGrowthData } = this.state;
        appointments.forEach(appointment => {
            costGrowthData.push([appointment.date, appointment.cost]);
        });
    };

    getRevenueGrowthData = appointments => {
        const { revenueGrowthData } = this.state;
        appointments.forEach(appointment => {
            revenueGrowthData.push([appointment.date, appointment.revenue]);
        });
    };

    render() {
        const {
            totalAppointments,
            totalCost,
            totalRevenue,
            appointmentGrowthData,
            costGrowthData,
            revenueGrowthData,
        } = this.state;
        return (
            <div className="appointment-statistics-container">
                <div className="appointment-statistics appointment-statistics-totals">
                    <div className="total-text">
                        TOTAL APPOINTMENTS
                    </div>
                    <div className="total-value">
                        {totalAppointments}
                    </div>
                    <div className="total-text">
                        TOTAL COST
                    </div>
                    <div className="total-value">
                        ${totalCost}
                    </div>
                    <div className="total-text">
                        TOTAL REVENUE
                    </div>
                    <div className="total-value">
                        ${totalRevenue}
                    </div>
                </div>
                <div className="appointment-statistics">
                    {appointmentGrowthData.length !== 0 && (
                        <AppointmentChart
                            title="appointments"
                            data={appointmentGrowthData}
                            yAxis="appointments"
                        />
                    )}
                </div>
                <div className="appointment-statistics">
                    {costGrowthData.length !== 0 && (
                        <AppointmentChart
                            title="cost"
                            data={costGrowthData}
                            yAxis="cost"
                        />
                    )}
                </div>
                <div className="appointment-statistics">
                    {revenueGrowthData.length !== 0 && (
                        <AppointmentChart
                            title="revenue"
                            data={revenueGrowthData}
                            yAxis="revenue"
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default AppointmentStatistics;
