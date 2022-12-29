import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import RCBaseAlertView from './RCBaseAlertView';

interface IStates {
  
}

interface IProps {
  showText?: string;
}

let rcBaseAlertView: RCBaseAlertView;

class RCTextAlertView extends Component<IProps, IStates> {

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  // 显示
  public show = () => {
    rcBaseAlertView.show()
  }

  // 隐藏
  public hidden = () => {
    rcBaseAlertView.hidden()
  }

  // 内容视图
  private contentView = () => {
    return (
      <View style={styles.contentView}>
        <Text style={styles.title}>{'详细数据'}</Text>
        <ScrollView 
          style={styles.scrollView}
        >
            <Text style={{fontSize: 14, fontWeight: '600', lineHeight: 16, color: '#000000'}}>{this.props.showText ? this.props.showText : '空'}</Text>
        </ScrollView>
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.bottomBtn}
            onPress={() => {
              rcBaseAlertView.hidden()
            }}
          >
            <Text style={styles.bottomText}>{'取消'}</Text>
          </TouchableOpacity>
          <View style={{width: 10}} />
          <TouchableOpacity
            style={[styles.bottomBtn, {borderWidth: 0, backgroundColor: 'blue'}]}
            onPress={() => {
                rcBaseAlertView.hidden()
            }}
          >
            <Text style={[styles.bottomText, {color: '#FFFFFF'}]}>{'确定'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return (
        <RCBaseAlertView
          transition={'center'}
          ref={(ref) => {
            rcBaseAlertView = ref!;
          }}>
          {this.contentView()}
        </RCBaseAlertView>
      );
  }
}

const styles = StyleSheet.create({
  contentView: {
    marginHorizontal: 32,
    height: '80%',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 6
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    paddingVertical: 16,
    color: '#000000',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 16
  },
  scrollView: {
    flex: 1,
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderColor: '#000000',
    borderRadius: 5,
    padding: 16
  },
  rowTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    paddingVertical: 4
  },
  rowSubTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A8A8A8',
    paddingVertical: 4
  },
  textInput: {
    borderWidth: 0.5,
    borderColor: '#A8A8A8',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 8,
    marginBottom: 16
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    marginTop: 64
  },
  bottomBtn: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#000000'
  },
  bottomText: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '400'
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000'
  },
  cancelBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 30
  },
  cancelText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#D73C3C',
    lineHeight: 24,
    alignSelf: 'center',
  },
  normalView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8
  },
  normalBtn: {
    paddingVertical: 16,
  },
  normalText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2B2E3B',
    lineHeight: 24,
    alignSelf: 'center',
  }
});

export default RCTextAlertView;
