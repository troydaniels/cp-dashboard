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

    };

    getCostGrowthData = () => {

    };

    getRevenueGrowthData = () => {

    };

    render() {
        const {practitionerID} = this.props;
        const { totalAppointments } = this.state;
        const appointments = appointmentsStore.appointmentMap.get(practitionerID);

        return (
            <div className="appointment-statistics-container">
                <div className="appointment-statistics total-appointments">
                    <div className="total-appointments-text">
                        TOTAL APPOINTMENTS
                    </div>
                    <div className="total-appointments-value">{totalAppointments}</div>
                </div>
                <div className="appointment-statistics">
                    <AppointmentChart title="appointments" type="bar" appointments={appointments}/>
                </div>
                <div className="appointment-statistics">
                    <AppointmentChart title="cost" type="line" appointments={appointments}/>
                </div>
                <div className="appointment-statistics">
                    <AppointmentChart title="revenue" type="line" appointments={appointments}/>
                </div>
            </div>
        );
    }
}

export default AppointmentStatistics;
