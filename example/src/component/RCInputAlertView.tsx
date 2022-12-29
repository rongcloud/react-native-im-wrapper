import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import RCBaseAlertView from './RCBaseAlertView';
import { RCIMDemoInputAlertRowType, RCIMDemoParamValueType } from '../RCIMDemoConfig';
import dayjs from 'dayjs';
import ImagePicker from 'react-native-image-crop-picker';
import RCDateAlertView from './RCDateAlertView';
import * as Config from '../Config'
import { post } from '../Util';
import { RRCToast } from 'react-native-overlayer';

interface IStates {
  item?: any;
  date: Date;
  isShowDateAlert: boolean;
  connectItem?: any;
}

interface IProps {
  item?: any;
  cancelCallback?: any;
  sureCallback?: any;
}

let rcBaseAlertView: RCBaseAlertView;
let rcDateAlertView: RCDateAlertView;
let currentDateRow: any;

class RCInputAlertView extends Component<IProps, IStates> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      date: new Date(),
      isShowDateAlert: false
    };
  }

  componentDidMount() {}

  // 显示
  public show = () => {
    if (this.props.item?.title == '连接') {
      if (!this.state.connectItem) {
        let tempItemString =  JSON.stringify(this.props.item);
        let tempItem: Array<any> = JSON.parse(tempItemString);
        this.setState({item: tempItem});
      } else {
        this.setState({item: this.state.connectItem});
      }
    } else {
      let tempItemString =  JSON.stringify(this.props.item);
      let tempItem: Array<any> = JSON.parse(tempItemString);
      this.setState({item: tempItem})
    }
    rcBaseAlertView.show()
  }

  // 隐藏
  public hidden = () => {
    rcBaseAlertView.hidden()
    if (this.props.cancelCallback) {
      this.props.cancelCallback()
    }
  }

  // 刷新数据
  public refreshData = () => {
    let tempItemString =  JSON.stringify(this.props.item);
    let tempItem: Array<any> = JSON.parse(tempItemString);
    this.setState({item: tempItem})
  }

  // 内容视图
  private contentView = () => {
    return (
      <View style={styles.contentView}>
        <Text style={styles.title}>{this.state.item?.title ? this.state.item?.title : '请输入以下内容'}</Text>
        <ScrollView 
          style={styles.scrollView}
        >
          {this.state.item?.params && this.state.item?.params.map((item: any, index: number) => {
            if (!item?.title) {
              return (<></>);
            }
            return (
              <View style={{paddingHorizontal: 16, paddingVertical: 8}} key={index}>
                {item?.title?.length > 0 && <Text style={styles.rowTitle}>{item?.title}</Text>}
                {item?.subTitle?.length > 0 && <Text style={styles.rowSubTitle}>{item?.subTitle}</Text>}
                {item?.highlightTitle?.length > 0 && <Text style={{color: 'red', fontSize: 10}}>{item?.highlightTitle}</Text>}
                {(!item?.rowType || item?.rowType === RCIMDemoInputAlertRowType.Normal) &&
                  <TextInput 
                    style={styles.textInput}
                    placeholder={item?.placeholder ? item?.placeholder : (item?.title ? ('请输入' + item?.title + (item?.isOptional == true ? ' (非必填)' : '')) : '')}
                    value={item?.value}
                    keyboardType={item?.keyboardType ? item?.keyboardType : 'default'}
                    onChangeText={(text: string) => {
                      if (item?.valueType == RCIMDemoParamValueType.Number && isNaN(Number(text))) {
                        RRCToast.show('您输入的值类型不正确，请检查');
                        return;
                      }
                      if (item?.max_value && Number(text) > item?.max_value) {
                        RRCToast.show('您输入的值超出最大范围，请检查');
                        return;
                      }
                      if (item?.min_value != undefined && Number(text) < item?.min_value) {
                        RRCToast.show('您输入的值超出最小范围，请检查');
                        return;
                      }
                      let tempItem = this.state.item ? this.state.item : {};
                      let tempParams = tempItem.params ? [...tempItem.params] : [];
                      let tempSubItem = tempParams[index];
                      tempSubItem.value = text;
                      this.setState({item: tempItem});
                    }}
                  />
                }
                {item?.rowType === RCIMDemoInputAlertRowType.InputBtn &&
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TextInput 
                      style={[styles.textInput, {flex: 1, marginRight: 16}]}
                      placeholder={item?.placeholder ? item?.placeholder : (item?.title ? ('请输入' + item?.title +  + (item?.isOptional == true ? ' (非必填)' : '')) : '')}
                      value={item?.value}
                      onChangeText={(text: string) => {
                        let tempItem = this.state.item ? this.state.item : {};
                        let tempParams = tempItem.params ? [...tempItem.params] : [];
                        let tempSubItem = tempParams[index];
                        tempSubItem.value = text;
                        this.setState({item: tempItem, connectItem: tempItem});
                      }}
                    />
                    <TouchableOpacity 
                    style={{justifyContent: 'center', marginBottom: 17, paddingHorizontal: 8, marginTop: 7, borderWidth: 0.5, borderColor: '#000000', borderRadius: 5}}
                    onPress={() => {
                      let key = Config.key
                      let id = Config.prefix + Date.now();
                      let url = Config.host + 'token/' + id;
                      let params = { key: key };
                      post(url, params, (json) => {
                        if (json && json.code == 0) {
                          let tempItem = JSON.parse(JSON.stringify(this.state.item));
                          tempItem.params[1].value = Math.random().toString();;
                          this.setState({item: tempItem, connectItem: tempItem})
                        } else {
                          RRCToast.show("获取token失败 " + (json.reason ? json.reason : '未知原因'));
                        }
                      }, (error) => {
                        RRCToast.show("获取token失败 " + error);
                      });
                    }}
                    >
                      <Text style={{textAlign: 'center'}}>{'生成'}</Text>
                    </TouchableOpacity>
                  </View>
                }
                {item?.rowType === RCIMDemoInputAlertRowType.Time &&
                  <View style={{paddingVertical: 4}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={{alignSelf: 'center', color: '#A8A8A8'}}>{item?.title ? ('请选择' + item?.title) : '请选择日期'}</Text>
                      <TouchableOpacity 
                        style={{justifyContent: 'center', paddingVertical: 8}}
                        onPress={() => {
                          currentDateRow = item;
                          this.setState({isShowDateAlert: true}, () => {
                            rcDateAlertView.show(item?.value);
                          });
                        }}
                      >
                        <Text style={{color: 'blue'}}>{item?.value ? dayjs(item?.value).format('YYYY-MM-DD HH:mm:ss') : '-'}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                }
                {item?.rowType === RCIMDemoInputAlertRowType.TextBtn &&
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8}}>
                    <Text style={{flex: 1, marginRight: 8, color: '#A8A8A8'}}>{item?.value ? item?.value : '暂未选择'}</Text>
                    <TouchableOpacity 
                      style={{alignSelf: 'flex-start', paddingVertical: 5, paddingHorizontal: 16, borderWidth: 0.5, borderColor: '#000000', borderRadius: 5}}
                      onPress={() => {
                        ImagePicker.openPicker({
                            mediaType: "any",
                            cropping: false,
                            writeTempFile: false,
                            waitAnimationEnd: false,
                        }).then((video) => {
                            let file = video.path
                            if (Platform.OS == 'ios')
                                file = file.replace('file://', '');
                            if (file)
                                console.log('Select File: ', file);
                                item.value = file;
                                let tempItem = JSON.parse(JSON.stringify(this.state.item));
                                tempItem.params[index].value = file;
                                this.setState({item: tempItem});
                        }).catch(() => { });
                      }}
                    >
                      <Text style={{textAlign: 'center', alignSelf: 'center'}}>{'选择'}</Text>
                    </TouchableOpacity>
                  </View>
                }
              </View>
            )
          })}
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
              if (!this.state.item?.action || this.state.item?.action == '') {
                console.log('Config action 不存在');
                return;
              }
              if (this.props.sureCallback) {
                this.props.sureCallback(this.state.item || {});
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
    if (this.state.isShowDateAlert) {
      return (
        <RCDateAlertView
        sureCallback={(data: any) => {
          currentDateRow.value = data;
          this.setState({isShowDateAlert: false}, () => {
            rcBaseAlertView.show();
          });
        }}
        cancelCallback={() => {
          this.setState({isShowDateAlert: false}, () => {
            rcBaseAlertView.show();
          });
        }}
        ref={(ref) => {
          rcDateAlertView = ref!;
        }}>
      </RCDateAlertView>
      );
    } else {
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
    borderRadius: 5
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

export default RCInputAlertView;
