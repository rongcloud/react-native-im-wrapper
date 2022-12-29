import * as Config from './Config'



const defaultUnFold = false;



/**
 * 枚举
 */

// 按钮点击后对应展示的样式 默认: InputAlert
export enum RCIMDemoActionStyle {
  None,
  InputAlert,
  Toast
}

// InputAlert 中 RowType 默认: Normal
export enum RCIMDemoInputAlertRowType {
  Normal,
  InputBtn,
  TextBtn,
  Time
}

// 参数值类型 默认: String
export enum RCIMDemoParamValueType {
  String,
  Number,
  Boolean,
  Array,
  EnumString,
  EnumNumber,
  Any
}

// 参数合并类型 默认: Map
export enum RCIMDemoParamMergerType {
  Map
}

export enum RCIMDemoNodeActionType {
  GetMessageById,
  GetMessageByIds,
  CreateTextMessage,
  CreateTextMessages,
  CreateTextMessageGroup,
  CreateTextMessagesGroup
}


/**
 * 模版
 */
const conversationTypeTemplate = {
  title: '会话类型',
  subTitle: '1.单聊 2.群聊 3.聊天室 4.系统 5.超级群',
  key: 'conversationType',
  valueType: RCIMDemoParamValueType.Number,
  keyboardType: 'number-pad'
}

const conversationTypesTemplate = {
  title: '会话类型',
  subTitle: '1.单聊 2.群聊 3.聊天室 4.系统 5.超级群',
  highlightTitle: '多个会话类型，以英文逗号分割 ","',
  key: 'conversationTypes',
  valueType: RCIMDemoParamValueType.Array,
  arrySplitType: RCIMDemoParamValueType.Number,
  keyboardType: 'number-pad'
};

const conversationTypeTemplate_type = {
  title: '会话类型',
  subTitle: '1.单聊 2.群聊 3.聊天室 4.系统 5.超级群',
  key: 'type',
  valueType: RCIMDemoParamValueType.Number,
  keyboardType: 'number-pad',
  max_value: 5,
  min_value: 0
}

const conversationTypesTemplate_types = {
  title: '会话类型',
  subTitle: '1.单聊 2.群聊 3.聊天室 4.系统 5.超级群',
  highlightTitle: '多个会话类型，以英文逗号分割 ","',
  key: 'types',
  valueType: RCIMDemoParamValueType.Array,
  arrySplitType: RCIMDemoParamValueType.Number,
  conversationTypeTemplate
};

const channelIdTemplate = {
  title: 'channelId',
  subTitle: '仅对超级群生效，其他类型无需赋值',
  key: 'channelId',
  valueType: RCIMDemoParamValueType.String,
  isOptional: true,
};

const targetIdTemplate = {
  title: 'targetId',
  key: 'targetId',
  valueType: RCIMDemoParamValueType.String,
};

const levelTemplate = {
  title: 'Level',
  subTitle: '0:ALL_MESSAGE,1:NONE,2:MENTION,3:MENTION_USERS,4:MENTION_ALL,5:BLOCKEDs',
  key: 'level',
  valueType: RCIMDemoParamValueType.Number,
  keyboardType: 'number-pad',
  max_value: 5,
  min_value: 0
}

function createNormalTemplate (title: string, key: string, valueType: RCIMDemoParamValueType) {
  return {
    title: title,
    key: key,
    valueType: valueType
  };
}

function createSubTitleTemplate (title: string, key: string, valueType: RCIMDemoParamValueType, subTitle: string) {
  return {
    title: title,
    key: key,
    valueType: valueType,
    subTitle: subTitle
  };
}

function createTimeTemplate(title: string, key: string) {
  return {
    title: title,
    rowType: RCIMDemoInputAlertRowType.Time,
    key: key,
    value: new Date().getTime(),
    valueType: RCIMDemoParamValueType.Number
  };
}



/**
 * 配置内容
 */
export const RCIMDemoConfig = [
  {
    title: '链接相关',
    unFold: defaultUnFold,
    items: [
      {
        title: '初始化引擎',
        action: 'create',
        isOptionalEngine: true,
        params: [
          {
            title: 'AppKey',
            placeholder: '请输入AppKey',
            key: 'appKey',
            value: Config.key,
            valueType: RCIMDemoParamValueType.String
          },
          {
            title: '导航地址',
            key: 'naviServer',
            isOptional: true,
            valueType: RCIMDemoParamValueType.String
          }
        ]
      },
      {
        title: '连接',
        action: 'connect',
        params: [
          {
            title: '连接时间',
            subTitle: '0为一直重连,非0为最多连接多少秒,默认为0',
            key: 'timeout',
            valueType: RCIMDemoParamValueType.Number,
            isOptional: true,
            defaultValue: '0',
            keyboardType: 'number-pad'
          },
          {
            title: 'Token',
            rowType: RCIMDemoInputAlertRowType.InputBtn,
            key: 'token',
            value: Config.token,
            valueType: RCIMDemoParamValueType.String
          }
        ]
      },
      {
        title: '断开连接',
        action: 'disconnect',
        params: [
          {
            title: '断开连接后，是否接受推送',
            subTitle: '0不接收推送,非0接收推送,默认为0',
            key: 'receivePush',
            valueType: RCIMDemoParamValueType.String,
            isOptional: true,
            defaultValue: '0'
          }
        ]
      },
      {
        title: '设置监听',
        action: 'setListener',
        actionStyle: RCIMDemoActionStyle.None,
      },
      {
        title: '销毁引擎',
        action: 'destroy',
        actionStyle: RCIMDemoActionStyle.None,
        isOptionalEngine: true
      }
    ]
  },
  {
    title: '会话相关',
    unFold: defaultUnFold,
    items: [
      {
        title: '获取会话列表',
        action: 'loadConversations',
        params: [
          conversationTypesTemplate,
          channelIdTemplate,
          {
            title: '查询数量',
            subTitle: '',
            key: 'count',
            value: '0',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad'
          },
          createTimeTemplate('开始时间', 'startTime')
        ]
      },
      {
        title: '获取某个会话',
        action: 'loadConversation',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
        ]
      },
      {
        title: '移除某个会话',
        action: 'removeConversation',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
        ]
      },
      {
        title: '移除某些会话',
        action: 'removeConversations',
        params: [
          conversationTypesTemplate,
          channelIdTemplate
        ]
      },
      {
        title: '保存草稿信息',
        action: 'saveDraftMessage',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: '草稿信息',
            key: 'draft',
            valueType: RCIMDemoParamValueType.String,
          }
        ]
      },
      {
        title: '加载某个会话的草稿信息',
        action: 'loadDraftMessage',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
        ]
      },
      {
        title: '清除某个会话的草稿信息',
        action: 'clearDraftMessage',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
        ]
      },
      {
        title: '改变会话的提醒状态',
        action: 'changeConversationNotificationLevel',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          levelTemplate
        ]
      },
      {
        title: '加载会话的提醒状态',
        action: 'loadConversationNotificationLevel',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
        ]
      },
      {
        title: '改变会话类型的提醒状态',
        action: 'changeConversationTypeNotificationLevel',
        params: [
          conversationTypeTemplate_type,
          levelTemplate
        ]
      },
      {
        title: '加载会话类型的提醒状态',
        action: 'loadConversationTypeNotificationLevel',
        params: [
          conversationTypeTemplate_type
        ]
      },
      {
        title: '获取所有免打扰会话',
        action: 'loadBlockedConversations',
        params: [
          conversationTypesTemplate,
          channelIdTemplate,
        ]
      },
      {
        title: '修改会话置顶状态',
        action: 'changeConversationTopStatus',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          createSubTitleTemplate('是否置顶', 'top',  RCIMDemoParamValueType.Boolean, '0:取消置顶 1:置顶')
        ]
      },
      {
        title: '加载会话置顶状态',
        action: 'loadConversationTopStatus',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate
        ]
      },
      {
        title: '同步会话阅读状态',
        action: 'syncConversationReadStatus',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          createTimeTemplate('开始时间', 'timestamp')
        ]
      },
      {
        title: '搜索会话',
        action: 'searchConversations',
        params: [
          conversationTypesTemplate,
          channelIdTemplate,
          {
            title: '查询的消息类型',
            subTitle: '0:UNKNOWN,1:CUSTOM,2:TEXT,3:VOICE,4:IMAGE,5:FILE,6:SIGHT,7:GIF,8:RECALL,9:REFERENCE,10:COMMAND,11:COMMAND_NOTIFICATION',
            key: 'messageTypes',
            highlightTitle: '可输入多个，以 , 分割',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad',
            max_value: 11,
            min_value: 0
          },
          createNormalTemplate('关键字', 'keyword', RCIMDemoParamValueType.String)
        ]
      },
      {
        title: '加载会话消息数',
        action: 'loadMessageCount',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate
        ]
      },
      {
        title: '获取置顶会话',
        action: 'loadTopConversations',
        params: [
          conversationTypesTemplate,
          channelIdTemplate
        ]
      },
    ]
  },
  {
    title: '消息相关',
    unFold: defaultUnFold,
    items: [
      {
        title: '发送文本消息',
        action: 'sendTextMessage',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          createNormalTemplate('发送文本', 'text', RCIMDemoParamValueType.String),
          {
            title: 'pushContent',
            key: 'pushContent',
            isOptional: true,
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: 'pushData',
            key: 'pushData',
            isOptional: true,
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: '@类型',
            subTitle: '1:ALL 2:PART',
            key: 'atType',
            isOptional: true,
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad',
            max_value: 2,
            min_value: 0
          },
          {
            title: '@的用户',
            key: 'userIdList',
            highlightTitle: '可输入多个，以 , 分割',
            isOptional: true,
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.String
          },
          {
            title: '@的文本',
            key: 'mentionedContent',
            isOptional: true,
            valueType: RCIMDemoParamValueType.String,
          }
        ]
      },
      {
        title: '发送图片消息',
        action: 'sendImageMessage',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: '请选择图片',
            key: 'path',
            valueType: RCIMDemoParamValueType.String,
            rowType: RCIMDemoInputAlertRowType.TextBtn,
          }
        ]
      },
      {
        title: '发送文件消息',
        action: 'sendFileMessage',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: '请选择文件',
            key: 'path',
            valueType: RCIMDemoParamValueType.String,
            rowType: RCIMDemoInputAlertRowType.TextBtn,
          }
        ]
      },
      {
        title: '发送语音消息',
        action: 'sendVoiceMessage',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: '请选择文件',
            key: 'path',
            valueType: RCIMDemoParamValueType.String,
            rowType: RCIMDemoInputAlertRowType.TextBtn,
          }
        ]
      },
      {
        title: '发送小视频消息',
        action: 'sendSightMessage',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: '请选择文件',
            key: 'path',
            valueType: RCIMDemoParamValueType.String,
            rowType: RCIMDemoInputAlertRowType.TextBtn,
          }
        ]
      },
      {
        title: '发送 GIF 消息',
        action: 'sendGifMessage',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: '请选择文件',
            key: 'path',
            valueType: RCIMDemoParamValueType.String,
            rowType: RCIMDemoInputAlertRowType.TextBtn,
          }
        ]
      },
      {
        title: '发送引用消息',
        action: 'sendSightMessage',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: '要引用的消息ID',
            key: 'messageId',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: '消息内容',
            key: 'text',
            valueType: RCIMDemoParamValueType.String,
          }
        ]
      },
      {
        title: '发送位置消息',
        action: 'sendLocationMessage',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: '位置经度',
            key: 'longitude',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: '位置纬度',
            key: 'latitude',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: 'PoiName',
            key: 'poiName',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: '请选择文件',
            key: 'thumbnailPath',
            valueType: RCIMDemoParamValueType.String,
            rowType: RCIMDemoInputAlertRowType.TextBtn,
          }
        ]
      },
      {
        title: '发送自定义消息',
        action: 'sendCustomMessage',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: '存储策略',
            subTitle: '0:COMMAND,1:NORMAL,2:STATUS,3:STORAGE',
            key: 'policy',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad',
            max_value: 3,
            min_value: 0
          },
          {
            title: '标识符',
            key: 'messageIdentifier',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: 'Keys',
            highlightTitle: '输入要Keys,可输入多个以,分割',
            key: 'keys',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.String
          },
          {
            title: 'Values',
            highlightTitle: '输入要Values,可输入多个以,分割',
            key: 'values',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.String
          },
          {
            key: 'fields',
            mergerKeys: ['keys', 'values'],
            mergerType: RCIMDemoParamMergerType.Map
          }
        ]
      },
      {
        title: '取消发送中的媒体消息',
        action: 'cancelSendingMediaMessage',
        actionStyle: RCIMDemoActionStyle.None,
        useConstant: 'currentSendingMediaMessage',
        paramKey: 'message'
      },
      {
        title: '下载媒体消息',
        action: 'nodeAction',
        nextAction: 'downloadMediaMessage',
        nodeKey: 'message',
        nodeActionType: RCIMDemoNodeActionType.GetMessageById,
        params: [
          {
            title: '要下载的消息ID',
            key: 'messageId',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad'
          },
          {
            key: 'message',
            valueType: RCIMDemoParamValueType.Any
          }
        ],
      },
      {
        title: '取消下载媒体消息',
        action: 'cancelDownloadingMediaMessage',
        actionStyle: RCIMDemoActionStyle.None,
        useConstant: 'currentDownloadingMediaMessage',
        paramKey: 'message'
      },
      {
        title: '发送输入状态消息',
        action: 'sendTypingStatus',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: '状态',
            key: 'policy',
            valueType: RCIMDemoParamValueType.String,
          }
        ]
      },
      {
        title: '加载消息',
        action: 'loadMessages',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: 'SentTime',
            rowType: RCIMDemoInputAlertRowType.Time,
            key: 'sentTime',
            value: new Date().getTime(),
            valueType: RCIMDemoParamValueType.Number
          },
          {
            title: 'Order',
            subTitle: '0:BEFORE,1:AFTER',
            key: 'order',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad',
            max_value: 1,
            min_value: 0
          },
          {
            title: '加载策略',
            subTitle: '0:LOCAL,1:REMOTE,2:LOCAL_REMOTE',
            key: 'policy',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad',
            max_value: 2,
            min_value: 0
          },
          {
            title: '加载数量',
            subTitle: '',
            key: 'count',
            value: '0',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad'
          }
        ]
      },
      {
        title: '根据消息 ID 加载消息',
        action: 'getMessageById',
        params: [
          {
            title: '消息ID',
            key: 'messageId',
            valueType: RCIMDemoParamValueType.String
          }
        ]
      },
      {
        title: '根据远端 UID 加载消息',
        action: 'getMessageByUId',
        params: [
          {
            title: 'MessageUID',
            key: 'messageUId',
            valueType: RCIMDemoParamValueType.String
          }
        ]
      },
      {
        title: '加载某个会话的第一条未读消息',
        action: 'loadFirstUnreadMessage',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate
        ]
      },
      {
        title: '加载某个会话所有的 @ 消息',
        action: 'loadUnreadMentionedMessages',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate
        ]
      },
      {
        title: '插入一条消息',
        action: 'nodeAction',
        nextAction: 'insertMessage',
        nodeKey: 'message',
        nodeActionType: RCIMDemoNodeActionType.CreateTextMessage,
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            key: 'message',
            valueType: RCIMDemoParamValueType.Any
          }
        ]
      },
      {
        title: '插入多条消息',
        action: 'nodeAction',
        nextAction: 'insertMessages',
        nodeKey: 'messages',
        nodeActionType: RCIMDemoNodeActionType.CreateTextMessages,
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            key: 'messages',
            valueType: RCIMDemoParamValueType.Any
          }
        ]
      },
      {
        title: '删除消息',
        action: 'clearMessages',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: 'Policy',
            subTitle: '0:LOCAL,1:REMOTE,2:LOCAL_REMOTE',
            key: 'policy',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad',
            max_value: 2,
            min_value: 0
          },
          createTimeTemplate('开始时间', 'timestamp')
        ]
      },
      {
        title: '删除本地消息',
        action: 'nodeAction',
        nextAction: 'deleteLocalMessages',
        nodeKey: 'messages',
        nodeActionType: RCIMDemoNodeActionType.GetMessageByIds,
        params: [
          {
            title: '要删除的消息ID',
            highlightTitle: '输入要删除的消息ID,可输入多个,以,分割',
            key: 'messageIds',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad'
          },
          {
            key: 'messages',
            valueType: RCIMDemoParamValueType.Any
          }
        ]
      },
      {
        title: '删除消息（本地远端同时删除）',
        action: 'nodeAction',
        nextAction: 'deleteMessages',
        nodeKey: 'messages',
        nodeActionType: RCIMDemoNodeActionType.GetMessageByIds,
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: '要删除的消息ID',
            highlightTitle: '输入要删除的消息ID,可输入多个,以,分割',
            key: 'messageIds',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad'
          },
          {
            key: 'messages',
            valueType: RCIMDemoParamValueType.Any
          }
        ]
      },
      {
        title: '撤回某条消息',
        action: 'nodeAction',
        nextAction: 'recallMessage',
        nodeKey: 'message',
        nodeActionType: RCIMDemoNodeActionType.GetMessageById,
        params: [
          {
            title: '要撤回的消息ID',
            key: 'messageId',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad'
          },
          {
            key: 'message',
            valueType: RCIMDemoParamValueType.Any
          }
        ]
      },
      {
        title: '发送单聊的已读回执',
        action: 'sendPrivateReadReceiptMessage',
        params: [
          channelIdTemplate,
          targetIdTemplate,
          {
            title: 'SentTime',
            rowType: RCIMDemoInputAlertRowType.Time,
            key: 'timestamp',
            value: new Date().getTime(),
            valueType: RCIMDemoParamValueType.Number,
          }
        ]
      },
      {
        title: '发送群聊的已读回执请求',
        action: 'nodeAction',
        nextAction: 'sendGroupReadReceiptRequest',
        nodeKey: 'message',
        nodeActionType: RCIMDemoNodeActionType.GetMessageById,
        params: [
          {
            title: '消息ID',
            key: 'messageId',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad'
          },
          {
            key: 'message',
            valueType: RCIMDemoParamValueType.Any
          }
        ]
      },
      {
        title: '发送群聊的已读回执响应',
        action: 'nodeAction',
        nextAction: 'sendGroupReadReceiptResponse',
        nodeKey: 'messages',
        nodeActionType: RCIMDemoNodeActionType.GetMessageByIds,
        params: [
          channelIdTemplate,
          targetIdTemplate,
          {
            title: '消息ID',
            highlightTitle: '可输入多个,以,分割',
            key: 'messageIds',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.Number
          },
          {
            key: 'messages',
            valueType: RCIMDemoParamValueType.Any
          }
        ]
      },
      {
        title: '更新消息扩展',
        action: 'updateMessageExpansion',
        params: [
          {
            title: 'MessageUId',
            key: 'messageUId',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: 'Keys',
            highlightTitle: '输入要Keys,可输入多个以,分割',
            key: 'keys',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.String
          },
          {
            title: 'Values',
            highlightTitle: 'Values,可输入多个以,分割',
            key: 'values',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.String
          },
          {
            key: 'expansion',
            mergerKeys: ['keys', 'values'],
            mergerType: RCIMDemoParamMergerType.Map
          }
        ]
      },
      {
        title: '根据 key 移除消息扩展',
        action: 'removeMessageExpansionForKeys',
        params: [
          {
            title: 'MessageUId',
            key: 'MessageUId',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: 'Keys',
            highlightTitle: '输入要Keys,可输入多个以,分割',
            key: 'keys',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.String
          }
        ]
      },
      {
        title: '修改消息的发送状态',
        action: 'changeMessageSentStatus',
        params: [
          {
            title: '消息ID',
            key: 'messageId',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: '发送状态',
            subTitle: '0:SENDING,1:FAILED,2:SENT,3:RECEIVED,4:READ,5:DESTROYED,6:CANCELED',
            key: 'sentStatus',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad',
            max_value: 6,
            min_value: 0
          },
        ]
      },
      {
        title: '修改消息的接收状态',
        action: 'changeMessageReceiveStatus',
        params: [
          {
            title: '消息ID',
            key: 'messageId',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: '接收状态',
            subTitle: '0: UNREAD,1:READ,2:LISTENED,3:DOWNLOADED,4:RETRIEVED,5:MULTIPLE_RECEIVE',
            key: 'receivedStatus',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad',
            max_value: 6,
            min_value: 0
          },
        ]
      },
      {
        title: '搜索消息',
        action: 'searchMessages',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: 'keyword',
            key: 'keyword',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: '加载数量',
            key: 'count',
            value: '0',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad'
          },
          {
            title: '开始时间',
            rowType: RCIMDemoInputAlertRowType.Time,
            key: 'startTime',
            value: new Date().getTime(),
            valueType: RCIMDemoParamValueType.Number
          }
        ]
      },
      {
        title: '根据时间段搜索消息',
        action: 'searchMessagesByTimeRange',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: 'keyword',
            key: 'keyword',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: 'offset',
            key: 'offset',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: '加载数量',
            key: 'count',
            value: '0',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad'
          },
          createTimeTemplate('开始时间', 'startTime'),
          {
            title: '结束时间',
            rowType: RCIMDemoInputAlertRowType.Time,
            key: 'endTime',
            value: new Date().getTime(),
            valueType: RCIMDemoParamValueType.Number
          }
        ]
      },
      {
        title: '根据用户ID搜索消息',
        action: 'searchMessagesByUserId',
        params: [
          {
            title: 'UId',
            key: 'userId',
            valueType: RCIMDemoParamValueType.String,
          },
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: '加载数量',
            key: 'count',
            value: '0',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad'
          },
          createTimeTemplate('开始时间', 'startTime')
        ]
      },
      {
        title: '发送群聊定向消息',
        action: 'nodeAction',
        nextAction: 'sendGroupMessageToDesignatedUsers',
        nodeKey: 'message',
        nodeActionType: RCIMDemoNodeActionType.GetMessageById,
        params: [
          {
            title: '消息ID',
            key: 'messageId',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad'
          },
          {
            title: '用户ID',
            highlightTitle: '输入用户ID,可输入多个,以,分割',
            key: 'userIds',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.String
          },
          {
            key: 'message',
            valueType: RCIMDemoParamValueType.Any
          }
        ]
      }
    ]
  },
  {
    title: '未读消息数相关',
    unFold: defaultUnFold,
    items: [
      {
        title: '加载某个会话的未读数',
        action: 'loadUnreadCount',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate
        ]
      },
      {
        title: '加载所有未读数',
        action: 'loadTotalUnreadCount',
        params: [
          channelIdTemplate
        ]
      },
      {
        title: '根据会话类型查询未读数',
        action: 'loadUnreadCountByConversationTypes',
        params: [
          conversationTypesTemplate,
          channelIdTemplate,
          {
            title: 'Contain',
            subTitle: '0:False,1:True',
            key: 'contain',
            valueType: RCIMDemoParamValueType.Boolean,
          }
        ]
      },
      {
        title: '加载所有 @ 未读数',
        action: 'loadUnreadMentionedCount',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate
        ]
      },
      {
        title: '清除某个会话未读数',
        action: 'clearUnreadCount',
        params: [
          conversationTypeTemplate_type,
          channelIdTemplate,
          targetIdTemplate,
          {
            title: '时间',
            rowType: RCIMDemoInputAlertRowType.Time,
            key: 'timestamp',
            value: new Date().getTime(),
            valueType: RCIMDemoParamValueType.Number
          }
        ]
      }
    ]
  },
  {
    title: '聊天室相关',
    unFold: defaultUnFold,
    items: [
      {
        title: '加入聊天室',
        action: 'joinChatRoom',
        params: [
          {
            title: '聊天室房间ID',
            key: 'targetId',
            valueType: RCIMDemoParamValueType.String
          },
          {
            title: '加入时拉取的历史消息数',
            key: 'messageCount',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad'
          },
          {
            title: '聊天室不存在时是否自动创建',
            subTitle: '0:不创建 1:创建',
            key: 'autoCreate',
            valueType: RCIMDemoParamValueType.Boolean,
          },
        ]
      },
      {
        title: '离开聊天室',
        action: 'leaveChatRoom',
        params: [
          {
            title: '聊天室房间ID',
            key: 'targetId',
            valueType: RCIMDemoParamValueType.String
          }
        ]
      },
      {
        title: '加载聊天室消息',
        action: 'loadChatRoomMessages',
        params: [
          {
            title: '聊天室房间ID',
            key: 'targetId',
            valueType: RCIMDemoParamValueType.String
          },
          createTimeTemplate('开始时间', 'timestamp'),
          {
            title: '加载顺序',
            subTitle: '0:BEFORE,1:AFTER',
            key: 'order',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad',
            max_value: 1,
            min_value: 0
          },
          {
            title: '消息条数',
            key: 'count',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad'
          }
        ]
      },
      {
        title: '添加聊天室KV',
        action: 'addChatRoomEntry',
        params: [
          {
            title: '聊天室房间ID',
            key: 'targetId',
            valueType: RCIMDemoParamValueType.String
          },
          {
            title: 'Key',
            key: 'key',
            valueType: RCIMDemoParamValueType.String
          },
          {
            title: 'Value',
            key: 'value',
            valueType: RCIMDemoParamValueType.String
          },
          {
            title: 'DeleteWhenLeft',
            subTitle: '0:False,1:True',
            key: 'deleteWhenLeft',
            valueType: RCIMDemoParamValueType.Boolean,
          },
          {
            title: 'Overwrite',
            subTitle: '0:False,1:True',
            key: 'overwrite',
            valueType: RCIMDemoParamValueType.Boolean,
          },
        ]
      },
      {
        title: '添加多个聊天室KV',
        action: 'addChatRoomEntries',
        params: [
          createNormalTemplate('聊天室房间ID', 'targetId', RCIMDemoParamValueType.String),
          {
            title: 'Keys',
            highlightTitle: '可输入多个，以 , 分割',
            key: 'keys',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.String
          },
          {
            title: 'Values',
            highlightTitle: '可输入多个，以 , 分割',
            key: 'values',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.String
          },
          {
            title: 'DeleteWhenLeft',
            subTitle: '0:False,1:True',
            key: 'deleteWhenLeft',
            valueType: RCIMDemoParamValueType.Boolean,
          },
          {
            title: 'Overwrite',
            subTitle: '0:False,1:True',
            key: 'overwrite',
            valueType: RCIMDemoParamValueType.Boolean,
          },
          {
            key: 'entries',
            mergerKeys: ['keys', 'values'],
            mergerType: RCIMDemoParamMergerType.Map
          }
        ]
      },
      {
        title: '加载聊天室KV',
        action: 'loadChatRoomEntry',
        params: [
          {
            title: '聊天室房间ID',
            key: 'targetId',
            valueType: RCIMDemoParamValueType.String
          },
          {
            title: 'Keys',
            highlightTitle: '可输入多个，以 , 分割',
            key: 'key',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.String
          }
        ]
      },
      {
        title: '加载所有聊天室KV',
        action: 'loadChatRoomAllEntries',
        params: [
          {
            title: '聊天室房间ID',
            key: 'targetId',
            valueType: RCIMDemoParamValueType.String
          }
        ]
      },
      {
        title: '移除聊天室KV',
        action: 'removeChatRoomEntry',
        params: [
          {
            title: '聊天室房间ID',
            key: 'targetId',
            valueType: RCIMDemoParamValueType.String
          },
          {
            title: 'Key',
            key: 'key',
            valueType: RCIMDemoParamValueType.String
          },
          {
            title: 'Force',
            subTitle: '0:False,1:True',
            key: 'force',
            valueType: RCIMDemoParamValueType.Boolean
          },
        ]
      },
      {
        title: '移除多个聊天室KV',
        action: 'removeChatRoomEntries',
        params: [
          {
            title: '聊天室房间ID',
            key: 'targetId',
            valueType: RCIMDemoParamValueType.String
          },
          {
            title: 'Keys',
            highlightTitle: '可输入多个，以 , 分割',
            key: 'keys',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.String
          },
          {
            title: 'Force',
            subTitle: '0:False,1:True',
            key: 'force',
            valueType: RCIMDemoParamValueType.Boolean,
          }
        ]
      }
    ]
  },
  {
    title: '超级群相关',
    unFold: defaultUnFold,
    items: [
      {
        title: '上报超级群的已读时间',
        action: 'syncUltraGroupReadStatus',
        params: [
          {
            title: '会话ID',
            key: 'targetId',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: 'channelId',
            key: 'channelId',
            valueType: RCIMDemoParamValueType.String,
          },
          createTimeTemplate('开始时间', 'timestamp')
        ]
      },
      {
        title: '获取特定会话下所有频道的会话列表',
        action: 'loadConversationsForAllChannel',
        params: [
          conversationTypeTemplate_type,
          createNormalTemplate('会话ID', 'targetId', RCIMDemoParamValueType.String)
        ]
      },
      {
        title: '根据会话ID获取所有子频道的@未读消息总数',
        action: 'loadUltraGroupUnreadMentionedCount',
        params: [
          createNormalTemplate('会话ID', 'targetId', RCIMDemoParamValueType.String)
        ]
      },
      {
        title: '获取所有超级群会话的未读消息数',
        action: 'loadUltraGroupAllUnreadCount',
        actionStyle: RCIMDemoActionStyle.None
      },
      {
        title: '所有超级群会话中的未读 @ 消息数',
        action: 'loadUltraGroupAllUnreadMentionedCount',
        actionStyle: RCIMDemoActionStyle.None
      },
      {
        title: '获取指定会话的未读消息数',
        action: 'loadUltraGroupUnreadCount',
        params: [
          createNormalTemplate('会话ID', 'targetId', RCIMDemoParamValueType.String)
        ]
      },
      {
        title: '消息修改',
        action: 'nodeAction',
        nextAction: 'modifyUltraGroupMessage',
        nodeKey: 'message',
        nodeActionType: RCIMDemoNodeActionType.CreateTextMessageGroup,
        params: [
          {
            title: 'MessageUId',
            key: 'messageUId',
            valueType: RCIMDemoParamValueType.String
          },
          {
            key: 'targetId',
            value: 'abc',
            valueType: RCIMDemoParamValueType.String
          },
          {
            key: 'message',
            valueType: RCIMDemoParamValueType.Any
          }
        ]
      },
      {
        title: '撤回消息',
        action: 'nodeAction',
        nextAction: 'recallUltraGroupMessage',
        nodeKey: 'message',
        nodeActionType: RCIMDemoNodeActionType.GetMessageById,
        params: [
          {
            title: '要撤回的消息ID',
            key: 'messageId',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad'
          },
          {
            title: '是否删除远端消息',
            subTitle: '0:False,1:True',
            key: 'deleteRemote',
            valueType: RCIMDemoParamValueType.Boolean,
          },
          {
            key: 'message',
            valueType: RCIMDemoParamValueType.Any
          }
        ]
      },
      {
        title: '根据时间戳清除超级群消息',
        action: 'clearUltraGroupMessages',
        params: [
          createNormalTemplate('会话ID', 'targetId', RCIMDemoParamValueType.String),
          createNormalTemplate('channelId', 'channelId', RCIMDemoParamValueType.String),
          createSubTitleTemplate('Policy', 'policy', RCIMDemoParamValueType.Number, '0:LOCAL,1:REMOTE,2:LOCAL_REMOTE'),
          {
            title: '时间',
            rowType: RCIMDemoInputAlertRowType.Time,
            key: 'timestamp',
            value: new Date().getTime(),
            valueType: RCIMDemoParamValueType.Number
          }
        ]
      },
      {
        title: '向会话中发送正在输入的状态',
        action: 'sendUltraGroupTypingStatus',
        params: [
          {
            title: '会话ID',
            key: 'targetId',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: 'channelId',
            key: 'channelId',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: '输入状态',
            subTitle: '0:TEXT',
            key: 'typingStatus',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad',
            max_value: 0,
            min_value: 0
          }
        ]
      },
      {
        title: '删除本地所有channel特定时间之前的消息',
        action: 'clearUltraGroupMessagesForAllChannel',
        params: [
          {
            title: '会话ID',
            key: 'targetId',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: '时间',
            rowType: RCIMDemoInputAlertRowType.Time,
            key: 'timestamp',
            value: new Date().getTime(),
            valueType: RCIMDemoParamValueType.Number
          }
        ]
      },
      {
        title: '获取同一个超级群下的批量服务消息(含所有频道)',
        action: 'nodeAction',
        nextAction: 'loadBatchRemoteUltraGroupMessages',
        nodeKey: 'messages',
        nodeActionType: RCIMDemoNodeActionType.GetMessageByIds,
        params: [
          {
            title: '要加载的消息ID',
            highlightTitle: '输入要加载的消息ID,可输入多个以,分割',
            key: 'messageId',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.String
          },
          {
            key: 'messages',
            valueType: RCIMDemoParamValueType.Any
          }
        ]
      },
      {
        title: '更新消息扩展信息',
        action: 'updateUltraGroupMessageExpansion',
        params: [
          {
            title: 'MessageUId',
            key: 'messageUId',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: 'Keys',
            highlightTitle: '输入要Keys,可输入多个以,分割',
            key: 'keys',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.String
          },
          {
            title: 'Values',
            highlightTitle: '输入要Values,可输入多个以,分割',
            key: 'values',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.String
          },
          {
            key: 'expansion',
            mergerKeys: ['keys', 'values'],
            mergerType: RCIMDemoParamMergerType.Map
          }
        ]
      },
      {
        title: '删除消息扩展消息中特定的键值对',
        action: 'removeUltraGroupMessageExpansionForKeys',
        params: [
          {
            title: 'MessageUId',
            key: 'messageUId',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: 'Keys',
            highlightTitle: '输入要Keys,可输入多个以,分割',
            key: 'keys',
            valueType: RCIMDemoParamValueType.Array,
            arrySplitType: RCIMDemoParamValueType.String
          }
        ]
      },
      {
        title: '设置指定超级群的默认免打扰级别',
        action: 'changeUltraGroupDefaultNotificationLevel',
        params: [
          {
            title: '会话ID',
            key: 'targetId',
            valueType: RCIMDemoParamValueType.String,
          },
          levelTemplate
        ]
      },
      {
        title: '查询指定超级群的默认免打扰级别',
        action: 'loadUltraGroupDefaultNotificationLevel',
        params: [
          {
            title: '会话ID',
            key: 'targetId',
            valueType: RCIMDemoParamValueType.String,
          }
        ]
      },
      {
        title: '设置指定群频道的默认免打扰级别',
        action: 'changeUltraGroupChannelDefaultNotificationLevel',
        params: [
          {
            title: '会话ID',
            key: 'targetId',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: 'ChannelId',
            key: 'channelId',
            valueType: RCIMDemoParamValueType.String,
          },
          levelTemplate
        ]
      },
      {
        title: '查询指定群频道的默认免打扰级别',
        action: 'loadUltraGroupChannelDefaultNotificationLevel',
        params: [
          {
            title: '会话ID',
            key: 'targetId',
            valueType: RCIMDemoParamValueType.String,
          },
          {
            title: 'channelId',
            key: 'channelId',
            valueType: RCIMDemoParamValueType.String,
          }
        ]
      },
    ]
  },
  {
    title: '其它配置',
    unFold: defaultUnFold,
    items: [
      {
        title: '添加到黑名单',
        action: 'addToBlacklist',
        params: [
          {
            title: '用户ID',
            key: 'userId',
            valueType: RCIMDemoParamValueType.String,
          },
        ]
      },
      {
        title: '从黑名单移除',
        action: 'removeFromBlacklist',
        params: [
          {
            title: '用户ID',
            key: 'userId',
            valueType: RCIMDemoParamValueType.String,
          },
        ]
      },
      {
        title: '查询某用户的黑名单状态',
        action: 'loadBlacklistStatus',
        params: [
          {
            title: '用户ID',
            key: 'userId',
            valueType: RCIMDemoParamValueType.String,
          },
        ]
      },
      {
        title: '加载黑名单列表',
        action: 'loadBlacklist',
        actionStyle: RCIMDemoActionStyle.None,
      },
      {
        title: '修改免打扰时间段',
        action: 'changeNotificationQuietHours',
        params: [
          {
            title: 'StartTime',
            rowType: RCIMDemoInputAlertRowType.Time,
            key: 'startTime',
            value: new Date().getTime(),
            valueType: RCIMDemoParamValueType.String
          },
          {
            title: 'SpanMinutes',
            key: 'spanMinutes',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad'
          },
          {
            title: 'Level',
            subTitle: '0:NONE,1:MENTION_MESSAGE,2:BLOCKED',
            key: 'level',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad',
            max_value: 2,
            min_value: 0
          },
        ]
      },
      {
        title: '移除免打扰时间段',
        action: 'removeNotificationQuietHours',
        actionStyle: RCIMDemoActionStyle.None
      },
      {
        title: '获取免打扰时间段',
        action: 'loadNotificationQuietHours',
        actionStyle: RCIMDemoActionStyle.None
      },
      {
        title: '修改推送内容的显示状态',
        action: 'changePushContentShowStatus',
        params: [
          {
            title: 'ShowContent',
            subTitle: '0:False,1:True',
            key: 'showContent',
            valueType: RCIMDemoParamValueType.Boolean,
          }
        ]
      },
      {
        title: '修改推送语言',
        action: 'changePushLanguage',
        params: [
          {
            title: 'Language',
            key: 'language',
            valueType: RCIMDemoParamValueType.String,
          }
        ]
      },
      {
        title: '修改推送的接收状态',
        action: 'changePushReceiveStatus',
        params: [
          {
            title: 'Receive',
            subTitle: '0:False,1:True',
            key: 'receive',
            valueType: RCIMDemoParamValueType.Boolean,
          }
        ]
      },
      {
        title: '修改日志级别',
        action: 'changeLogLevel',
        params: [
          {
            title: 'LogLevel',
            subTitle: '0:NONE,1:ERROR,2:WARN,3:INFO,4:DEBUG,5:VERBOSE',
            key: 'level',
            valueType: RCIMDemoParamValueType.Number,
            keyboardType: 'number-pad',
            max_value: 5,
            min_value: 0
          },
        ]
      }
    ]
  }
];