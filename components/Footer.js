import React from 'react';
import {
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

const { widthHeader } = Dimensions.get('window');
const heightContainers = 60;

  
export default class Footer extends React.Component {

  render() {
    var objDate = new Date();
    return (
      <View style={styles.containerStyle}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => console.log()}         
        >
         <Text style={styles.title}>Cancel</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => console.log()}         
          >
           <Image 
              resizeMode={'contain'}
              source={require('../resource/download.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => console.log()}         
          >
           <Text style={styles.title}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    width: widthHeader,
    height: heightContainers,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 2,
    borderColor: 'gray',
  },  
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 15,
    color: 'rgb(122,57,150)',
  },
});
