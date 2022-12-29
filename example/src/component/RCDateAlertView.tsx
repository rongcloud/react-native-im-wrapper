import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import RCBaseAlertView from './RCBaseAlertView';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

interface IStates {
  timestamp: number;
}

interface IProps {
  cancelCallback?: any;
  sureCallback?: any;
}

let rcBaseAlertView: RCBaseAlertView;

class RCDateAlertView extends Component<IProps, IStates> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      timestamp: new Date().getTime()
    };
  }

  componentDidMount() { }

  // 显示(参数为时间戳)
  public show = (timestamp?: number) => {
    if (timestamp) {
      this.setState({timestamp: timestamp}, () => {
        rcBaseAlertView.show()
      })
    } else {
      rcBaseAlertView.show()
    }
  }

  // 隐藏
  public hidden = () => {
    rcBaseAlertView.hidden()
    if (this.props.cancelCallback) {
      this.props.cancelCallback()
    }
  }

  // 内容视图
  private contentView = () => {
    return (
      <View style={styles.contentView}>
        <Text style={styles.title}>{'请选择日期'}</Text>
        <Text style={{color: '#A8A8A8', fontSize: 16, marginBottom: 20}}>{'当前选择日期：' + dayjs(this.state.timestamp).format('YYYY-MM-DD HH:mm:ss')}</Text>
        <View style={{paddingVertical: 4}}>
            <RNDateTimePicker 
              value={dayjs(this.state.timestamp).toDate()}
              display={Platform.OS == 'ios' ? 'inline' : "default"}
              mode={'datetime'}
              onChange={(event: any, date?: Date) => {
                if (!date) {
                  return
                }
                this.setState({timestamp: date ? date.getTime() : new Date().getTime()});
              }}
            />
          </View>
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.bottomBtn}
            onPress={() => {
              this.hidden();
            }}
          >
            <Text style={styles.bottomText}>{'取消'}</Text>
          </TouchableOpacity>
          <View style={{width: 10}} />
          <TouchableOpacity
            style={[styles.bottomBtn, {borderWidth: 0, backgroundColor: 'blue'}]}
            onPress={() => {
              rcBaseAlertView.hidden()
              if (this.props.sureCallback) {
                this.props.sureCallback(this.state.timestamp);
              }
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
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
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

export default RCDateAlertView;
