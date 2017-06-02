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
const heightContainers = (Platform.OS === 'ios') ? 120 : 80;

const listButtons = [
  {
    type: 'goBack',
    image: require('../resource/goBack.png'),
  },
  {
    type: 'goForward',
    image: require('../resource/goForward.png'),
  },
  {
    type: 'figures',
    image: require('../resource/figures.png'),
  },
  {
    type: 'brush',
    image: require('../resource/brush.png'),
  },
  {
    type: 'eraser',
    image: require('../resource/eraser.png'),
  },
  {
    type: 'image',
    image: require('../resource/image.png'),
  },
  {
    type: 'color',
    image: require('../resource/color.png'),
  },
]

const headerButtons = [
  {
    type: 'goBack',
    image: require('../resource/goBack_color.png'),
  },
  {
    type: 'goForward',
    image: require('../resource/goForward_color.png'),
  },
  {
    type: 'figures',
    image: require('../resource/plus.png'),
  },
  {
    type: 'brush',
    image: require('../resource/menu.png'),
  },
]
    
export default class Header extends React.Component {

  render() {
    var objDate = new Date();
    return (
      <View style={styles.containerStyle}>
        <View style={styles.titileContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => console.log()}         
          >
            <Image 
              resizeMode={'contain'}
              source={require('../resource/confirm.png')}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Bio 2B Lecture 2</Text>
          <View style={styles.liftButtonsContainer}>
            {
              headerButtons.map((button, index) => {
                return (
                  <TouchableOpacity 
                    key={button.type}
                    style={styles.titleButton}
                    onPress={() => console.log()}         
                  >
                    <Image 
                      resizeMode={'contain'}
                      source={button.image}
                    />
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </View>
        <View style={styles.headerStyle}>
          {
            listButtons.map((button, index) => {
              return (
                <TouchableOpacity 
                  key={button.type}
                  style={styles.button}
                  onPress={() => console.log()}         
                >
                  <Image 
                    resizeMode={'contain'}
                    source={button.image}
                  />
                </TouchableOpacity>
              );
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    width: widthHeader,
    height: heightContainers,
  },
  headerStyle: {
    width: widthHeader,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(122,57,150)',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  titleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 50,
  },
  titileContainer: {
     width: widthHeader,
     height: (Platform.OS === 'ios') ? 70 : 40,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
     backgroundColor: 'white'
  },
  title: {
    fontSize: 17,
    color: 'rgb(122,57,150)',
  },
  liftButtonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }
});
