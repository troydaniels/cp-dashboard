import { configure, observable, action } from 'mobx';

configure({
    enforceActions: 'always',
});

class AppStore {
    @observable startDate = new Date('January 1, 2017 00:00:00');

    @observable endDate = new Date('December 31, 2018 12:00:00');

    @action
    resetStore = () => {
        this.startDate = undefined;
        this.endDate = undefined;
    };

    @action
    setDateRange = date => {
        if (date) {
            [this.startDate, this.endDate] = date;
        } else {
            this.startDate = null;
            this.endDate = null;
        }
    };
}

const appStore = new AppStore();
export default appStore;
