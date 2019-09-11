import React from 'react';
import { observer } from 'mobx-react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '../styles/Header.css';
import logo from '../images/coreplus_logo.png';

@observer
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: [new Date(), new Date()],
        };
    }

    onChange = date => this.setState({ date });

    render() {
        const { date } = this.state;
        return (
            <div className="header-container">
                <div className="logo-container">
                    <img src={logo} alt="Coreplus Logo" width="250" />
                </div>
                <div className="report-details-container">
                    <div className="report-controls-container">
                        <div className="date-range-text">REPORT FOR</div>
                        <DateRangePicker
                            className="date-range-picker"
                            onChange={this.onChange}
                            value={date}
                        />
                    </div>
                    <div className="report-title">
                        PRACTITIONER FINANCIAL REPORTS
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
