import React from 'react';
import '../styles/Practitioner.css';
import PractitionerChart from './PractitionerChart';

class Practitioner extends React.Component {
    render = () => {
        const practitioner = 'Dr Phillip Morris';
        return (
            <div className="practitioner-container">
                <div className="practitioner-header">
                    <div className="practitioner-name">{practitioner}</div>
                </div>
                <div className="practitioner-statistics-container">
                    <div className="practitioner-statistics total-appointments">
                        <div className="total-appointments-text">
                            TOTAL APPOINTMENTS
                        </div>
                        <div className="total-appointments-value">171</div>
                    </div>
                    <div className="practitioner-statistics">
                        <PractitionerChart title="appointments" type="bar" />
                    </div>
                    <div className="practitioner-statistics">
                        <PractitionerChart title="cost" type="line" />
                    </div>
                    <div className="practitioner-statistics">
                        <PractitionerChart title="revenue" type="line" />
                    </div>
                </div>
            </div>
        );
    };
}

export default Practitioner;
