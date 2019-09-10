import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import '../styles/Practitioner.css';
import PractitionerChart from './PractitionerChart';

@observer
class Practitioner extends React.Component {
    render() {
        const { name } = this.props;
        return (
            <div className="practitioner-container">
                <div className="practitioner-header">
                    <div className="practitioner-name">{name}</div>
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
    }
}

Practitioner.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Practitioner;
