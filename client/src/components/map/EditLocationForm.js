import React from 'react'
import PropTypes from 'prop-types';
import Input from '../forms/Input'

class EditLocationForm extends React.Component {
  static propTypes = {
    onSubmitForm: PropTypes.func,
    onChange: PropTypes.func,
    locationValues: PropTypes.object
  }

  render() {
    let { location_name = '', open_time = '', close_time = '' } = this.props.locationValues
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
          value='Submit'
          type='submit'
          className='button popup-button'
        />
      </form>
    );
  }
}

export default EditLocationForm