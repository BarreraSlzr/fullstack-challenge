import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './../../css/sidebarLocations.css';

export const locationAvailability = (open_time, close_time) => {
    close_time = (close_time.length > 5) ? moment(close_time) : moment(close_time, 'hh:mm');
    open_time = (open_time.length > 5) ? moment(open_time) : moment(open_time, 'hh:mm');
    return moment().isAfter(open_time) && moment().isBefore( close_time ) ? 'Open' : 'Closed';
}

const SidebarLocations = props => {
    const { locations = [] } = props;
    return (
        <div className='sidebar Locations'>
            {   
                locations.map( ({id: locationID, location_name = 'Awesome place', open_time= 'All day', close_time= undefined}, id) =>
                    <div key={'sideBarLocation'+id+ locationID} className='Location'>
                        <div className='Title'>
                            <span>{ location_name}</span>
                            <p className={locationAvailability(open_time, close_time)}>{ locationAvailability(open_time, close_time) }</p>
                        </div>
                        <div className='Info'>
                            <span>
                                Open at:
                                <p>{ (open_time.length > 5) ? moment(open_time).format('hh:mm a') : moment(open_time, 'hh:mm').format('hh:mm a')  }</p>
                            </span>
                            { close_time && 
                                <span>
                                    Close at:
                                <p>{ (close_time.length > 5) ? moment(close_time).format('hh:mm a') : moment(close_time, 'hh:mm').format('hh:mm a') }</p>
                                </span>
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

SidebarLocations.propTypes = {
    locations: PropTypes.array
}

export default SidebarLocations
