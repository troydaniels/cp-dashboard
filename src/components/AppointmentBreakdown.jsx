import React from 'react';
import { observer } from 'mobx-react';
import ReactTable from 'react-table';
import Moment from 'react-moment';
import 'react-table/react-table.css';
import '../styles/AppointmentBreakdown.css';
import appointmentsStore from '../stores/AppointmentsStore';

@observer
class AppointmentBreakdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showReport: false,
        };
    }

    handleClick = () => {
        const { showReport } = this.state;
        this.setState({ showReport: !showReport });
    };

    render() {
        const { showReport } = this.state;
        const { practitionerID } = this.props;
        const appointments = appointmentsStore.appointmentMap.get(
            practitionerID,
        );
        const columns = [
            {
                Header: 'Date',
                accessor: 'date',
                Cell: props => (
                    <Moment format="DD/MM/YYYY" className="appointment-date">
                        {props.value}
                    </Moment>
                ),
                sortMethod: (a, b) => {
                    return new Date(a) - new Date(b);
                }
            },
            {
                Header: 'Cost',
                accessor: 'cost',
            },
            {
                Header: 'Revenue',
                accessor: 'revenue',
            },
        ];

        return (
            <div className="appointment-breakdown-container">
                {showReport && (
                    <div className="breakdown-report-container">
                        <div className="breakdown-information-container" />
                        <div className="breakdown-table-container">
                            <ReactTable
                                data={appointments}
                                columns={columns}
                                defaultPageSize={6}
                                defaultSorted={[
                                    {
                                        id: "date",
                                        desc: true
                                    }
                                ]}
                                showPageSizeOptions={false}
                            />
                        </div>
                    </div>
                )}
                <div
                    className="appointment-breakdown-toggle"
                    onClick={() => this.handleClick()}
                >
                    <div className="appointment-breakdown-text">
                        {!showReport && <>MORE</>}
                        {showReport && <>LESS</>}
                    </div>
                </div>
            </div>
        );
    }
}

export default AppointmentBreakdown;
