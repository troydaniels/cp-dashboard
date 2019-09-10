import React from 'react';
import { observer } from 'mobx-react';
import Practitioner from '../components/Practitioner';
import appStore from '../stores/AppStore';
import '../styles/App.css';

@observer
class App extends React.Component {
    componentWillMount = () => {
        appStore.getPractitionerData();
    };

    render = () => {
        return <Practitioner />;
    };
}

export default App;
