import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import appointmentsStore from '../stores/AppointmentsStore';
import AppointmentStatistics from './AppointmentStatistics';
import AppointmentBreakdown from './AppointmentBreakdown';

@observer
class Appointments extends React.Component {
    constructor(props) {
        super(props);
        const { practitionerID } = this.props;
        appointmentsStore.fetchAppointments(practitionerID);
    }

    componentDidMount() {
        appointmentsStore.resetStore();
    }

    render() {
        const { practitionerID } = this.props;
        return (
            <>
                <AppointmentStatistics practitionerID={practitionerID} />
                <AppointmentBreakdown practitionerID={practitionerID} />
            </>
        );
    }
}

Appointments.propTypes = {
    practitionerID: PropTypes.number.isRequired,
};

export default Appointments;
