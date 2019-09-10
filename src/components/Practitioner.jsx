import React from 'react';
import '../styles/Practitioner.css';
import TemporaryChart from '../components/TemporaryChart';

class Practitioner extends React.Component {
    render() {
        const practitioner = 'Dr Phillip Morris';
        return (
            <div className="practitioner-container">
                <div className="practitioner-header">
                    <div className="practitioner-name">{practitioner}</div>
                </div>
                <div className="practitioner-statistics-container">
                    <div className="practitioner-statistics total-appointments">
                        <div className="total-appointments-text">
                            APPOINTMENTS
                        </div>
                        <div className="total-appointments-value">171</div>
                    </div>
                    <div className="practitioner-statistics">
                        <TemporaryChart />
                    </div>
                    <div className="practitioner-statistics">
                        <TemporaryChart />
                    </div>
                    <div className="practitioner-statistics">
                        <TemporaryChart />
                    </div>
                </div>
            </div>
        );
    }
}

export default Practitioner;
