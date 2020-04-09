import React from 'react';
import Clock from './components/clock'

import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrHeadModel
} from 'react-vr';

export default class react_project_360_app extends React.Component {
  render() {
    return (
      <View>

        <Pano source={asset('team-1.jpg')}/>
        <Clock />


        <Text
          style={{
            // backgroundColor: '#777879',
            fontSize: 0.8,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5], // x = between -9 or 9; y = between -9 or 9; 
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          Test
        </Text>

      </View>
    );
  }
};

// x y axis

class WelcomeToVR extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			aov: VrHeadModel.rotation(),
			colorX: 255,
			colorY: 0
		}

		// Log available listeners
		console.log('RCT Signals', RCTDeviceEventEmitter.addListener().subscriber._subscriptionsForType)
		
		// You may use 'onReceivedHeadMatrix' or others based on your needs
		// but 'onReceivedHeadMatrix' triggers infinitely in browsers.
		RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {
			
			// Log what event is happening

			console.log('=============')
			console.log('Event type', e)

			this.setState({
				aov: VrHeadModel.rotation()
			}, () => this.generateColors())

		});
	}

	generateColors = () => {
		// Valid color or pass zero to rgb
		const newColorX = this.state.aov[0] < 90 ? 255-Math.abs(this.state.aov[0]*2.8) : 0
		const newColorY = Math.abs(this.state.aov[1]) < 90 ? Math.abs(this.state.aov[1]*2.8) : 0

		const newColorXRounded = Number(newColorX).toFixed(0)
		const newColorYRounded = Number(newColorY).toFixed(0)

		this.setState({
			colorX: newColorXRounded,
			colorY: newColorYRounded,
		})
	}
  render() {

	// For the sake of the example we used rotation
	// But horizontalFov() and verticalFov() are also available.
	const xRotRounded = Number((this.state.aov[0]).toFixed(0))
	const yRotRounded = Number((this.state.aov[1]).toFixed(0))

	console.log('xRotRounded: ' + xRotRounded + '°', 'yRotRounded: ' + yRotRounded + '°')
	
	return (
	  <View>
		<Pano source={asset('team-1.jpg')}/>
			<Text
			style={{
				backgroundColor: `rgb(${this.state.colorX}, ${this.state.colorY}, 55)`,
				fontSize: 0.8,
				layoutOrigin: [0.5, 0.5],
				paddingLeft: 0.2,
				paddingRight: 0.2,
				textAlign: 'center',
				textAlignVertical: 'center',
				transform: [{translate: [0, 0, -3]}, {scale: 0.5}],
			}}>
			x: {xRotRounded}° y: {yRotRounded}°
			</Text>
	  </View>
	);
  }
};

AppRegistry.registerComponent('WelcomeToVR', () => WelcomeToVR);
AppRegistry.registerComponent('react_project_360_app', () => react_project_360_app);
