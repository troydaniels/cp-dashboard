import { configure, observable, action, toJS } from 'mobx';
import { GET_APPOINTMENTS } from '../Endpoints';

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
    fetchAppointments = (practitionerID, requestedRefresh = false) => {
        // Lets only fetch if we dont have values for the given practitionerID in our map
        // or if the user has explicitly requested a refresh of the data, to be nice to our
        // server, and save requesting the same information
        const noAppointmentData = !this.appointmentMap.get(practitionerID);
        if(noAppointmentData || requestedRefresh) {
            fetch(GET_APPOINTMENTS,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {practitioner_id: practitionerID}
                    ),
                })
                .then(response => response.json())
                .then(responseJSON => {
                    this.setAppointments(practitionerID, responseJSON);
                    console.log("responseJSON", responseJSON)
                })
                .catch(error => console.error(error));
        }
    };
}

const appointmentsStore = new AppointmentsStore();
export default appointmentsStore;
