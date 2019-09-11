import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronCircleDown,
    faChevronCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Practitioner.css';
import { autorun } from 'mobx';
import Appointments from './Appointments';
import appStore from '../stores/AppStore';

@observer
class Practitioner extends React.Component {
    constructor(props) {
        super(props);
        const { startDate, endDate } = appStore;
        this.state = {
            showReport: false,
            cachedStartDate: startDate,
            cachedEndDate: endDate,
        };
    }

    componentDidMount() {
        // If our date range changes, lets close the summary report
        this.dispose = autorun(() => {
            const { startDate, endDate } = appStore;
            const { cachedStartDate, cachedEndDate } = this.state;
            if (startDate !== cachedStartDate || endDate !== cachedEndDate) {
                this.setState({
                    showReport: false,
                    cachedStartDate: startDate,
                    cachedEndDate: endDate,
                });
            }
        });
    }

    componentWillUnmount() {
        this.dispose && this.dispose();
    }

    handleClick = () => {
        const { showReport } = this.state;
        this.setState({ showReport: !showReport });
    };

    render() {
        const { name, id } = this.props;
        const { showReport } = this.state;
        return (
            <div className="practitioner-container">
                {/* eslint-disable-next-line  jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                <div
                    className="practitioner-header"
                    onClick={() => this.handleClick()}
                >
                    <div className="practitioner-name">{name}</div>
                    <div className="summary-icon-container">
                        <FontAwesomeIcon
                            icon={
                                showReport
                                    ? faChevronCircleUp
                                    : faChevronCircleDown
                            }
                            className="summary-icon"
                        />
                        <div className="summary-text">SUMMARY</div>
                    </div>
                </div>
                {showReport && <Appointments practitionerID={id} />}
            </div>
        );
    }
}

Practitioner.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export default Practitioner;
