import React from 'react'
import PropTypes from 'prop-types';
import Input from '../forms/Input'
import moment from 'moment'

class AddLocationForm extends React.Component {
  static propTypes = {
    onSubmitForm: PropTypes.func,
    onChange: PropTypes.func,
    addLocationValues: PropTypes.object
  }

  render() {
    let {
      longitude = '',
      latitude = '',
      location_name = '',
      open_time = moment().format('HH:mm'),
      close_time = moment().format('HH:mm')
    } = this.props.addLocationValues

    return (
      <form onSubmit={this.props.onSubmitForm}>
        <Input
          labelText='Location name'
          value={location_name}
          onChange={this.props.onChange}
          placeholder='Your new location name'
          className='input'
          name='location_name'
          type='text'
        />
        <Input
          labelText='Opens at'
          value={open_time}
          onChange={this.props.onChange}
          placeholder='09:00'
          className='input'
          name='open_time'
          type='text'
        />
        <Input
          labelText='Closes at'
          value={close_time}
          onChange={this.props.onChange}
          placeholder='18:00'
          className='input'
          name='close_time'
          type='text'
        />
        <Input
          labelText='Longitude'
          value={longitude}
          onChange={this.props.onChange}
          placeholder='-103.3733'
          className='input'
          name='longitude'
          type='text'
        />
        <Input
          labelText='Latitude'
          value={latitude}
          onChange={this.props.onChange}
          placeholder='20.669142'
          className='input'
          name='latitude'
          type='text'
        />
        <Input
          value='Submit'
          type='submit'
          className='button popup-button'
        />
      </form>
    );
  }
}

export default AddLocationForm