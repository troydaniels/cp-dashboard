import { configure, observable, action } from 'mobx';
import { GET_APPOINTMENTS } from '../Endpoints';
import appStore from './AppStore';

configure({
    enforceActions: 'always',
});

class AppointmentsStore {
    @observable appointmentMap = new Map(); // key: practitionerID, value: [appointment]

    @action
    resetStore = () => {
        this.appointmentMap = new Map();
    };

    @action
    setAppointments = (practitionerID, appointments) => {
        this.appointmentMap.set(practitionerID, appointments);
    };

    @action
    fetchAppointments = practitionerID => {
        const { startDate, endDate } = appStore;
        fetch(GET_APPOINTMENTS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                practitioner_id: practitionerID,
                start_date: startDate,
                end_date: endDate,
            }),
        })
            .then(response => response.json())
            .then(responseJSON => {
                this.setAppointments(practitionerID, responseJSON);
            })
            .catch(error => console.error(error));
    };
}

const appointmentsStore = new AppointmentsStore();
export default appointmentsStore;
