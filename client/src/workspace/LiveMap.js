import React from 'react'
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl } from 'react-mapbox-gl'
import EditLocationForm from '../components/map/EditLocationForm'
import PopupFormat from '../components/map/PopupFormat'
import AddLocationForm from '../components/map/AddLocationForm'
import config from '../config/index'
import axios from 'axios'
import moment from 'moment'
import styled from 'styled-components'
import SidebarLocations from '../components/sidebar';

const PopupStyle = styled.div`
  background: white;
  color: #978ed1;
  padding: 6px;
  border-radius: 2px;
`;

// this token was taken from internet :)
const Map = ReactMapboxGl({ accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA' })
class LiveMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      center: [-103.3359, 20.6576],
      zoom: 13,
      locations: [],
      location: undefined,
      addLocation: {},
      isEditing: false,
      isAddingLocation: false,
      isHideSidebar: false
    };
  }

  /**
   * Extract all locations from database when the entire map is running well
   */
  componentDidMount() {
    axios.get(`${config.lmbApi}/api/locations`)
      .then((response) => {
        this.setState({ locations: response.data })
      })
      .catch(error => {
        throw error
      })
  }

  // I use this function just for closing a pop-up if there is a location assigned
  onMapMove () {
    if (this.state.location) {
      this.setState({ location: undefined })
    }
  }

  // When you click on a marker we should set a location into the state to open a pop-up
  onMarkerClicked (location) {
    this.setState({
      location,
      isEditing: false
    })
  }

  /**
   *  When you drag a marker to another place it should be stored on the database.
   * @param {Object} location current location object which is moving around the map
   * @param {Object} e element event
   */
  onDragEndMarker (location, e) {
    axios.put(`${config.lmbApi}/api/locations`, {
      id: location.id,
      longitude: e.lngLat.lng.toString(),
      latitude: e.lngLat.lat.toString()
    })
    .then(response => {
      const updatedLocation = response.data
      let updateStateLocations = this.state.locations.map(stateLocation => {
        if (stateLocation.id === location.id) {
          return updatedLocation
        }
        return stateLocation
      })
      this.setState({ locations: updateStateLocations, location: undefined, isEditing: false })
    })
    .catch(err => {
      throw err
    })
  }

  // setting an style when hovering to the marker
  onMouseHover (cursor, { map }) {
    map.getCanvas().style.cursor = cursor;
  }
  /**
   * Simple function to know which view should the user see when clicking on Edit or Add Location button
   */
  editLocation () {
    this.setState({ isEditing: !this.state.isEditing })
  }

  toggleAddingLocation() {
    this.setState({ isAddingLocation: !this.state.isAddingLocation })
  }

  toggleSidebarVisibility() {
    this.setState({ isHideSidebar: !this.state.isHideSidebar })
  }

  /**
   * This method allow the application to modify a location
   * @param {Object} event form event object
   */
  onSubmitLocation (event) {
    let { longitude, latitude, location_name, open_time, close_time, id } = this.state.location

    axios.put(`${config.lmbApi}/api/locations`, {
      id,
      longitude: longitude.toString(),
      latitude: latitude.toString(),
      location_name,
      open_time: moment(open_time, 'HH:mm').format(),
      close_time: moment(close_time, 'HH:mm').format(),
    })
    .then(response => {
      const updatedLocation = response.data
      let updateStateLocations = this.state.locations.map(stateLocation => {
        if (stateLocation.id === id) {
          return updatedLocation
        }
        return stateLocation
      })
      this.setState({ locations: updateStateLocations, isEditing: !this.state.isEditing })
    })
    .catch(err => {
      throw err
    })
    event.preventDefault();
  }

  /**
   *
   * @param {Object} event onChange function sent from web location form
   */
  onLocationValueChange (event) {
    let location = this.state.location || {}
    location[event.target.name] = event.target.value
    this.setState({ location })
  }

  /**
   * This method allow the application to submit new locations into the map
   * @param {Object} event form event object
   */
  onSubmitNewLocation (event) {
    event.preventDefault();
    let { longitude, latitude, location_name, open_time = moment().format('HH:mm'), close_time = moment().format('HH:mm') } = this.state.addLocation

    axios.post(`${config.lmbApi}/api/locations`, {
      longitude: longitude.toString(),
      latitude: latitude.toString(),
      location_name,
      open_time: open_time,
      close_time: close_time
    })
    .then(response => {
      this.setState({
        locations: [...this.state.locations, ...response.data],
        isEditing: false,
        isAddingLocation: false,
        addLocation: {}
      })
    })
    .catch(err => {
      throw err
    })
  }

  /**
   * This method allow the app to store properties from a new location
   * @param {Object} event form event object
   */
  onAddLocationChange (event) {
    let addLocation = this.state.addLocation || {}
    addLocation[event.target.name] = event.target.value
    this.setState({ addLocation })
  }

  /**
   * Method to remove location from map, backend will soft delete this location.
   */
  removeLocation () {
    let { id } = this.state.location
    if (window.confirm('Do you really want to remove this awesome marker :C ')) {
      axios.delete(`${config.lmbApi}/api/locations`, {
        data: { id }
      })
      .then(() => {
        let updatedLocations = this.state.locations.filter(location => location.id !== id);
        this.setState({ locations: updatedLocations, isEditing: false, location: undefined })
      })
      .catch(err => {
        throw err
      })
    }
  }

  render() {
    const { center, zoom, location, isEditing, isAddingLocation, isHideSidebar, locations } = this.state;
    return (
      <div>
        {isAddingLocation &&
          <AddLocationForm
            onSubmitForm={this.onSubmitNewLocation.bind(this)}
            onChange={this.onAddLocationChange.bind(this)}
            addLocationValues={this.state.addLocation} />
        }
        <Map
          containerStyle={{
            height: '98vh',
            width: '100%'
          }}
          style='mapbox://styles/mapbox/navigation-guidance-day-v2'
          center={center}
          zoom={[zoom]}
          onMoveStart={this.onMapMove.bind(this)} >
          <ZoomControl position="top-left" />
          <div className='overMap overMapButtons'>
            <button
              className='button'
              onClick={this.toggleAddingLocation.bind(this)} >
              {isAddingLocation ? 'Close Form' :'Add Location'}
            </button>
              {
                locations.length &&
                <button
                    className='button'
                    onClick={ () => this.toggleSidebarVisibility()} >
                    { isHideSidebar ? 'Show all locations' :'Hide all locations'} 
                </button>
              }
              {
                locations.length && !isHideSidebar && 
                <SidebarLocations locations={ locations }/> } )
              }
          </div> 
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "circle-15" }} >
              {this.state.locations.map((location) => (
                <Feature key={location.id}
                  onMouseEnter={this.onMouseHover.bind(this, 'pointer')}
                  onMouseLeave={this.onMouseHover.bind(this, '')}
                  onDragEnd={this.onDragEndMarker.bind(this, location)}
                  coordinates={[location.longitude, location.latitude]}
                  onClick={this.onMarkerClicked.bind(this, location)}
                  draggable={true}
                />
              ))}
          </Layer>
          {location &&
            <Popup
              key={location.id}
              offset={8}
              dynamicPosition={true}
              coordinates={[location.longitude, location.latitude]} >
              <PopupStyle>
                {isEditing ?
                <EditLocationForm
                  onSubmitForm={this.onSubmitLocation.bind(this)}
                  onChange={this.onLocationValueChange.bind(this)}
                  locationValues={location} />
                :
                <PopupFormat
                  onClick={this.editLocation.bind(this)}
                  onClickDelete={this.removeLocation.bind(this)}
                  locationValues={location} />
                }
              </PopupStyle>
            </Popup>
          }
        </Map>
      </div>
    )
  }
}

export default LiveMap
