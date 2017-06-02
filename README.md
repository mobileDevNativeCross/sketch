#sketch-editor

##Installation

`npm i --save https://gregory.galushka@gitlab.intecracy.com/LabArchives/sketch-editor.git`

##

Before you start, you need to install and connect the following modules to your project

LINK https://github.com/wix/react-native-webview-bridge

//------------------------------

`npm i --save react-native-webview-bridge-updated`

##

##Automatic Installation

`react-native link react-native-webview-bridge-updated`

##

##Usage

`
import Sketch from 'sketch-editor';

const svg = {"sketch":{"metadata":{"version":1,"width":650,"height":350},"data":[{"data":{},"type":"path","attrs":{"fill":"none","stroke":"#000000","path":[["M",186,139],["L",186,139],["L",184,139],["L",183,139],["L",181,138],["L",178,129],["L",178,117],["L",182,101],["L",193,82],["L",214,65],["L",241,55],["L",278,52],["L",305,53],["L",332,60],["L",359,73],["L",378,89],["L",385,103],["L",387,125],["L",381,149],["L",372,164],["L",351,182],["L",288,195],["L",269,193],["L",254,187],["L",249,184],["L",249,181],["L",253,177],["L",261,174],["L",278,171],["L",300,171],["L",333,180],["L",344,186],["L",346,190],["L",332,196],["L",314,195],["L",293,193],["L",281,191],["L",268,188],["L",260,186],["L",257,184]],"stroke-width":4,"stroke-linejoin":"round","stroke-linecap":"round","arrow-end":"none","type":"path","transform":""},"transform":""}]},"description":""};

export default class SketchEditor extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Sketch svg={svg.sketch.data} />
      </View>
    );
  }
}

`