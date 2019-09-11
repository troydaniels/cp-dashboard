import { configure, observable, action } from 'mobx';
import { GET_PRACTITIONERS } from '../Endpoints';

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
    fetchPractitionerList = () => {
        fetch(GET_PRACTITIONERS, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(responseJSON => {
                this.setPractitionerList(responseJSON);
            })
            .catch(error => console.error(error));
    };
}

const practitionerListStore = new PractitionerListStore();
export default practitionerListStore;
