import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Animated,TextInput
} from 'react-native';
import { Constants } from 'expo';
import ImageCarousel from 'react-native-image-page';

export default class Detail extends React.Component {
  w = Dimensions.get('window').width;

  state = {
    anim: new Animated.Value(0),
    name: '',
  };
  componentDidMount() {
    Animated.timing(this.state.anim, {
      toValue: 1,
      duration: 2000,
    }).start();
  }

  itm = this.props.navigation.getParam('item', null);
  fncImge = () => {
    let arr = [];
    this.itm.images.forEach(item => {
      arr.push({ uri: item.normal });
    });
    return arr;
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={{ textAlign: 'center', fontSize: 25 }}>
            {this.itm.productName}
          </Text>

          <Animated.View
            style={{
              opacity: this.state.anim,
            }}>
          <ImageCarousel
            height={200}
            delay={2000}
            indicatorSize={10}
            indicatorOffset={-20}
            indicatorColor="red"
            width={this.w}
            images={this.fncImge()}            
          />
           </Animated.View>

          <Animated.View
            style={{
              alignSelf: 'center',
              marginTop: 25,
              ...this.props.style,
              opacity: this.state.anim,
            }}>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
