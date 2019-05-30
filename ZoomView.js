import React, { Component } from 'react';
import { Animated, Easing, View, Image, Dimensions, ScrollView, TouchableOpacity, Text } from 'react-native';

const deviceWidth = Dimensions.get('window').width
const DISMISS_MODAL_THRESHOLD = 150 //distance we have to scroll in the y direction to dismiss the carousel



class ZoomView extends Component {

  static defaultProps = {
    doAnimateZoomReset: false,
    maximumZoomScale: 2,
    minimumZoomScale: 1,
    zoomed: false,
    zoomEnabled: false,
    zoomHeight: 219,
    zoomWidth: deviceWidth,
  }

  state = {
    startY: null, //y position of touch when we start scrolling on zoom view 
  }

  componentDidUpdate(prevProps) {
    if (prevProps.zoomed === true && this.props.zoomed === false) { //make sure we are scrolled to top
      this.handleResetZoomScale()
    }
  }

  setZoomRef = node => {
    if (node) {

      this.zoomRef = node
      this.scrollResponderRef = this.zoomRef.getScrollResponder()

      this.scrollResponderRef.scrollResponderHandleTouchStart = (event) => {
        const isZoom = event.nativeEvent.touches.length > 1 ? true : false

        if (!this.props.zoomed) {
          this.setState({ startY: event.nativeEvent.locationY })
        }

        if (isZoom) {
          if (!this.props.zoomed) {
            this.props.onZoomed()
          }
        }
      }

      this.scrollResponderRef.scrollResponderHandleTouchEnd = (event) => {
        console.log('end')
        if (this.props.zoomed) {
          this.imageRef.measure((ox, oy, width) => {
            if (width <= this.props.zoomWidth) {
              //this.props.onZoomClosePress() //MH TODO: go back to isolated carousel
              this.props.onZoomExit()
              return
            }
            else {
              return
            }
          })
        }
        else {
          const isZoom = event.nativeEvent.touches.length > 1 ? true : false

          if (!isZoom) {
            const currentY = event.nativeEvent.locationY
            const scrollYDistance = Math.abs(this.state.startY - currentY)
            //if we have swiped further up or down than the threshold distance and we're not zooming on an image, dismiss the isolated carousel mode
            if (scrollYDistance > DISMISS_MODAL_THRESHOLD) {
              this.props.onZoomClosePress()
            }
          }
        }
      }
    }
  }

  setImageRef = node => {
    if (node) {
      this.imageRef = node
    }
  }

  handleZoomViewPress = () => {
    if (!this.props.zoomEnabled) {
      this.props.onZoomEnabled()
    }
    else {
      if (this.props.zoomed) {
        this.handleResetZoomScale()
        this.props.onZoomClosePress()
      }
    }
  }

  handleResetZoomScale = () => {
    this.scrollResponderRef.scrollResponderZoomTo({ x: 0, y: 0, width: this.props.zoomWidth, height: this.props.zoomHeight, animated: true })
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', }}
        centerContent //centers content when zoom is less than scroll view bounds 
        maximumZoomScale={this.props.zoomEnabled ? this.props.maximumZoomScale : 1} //setting to 1 disallows zoom
        minimumZoomScale={this.props.minimumZoomScale}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ref={this.setZoomRef}
        scrollEnabled={this.props.zoomEnabled} //prevents you from panning on image
        scrollEventThrottle={10}
        style={{
          overflow: 'visible',
        }}
      >
        <TouchableOpacity
          onPress={this.handleZoomViewPress}
          flexGrow={1}
          flex={1}
        >
          <Image
            source={{uri: this.props.source}}
            style={{
              height: 219,
              width: deviceWidth
            }}
            ref={this.setImageRef}
          />
        </TouchableOpacity>
      </ScrollView>
    )
  }
}