import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
  Platform,
  TouchableHighlight,
} from 'react-native';

import WebViewBridge from 'react-native-webview-bridge-updated';
import {InjectedMessageHandler} from '../WebviewMessageHandler';
import {actions, messages} from '../const';

import Header from '../components/Header';
import Footer from '../components/Footer';

const injectScript = `
  (function () {
    ${InjectedMessageHandler}
  }());
`;

export default class Sketch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectionChangeListeners: [],
      onChange: [],
      showLinkDialog: false,
      linkInitialUrl: '',
      linkTitle: '',
      linkUrl: '',
      keyboardHeight: 0,
      isShowWindowForTable: false,
      caption: '',
      countRows: 0,
      countColumn: 0,    
    };

    this._sendAction = this._sendAction.bind(this);
    this.webViewBridge = null;
  }

  init() {
    this._sendAction(actions.init);
    this.setPlatform();
    if (this.props.footerHeight) {
      this.setFooterHeight();
    }
  }

  setPlatform() {
    this._sendAction(actions.setPlatform, Platform.OS);
  }

  onBridgeMessage(str){

    try {
      const message = JSON.parse(str);

      switch (message.type) {
        case messages.WINDOW_READY:
          this.sendJsonSvg(this.props.svg);
          break;
        case messages.TITLE_HTML_RESPONSE:
          if (this.titleResolve) {
            this.titleResolve(message.data);
            this.titleResolve = undefined;
            this.titleReject = undefined;
            if (this.pendingTitleHtml) {
              clearTimeout(this.pendingTitleHtml);
              this.pendingTitleHtml = undefined;
            }
          }
          break;
        case messages.TITLE_TEXT_RESPONSE:
          if (this.titleTextResolve) {
            this.titleTextResolve(message.data);
            this.titleTextResolve = undefined;
            this.titleTextReject = undefined;
            if (this.pendingTitleText) {
              clearTimeout(this.pendingTitleText);
              this.pendingTitleText = undefined;
            }
          }
          break;
        case messages.CONTENT_HTML_RESPONSE:
          if (this.contentResolve) {
            this.contentResolve(message.data);
            this.contentResolve = undefined;
            this.contentReject = undefined;
            if (this.pendingContentHtml) {
              clearTimeout(this.pendingContentHtml);
              this.pendingContentHtml = undefined;
            }
          }
          break;
        case messages.SELECTED_TEXT_RESPONSE:
          if (this.selectedTextResolve) {
            this.selectedTextResolve(message.data);
            this.selectedTextResolve = undefined;
            this.selectedTextReject = undefined;
            if (this.pendingSelectedText) {
              clearTimeout(this.pendingSelectedText);
              this.pendingSelectedText = undefined;
            }
          }
          break;
        case messages.ZSS_INITIALIZED:
          if (this.props.customCSS) {
            this.setCustomCSS(this.props.customCSS);
          }
          this.setTitlePlaceholder(this.props.titlePlaceholder);
          this.setContentPlaceholder(this.props.contentPlaceholder);
          this.setTitleHTML(this.props.initialTitleHTML);
          this.setContentHTML(this.props.initialContentHTML);

          this.props.hiddenTitle && this.hideTitle();
          this.props.enableOnChange && this.enableOnChange();

          this.props.editorInitializedCallback && this.props.editorInitializedCallback();

          break;
        case messages.LINK_TOUCHED:
          this.prepareInsert();
          const {title, url} = message.data;
          this.showLinkDialog(title, url);
          break;
        case messages.LOG:
          // console.log('FROM ZSS', message.data);
          break;
        case messages.SCROLL:
          this.webviewBridge.setNativeProps({contentOffset: {y: message.data}});
          break;
        case messages.TITLE_FOCUSED:
          this.titleFocusHandler && this.titleFocusHandler();
          break;
        case messages.CONTENT_FOCUSED:          
          if (!PlatformIOS) {
            this.setEditorAvailableHeightBasedOnKeyboardHeight(this.state.keyboardHeight);
          }
          this.contentFocusHandler && this.contentFocusHandler();
          break;
        case messages.SELECTION_CHANGE: {
          const items = message.data.items;
          this.state.selectionChangeListeners.map((listener) => {
            listener(items);
          });
          break;
        }
        case messages.CONTENT_CHANGE: {
          const content = message.data.content;
          this.state.onChange.map((listener) => listener(content));
          break;
        }
        case messages.SELECTED_TEXT_CHANGED: {
          const selectedText = message.data;
          this._selectedTextChangeListeners.forEach((listener) => {
            listener(selectedText);
          });
          break;
        }
      }
    } catch(e) {
      // console.log('Error: ', e);
    }
  }

  escapeJSONString = function(string) {
    return string
      .replace(/[\\]/g, '\\\\')
      .replace(/[\"]/g, '\\\"')
      .replace(/[\']/g, '\\\'')
      .replace(/[\/]/g, '\\/')
      .replace(/[\b]/g, '\\b')
      .replace(/[\f]/g, '\\f')
      .replace(/[\n]/g, '\\n')
      .replace(/[\r]/g, '\\r')
      .replace(/[\t]/g, '\\t');
  };

  _sendAction(action, data) {
    let jsonString = JSON.stringify({type: action, data});
    jsonString = this.escapeJSONString(jsonString);
    this.webviewBridge.sendToBridge(jsonString);
  }

  sendJsonSvg(svg) {
    this._sendAction(actions.insertHTML, JSON.stringify(svg));
  }

  render() {
    const page = require('./svg.html')
    return (
      <View style={styles.container}>
        <Header />
        <WebViewBridge
          {...this.props}
          ref={(r) => {this.webviewBridge = r}}
          hideKeyboardAccessoryView={true}
          keyboardDisplayRequiresUserAction={false}
          onBridgeMessage={(message) => {
            this.onBridgeMessage(message);
          }}
          injectedJavaScript={injectScript}
          source={page}
          javaScriptEnabled
          domStorageEnabled
          onLoad={() => this.init()}
        />
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
