import React from 'react';
import { observer } from 'mobx-react';
import Header from '../components/Header';
import PractitionerList from '../components/PractitionerList';
import '../styles/App.css';

@observer
class App extends React.Component {
    render() {
        return (
            <div className="app-container">
                <Header />
                <PractitionerList />
            </div>
        );
    }
}

export default App;
