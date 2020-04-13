import React, { Component } from 'react'
import {
    VrButton,
    View,
    Text,
    Image,
    asset
} from 'react-vr'
// import { Link } from 'react-router-dom'

export default class Clock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayingClockText: false
        }
        this.toggleDisplayText = this.toggleDisplayText.bind(this)
    }

    toggleDisplayText() {
        if (!this.state.displayingClockText) {
            this.setState({ displayingClockText: true })

        } else {
            this.setState({ displayingClockText: false })
        }
    }

    render() {
        return (
            <View>
                <VrButton onClick={this.toggleDisplayText}>
                    {this.state.displayingClockText === true ?
                        (
                            <View>
                                <Text
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: '#777879',
                                        fontSize: 0.7,
                                        fontWeight: '400',
                                        layoutOrigin: [0.7, 0.7],
                                        paddingLeft: 0.2,
                                        paddingRight: 0.2,
                                        textAlign: 'center',
                                        textAlignVertical: 'center',
                                        transform: [{ translate: [19, 10.5, 8] }, { rotateY: -90 }],
                                    }}>
                                    Check out my new project
                                    {/* <Link to="http://waltrib.com">Walt</Link> */}
                        </Text>
                            </View>
                        )
                        : (
                                <Image
                                    source={asset('clock.png')}
                                    style={{
                                        position: 'absolute',
                                        width: 3,
                                        height: 3,
                                        layoutOrigin: [0.7, 0.7],
                                        transform: [{ translate: [19, 10.5, 8] }, { rotateY: -90 }],
                                    }}
                                    />
                        )
                    }

                </VrButton>
            </View>

        )
    }
}


module.exports = Clock
