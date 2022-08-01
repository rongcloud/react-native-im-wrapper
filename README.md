# rongcloud-react-native-im-wrapper [![npm version][version-badge]][npm]

融云 React Native IMLib 是以 IMLib SDK 5.2.4 版本为基础实现的开源项目，支持 Android、iOS，开发者在集成使用过程中如遇到问题可提交到 GitHub 的 Issues 中，融云技术支持人员会在 1 个工作日内回复问题，谢谢您对融云的理解与支持。

## 文档

- [使用指南](https://doc.rongcloud.cn/im/React-Native/5.X/prepare)
- [接口文档](https://www.rongcloud.cn/docs/api/react-native/imlib_v5/latest)

## 用法

### 创建引擎

```javascript
import { RCIMIWEngine, RCIMIWEngineOptions } from "@rongcloud/react-native-im-wrapper";
let appKey='your appkey'
let options : RCIMIWEngineOptions = {}
let engine = RCIMIWEngine.create(appKey, options);
```

### 连接融云服务

```javascript
let token = 'your token'
let promise = engine.connect(token, 0)
promise.then(code => {
//
})
```

### 监听消息

```javascript
engine.setOnMessageSentListener((code, message) => {
    
})
```

### 发送消息

```javascript
let conversationType = RCIMIWConversationType.PRIVATE
let targetId = 'your targetId'
let channelId = ''
let text = 'Hello World'
let promise : Promise<RCIMIWTextMessage> = engine.createTextMessage(conversationType, targetId:, channelId, text):
promise.then(message =>{
  engine.sendMessage(message).then(code => {
    //
  })
})
```

更多示例请参考 [examples](example/examples)。

## 运行示例

```
yarn

# android
yarn example android

# ios
yarn example ios
```

## 项目结构

```
├── android (Android 接口实现)
├── docs (接口文档)
├── example (React Native 示例)
├── ios (iOS 接口实现)
└── src (接口实现)
```

[npm]: https://www.npmjs.com/package/@rongcloud/react-native-im-wrapper
[version-badge]: https://img.shields.io/npm/v/@rongcloud/react-native-im-wrapper
