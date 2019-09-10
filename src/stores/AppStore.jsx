import { configure, observable, action } from 'mobx';
import GetData from '../services/GetData';
import { GET_PRACTITIONERS } from '../Endpoints';

configure({
    enforceActions: 'always',
});

@observable
class AppStore {
    @action
    getPractitionerData = () => {
        GetData(GET_PRACTITIONERS).then(response => console.log(response));
    };
}

const appStore = new AppStore();
export default appStore;
