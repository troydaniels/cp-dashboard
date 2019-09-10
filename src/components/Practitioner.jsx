import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import '../styles/Practitioner.css';
import AppointmentStatistics from './AppointmentStatistics';

@observer
class Practitioner extends React.Component {
    render() {
        const { name } = this.props;
        return (
            <div className="practitioner-container">
                <div className="practitioner-header">
                    <div className="practitioner-name">{name}</div>
                </div>
                <AppointmentStatistics />
            </div>
        );
    }
}

Practitioner.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Practitioner;
