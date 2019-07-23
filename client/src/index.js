import React from 'react'
import ReactDOM from 'react-dom'
import LiveMap from './workspace/LiveMap'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<LiveMap />, document.getElementById('root'))

registerServiceWorker()
