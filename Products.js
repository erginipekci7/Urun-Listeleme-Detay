import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import axios from 'react-native-axios';

export default class Products extends React.Component {
  static navigationOptions = { title: 'Products' };

  state = {
    data: [],
  };

  componentDidMount() {
    axios
      .get(
        'https://www.jsonbulut.com/json/product.php?ref=5380f5dbcc3b1021f93ab24c3a1aac24&start=0'
      )
      .then(res => {
        const dt = res.data;
        //console.log("dt : " + JSON.stringify(dt));
        this.setState({ data: dt.Products[0].bilgiler });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            contentContainerStyle={{ flex: 1, marginBottom: 10 }}
            data={this.state.data}
            keyExtractor={item => item.productId}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={ () => {this.props.navigation.push("Detail",{item:item})}}>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#e8e8e8',
                    marginBottom: 10,
                  }}>
                  <Image
                    source={{ uri: item.images[0].thumb }}
                    style={{ width: 75, height: 75, marginRight: 5 }}
                  />
                  <View>
                    <Text style={{ fontSize: 20 , alignSelf:'flex-start' }}>{item.productName}</Text>
                    <Text>{item.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
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
