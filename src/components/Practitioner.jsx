import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons'

import '../styles/Practitioner.css';
import Appointments from "./Appointments";

@observer
class Practitioner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showReport: false,
        }
    }

    handleClick = () => {
        const {showReport} = this.state;
        this.setState({showReport: !showReport})
    };

    render() {
        const { name, id } = this.props;
        const { showReport } = this.state;
        return (
            <div className="practitioner-container">
                <div className="practitioner-header" onClick={() => this.handleClick()}>
                    <div className="practitioner-name">{name}</div>
                    <div className="summary-icon-container">
                        <FontAwesomeIcon icon={showReport ? faChevronCircleUp : faChevronCircleDown} className="summary-icon"/>
                        <div className="summary-text">SUMMARY</div>
                    </div>
                </div>
                {showReport && (
                    <Appointments practitionerID={id}/>
                )}
            </div>
        );
    }
}

Practitioner.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Practitioner;
