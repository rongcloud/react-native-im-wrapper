import * as React from 'react';
import { RefObject } from 'react';
import { DeviceEventEmitter, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect, create, destroy, disconnect, registerLinkListener } from './Link';
import {
  changeConversationNotificationLevel,
  changeConversationTopStatus,
  changeConversationTypeNotificationLevel,
  clearDraftMessage,
  loadBlockedConversations,
  loadConversation,
  loadConversationNotificationLevel,
  loadConversations,
  loadConversationTopStatus,
  loadConversationTypeNotificationLevel,
  loadDraftMessage,
  loadMessageCount,
  loadTopConversations,
  registerConversationsListener,
  removeConversation,
  removeConversations,
  saveDraftMessage,
  searchConversations,
  syncConversationReadStatus
} from './Conversation';
import { createAlertView, showToast } from './Util';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Pop from './View/Pop';
import {
  cancelDownloadingMediaMessage,
  cancelSendingMediaMessage,
  changeMessageReceiveStatus,
  changeMessageSentStatus,
  clearMessages,
  deleteLocalMessages,
  deleteMessages,
  downloadMediaMessage,
  getMessageById,
  getMessageByUId,
  insertMessage,
  insertMessages,
  loadFirstUnreadMessage,
  loadMessages,
  loadUnreadMentionedMessages,
  recallMessage,
  registerMessagesListener,
  removeMessageExpansionForKeys,
  searchMessages,
  searchMessagesByTimeRange,
  searchMessagesByUserId,
  sendCustomMessage,
  sendFileMessage,
  sendGifMessage,
  sendGroupMessageToDesignatedUsers,
  sendGroupReadReceiptRequest,
  sendGroupReadReceiptResponse,
  sendImageMessage,
  sendPrivateReadReceiptMessage,
  sendReferenceMessage,
  sendSightMessage,
  sendTextMessage,
  sendTypingStatus,
  sendVoiceMessage,
  updateMessageExpansion
} from './Messages';
import { RCIMIWEngine } from '@rongcloud/react-native-im-wrapper';
import { dropdown, pullup } from './View/Image';
import {
  clearUnreadCount,
  loadTotalUnreadCount,
  loadUnreadCount,
  loadUnreadCountByConversationTypes,
  loadUnreadMentionedCount,
  registerUnreadMessagesListener
} from './UnreadMessages';
import {
  addChatRoomEntries,
  addChatRoomEntry,
  joinChatRoom,
  leaveChatRoom,
  loadAllChatRoomEntries,
  loadChatRoomEntry,
  loadChatRoomMessages,
  registerChatRoomListener,
  removeChatRoomEntries,
  removeChatRoomEntry
} from './ChatRoom';
import {
  changeUltraGroupChannelDefaultNotificationLevel,
  changeUltraGroupDefaultNotificationLevel,
  clearUltraGroupMessages,
  clearUltraGroupMessagesForAllChannel,
  loadBatchRemoteUltraGroupMessages,
  loadConversationsForAllChannel,
  loadUltraGroupAllUnreadCount,
  loadUltraGroupAllUnreadMentionedCount,
  loadUltraGroupChannelDefaultNotificationLevel,
  loadUltraGroupDefaultNotificationLevel,
  loadUltraGroupUnreadCount,
  loadUltraGroupUnreadMentionedCount,
  modifyUltraGroupMessage,
  recallUltraGroupMessage,
  registerUltraGroupListener,
  removeUltraGroupMessageExpansion,
  sendUltraGroupTypingStatus,
  syncUltraGroupReadStatus,
  updateUltraGroupMessageExpansion
} from './UltraGroup';
import {
  addToBlacklist,
  changeLogLevel,
  changeNotificationQuietHours,
  changePushContentShowStatus,
  changePushLanguage,
  changePushReceiveStatus,
  loadBlacklist,
  loadBlacklistStatus,
  loadNotificationQuietHours,
  registerOthersListener,
  removeFromBlacklist,
  removeNotificationQuietHours
} from './Others';


export interface History {
  operation: string,
  data: string,
  status: number
}


export default class Main extends React.Component<NativeStackScreenProps<any>, { unwindStates: boolean[], history: History[] }> {
  pop: RefObject<Pop>;
  engine: RCIMIWEngine | null
  data = [
    {
      category: "链接相关",
      useCase: [
        {
          title: "初始化引擎",
          func: () => { create(this) },
        },
        {
          title: "连接",
          func: () => { connect(this) },
        },
        {
          title: "断开连接",
          func: () => { disconnect(this) }
        },
        {
          title: "设置监听",
          func: () => {
            this.registerCallBacks()
            showToast("设置监听成功")
          }
        },
        {
          title: "销毁引擎",
          func: () => { destroy(this) }
        },
      ]
    },
    {
      category: "会话相关",
      useCase: [
        {
          title: "获取会话列表",
          func: () => { loadConversations(this) }
        },
        {
          title: "获取某个会话",
          func: () => { loadConversation(this) }
        },
        {
          title: "移除某个会话",
          func: () => { removeConversation(this) }
        },
        {
          title: "移除某些会话",
          func: () => { removeConversations(this) }
        },
        {
          title: "保存草稿信息",
          func: () => { saveDraftMessage(this) }
        },
        {
          title: "加载某个会话的草稿信息",
          func: () => { loadDraftMessage(this) }
        },
        {
          title: "清除某个会话的草稿信息",
          func: () => { clearDraftMessage(this) }
        },
        {
          title: "改变会话的提醒状态",
          func: () => { changeConversationNotificationLevel(this) }             
        },
        {
          title: "加载会话的提醒状态",
          func: () => { loadConversationNotificationLevel(this) }
        },
        {
          title: "改变会话类型的提醒状态",
          func: () => { changeConversationTypeNotificationLevel(this) }             
        },
        {
          title: "加载会话类型的提醒状态",
          func: () => { loadConversationTypeNotificationLevel(this) }             
        },
        {
          title: "获取所有免打扰会话",
          func: () => { loadBlockedConversations(this) }
        },
        {
          title: "修改会话置顶状态",
          func: () => { changeConversationTopStatus(this) }
        },
        {
          title: "加载会话置顶状态",
          func: () => { loadConversationTopStatus(this) }
        },
        {
          title: "同步会话阅读状态",
          func: () => { syncConversationReadStatus(this) }
        },
        {
          title: "搜索会话",
          func: () => { searchConversations(this) }
        },
        {
          title: "加载会话消息数",
          func: () => { loadMessageCount(this) }
        },
        {
          title: "获取置顶会话",
          func: () => { loadTopConversations(this) }
        }
      ]
    },
    {
      category: "消息相关",
      useCase: [
        {
          title: "发送文本消息",
          func: () => { sendTextMessage(this) }
        },
        {
          title: "发送图片消息",
          func: () => { sendImageMessage(this) }
        },
        {
          title: "发送文件消息",
          func: () => { sendFileMessage(this) }
        },
        {
          title: "发送语音消息",
          func: () => { sendVoiceMessage(this) }
        },
        {
          title: "发送小视频消息",
          func: () => { sendSightMessage(this) }
        },
        {
          title: "发送引用消息",
          func: () => { sendReferenceMessage(this) }
        },
        {
          title: "发送GIF消息",
          func: () => { sendGifMessage(this) }
        },
        {
          title: "发送自定义消息",
          func: () => { sendCustomMessage(this) }
        },
        {
          title: "取消发送中的媒体消息",
          func: () => { cancelSendingMediaMessage(this) }
        },
        {
          title: "下载媒体消息",
          func: () => { downloadMediaMessage(this) }
        },
        {
          title: "取消下载媒体消息",
          func: () => { cancelDownloadingMediaMessage(this) }
        },
        {
          title: "发送输入状态消息",
          func: () => { sendTypingStatus(this) }
        },
        {
          title: "加载消息",
          func: () => { loadMessages(this) }
        },
        {
          title: "根据消息ID加载消息",
          func: () => { getMessageById(this) }
        },
        {
          title: "根据远端UID加载消息",
          func: () => { getMessageByUId(this) }
        },
        {
          title: "加载某个会话的第一条未读消息",
          func: () => { loadFirstUnreadMessage(this) }
        },
        {
          title: "加载某个会话所有的@消息",
          func: () => { loadUnreadMentionedMessages(this) }
        },
        {
          title: "插入一条消息",
          func: () => { insertMessage(this) }
        },
        {
          title: "插入多条消息",
          func: () => { insertMessages(this) }
        },
        {
          title: "删除消息",
          func: () => { clearMessages(this) }
        },
        {
          title: "删除本地消息",
          func: () => { deleteLocalMessages(this) }
        },
        {
          title: "删除消息（本地远端同时删除）",
          func: () => { deleteMessages(this) }
        },
        {
          title: "撤回某条消息",
          func: () => { recallMessage(this) }
        },
        {
          title: "发送单聊的已读回执",
          func: () => { sendPrivateReadReceiptMessage(this) }
        },
        {
          title: "发送群聊的已读回执请求",
          func: () => { sendGroupReadReceiptRequest(this) }
        },
        {
          title: "发送群聊的已读回执响应",
          func: () => { sendGroupReadReceiptResponse(this) }
        },
        {
          title: "更新消息扩展",
          func: () => { updateMessageExpansion(this) }
        },
        {
          title: "根据key移除消息扩展",
          func: () => { removeMessageExpansionForKeys(this) }
        },
        {
          title: "修改消息的发送状态",
          func: () => { changeMessageSentStatus(this) }
        },
        {
          title: "修改消息的接收状态",
          func: () => { changeMessageReceiveStatus(this) }
        },
        {
          title: "搜索消息",
          func: () => { searchMessages(this) }
        },
        {
          title: "根据时间段搜索消息",
          func: () => { searchMessagesByTimeRange(this) }
        },
        {
          title: "根据用户ID搜索消息",
          func: () => { searchMessagesByUserId(this) }
        },
        {
          title: "发送群聊定向消息",
          func: () => { sendGroupMessageToDesignatedUsers(this) }
        },
      ]
    },
    {
      category: "未读消息数相关",
      useCase: [
        {
          title: "加载某个会话的未读数",
          func: () => { loadUnreadCount(this) }
        },
        {
          title: "加载所有未读数",
          func: () => { loadTotalUnreadCount(this) }
        },
        {
          title: "根据会话类型查询未读数",
          func: () => { loadUnreadCountByConversationTypes(this) }
        },
        {
          title: "加载所有@未读数",
          func: () => { loadUnreadMentionedCount(this) }
        },
        {
          title: "清除某个会话未读数",
          func: () => { clearUnreadCount(this) }
        },
      ]
    },
    {
      category: "聊天室相关",
      useCase: [
        {
          title: "加入聊天室",
          func: () => { joinChatRoom(this) }
        },
        {
          title: "离开聊天室",
          func: () => { leaveChatRoom(this) }
        },
        {
          title: "加载聊天室消息",
          func: () => { loadChatRoomMessages(this) }
        },
        {
          title: "添加聊天室KV",
          func: () => { addChatRoomEntry(this) }
        },
        {
          title: "添加多个聊天室kv",
          func: () => { addChatRoomEntries(this) }
        },
        {
          title: "加载聊天室KV",
          func: () => { loadChatRoomEntry(this) }
        },
        {
          title: "加载所有聊天室KV",
          func: () => { loadAllChatRoomEntries(this) }
        },
        {
          title: "移除聊天室KV",
          func: () => { removeChatRoomEntry(this) }
        },
        {
          title: "移除多个聊天室KV",
          func: () => { removeChatRoomEntries(this) }
        },
      ]
    }, {
      category: "超级群相关",
      useCase: [
        {
          title: "上报超级群的已读时间",
          func: () => { syncUltraGroupReadStatus(this) }
        },
        {
          title: "获取特定会话下所有频道的会话列表",
          func: () => { loadConversationsForAllChannel(this) }
        },
        {
          title: "根据会话id获取所有子频道的@未读消息总数",
          func: () => { loadUltraGroupUnreadMentionedCount(this) }
        },
        {
          title: "获取所有超级群会话的未读消息数",
          func: () => { loadUltraGroupAllUnreadCount(this) }
        },
        {
          title: "所有超级群会话中的未读 @ 消息数",
          func: () => { loadUltraGroupAllUnreadMentionedCount(this) }
        },
        {
          title: "获取指定会话的未读消息数",
          func: () => { loadUltraGroupUnreadCount(this) }
        },
        {
          title: "消息修改",
          func: () => { modifyUltraGroupMessage(this) }
        },
        {
          title: "撤回消息",
          func: () => { recallUltraGroupMessage(this) }
        },
        {
          title: "根据时间戳清除超级群消息",
          func: () => { clearUltraGroupMessages(this) }
        },
        {
          title: "向会话中发送正在输入的状态",
          func: () => { sendUltraGroupTypingStatus(this) }
        },
        {
          title: "删除本地所有channel特定时间之前的消息",
          func: () => { clearUltraGroupMessagesForAllChannel(this) }
        },
        {
          title: "获取同一个超级群下的批量服务消息(含所有频道)",
          func: () => { loadBatchRemoteUltraGroupMessages(this) }
        },
        {
          title: "更新消息扩展信息",
          func: () => { updateUltraGroupMessageExpansion(this) }
        },
        {
          title: "删除消息扩展消息中特定的键值对",
          func: () => { removeUltraGroupMessageExpansion(this) }
        },
        {
          title: "设置指定超级群的默认免打扰级别",
          func: () => { changeUltraGroupDefaultNotificationLevel(this) }
        },
        {
          title: "查询指定超级群的默认免打扰级别",
          func: () => { loadUltraGroupDefaultNotificationLevel(this) }
        },
        {
          title: "设置指定群频道的默认免打扰级别",
          func: () => { changeUltraGroupChannelDefaultNotificationLevel(this) }
        },
        {
          title: "查询指定群频道的默认免打扰级别",
          func: () => { loadUltraGroupChannelDefaultNotificationLevel(this) }
        }
      ]
    }, {
      category: "其它配置",
      useCase: [
        {
          title: "添加到黑名单",
          func: () => { addToBlacklist(this) }
        },
        {
          title: "从黑名单移除",
          func: () => { removeFromBlacklist(this) }
        },
        {
          title: "查询某用户的黑名单状态",
          func: () => { loadBlacklistStatus(this) }
        },
        {
          title: "加载黑名单列表",
          func: () => { loadBlacklist(this) }
        },
        {
          title: "修改免打扰时间段",
          func: () => { changeNotificationQuietHours(this) }
        },
        {
          title: "移除免打扰时间段",
          func: () => { removeNotificationQuietHours(this) }
        },
        {
          title: "获取免打扰时间段",
          func: () => { loadNotificationQuietHours(this) }
        },
        {
          title: "修改推送内容的显示状态",
          func: () => { changePushContentShowStatus(this) }
        },
        {
          title: "修改推送语言",
          func: () => { changePushLanguage(this) }
        },
        {
          title: "修改推送的接收状态",
          func: () => { changePushReceiveStatus(this) }
        },
        {
          title: "修改日志级别",
          func: () => { changeLogLevel(this) }
        }
      ]
    }
  ]

  constructor(props: any) {
    super(props)
    this.pop = React.createRef<Pop>();
    this.engine = null
    this.state = {
      unwindStates: this.data.map((value) => false),
      history: []
    }
  }
  registerCallBacks() {
    registerLinkListener(this)
    registerConversationsListener(this)
    registerMessagesListener(this)
    registerUltraGroupListener(this)
    registerUnreadMessagesListener(this)
    registerChatRoomListener(this)
    registerOthersListener(this)
  }

  showAlert(view: Element) {
    this.pop.current?.show(view)
  }

  hideAlert() {
    this.pop.current?.hide()
  }

  addHistory(operation: string, data: string, status: number) {
    let history = this.state.history;
    history.push({ operation: operation, data: data, status: status })
    this.setState({ history: history })
  }



  componentDidMount() {

    this.props.navigation.setOptions({ contentStyle: { backgroundColor: 'white' } })
  }
  render() {
    let render_content = this.data.map((value, index) => {
      let showState = this.state.unwindStates
      let render_case = value.useCase.map((v, i) => {
        return (
          <TouchableOpacity key={i} style={{ borderColor: "#dadada", borderRadius: 5, borderWidth: 1, padding: 5, margin: 8 }}
            onPress={() => {

              v!.func()
            }} >
            <Text style={{ fontSize: 15 }}>{v.title}</Text>
          </TouchableOpacity>
        )
      })

      return (
        <View key={index}>
          {
            index > 0 &&
            <View style={{ height: 1, backgroundColor: "#e3e3e3" }} />
          }
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 15, alignItems: 'center' }}
            onPress={() => {
              showState[index] = !showState[index]
              this.setState({ unwindStates: showState })
            }}>
            <Text style={{ fontSize: 18 }}>{value.category}</Text>
            <Image
              style={{ width: 15, height: 15 }}
              source={{ uri: `data:image/png;base64,${this.state.unwindStates[index] ? pullup : dropdown}` }} />
          </TouchableOpacity>
          {
            showState[index] &&
            <View style={{ flexDirection: "row", flexWrap: 'wrap', backgroundColor: "#eeeeee" }}>
              {render_case}
            </View>
          }
        </View>
      )
    })
    let tail: History | null = null
    if (this.state.history.length > 0)
      tail = this.state.history[this.state.history.length - 1]
    return (
      <View style={{ flex: 1 }}>
        <ScrollView >
          {
            render_content
          }
        </ScrollView>
        <Pop ref={this.pop} />
        {
          tail &&
          <View style={{
            position: 'absolute',
            bottom: 0,
            height: 40,
            width: '100%',
            backgroundColor: '#c0c0c0',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Text style={{ color: tail.status == 0 ? '#31be77' : 'red', marginLeft: 5, fontSize: 15 }}>{tail.operation}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => {
                this.showAlert(createAlertView(1,
                  <View style={{ padding: 15 }}>
                    <Text selectable={true} style={{ fontSize: 15 }}>{tail?.data}</Text>
                  </View>
                  , () => this.hideAlert()))
              }}>
                <Text style={{ color: 'blue', marginRight: 5, fontSize: 15 }}>详情</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                DeviceEventEmitter.addListener('onHistoryChange', () => {
                  let history = this.state.history
                  history.length = 0
                  this.setState({ history: history })
                })

                this.props.navigation.navigate('Details', { history: this.state.history })
              }}>
                <Text style={{ color: 'blue', marginRight: 5, fontSize: 15 }}>更多{'>>'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>
    )
  }
}
