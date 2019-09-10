import React from 'react';
import { observer } from 'mobx-react';
import PractitionerList from '../components/PractitionerList';
import '../styles/App.css';

@observer
class App extends React.Component {
    render() {
        return <PractitionerList />;
    }
}

export default App;
