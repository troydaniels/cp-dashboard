import { configure, observable, action } from 'mobx';
import GetData from '../services/GetData';
import GET_PRACTITIONERS from '../Endpoints';

configure({
    enforceActions: 'always',
});

class PractitionerListStore {
    @observable practitionerList = [];

    @action
    resetStore = () => {
        this.practitionerList = [];
    };

    @action
    setPractitionerList = practitionerList => {
        this.practitionerList = practitionerList;
    };

    @action
    getPractitionerList = () => {
        GetData(GET_PRACTITIONERS)
            .then(response => response.json())
            .then(responseJSON => {
                this.setPractitionerList(responseJSON);
            })
            .catch(error => console.error(error));
    };
}

const practitionerListStore = new PractitionerListStore();
export default practitionerListStore;
