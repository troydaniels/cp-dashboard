import React from 'react';
import { observer } from 'mobx-react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import appStore from '../stores/AppStore';
import '../styles/Header.css';
import logo from '../images/coreplus_logo.png';

@observer
class Header extends React.Component {
    onChange = date => {
        appStore.setDateRange(date);
    };

    render() {
        const { startDate, endDate } = appStore;
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
                            value={[startDate, endDate]}
                            format="d-M-y"
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
