import React from 'react';
import { observer } from 'mobx-react';
import practitionerListStore from '../stores/PractitionerListStore';
import Practitioner from './Practitioner';

@observer
class PractitionerList extends React.Component {
    constructor(props) {
        super(props);
        practitionerListStore.getPractitionerList();
    }

    render() {
        const { practitionerList } = practitionerListStore;
        return (
            <>
                {practitionerList.map(({ name }) => (
                    <Practitioner name={name} />
                ))}
            </>
        );
    }
}

export default PractitionerList;
