import * as React from 'react';
import { Text, View, StyleSheet, ScrollView , TouchableOpacity} from 'react-native';
import { Constants } from 'expo';

export default class Detail extends React.Component {
  static navigationOptions = {title:'Welcome Home', headerBackTitle:'Geri'}

  fncGoToProduct = () => {
    this.props.navigation.push("Products", {vname:"ali"})
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>          
          <TouchableOpacity onPress = { () => this.fncGoToProduct()}>
          <Text style={styles.btn}>Go to Product</Text>
          </TouchableOpacity>
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
  btn: {
    borderWidth: 1,
    fontSize: 20,
    padding: 10,
    borderRadius: 8,
    color: '#758cff',
    borderColor: '#758cff',
    marginBottom: 5,
    textAlign: 'center'
  },
});
