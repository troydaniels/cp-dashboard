import React from 'react';
import { observer } from 'mobx-react';
import '../styles/AppointmentStatistics.css';
import AppointmentChart from './AppointmentChart';

@observer
class AppointmentStatistics extends React.Component {
    render() {
        return (
            <div className="appointment-statistics-container">
                <div className="appointment-statistics total-appointments">
                    <div className="total-appointments-text">
                        TOTAL APPOINTMENTS
                    </div>
                    <div className="total-appointments-value">171</div>
                </div>
                <div className="appointment-statistics">
                    <AppointmentChart title="appointments" type="bar" />
                </div>
                <div className="appointment-statistics">
                    <AppointmentChart title="cost" type="line" />
                </div>
                <div className="appointment-statistics">
                    <AppointmentChart title="revenue" type="line" />
                </div>
            </div>
        );
    }
}

export default AppointmentStatistics;
