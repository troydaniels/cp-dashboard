import React from 'react';
import { observer } from 'mobx-react';
import '../styles/AppointmentStatistics.css';
import AppointmentChart from './AppointmentChart';
import appointmentsStore from "../stores/AppointmentsStore";
import {autorun} from "mobx";

@observer
class AppointmentStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalAppointments: null,
            appointmentGrowthData: [],
            costGrowthData: [],
            revenueGrowthData: [],
        }
    }

    componentDidMount() {
        const {practitionerID} = this.props;

        // When we have finished fetching our appointments, we can update our statistics
        this.dispose = autorun(() => {
            const appointments = appointmentsStore.appointmentMap.get(practitionerID);
            if(appointments !== undefined) {
                this.setState({totalAppointments: appointments.length});

                this.getAppointmentGrowthData(appointments);
                this.getCostGrowthData(appointments);
                this.getRevenueGrowthData(appointments);
            }
        });
    }

    componentWillUnmount() {
        this.dispose && this.dispose();
    }

    getAppointmentGrowthData = (appointments) => {
        const {appointmentGrowthData} = this.state;
        appointments.forEach(appointment => {
            appointmentGrowthData.push([appointment.date, 1])
        });
    };

    getCostGrowthData = (appointments) => {
        const {costGrowthData} = this.state;
        appointments.forEach(appointment => {
            costGrowthData.push([appointment.date, appointment.cost])
        });
    };

    getRevenueGrowthData = (appointments) => {
        const {revenueGrowthData} = this.state;
        appointments.forEach(appointment => {
            revenueGrowthData.push([appointment.date, appointment.revenue])
        })
    };

    render() {
        const { totalAppointments, appointmentGrowthData, costGrowthData, revenueGrowthData } = this.state;
        console.log("revenueGrowthData.length", revenueGrowthData.length!==0)
        return (
            <div className="appointment-statistics-container">
                <div className="appointment-statistics total-appointments">
                    <div className="total-appointments-text">
                        TOTAL APPOINTMENTS
                    </div>
                    <div className="total-appointments-value">{totalAppointments}</div>
                </div>
                <div className="appointment-statistics">
                    {appointmentGrowthData.length !== 0 && (
                    <AppointmentChart title="appointments" data={appointmentGrowthData} yAxis="appointments"/>
                    )}
                </div>
                <div className="appointment-statistics">
                    {costGrowthData.length !== 0 && (
                    <AppointmentChart title="cost" data={costGrowthData} yAxis="cost"/>
                    )}
                </div>
                <div className="appointment-statistics">
                    {revenueGrowthData.length !== 0 && (
                    <AppointmentChart title="revenue" data={revenueGrowthData} yAxis="revenue"/>
                    )}
                </div>
            </div>
        );
    }
}

export default AppointmentStatistics;
