import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Animated,
  TouchableOpacity,
  Dimensions,
  NativeModules,
  StatusBar,
  ViewStyle,
  Modal,
} from 'react-native';

const { StatusBarManager } = NativeModules;
const TOPSAFE_HEIGHT =
  Platform.OS === 'ios' ? StatusBarManager.HEIGHT : StatusBar.currentHeight;
const BOTTOMSAFE_HEIGHT = Platform.OS === 'ios' ? 34 : 0;
const { height } = Dimensions.get('window');

interface IStates {
  isShow: boolean;
}

interface IProps {
  transition?: 'top' | 'bottom' | 'center'; // 动画效果
  mcColor?: string; // 蒙层背景色
  mcAlpha?: number; // 蒙层透明
  mcDuration?: number; // 蒙层动画时间
  areaSafeTopColor?: string; // 刘海屏顶部颜色
  areaSafeBottomColor?: string; // 刘海屏底部颜色
  contentDuration?: number; // 内容动画时长
  emptyIsClick?: boolean; // 空白处是否可以点击
  isUnFullScreen?: boolean; // 是否不全屏（全屏则适配iOS刘海屏）
  style?: ViewStyle; // 容器样式
}

var rotateValueMC = new Animated.Value(0);
var rotateValueContent = new Animated.Value(0);

class RCBaseAlertView extends Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  componentDidMount() { }

  // 关闭按钮点击事件
  private closeClick() {
    if (this.props.emptyIsClick == false) {
      return
    }
    this.hidden()
  }

  // 显示
  public show = () => {
    this.performOperations(true)
  }

  // 隐藏
  public hidden = () => {
    this.performOperations(false)
  }

  // 操作动画
  public performOperations = (isShow: boolean) => {
    var mcToValue = isShow ? (this.props.mcAlpha ? this.props.mcAlpha : 0.6) : 0
    var contentToValue = 0
    if (isShow == true) {
      if (this.props.transition == 'top') {
        rotateValueContent = new Animated.Value(height)
        contentToValue = isShow ? 0 : height
      } else if (this.props.transition == 'bottom') {
        rotateValueContent = new Animated.Value(-height)
        contentToValue = isShow ? 0 : height
      } else if (this.props.transition == 'center') {
        rotateValueContent = new Animated.Value(0)
        contentToValue = isShow ? 1 : 0
      } else {

      }
    }
    var parallelArr: Animated.CompositeAnimation[] = []
    if (this.props.mcDuration) {
      parallelArr.push(
        Animated.timing(rotateValueMC, {
          toValue: mcToValue,
          duration: this.props.mcDuration,
          useNativeDriver: false,
        })
      )
    }
    parallelArr.push(
      Animated.timing(rotateValueContent, {
        toValue: contentToValue,
        duration: this.props.contentDuration ? this.props.contentDuration : 300,
        useNativeDriver: false,
      }),
    )
    this.setState({ isShow: isShow }, () => {
      Animated.parallel(parallelArr).start();
    });
  };

  render() {
    if (this.state.isShow) {

      // 安全区域外控制
      var areaSafeTopColor = '#FFFFFF'
      var areaSafeBottomColor = '#FFFFFF'
      if (this.props.transition == 'top') {
        areaSafeBottomColor = '#00000000'
      } else if (this.props.transition == 'bottom') {
        areaSafeTopColor = '#00000000'
      } else if (this.props.transition == 'center') {
        areaSafeTopColor = '#00000000'
        areaSafeBottomColor = '#00000000'
      } else {

      }

      // 蒙层控制
      var mcOpacity = this.props.mcDuration ? rotateValueMC : (this.props.mcAlpha ? this.props.mcAlpha : 0.6)
      var mcColor = this.props.mcColor ? this.props.mcColor : (this.props.isUnFullScreen ? '#00000000' : '#000000')

      // 安全区域控制
      var areaBottom = (this.props.transition == 'top' || this.props.transition == 'bottom') ? rotateValueContent : 0
      var areaAlpha = this.props.transition == 'center' ? rotateValueContent : 1

      // 空白处控制
      var emptyTopIsShow = (this.props.transition == 'bottom' || this.props.transition == 'center')
      var emptyBottomIsShow = (this.props.transition == 'top' || this.props.transition == 'center')

      return (
        // <Modal animationType="fade"
        //   transparent={true}
        //   visible={true}
        // >
          <View style={this.props.isUnFullScreen ? [styles.unFullScreenContainer, this.props.style] : [styles.fullScreenContainer, this.props.style]}>
            <Animated.View style={[styles.mcView, { opacity: mcOpacity }, { backgroundColor: mcColor }]}>
            </Animated.View>

            <Animated.View style={[styles.areaView, { bottom: areaBottom, opacity: areaAlpha }]}>
              {this.props.isUnFullScreen != true && <View style={[styles.areaSafeTop, { top: -TOPSAFE_HEIGHT, backgroundColor: this.props.areaSafeTopColor ? this.props.areaSafeTopColor : areaSafeTopColor }]} />}
              {this.props.isUnFullScreen != true && <View style={[styles.areaSafeBottom, { bottom: -BOTTOMSAFE_HEIGHT, backgroundColor: this.props.areaSafeBottomColor ? this.props.areaSafeBottomColor : areaSafeBottomColor }]} />}
              {emptyTopIsShow && <TouchableOpacity style={[styles.closeBg]} onPress={() => this.closeClick()} />}
              {this.props.children}
              {emptyBottomIsShow && <TouchableOpacity style={[styles.closeBg]} onPress={() => this.closeClick()} />}
            </Animated.View >
          </View>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  unFullScreenContainer: {
    width: '100%',
    position: 'absolute',
    overflow: 'hidden'
  },
  mcView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  areaView: {
    width: '100%',
    flex: 1,
  },
  areaSafeTop: {
    position: 'absolute',
    width: '100%',
    height: TOPSAFE_HEIGHT
  },
  areaSafeBottom: {
    position: 'absolute',
    width: '100%',
    height: BOTTOMSAFE_HEIGHT
  },
  closeBg: {
    flex: 1,
    width: '100%'
  },
});

export default RCBaseAlertView;
