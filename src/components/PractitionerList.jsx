import React from 'react';
import { observer } from 'mobx-react';
import practitionerListStore from '../stores/PractitionerListStore';
import Practitioner from './Practitioner';

@observer
class PractitionerList extends React.Component {
    constructor(props) {
        super(props);
        practitionerListStore.fetchPractitionerList();
    }

    componentWillUnmount() {
        practitionerListStore.resetStore();
    }

    render() {
        const { practitionerList } = practitionerListStore;
        return (
            <>
                {practitionerList.map(({ name, id }) => (
                    <Practitioner name={name} id={id} />
                ))}
            </>
        );
    }
}

export default PractitionerList;
