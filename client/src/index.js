import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import './css/app.css';
import LiveMap from './workspace/LiveMap';

ReactDOM.render(<LiveMap/>, document.getElementById('root'))

registerServiceWorker()
