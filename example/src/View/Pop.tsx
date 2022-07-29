
import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewProps
} from 'react-native';


class Pop extends React.Component<ViewProps, { modalVisible: boolean, element?: Element }> {
  constructor(props: ViewProps) {
    super(props)

    this.state = {
      modalVisible: false,
    };
  }


  hide() {
    this.setState({ element: undefined, modalVisible: false });
  }

  show(element: Element) {
    this.setState({ element: element, modalVisible: true })
  }

  render() {
    return (
      <View style={this.props.style}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => { }}
          onShow={() => { }}
        >
          <TouchableWithoutFeedback
            onPress={() => this.hide()}>
            <View
              style={styles.modalLayer}>
              <TouchableWithoutFeedback
                onPress={() => { }}>
                <View
                  style={styles.modalContainer}>
                  {
                    this.state.element
                  }
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalLayer: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'center'
  },
  modalContainer: {
    margin:40,
    flex: 1,
    backgroundColor: 'white',
  }
});

export default Pop;
