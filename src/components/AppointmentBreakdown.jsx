import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
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
            clientName: null,
            type: null,
            duration: null,
        };
    }

    handleClick = () => {
        const { showReport } = this.state;
        // Lets reset our selected appointment every time the full report is toggled
        this.setState({
            showReport: !showReport,
            clientName: null,
            type: null,
            duration: null,
        });
    };

    handleAppointmentSelection = appointmentID => {
        const { practitionerID } = this.props;
        const appointments = appointmentsStore.appointmentMap.get(
            practitionerID,
        );

        for (let i = 0, { length } = appointments; i < length; i += 1) {
            if (appointments[i].id === appointmentID) {
                this.setState({
                    clientName: appointments[i].client_name,
                    type: appointments[i].appointment_type,
                    duration: appointments[i].duration,
                });
                break;
            }
        }
    };

    render() {
        const { showReport, clientName, type, duration } = this.state;
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
                },
            },
            {
                Header: 'Cost',
                accessor: 'cost',
                Cell: props => `$${props.value}`,
            },
            {
                Header: 'Revenue',
                accessor: 'revenue',
                Cell: props => `$${props.value}`,
            },
            {
                Header: 'ID',
                accessor: 'id',
            },
        ];

        return (
            <div className="appointment-breakdown-container">
                {showReport && (
                    <div className="breakdown-report-container">
                        <div className="breakdown-information-container">
                            {clientName && (
                                <>
                                    <div className="breakdown-title">
                                        APPOINTMENT DETAILS
                                    </div>
                                    <div className="breakdown-name">
                                        Name: <b>{clientName}</b>
                                    </div>
                                    <div className="breakdown-type">
                                        Type: <b>{type}</b>
                                    </div>
                                    <div className="breakdown-duration">
                                        Duration: <b>{duration} min</b>
                                    </div>
                                </>
                            )}
                            {!clientName && (
                                <div className="breakdown-empty">
                                    NO APPOINTMENT SELECTED
                                </div>
                            )}
                        </div>
                        <div className="breakdown-table-container">
                            <ReactTable
                                data={appointments}
                                columns={columns}
                                defaultPageSize={6}
                                defaultSorted={[
                                    {
                                        id: 'date',
                                        desc: true,
                                    },
                                ]}
                                showPageSizeOptions={false}
                                getTdProps={(state, rowInfo) => {
                                    return {
                                        onClick: () => {
                                            const { id } = rowInfo.row;
                                            this.handleAppointmentSelection(id);
                                        },
                                    };
                                }}
                            />
                        </div>
                    </div>
                )}
                {/* eslint-disable-next-line  jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
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

AppointmentBreakdown.propTypes = {
    practitionerID: PropTypes.number.isRequired,
};

export default AppointmentBreakdown;
