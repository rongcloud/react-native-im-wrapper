import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  NativeModules,
  StatusBar,
  DeviceEventEmitter,
  Image,
} from 'react-native';
import {
  RCIMIWBlacklistStatus,
  RCIMIWBlockedMessageInfo,
  RCIMIWChatRoomEntriesOperationType,
  RCIMIWChatRoomMemberAction,
  RCIMIWChatRoomStatus,
  RCIMIWConnectionStatus,
  RCIMIWConversation,
  RCIMIWConversationType,
  RCIMIWCustomMessagePolicy,
  RCIMIWLogLevel,
  RCIMIWMediaMessage,
  RCIMIWMessage,
  RCIMIWMessageOperationPolicy,
  RCIMIWMessageType,
  RCIMIWPushNotificationLevel,
  RCIMIWPushNotificationQuietHoursLevel,
  RCIMIWReceivedStatus,
  RCIMIWSearchConversationResult,
  RCIMIWSentStatus,
  RCIMIWTextMessage,
  RCIMIWTimeOrder,
  RCIMIWTypingStatus,
  RCIMIWUltraGroupTypingStatus,
  RCIMIWUltraGroupTypingStatusInfo,
  RCIMIWImageMessage,
  RCIMIWVoiceMessage,
  RCIMIWReferenceMessage,
  RCIMIWGIFMessage,
  RCIMIWCustomMessage,
  RCIMIWLocationMessage,
  RCIMIWSightMessage,
  RCIMIWFileMessage,
} from '../../src/RCIMDefines';
import { RCIMIWEngine } from '../../src/RCIMEngine';
import {
  RCIMDemoConfig,
  RCIMDemoActionStyle,
  RCIMDemoParamValueType,
  RCIMDemoParamMergerType,
  RCIMDemoNodeActionType,
} from './RCIMDemoConfig';
import RCInputAlertView from './component/RCInputAlertView';
import RCTextAlertView from './component/RCTextAlertView';

import { RRCToast } from 'react-native-overlayer';

const { StatusBarManager } = NativeModules;
const TOPSAFE_HEIGHT =
  Platform.OS == 'ios'
    ? StatusBarManager.HEIGHT
    : (StatusBar.currentHeight ? StatusBar.currentHeight : 20) - 10;
const iconDownArrow =
  'iVBORw0KGgoAAAANSUhEUgAAATgAAAE4CAMAAAD4oR9YAAAAe1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC9eBywAAAAKHRSTlMAYAT74QjZ9y8nGBLv6POYVMWgeMyGfWg9HAy/rkW0WVBMu6c3IG90Ij2N5AAAA0hJREFUeNrswYEAAAAAgKD9qRepAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZudelBIGYiiARvq0gJQqFURAeZn//0KHcZzO6A6UKs3Nbs5P3LlJdo0xxhjTm/xOu5JEDJ9YuZJk3I9YtZqkrDJWrBqQmE3Eak0TElSzVmlBotasU5STrCRlle5I2mHMCtUkb8767AYEoFQXremQIMxYl/hAIHasyeieULxoaq3RnHAUiqL1kZDMH1iJCiJQ9bXWaUJgjqxBXBCcV8aXIQXDt2TK8EpCtIgZHEJDddmDD4TRArXxBh2t6QvBQo7WMU7TcpgwqmxPyAao0Rq9E7YhaLQeCR1mtOIGKvZAeAnXUF2eGU0MMiq/pGIs4IHaSJYMBbOh4g+EURuqSw50AIaxQ9UXrToCtfHBGOIFKYMxEH6AbvbAA+EN6VMAtFasHWpbufiudUI6dRgIBx2oKGdMKMdc2lqrwkBtDJ74OkE2VJdFylewQJV/tqQ1UBsbbssCVT5aNQfq9a3Vyyvfv0h6j1bEYy4NrfWZfNFva52RP/ocCG9VjcoveeTzQh75YrxrVd1QJQfC6EdJqLtWfwL18q7VGuolK3ayQBVvrX401P5b6xjm/e4XLa01W5G/nNHqzYcYPyhprT41VJeSb+PV00B1tFYLVIBdK/ZzoxPMxzeRz4H6K1qtoYq3Vj8b6u13rVsPdqht1czBPZtBi9ZRTiFJ1hao3QzjUN6hnuC11nACtfEWWaB2U1ugdlRZoHZtrbZD7aaIQ77ylboQrihk75E/Xw+2ADAQDmHke97EjpK6Rmt4z2b+RzG2QO1mnllD7edPoaX3O9S2Zur/8pWytob62d7dpCAIhWEYNQgFJ02ysEwaBLX/FTYKamYvFxQ9ZxMP97t/mUtt5JvpJ6f1WfGb1jW+lJQq/zz/dcFv+c6ls0INjVaoaVqNfNO0OpSUptUKNXPe4LWZMg6buYda2iioaVoFNd0xFNTMrRHUUseYjoI6yWmx/6Eu3fD61hj5Zv+13iumavf2UDOPxsg3s/sE1ejyT52ghgZBTdMqqJm2FtRML6gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACr8QZycN6eG2Q8XwAAAABJRU5ErkJggg==';
const iconUpArrow =
  'iVBORw0KGgoAAAANSUhEUgAAATgAAAE4CAMAAAD4oR9YAAAAe1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC9eBywAAAAKHRSTlMAYAT74QjZ9y8nGBLv6POYVMWgeMyGfWg9HAy/rkW0WVBMu6c3IG90Ij2N5AAAA21JREFUeNrs3Yta2kAUReFjCCByF1RQUfG63/8JS7+2QduYZGIsZ8j6X2J9e2YCBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4FsnaUMeid2YI9yAtrw2hTvuSbg2BXlL9dGEIMlzqlxNDgORJv/WfDdUtlElJa0hQM6Q1LKgZ0hoc1L1LQwXJUn/pPBjKTfWP/sZQ5ko5RgNDsa1y9UhrscFE+e4MBdapPjM1fCp51OeuDAFB3euvDAFB3RtzlF4aVNJaM6iktbphT4U4EM53faMKOveG/CPfHdIa4E0Z0hpg09EfpDXA6UgZ0lrdWaoMaa0uyQ0qqzVkoZLWAAsFG3PXajZTDfPE2q54oXKsWbJQwy2s1bpz1dTZWpudqxJuDL8eVJ4xfTzyJa3hC7W+c2ulYapgPGMy6z4qGM+YdqZqwOTU2uZVjUiH1i6bjppx17U2eR9U0lovqKQ1KKhNas9d61SNGrUlrVcqxIFwSFBZraUGY2VIa3NHvhwI50tu9T1mdtwulIPVWupE75DWyjZ9fZ/l8a7Wl8aD2o7vWusElWdMZsmjvttxfp05VR5Wa+2FSloLbfVfzI8trYOJvqC9L4TXqUqwWsOC2rzOMa3WC5VhtTYUVJ4x7axUDav1o8FI1bBa6y5UVus73RtVx11rQwu1xS+EFzqQXtzftc50MMuY71prLVTuWusElbR+OagtfiFcL6is1oUOLsrVei8HIjwQHkzkQXSrdZ3KhzeLyi6oTsR1IJw8yY2o7lov5UhEd60zuXITS1qf+/IlktU69BLUyH5TyE9Q40prci6HIvjnm1e55P671m1HPjn/+MZdUCP5NabBWH69mlvXPTnm90DYZ1AjSKurhZon9XnX6myhRnMgvPIbVNcHwmf+FmoUae3OFQVvP8/vPah7E1+/IezgDjXKA+GV14X6o707SEEgBoIAGC+iroIHfyAL+f8LPXkTEWHZbqj6xKSTzMxb6L7W83U2eY4Qa0dBjfvGtEQn1NwL4aQ31J8llNb4hPrJbR1/ahiIsaXj3qn11HQQCeprvdQVhoxBhy0JNS219iTUOaNWoVcW1IC2pYIr3+8ey9jF/dCu6c8hAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO1e/BvenrILk0cAAAAASUVORK5CYII=';

let engine: RCIMIWEngine | undefined;
let rcInputAlertView: RCInputAlertView;
let rcTextAlertView: RCTextAlertView;
let currentSendingMediaMessage: RCIMIWMediaMessage | null = null; //正在发送的媒体消息
let currentDownloadingMediaMessage: RCIMIWMediaMessage | null = null; //正在发送的媒体消息

interface IProps {
  navigation: any;
}

interface IStates {
  history: any[];
  clickedRow?: any;
  rcImDemoConfig: any;
}

class Home extends React.Component<IProps, IStates> {
  addHistory = (operation: string, data: string, status: number) => {
    let history: any = this.state.history;
    history.push({ operation: operation, data: data, status: status });
    this.setState({ history: history });
  };

  addListener = () => {
    if (!engine) {
      RRCToast.show('请先初始化引擎');
      return;
    }
    RRCToast.show('设置监听成功');
    this.addHistory('setListener', '设置了全部监听', 0);

    /**
     * Listener Auto Begin
     */
    //callback_onMessageReceived_call
    engine?.setOnMessageReceivedListener(
      (
        message: RCIMIWMessage,
        left: number,
        offline: boolean,
        hasPackage: boolean
      ) => {
        let result: any = {};
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        result.left = left;
        result.offline = offline;
        result.hasPackage = hasPackage;
        this.addHistory(
          'onMessageReceived',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onMessageReceived_call

    //callback_onConnectionStatusChanged_call
    engine?.setOnConnectionStatusChangedListener(
      (status: RCIMIWConnectionStatus) => {
        let result: any = {};
        result.status = status;
        this.addHistory(
          'onConnectionStatusChanged',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onConnectionStatusChanged_call

    //callback_onConversationTopStatusSynced_call
    engine?.setOnConversationTopStatusSyncedListener(
      (
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        top: boolean
      ) => {
        let result: any = {};
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.top = top;
        this.addHistory(
          'onConversationTopStatusSynced',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onConversationTopStatusSynced_call

    //callback_onRemoteMessageRecalled_call
    engine?.setOnRemoteMessageRecalledListener((message: RCIMIWMessage) => {
      let result: any = {};
      if (message != null) {
        result['message'] = message;
      } else {
        result['message'] = 'null';
      }
      this.addHistory(
        'onRemoteMessageRecalled',
        JSON.stringify(result, null, 4),
        0
      );
    });
    //callback_onRemoteMessageRecalled_call

    //callback_onPrivateReadReceiptReceived_call
    engine?.setOnPrivateReadReceiptReceivedListener(
      (targetId: string, channelId: string, timestamp: number) => {
        let result: any = {};
        result.targetId = targetId;
        result.channelId = channelId;
        result.timestamp = timestamp;
        this.addHistory(
          'onPrivateReadReceiptReceived',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onPrivateReadReceiptReceived_call

    //callback_onRemoteMessageExpansionUpdated_call
    engine?.setOnRemoteMessageExpansionUpdatedListener(
      (expansion: Map<string, string>, message: RCIMIWMessage) => {
        let result: any = {};
        result.expansion = Object.fromEntries(expansion.entries());
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        this.addHistory(
          'onRemoteMessageExpansionUpdated',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onRemoteMessageExpansionUpdated_call

    //callback_onRemoteMessageExpansionForKeyRemoved_call
    engine?.setOnRemoteMessageExpansionForKeyRemovedListener(
      (message: RCIMIWMessage, keys: Array<string>) => {
        let result: any = {};
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        result['keys'] = keys;
        this.addHistory(
          'onRemoteMessageExpansionForKeyRemoved',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onRemoteMessageExpansionForKeyRemoved_call

    //callback_onChatRoomMemberChanged_call
    engine?.setOnChatRoomMemberChangedListener(
      (targetId: string, actions: Array<RCIMIWChatRoomMemberAction>) => {
        let result: any = {};
        result.targetId = targetId;
        result['actions'] = actions;
        this.addHistory(
          'onChatRoomMemberChanged',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onChatRoomMemberChanged_call

    //callback_onTypingStatusChanged_call
    engine?.setOnTypingStatusChangedListener(
      (
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        userTypingStatus: Array<RCIMIWTypingStatus>
      ) => {
        let result: any = {};
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result['userTypingStatus'] = userTypingStatus;
        this.addHistory(
          'onTypingStatusChanged',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onTypingStatusChanged_call

    //callback_onConversationReadStatusSyncMessageReceived_call
    engine?.setOnConversationReadStatusSyncMessageReceivedListener(
      (type: RCIMIWConversationType, targetId: string, timestamp: number) => {
        let result: any = {};
        result.type = type;
        result.targetId = targetId;
        result.timestamp = timestamp;
        this.addHistory(
          'onConversationReadStatusSyncMessageReceived',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onConversationReadStatusSyncMessageReceived_call

    //callback_onChatRoomEntriesSynced_call
    engine?.setOnChatRoomEntriesSyncedListener((roomId: string) => {
      let result: any = {};
      result.roomId = roomId;
      this.addHistory(
        'onChatRoomEntriesSynced',
        JSON.stringify(result, null, 4),
        0
      );
    });
    //callback_onChatRoomEntriesSynced_call

    //callback_onChatRoomEntriesChanged_call
    engine?.setOnChatRoomEntriesChangedListener(
      (
        operationType: RCIMIWChatRoomEntriesOperationType,
        roomId: string,
        entries: Map<string, string>
      ) => {
        let result: any = {};
        result.operationType = operationType;
        result.roomId = roomId;
        result.entries = Object.fromEntries(entries.entries());
        this.addHistory(
          'onChatRoomEntriesChanged',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onChatRoomEntriesChanged_call

    //callback_onRemoteUltraGroupMessageExpansionUpdated_call
    engine?.setOnRemoteUltraGroupMessageExpansionUpdatedListener(
      (messages: Array<RCIMIWMessage>) => {
        let result: any = {};
        result['messages'] = messages;
        this.addHistory(
          'onRemoteUltraGroupMessageExpansionUpdated',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onRemoteUltraGroupMessageExpansionUpdated_call

    //callback_onRemoteUltraGroupMessageModified_call
    engine?.setOnRemoteUltraGroupMessageModifiedListener(
      (messages: Array<RCIMIWMessage>) => {
        let result: any = {};
        result['messages'] = messages;
        this.addHistory(
          'onRemoteUltraGroupMessageModified',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onRemoteUltraGroupMessageModified_call

    //callback_onRemoteUltraGroupMessageRecalled_call
    engine?.setOnRemoteUltraGroupMessageRecalledListener(
      (messages: Array<RCIMIWMessage>) => {
        let result: any = {};
        result['messages'] = messages;
        this.addHistory(
          'onRemoteUltraGroupMessageRecalled',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onRemoteUltraGroupMessageRecalled_call

    //callback_onUltraGroupReadTimeReceived_call
    engine?.setOnUltraGroupReadTimeReceivedListener(
      (targetId: string, channelId: string, timestamp: number) => {
        let result: any = {};
        result.targetId = targetId;
        result.channelId = channelId;
        result.timestamp = timestamp;
        this.addHistory(
          'onUltraGroupReadTimeReceived',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onUltraGroupReadTimeReceived_call

    //callback_onUltraGroupTypingStatusChanged_call
    engine?.setOnUltraGroupTypingStatusChangedListener(
      (info: Array<RCIMIWUltraGroupTypingStatusInfo>) => {
        let result: any = {};
        result['info'] = info;
        this.addHistory(
          'onUltraGroupTypingStatusChanged',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onUltraGroupTypingStatusChanged_call

    //callback_onMessageBlocked_call
    engine?.setOnMessageBlockedListener((info: RCIMIWBlockedMessageInfo) => {
      let result: any = {};
      if (info != null) {
        result['info'] = info;
      } else {
        result['info'] = 'null';
      }
      this.addHistory('onMessageBlocked', JSON.stringify(result, null, 4), 0);
    });
    //callback_onMessageBlocked_call

    //callback_onChatRoomStatusChanged_call
    engine?.setOnChatRoomStatusChangedListener(
      (targetId: string, status: RCIMIWChatRoomStatus) => {
        let result: any = {};
        result.targetId = targetId;
        result.status = status;
        this.addHistory(
          'onChatRoomStatusChanged',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onChatRoomStatusChanged_call

    //callback_onGroupMessageReadReceiptRequestReceived_call
    engine?.setOnGroupMessageReadReceiptRequestReceivedListener(
      (targetId: string, messageUId: string) => {
        let result: any = {};
        result.targetId = targetId;
        result.messageUId = messageUId;
        this.addHistory(
          'onGroupMessageReadReceiptRequestReceived',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onGroupMessageReadReceiptRequestReceived_call

    //callback_onGroupMessageReadReceiptResponseReceived_call
    engine?.setOnGroupMessageReadReceiptResponseReceivedListener(
      (
        targetId: string,
        messageUId: string,
        respondUserIds: Map<string, number>
      ) => {
        let result: any = {};
        result.targetId = targetId;
        result.messageUId = messageUId;
        result.respondUserIds = Object.fromEntries(respondUserIds.entries());
        this.addHistory(
          'onGroupMessageReadReceiptResponseReceived',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onGroupMessageReadReceiptResponseReceived_call

    //callback_onConnected_call
    engine?.setOnConnectedListener((code: number, userId: string) => {
      let result: any = {};
      result.code = code;
      result.userId = userId;
      this.addHistory('onConnected', JSON.stringify(result, null, 4), code);
    });
    //callback_onConnected_call

    //callback_onDatabaseOpened_call
    engine?.setOnDatabaseOpenedListener((code: number) => {
      let result: any = {};
      result.code = code;
      this.addHistory(
        'onDatabaseOpened',
        JSON.stringify(result, null, 4),
        code
      );
    });
    //callback_onDatabaseOpened_call

    //callback_onConversationLoaded_call
    engine?.setOnConversationLoadedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        conversation: RCIMIWConversation
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        if (conversation != null) {
          result['conversation'] = conversation;
        } else {
          result['conversation'] = 'null';
        }
        this.addHistory(
          'onConversationLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onConversationLoaded_call

    //callback_onConversationsLoaded_call
    engine?.setOnConversationsLoadedListener(
      (
        code: number,
        conversationTypes: Array<RCIMIWConversationType>,
        channelId: string,
        startTime: number,
        count: number,
        conversations: Array<RCIMIWConversation>
      ) => {
        let result: any = {};
        result.code = code;
        result['conversationTypes'] = conversationTypes;
        result.channelId = channelId;
        result.startTime = startTime;
        result.count = count;
        result['conversations'] = conversations;
        this.addHistory(
          'onConversationsLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onConversationsLoaded_call

    //callback_onConversationRemoved_call
    engine?.setOnConversationRemovedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        this.addHistory(
          'onConversationRemoved',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onConversationRemoved_call

    //callback_onConversationsRemoved_call
    engine?.setOnConversationsRemovedListener(
      (
        code: number,
        conversationTypes: Array<RCIMIWConversationType>,
        channelId: string
      ) => {
        let result: any = {};
        result.code = code;
        result['conversationTypes'] = conversationTypes;
        result.channelId = channelId;
        this.addHistory(
          'onConversationsRemoved',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onConversationsRemoved_call

    //callback_onTotalUnreadCountLoaded_call
    engine?.setOnTotalUnreadCountLoadedListener(
      (code: number, channelId: string, count: number) => {
        let result: any = {};
        result.code = code;
        result.channelId = channelId;
        result.count = count;
        this.addHistory(
          'onTotalUnreadCountLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onTotalUnreadCountLoaded_call

    //callback_onUnreadCountLoaded_call
    engine?.setOnUnreadCountLoadedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        count: number
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.count = count;
        this.addHistory(
          'onUnreadCountLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUnreadCountLoaded_call

    //callback_onUnreadCountByConversationTypesLoaded_call
    engine?.setOnUnreadCountByConversationTypesLoadedListener(
      (
        code: number,
        conversationTypes: Array<RCIMIWConversationType>,
        channelId: string,
        contain: boolean,
        count: number
      ) => {
        let result: any = {};
        result.code = code;
        result['conversationTypes'] = conversationTypes;
        result.channelId = channelId;
        result.contain = contain;
        result.count = count;
        this.addHistory(
          'onUnreadCountByConversationTypesLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUnreadCountByConversationTypesLoaded_call

    //callback_onUnreadMentionedCountLoaded_call
    engine?.setOnUnreadMentionedCountLoadedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        count: number
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.count = count;
        this.addHistory(
          'onUnreadMentionedCountLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUnreadMentionedCountLoaded_call

    //callback_onUltraGroupAllUnreadCountLoaded_call
    engine?.setOnUltraGroupAllUnreadCountLoadedListener(
      (code: number, count: number) => {
        let result: any = {};
        result.code = code;
        result.count = count;
        this.addHistory(
          'onUltraGroupAllUnreadCountLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupAllUnreadCountLoaded_call

    //callback_onUltraGroupAllUnreadMentionedCountLoaded_call
    engine?.setOnUltraGroupAllUnreadMentionedCountLoadedListener(
      (code: number, count: number) => {
        let result: any = {};
        result.code = code;
        result.count = count;
        this.addHistory(
          'onUltraGroupAllUnreadMentionedCountLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupAllUnreadMentionedCountLoaded_call

    //callback_onUnreadCountCleared_call
    engine?.setOnUnreadCountClearedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        timestamp: number
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.timestamp = timestamp;
        this.addHistory(
          'onUnreadCountCleared',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUnreadCountCleared_call

    //callback_onDraftMessageSaved_call
    engine?.setOnDraftMessageSavedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        draft: string
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.draft = draft;
        this.addHistory(
          'onDraftMessageSaved',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onDraftMessageSaved_call

    //callback_onDraftMessageCleared_call
    engine?.setOnDraftMessageClearedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        this.addHistory(
          'onDraftMessageCleared',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onDraftMessageCleared_call

    //callback_onDraftMessageLoaded_call
    engine?.setOnDraftMessageLoadedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        draft: string
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.draft = draft;
        this.addHistory(
          'onDraftMessageLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onDraftMessageLoaded_call

    //callback_onBlockedConversationsLoaded_call
    engine?.setOnBlockedConversationsLoadedListener(
      (
        code: number,
        conversationTypes: Array<RCIMIWConversationType>,
        channelId: string,
        conversations: Array<RCIMIWConversation>
      ) => {
        let result: any = {};
        result.code = code;
        result['conversationTypes'] = conversationTypes;
        result.channelId = channelId;
        result['conversations'] = conversations;
        this.addHistory(
          'onBlockedConversationsLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onBlockedConversationsLoaded_call

    //callback_onConversationTopStatusChanged_call
    engine?.setOnConversationTopStatusChangedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        top: boolean
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.top = top;
        this.addHistory(
          'onConversationTopStatusChanged',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onConversationTopStatusChanged_call

    //callback_onConversationTopStatusLoaded_call
    engine?.setOnConversationTopStatusLoadedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        top: boolean
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.top = top;
        this.addHistory(
          'onConversationTopStatusLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onConversationTopStatusLoaded_call

    //callback_onConversationReadStatusSynced_call
    engine?.setOnConversationReadStatusSyncedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        timestamp: number
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.timestamp = timestamp;
        this.addHistory(
          'onConversationReadStatusSynced',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onConversationReadStatusSynced_call

    //callback_onMessageAttached_call
    engine?.setOnMessageAttachedListener((message: RCIMIWMessage) => {
      let result: any = {};
      if (message != null) {
        result['message'] = message;
      } else {
        result['message'] = 'null';
      }
      this.addHistory('onMessageAttached', JSON.stringify(result, null, 4), 0);
    });
    //callback_onMessageAttached_call

    //callback_onMessageSent_call
    engine?.setOnMessageSentListener((code: number, message: RCIMIWMessage) => {
      let result: any = {};
      result.code = code;
      if (message != null) {
        result['message'] = message;
      } else {
        result['message'] = 'null';
      }
      this.addHistory('onMessageSent', JSON.stringify(result, null, 4), code);
    });
    //callback_onMessageSent_call

    //callback_onMediaMessageAttached_call
    engine?.setOnMediaMessageAttachedListener((message: RCIMIWMediaMessage) => {
      currentSendingMediaMessage = message;
      let result: any = {};
      if (message != null) {
        result['message'] = message;
      } else {
        result['message'] = 'null';
      }
      this.addHistory(
        'onMediaMessageAttached',
        JSON.stringify(result, null, 4),
        0
      );
    });
    //callback_onMediaMessageAttached_call

    //callback_onMediaMessageSending_call
    engine?.setOnMediaMessageSendingListener(
      (message: RCIMIWMediaMessage, progress: number) => {
        let result: any = {};
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        result.progress = progress;
        this.addHistory(
          'onMediaMessageSending',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onMediaMessageSending_call

    //callback_onSendingMediaMessageCanceled_call
    engine?.setOnSendingMediaMessageCanceledListener(
      (code: number, message: RCIMIWMediaMessage) => {
        currentSendingMediaMessage = null;
        let result: any = {};
        result.code = code;
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        this.addHistory(
          'onSendingMediaMessageCanceled',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onSendingMediaMessageCanceled_call

    //callback_onMediaMessageSent_call
    engine?.setOnMediaMessageSentListener(
      (code: number, message: RCIMIWMediaMessage) => {
        currentSendingMediaMessage = null;
        let result: any = {};
        result.code = code;
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        this.addHistory(
          'onMediaMessageSent',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMediaMessageSent_call

    //callback_onMediaMessageDownloading_call
    engine?.setOnMediaMessageDownloadingListener(
      (message: RCIMIWMediaMessage, progress: number) => {
        let result: any = {};
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        result.progress = progress;
        this.addHistory(
          'onMediaMessageDownloading',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onMediaMessageDownloading_call

    //callback_onMediaMessageDownloaded_call
    engine?.setOnMediaMessageDownloadedListener(
      (code: number, message: RCIMIWMediaMessage) => {
        currentDownloadingMediaMessage = null;
        let result: any = {};
        result.code = code;
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        this.addHistory(
          'onMediaMessageDownloaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMediaMessageDownloaded_call

    //callback_onDownloadingMediaMessageCanceled_call
    engine?.setOnDownloadingMediaMessageCanceledListener(
      (code: number, message: RCIMIWMediaMessage) => {
        currentDownloadingMediaMessage = null;
        let result: any = {};
        result.code = code;
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        this.addHistory(
          'onDownloadingMediaMessageCanceled',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onDownloadingMediaMessageCanceled_call

    //callback_onMessagesLoaded_call
    engine?.setOnMessagesLoadedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        sentTime: number,
        order: RCIMIWTimeOrder,
        messages: Array<RCIMIWMessage>
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.sentTime = sentTime;
        result.order = order;
        result['messages'] = messages;
        this.addHistory(
          'onMessagesLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMessagesLoaded_call

    //callback_onUnreadMentionedMessagesLoaded_call
    engine?.setOnUnreadMentionedMessagesLoadedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        messages: Array<RCIMIWMessage>
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result['messages'] = messages;
        this.addHistory(
          'onUnreadMentionedMessagesLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUnreadMentionedMessagesLoaded_call

    //callback_onFirstUnreadMessageLoaded_call
    engine?.setOnFirstUnreadMessageLoadedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        message: RCIMIWMessage
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        this.addHistory(
          'onFirstUnreadMessageLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onFirstUnreadMessageLoaded_call

    //callback_onMessageInserted_call
    engine?.setOnMessageInsertedListener(
      (code: number, message: RCIMIWMessage) => {
        let result: any = {};
        result.code = code;
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        this.addHistory(
          'onMessageInserted',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMessageInserted_call

    //callback_onMessagesInserted_call
    engine?.setOnMessagesInsertedListener(
      (code: number, messages: Array<RCIMIWMessage>) => {
        let result: any = {};
        result.code = code;
        result['messages'] = messages;
        this.addHistory(
          'onMessagesInserted',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMessagesInserted_call

    //callback_onMessagesCleared_call
    engine?.setOnMessagesClearedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        timestamp: number
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.timestamp = timestamp;
        this.addHistory(
          'onMessagesCleared',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMessagesCleared_call

    //callback_onLocalMessagesDeleted_call
    engine?.setOnLocalMessagesDeletedListener(
      (code: number, messages: Array<RCIMIWMessage>) => {
        let result: any = {};
        result.code = code;
        result['messages'] = messages;
        this.addHistory(
          'onLocalMessagesDeleted',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onLocalMessagesDeleted_call

    //callback_onMessagesDeleted_call
    engine?.setOnMessagesDeletedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        messages: Array<RCIMIWMessage>
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result['messages'] = messages;
        this.addHistory(
          'onMessagesDeleted',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMessagesDeleted_call

    //callback_onMessageRecalled_call
    engine?.setOnMessageRecalledListener(
      (code: number, message: RCIMIWMessage) => {
        let result: any = {};
        result.code = code;
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        this.addHistory(
          'onMessageRecalled',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMessageRecalled_call

    //callback_onPrivateReadReceiptMessageSent_call
    engine?.setOnPrivateReadReceiptMessageSentListener(
      (
        code: number,
        targetId: string,
        channelId: string,
        timestamp: number
      ) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.channelId = channelId;
        result.timestamp = timestamp;
        this.addHistory(
          'onPrivateReadReceiptMessageSent',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onPrivateReadReceiptMessageSent_call

    //callback_onMessageExpansionUpdated_call
    engine?.setOnMessageExpansionUpdatedListener(
      (code: number, messageUId: string, expansion: Map<string, string>) => {
        let result: any = {};
        result.code = code;
        result.messageUId = messageUId;
        result.expansion = Object.fromEntries(expansion.entries());
        this.addHistory(
          'onMessageExpansionUpdated',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMessageExpansionUpdated_call

    //callback_onMessageExpansionForKeysRemoved_call
    engine?.setOnMessageExpansionForKeysRemovedListener(
      (code: number, messageUId: string, keys: Array<string>) => {
        let result: any = {};
        result.code = code;
        result.messageUId = messageUId;
        result['keys'] = keys;
        this.addHistory(
          'onMessageExpansionForKeysRemoved',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMessageExpansionForKeysRemoved_call

    //callback_onMessageReceiveStatusChanged_call
    engine?.setOnMessageReceiveStatusChangedListener(
      (code: number, messageId: number) => {
        let result: any = {};
        result.code = code;
        result.messageId = messageId;
        this.addHistory(
          'onMessageReceiveStatusChanged',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMessageReceiveStatusChanged_call

    //callback_onMessageSentStatusChanged_call
    engine?.setOnMessageSentStatusChangedListener(
      (code: number, messageId: number) => {
        let result: any = {};
        result.code = code;
        result.messageId = messageId;
        this.addHistory(
          'onMessageSentStatusChanged',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMessageSentStatusChanged_call

    //callback_onChatRoomJoined_call
    engine?.setOnChatRoomJoinedListener((code: number, targetId: string) => {
      let result: any = {};
      result.code = code;
      result.targetId = targetId;
      this.addHistory(
        'onChatRoomJoined',
        JSON.stringify(result, null, 4),
        code
      );
    });
    //callback_onChatRoomJoined_call

    //callback_onChatRoomJoining_call
    engine?.setOnChatRoomJoiningListener((targetId: string) => {
      let result: any = {};
      result.targetId = targetId;
      this.addHistory('onChatRoomJoining', JSON.stringify(result, null, 4), 0);
    });
    //callback_onChatRoomJoining_call

    //callback_onChatRoomLeft_call
    engine?.setOnChatRoomLeftListener((code: number, targetId: string) => {
      let result: any = {};
      result.code = code;
      result.targetId = targetId;
      this.addHistory('onChatRoomLeft', JSON.stringify(result, null, 4), code);
    });
    //callback_onChatRoomLeft_call

    //callback_onChatRoomMessagesLoaded_call
    engine?.setOnChatRoomMessagesLoadedListener(
      (
        code: number,
        targetId: string,
        messages: Array<RCIMIWMessage>,
        syncTime: number
      ) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result['messages'] = messages;
        result.syncTime = syncTime;
        this.addHistory(
          'onChatRoomMessagesLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onChatRoomMessagesLoaded_call

    //callback_onChatRoomEntryAdded_call
    engine?.setOnChatRoomEntryAddedListener(
      (code: number, targetId: string, key: string) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.key = key;
        this.addHistory(
          'onChatRoomEntryAdded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onChatRoomEntryAdded_call

    //callback_onChatRoomEntriesAdded_call
    engine?.setOnChatRoomEntriesAddedListener(
      (
        code: number,
        targetId: string,
        entries: Map<string, string>,
        errorEntries: Map<string, number>
      ) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.entries = Object.fromEntries(entries.entries());
        result.errorEntries = Object.fromEntries(errorEntries.entries());
        this.addHistory(
          'onChatRoomEntriesAdded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onChatRoomEntriesAdded_call

    //callback_onChatRoomEntryLoaded_call
    engine?.setOnChatRoomEntryLoadedListener(
      (code: number, targetId: string, entry: Map<string, string>) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.entry = Object.fromEntries(entry.entries());
        this.addHistory(
          'onChatRoomEntryLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onChatRoomEntryLoaded_call

    //callback_onChatRoomAllEntriesLoaded_call
    engine?.setOnChatRoomAllEntriesLoadedListener(
      (code: number, targetId: string, entries: Map<string, string>) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.entries = Object.fromEntries(entries.entries());
        this.addHistory(
          'onChatRoomAllEntriesLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onChatRoomAllEntriesLoaded_call

    //callback_onChatRoomEntryRemoved_call
    engine?.setOnChatRoomEntryRemovedListener(
      (code: number, targetId: string, key: string) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.key = key;
        this.addHistory(
          'onChatRoomEntryRemoved',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onChatRoomEntryRemoved_call

    //callback_onChatRoomEntriesRemoved_call
    engine?.setOnChatRoomEntriesRemovedListener(
      (code: number, targetId: string, keys: Array<string>) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result['keys'] = keys;
        this.addHistory(
          'onChatRoomEntriesRemoved',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onChatRoomEntriesRemoved_call

    //callback_onBlacklistAdded_call
    engine?.setOnBlacklistAddedListener((code: number, userId: string) => {
      let result: any = {};
      result.code = code;
      result.userId = userId;
      this.addHistory(
        'onBlacklistAdded',
        JSON.stringify(result, null, 4),
        code
      );
    });
    //callback_onBlacklistAdded_call

    //callback_onBlacklistRemoved_call
    engine?.setOnBlacklistRemovedListener((code: number, userId: string) => {
      let result: any = {};
      result.code = code;
      result.userId = userId;
      this.addHistory(
        'onBlacklistRemoved',
        JSON.stringify(result, null, 4),
        code
      );
    });
    //callback_onBlacklistRemoved_call

    //callback_onBlacklistStatusLoaded_call
    engine?.setOnBlacklistStatusLoadedListener(
      (code: number, userId: string, status: RCIMIWBlacklistStatus) => {
        let result: any = {};
        result.code = code;
        result.userId = userId;
        result.status = status;
        this.addHistory(
          'onBlacklistStatusLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onBlacklistStatusLoaded_call

    //callback_onBlacklistLoaded_call
    engine?.setOnBlacklistLoadedListener(
      (code: number, userIds: Array<string>) => {
        let result: any = {};
        result.code = code;
        result['userIds'] = userIds;
        this.addHistory(
          'onBlacklistLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onBlacklistLoaded_call

    //callback_onMessagesSearched_call
    engine?.setOnMessagesSearchedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        keyword: string,
        startTime: number,
        count: number,
        messages: Array<RCIMIWMessage>
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.keyword = keyword;
        result.startTime = startTime;
        result.count = count;
        result['messages'] = messages;
        this.addHistory(
          'onMessagesSearched',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMessagesSearched_call

    //callback_onMessagesSearchedByTimeRange_call
    engine?.setOnMessagesSearchedByTimeRangeListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        keyword: string,
        startTime: number,
        endTime: number,
        offset: number,
        count: number,
        messages: Array<RCIMIWMessage>
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.keyword = keyword;
        result.startTime = startTime;
        result.endTime = endTime;
        result.offset = offset;
        result.count = count;
        result['messages'] = messages;
        this.addHistory(
          'onMessagesSearchedByTimeRange',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMessagesSearchedByTimeRange_call

    //callback_onMessagesSearchedByUserId_call
    engine?.setOnMessagesSearchedByUserIdListener(
      (
        code: number,
        userId: string,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        startTime: number,
        count: number,
        messages: Array<RCIMIWMessage>
      ) => {
        let result: any = {};
        result.code = code;
        result.userId = userId;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.startTime = startTime;
        result.count = count;
        result['messages'] = messages;
        this.addHistory(
          'onMessagesSearchedByUserId',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMessagesSearchedByUserId_call

    //callback_onConversationsSearched_call
    engine?.setOnConversationsSearchedListener(
      (
        code: number,
        conversationTypes: Array<RCIMIWConversationType>,
        channelId: string,
        messageTypes: Array<RCIMIWMessageType>,
        keyword: string,
        conversations: Array<RCIMIWSearchConversationResult>
      ) => {
        let result: any = {};
        result.code = code;
        result['conversationTypes'] = conversationTypes;
        result.channelId = channelId;
        result['messageTypes'] = messageTypes;
        result.keyword = keyword;
        result['conversations'] = conversations;
        this.addHistory(
          'onConversationsSearched',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onConversationsSearched_call

    //callback_onGroupReadReceiptRequestSent_call
    engine?.setOnGroupReadReceiptRequestSentListener(
      (code: number, message: RCIMIWMessage) => {
        let result: any = {};
        result.code = code;
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        this.addHistory(
          'onGroupReadReceiptRequestSent',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onGroupReadReceiptRequestSent_call

    //callback_onGroupReadReceiptResponseSent_call
    engine?.setOnGroupReadReceiptResponseSentListener(
      (
        code: number,
        targetId: string,
        channelId: string,
        messages: Array<RCIMIWMessage>
      ) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.channelId = channelId;
        result['messages'] = messages;
        this.addHistory(
          'onGroupReadReceiptResponseSent',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onGroupReadReceiptResponseSent_call

    //callback_onNotificationQuietHoursChanged_call
    engine?.setOnNotificationQuietHoursChangedListener(
      (
        code: number,
        startTime: string,
        spanMinutes: number,
        level: RCIMIWPushNotificationQuietHoursLevel
      ) => {
        let result: any = {};
        result.code = code;
        result.startTime = startTime;
        result.spanMinutes = spanMinutes;
        result.level = level;
        this.addHistory(
          'onNotificationQuietHoursChanged',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onNotificationQuietHoursChanged_call

    //callback_onNotificationQuietHoursRemoved_call
    engine?.setOnNotificationQuietHoursRemovedListener((code: number) => {
      let result: any = {};
      result.code = code;
      this.addHistory(
        'onNotificationQuietHoursRemoved',
        JSON.stringify(result, null, 4),
        code
      );
    });
    //callback_onNotificationQuietHoursRemoved_call

    //callback_onNotificationQuietHoursLoaded_call
    engine?.setOnNotificationQuietHoursLoadedListener(
      (
        code: number,
        startTime: string,
        spanMinutes: number,
        level: RCIMIWPushNotificationQuietHoursLevel
      ) => {
        let result: any = {};
        result.code = code;
        result.startTime = startTime;
        result.spanMinutes = spanMinutes;
        result.level = level;
        this.addHistory(
          'onNotificationQuietHoursLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onNotificationQuietHoursLoaded_call

    //callback_onConversationNotificationLevelChanged_call
    engine?.setOnConversationNotificationLevelChangedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        level: RCIMIWPushNotificationLevel
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.level = level;
        this.addHistory(
          'onConversationNotificationLevelChanged',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onConversationNotificationLevelChanged_call

    //callback_onConversationNotificationLevelLoaded_call
    engine?.setOnConversationNotificationLevelLoadedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        level: RCIMIWPushNotificationLevel
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.level = level;
        this.addHistory(
          'onConversationNotificationLevelLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onConversationNotificationLevelLoaded_call

    //callback_onConversationTypeNotificationLevelChanged_call
    engine?.setOnConversationTypeNotificationLevelChangedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        level: RCIMIWPushNotificationLevel
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.level = level;
        this.addHistory(
          'onConversationTypeNotificationLevelChanged',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onConversationTypeNotificationLevelChanged_call

    //callback_onConversationTypeNotificationLevelLoaded_call
    engine?.setOnConversationTypeNotificationLevelLoadedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        level: RCIMIWPushNotificationLevel
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.level = level;
        this.addHistory(
          'onConversationTypeNotificationLevelLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onConversationTypeNotificationLevelLoaded_call

    //callback_onUltraGroupDefaultNotificationLevelChanged_call
    engine?.setOnUltraGroupDefaultNotificationLevelChangedListener(
      (code: number, targetId: string, level: RCIMIWPushNotificationLevel) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.level = level;
        this.addHistory(
          'onUltraGroupDefaultNotificationLevelChanged',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupDefaultNotificationLevelChanged_call

    //callback_onUltraGroupDefaultNotificationLevelLoaded_call
    engine?.setOnUltraGroupDefaultNotificationLevelLoadedListener(
      (code: number, targetId: string, level: RCIMIWPushNotificationLevel) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.level = level;
        this.addHistory(
          'onUltraGroupDefaultNotificationLevelLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupDefaultNotificationLevelLoaded_call

    //callback_onUltraGroupChannelDefaultNotificationLevelChanged_call
    engine?.setOnUltraGroupChannelDefaultNotificationLevelChangedListener(
      (
        code: number,
        targetId: string,
        channelId: string,
        level: RCIMIWPushNotificationLevel
      ) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.channelId = channelId;
        result.level = level;
        this.addHistory(
          'onUltraGroupChannelDefaultNotificationLevelChanged',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupChannelDefaultNotificationLevelChanged_call

    //callback_onUltraGroupChannelDefaultNotificationLevelLoaded_call
    engine?.setOnUltraGroupChannelDefaultNotificationLevelLoadedListener(
      (
        code: number,
        targetId: string,
        channelId: string,
        level: RCIMIWPushNotificationLevel
      ) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.channelId = channelId;
        result.level = level;
        this.addHistory(
          'onUltraGroupChannelDefaultNotificationLevelLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupChannelDefaultNotificationLevelLoaded_call

    //callback_onPushContentShowStatusChanged_call
    engine?.setOnPushContentShowStatusChangedListener(
      (code: number, showContent: boolean) => {
        let result: any = {};
        result.code = code;
        result.showContent = showContent;
        this.addHistory(
          'onPushContentShowStatusChanged',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onPushContentShowStatusChanged_call

    //callback_onPushLanguageChanged_call
    engine?.setOnPushLanguageChangedListener(
      (code: number, language: string) => {
        let result: any = {};
        result.code = code;
        result.language = language;
        this.addHistory(
          'onPushLanguageChanged',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onPushLanguageChanged_call

    //callback_onPushReceiveStatusChanged_call
    engine?.setOnPushReceiveStatusChangedListener(
      (code: number, receive: boolean) => {
        let result: any = {};
        result.code = code;
        result.receive = receive;
        this.addHistory(
          'onPushReceiveStatusChanged',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onPushReceiveStatusChanged_call

    //callback_onMessageCountLoaded_call
    engine?.setOnMessageCountLoadedListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        channelId: string,
        count: number
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result.channelId = channelId;
        result.count = count;
        this.addHistory(
          'onMessageCountLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onMessageCountLoaded_call

    //callback_onTopConversationsLoaded_call
    engine?.setOnTopConversationsLoadedListener(
      (
        code: number,
        conversationTypes: Array<RCIMIWConversationType>,
        channelId: string,
        conversations: Array<RCIMIWConversation>
      ) => {
        let result: any = {};
        result.code = code;
        result['conversationTypes'] = conversationTypes;
        result.channelId = channelId;
        result['conversations'] = conversations;
        this.addHistory(
          'onTopConversationsLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onTopConversationsLoaded_call

    //callback_onGroupMessageToDesignatedUsersAttached_call
    engine?.setOnGroupMessageToDesignatedUsersAttachedListener(
      (message: RCIMIWMessage) => {
        let result: any = {};
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        this.addHistory(
          'onGroupMessageToDesignatedUsersAttached',
          JSON.stringify(result, null, 4),
          0
        );
      }
    );
    //callback_onGroupMessageToDesignatedUsersAttached_call

    //callback_onGroupMessageToDesignatedUsersSent_call
    engine?.setOnGroupMessageToDesignatedUsersSentListener(
      (code: number, message: RCIMIWMessage) => {
        let result: any = {};
        result.code = code;
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        this.addHistory(
          'onGroupMessageToDesignatedUsersSent',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onGroupMessageToDesignatedUsersSent_call

    //callback_onUltraGroupReadStatusSynced_call
    engine?.setOnUltraGroupReadStatusSyncedListener(
      (
        code: number,
        targetId: string,
        channelId: string,
        timestamp: number
      ) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.channelId = channelId;
        result.timestamp = timestamp;
        this.addHistory(
          'onUltraGroupReadStatusSynced',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupReadStatusSynced_call

    //callback_onConversationsLoadedForAllChannel_call
    engine?.setOnConversationsLoadedForAllChannelListener(
      (
        code: number,
        type: RCIMIWConversationType,
        targetId: string,
        conversations: Array<RCIMIWConversation>
      ) => {
        let result: any = {};
        result.code = code;
        result.type = type;
        result.targetId = targetId;
        result['conversations'] = conversations;
        this.addHistory(
          'onConversationsLoadedForAllChannel',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onConversationsLoadedForAllChannel_call

    //callback_onUltraGroupUnreadMentionedCountLoaded_call
    engine?.setOnUltraGroupUnreadMentionedCountLoadedListener(
      (code: number, targetId: string, count: number) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.count = count;
        this.addHistory(
          'onUltraGroupUnreadMentionedCountLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupUnreadMentionedCountLoaded_call

    //callback_onUltraGroupUnreadCountLoaded_call
    engine?.setOnUltraGroupUnreadCountLoadedListener(
      (code: number, targetId: string, count: number) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.count = count;
        this.addHistory(
          'onUltraGroupUnreadCountLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupUnreadCountLoaded_call

    //callback_onUltraGroupMessageModified_call
    engine?.setOnUltraGroupMessageModifiedListener(
      (code: number, messageUId: string) => {
        let result: any = {};
        result.code = code;
        result.messageUId = messageUId;
        this.addHistory(
          'onUltraGroupMessageModified',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupMessageModified_call

    //callback_onUltraGroupMessageRecalled_call
    engine?.setOnUltraGroupMessageRecalledListener(
      (code: number, message: RCIMIWMessage, deleteRemote: boolean) => {
        let result: any = {};
        result.code = code;
        if (message != null) {
          result['message'] = message;
        } else {
          result['message'] = 'null';
        }
        result.deleteRemote = deleteRemote;
        this.addHistory(
          'onUltraGroupMessageRecalled',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupMessageRecalled_call

    //callback_onUltraGroupMessagesCleared_call
    engine?.setOnUltraGroupMessagesClearedListener(
      (
        code: number,
        targetId: string,
        channelId: string,
        timestamp: number,
        policy: RCIMIWMessageOperationPolicy
      ) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.channelId = channelId;
        result.timestamp = timestamp;
        result.policy = policy;
        this.addHistory(
          'onUltraGroupMessagesCleared',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupMessagesCleared_call

    //callback_onUltraGroupMessagesClearedForAllChannel_call
    engine?.setOnUltraGroupMessagesClearedForAllChannelListener(
      (code: number, targetId: string, timestamp: number) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.timestamp = timestamp;
        this.addHistory(
          'onUltraGroupMessagesClearedForAllChannel',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupMessagesClearedForAllChannel_call

    //callback_onUltraGroupTypingStatusSent_call
    engine?.setOnUltraGroupTypingStatusSentListener(
      (
        code: number,
        targetId: string,
        channelId: string,
        typingStatus: RCIMIWUltraGroupTypingStatus
      ) => {
        let result: any = {};
        result.code = code;
        result.targetId = targetId;
        result.channelId = channelId;
        result.typingStatus = typingStatus;
        this.addHistory(
          'onUltraGroupTypingStatusSent',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupTypingStatusSent_call

    //callback_onBatchRemoteUltraGroupMessagesLoaded_call
    engine?.setOnBatchRemoteUltraGroupMessagesLoadedListener(
      (
        code: number,
        matchedMessages: Array<RCIMIWMessage>,
        notMatchedMessages: Array<RCIMIWMessage>
      ) => {
        let result: any = {};
        result.code = code;
        result['matchedMessages'] = matchedMessages;
        result['notMatchedMessages'] = notMatchedMessages;
        this.addHistory(
          'onBatchRemoteUltraGroupMessagesLoaded',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onBatchRemoteUltraGroupMessagesLoaded_call

    //callback_onUltraGroupMessageExpansionUpdated_call
    engine?.setOnUltraGroupMessageExpansionUpdatedListener(
      (code: number, expansion: Map<string, string>, messageUId: string) => {
        let result: any = {};
        result.code = code;
        result.expansion = Object.fromEntries(expansion.entries());
        result.messageUId = messageUId;
        this.addHistory(
          'onUltraGroupMessageExpansionUpdated',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupMessageExpansionUpdated_call

    //callback_onUltraGroupMessageExpansionForKeysRemoved_call
    engine?.setOnUltraGroupMessageExpansionForKeysRemovedListener(
      (code: number, messageUId: string, keys: Array<string>) => {
        let result: any = {};
        result.code = code;
        result.messageUId = messageUId;
        result['keys'] = keys;
        this.addHistory(
          'onUltraGroupMessageExpansionForKeysRemoved',
          JSON.stringify(result, null, 4),
          code
        );
      }
    );
    //callback_onUltraGroupMessageExpansionForKeysRemoved_call

    /**
     * Listener Auto End
     */
  };

  create = (dict: any) => {
    //fun_create_call
    if (engine) {
      RRCToast.show('请不要重复初始化引擎');
      return;
    }
    let pushOptions = {
      idMI: '2882303761520172728',
      appKeyMI: '5592017294728',
      appIdMeizu: '149367',
      appKeyMeizu: '1d3714799f014e8fbe429b58e95d712e',
      appKeyOPPO: 'dc890c33dc2c4f2ebd70e8170d52a312',
      appSecretOPPO: 'a059f84a615d4cc28b2a8d47797739ea',
      enableHWPush: true,
      enableFCM: false,
      enableVIVOPush: true,
    };
    let options: any = {
      pushOptions: pushOptions,
    };
    let appKey: string = dict?.appKey ? dict?.appKey : '';
    if (dict?.naviServer?.length > 0) {
      options = { ...options, naviServer: dict?.naviServer };
    }
    let tempEngine = RCIMIWEngine.create(appKey, options);
    let code = 0;
    if (tempEngine) {
      engine = tempEngine;
      RRCToast.show('引擎初始化成功');
    } else {
      code = -1;
      RRCToast.show('引擎初始化失败');
    }
    rcInputAlertView.hidden();
    this.addHistory(
      'create',
      JSON.stringify({ code: code, appKey: appKey, options: options }, null, 4),
      code
    );
    //fun_create_call
  };

  destroy = () => {
    //fun_destroy_call
    engine?.destroy();
    engine = undefined;
    this.addHistory('destroy', '销毁引擎', 0);
    //fun_destroy_call
  };

  sendTextMessage = (dict: any) => {
    //fun_sendTextMessage_call
    let type = dict?.type;
    let targetId = dict?.targetId;
    let channelId = dict?.channelId;
    let text = dict?.text;
    let pushContent = dict?.pushContent;
    let pushData = dict?.pushData;
    let userIdList = dict?.userIdList;
    let atType = dict?.atType;
    let mentionedContent = dict?.mentionedContent;
    let message: RCIMIWTextMessage = {
      conversationType: type,
      messageType: RCIMIWMessageType.TEXT,
      targetId: targetId,
      channelId: channelId,
      mentionedInfo: {
        type: atType,
        userIdList: userIdList,
        mentionedContent: mentionedContent,
      },
      pushOptions: {
        pushContent: pushContent,
        pushData: pushData,
      },
      text: text,
      expansion: type == 1 || type == 2 || type == 5 ? { AA: 'BB' } : undefined,
    };
    this.addHistory(
      'createTextMessage',
      JSON.stringify({ message }, null, 4),
      0
    );
    this.sendMessage({ message: message });
    //fun_sendTextMessage_call
  };

  sendImageMessage = (dict: any) => {
    //fun_sendImageMessage_call
    let type = dict?.type;
    let targetId = dict?.targetId;
    let channelId = dict?.channelId;
    let path = dict?.path;
    this.createImageMessage({ type, targetId, channelId, path }).then(
      (value: any) => {
        this.addHistory(
          'createImageMessage',
          JSON.stringify({ value }, null, 4),
          0
        );
        this.sendMediaMessage({ message: value });
      }
    );
    //fun_sendImageMessage_call
  };

  sendFileMessage = (dict: any) => {
    //fun_sendFileMessage_call
    let type = dict?.type;
    let targetId = dict?.targetId;
    let channelId = dict?.channelId;
    let path = dict?.path;
    this.createFileMessage({ type, targetId, channelId, path }).then(
      (value: any) => {
        this.addHistory(
          'createFileMessage',
          JSON.stringify({ value }, null, 4),
          0
        );
        this.sendMediaMessage({ message: value });
      }
    );
    //fun_sendFileMessage_call
  };

  sendVoiceMessage = (dict: any) => {
    //fun_sendVoiceMessage_call
    let type = dict?.type;
    let targetId = dict?.targetId;
    let channelId = dict?.channelId;
    let path = dict?.path;
    this.createVoiceMessage({
      type,
      targetId,
      channelId,
      path,
      duration: 10,
    }).then((value: any) => {
      this.addHistory(
        'createVoiceMessage',
        JSON.stringify({ value }, null, 4),
        0
      );
      this.sendMediaMessage({ message: value });
    });
    //fun_sendVoiceMessage_call
  };

  sendSightMessage = (dict: any) => {
    //fun_sendSightMessage_call
    let type = dict?.type;
    let targetId = dict?.targetId;
    let channelId = dict?.channelId;
    let path = dict?.path;
    this.createSightMessage({
      type,
      targetId,
      channelId,
      path,
      duration: 10,
    }).then((value: any) => {
      this.addHistory(
        'createSightMessage',
        JSON.stringify({ value }, null, 4),
        0
      );
      this.sendMediaMessage({ message: value });
    });
    //fun_sendSightMessage_call
  };

  sendGifMessage = (dict: any) => {
    //fun_sendGifMessage_call
    let type = dict?.type;
    let targetId = dict?.targetId;
    let channelId = dict?.channelId;
    let path = dict?.path;
    this.createGIFMessage({ type, targetId, channelId, path }).then(
      (value: any) => {
        this.addHistory(
          'createGIFMessage',
          JSON.stringify({ value }, null, 4),
          0
        );
        this.sendMediaMessage({ message: value });
      }
    );
    //fun_sendGifMessage_call
  };

  sendLocationMessage = (dict: any) => {
    //fun_sendLocationMessage_call
    let type = dict?.type;
    let targetId = dict?.targetId;
    let channelId = dict?.channelId;
    let longitude = dict?.longitude;
    let latitude = dict?.latitude;
    let poiName = dict?.poiName;
    let thumbnailPath = dict?.thumbnailPath;
    this.createLocationMessage({
      type,
      targetId,
      channelId,
      longitude,
      latitude,
      poiName,
      thumbnailPath,
    }).then((value: any) => {
      this.addHistory(
        'createLocationMessage',
        JSON.stringify({ value }, null, 4),
        0
      );
      this.sendMessage({ message: value });
    });
    //fun_sendLocationMessage_call
  };

  sendCustomMessage = (dict: any) => {
    //fun_sendCustomMessage_call
    let type = dict?.type;
    let targetId = dict?.targetId;
    let policy = dict?.policy;
    let channelId = dict?.channelId;
    let messageIdentifier = dict?.messageIdentifier;
    let keys = dict?.keys;
    let values = dict?.values;
    if (keys?.length <= 0 || keys?.length != values?.length) {
      RRCToast.show('Keys和Values长度不一致');
      return;
    }
    let fields: Map<string, string> = new Map();
    for (let i = 0; i < keys.length; i++) {
      fields.set(keys[i], values[i]);
    }
    this.createCustomMessage({
      type,
      targetId,
      channelId,
      policy,
      messageIdentifier,
      fields,
    }).then((value: any) => {
      this.addHistory(
        'createCustomMessage',
        JSON.stringify({ value }, null, 4),
        0
      );
      this.sendMessage({ message: value });
    });
    //fun_sendCustomMessage_call
  };

  nodeAction = (dict: any, item: any) => {
    if (item?.nodeActionType == RCIMDemoNodeActionType.GetMessageById) {
      this.nodeGetMessageById(dict, item);
    } else if (item?.nodeActionType == RCIMDemoNodeActionType.GetMessageByIds) {
      this.nodeGetMessageById(dict, item);
    } else if (
      item?.nodeActionType == RCIMDemoNodeActionType.CreateTextMessage
    ) {
      this.nodeCreateMessage(dict, item);
    } else if (
      item?.nodeActionType == RCIMDemoNodeActionType.CreateTextMessages
    ) {
      this.nodeCreateMessage(dict, item);
    } else if (
      item?.nodeActionType == RCIMDemoNodeActionType.CreateTextMessageGroup
    ) {
      this.nodeCreateMessage(dict, item);
    } else {
      RRCToast.show('缺少 nodeActionType');
    }
  };

  nodeNextAction = (item: any) => {
    if (item && item?.nextAction) {
      item.action = item.nextAction;
      this.executeFunction(item);
    } else {
      RRCToast.show('nodeNextAction:参数有误');
    }
  };

  nodeGetMessageById = (dict: any, item: any) => {
    if (item?.nodeActionType == RCIMDemoNodeActionType.GetMessageById) {
      let messageId = dict?.messageId;
      const callback = {
        onSuccess: (t: RCIMIWMessage) => {
          this.addHistory('onSuccess', JSON.stringify({ t }), 0);
          if (item && item?.params) {
            for (let i = 0; i < item?.params?.length; i++) {
              let param = item?.params[i];
              if (item?.nodeKey === param?.key) {
                param.value = t;
              }
            }
            this.nodeNextAction(item);
          }
        },
        onError: (code: number) => {
          this.addHistory('onError', JSON.stringify({ code }), code);
        },
      };
      let promise = engine?.getMessageById(messageId, callback);
      promise?.then((code: number) => {
        this.addHistory(
          'getMessageById',
          JSON.stringify({ messageId, callback }),
          code
        );
      });
    } else {
      let messageIds: any[] = dict?.messageIds;
      let messages: any[] = [];
      let count = 0;
      for (let j = 0; j < messageIds?.length; j++) {
        let messageId = messageIds[j];
        const callback = {
          onSuccess: (t: RCIMIWMessage) => {
            count++;
            this.addHistory('onSuccess', JSON.stringify({ t }), 0);
            if (t) {
              messages.push(t);
            }
            if (count == messageIds?.length) {
              if (item && item?.params) {
                for (let i = 0; i < item?.params?.length; i++) {
                  let param = item?.params[i];
                  if (item?.nodeKey === param?.key) {
                    param.value = messages;
                  }
                }
                this.nodeNextAction(item);
              }
            }
          },
          onError: (code: number) => {
            count++;
            this.addHistory('onError', JSON.stringify({ code }), code);
            if (count == messageIds?.length) {
              if (item && item?.params) {
                for (let i = 0; i < item?.params?.length; i++) {
                  let param = item?.params[i];
                  if (item?.nodeKey === param?.key) {
                    param.value = messages;
                  }
                }
                this.nodeNextAction(item);
              }
            }
          },
        };
        let promise = engine?.getMessageById(messageId, callback);
        promise?.then((code: number) => {
          this.addHistory(
            'getMessageById',
            JSON.stringify({ messageId, callback }),
            code
          );
        });
      }
    }
  };

  nodeCreateMessage = (dict: any, item: any) => {
    let type = dict?.type;
    if (
      item?.nodeActionType == RCIMDemoNodeActionType.CreateTextMessageGroup ||
      item?.nodeActionType == RCIMDemoNodeActionType.CreateTextMessagesGroup
    ) {
      type = RCIMIWConversationType.ULTRA_GROUP;
    }
    let channelId = dict?.channelId;
    let targetId = dict?.targetId;
    let text = 'nodeCreateMessage';
    engine
      ?.createTextMessage(type, targetId, channelId, text)
      .then((message: RCIMIWTextMessage) => {
        if (message && item && item?.params) {
          for (let i = 0; i < item?.params?.length; i++) {
            let param = item?.params[i];
            if (param?.key == item?.nodeKey) {
              if (
                item?.nodeActionType ==
                  RCIMDemoNodeActionType.CreateTextMessages ||
                item?.nodeActionType ==
                  RCIMDemoNodeActionType.CreateTextMessagesGroup
              ) {
                param.value = [message, message];
              } else {
                param.value = message;
              }
            }
          }
          this.nodeNextAction(item);
        } else {
          RRCToast.show('nodeCreateMessage:参数有误');
        }
      });
  };

  /**
   * Interface Auto Begin
   */
  connect = (dict: any) => {
    //fun_connect_call
    let token = String(dict?.token);
    let timeout = Number(dict?.timeout);
    const callback = {
      onDatabaseOpened: (code: number) => {
        this.addHistory(
          'onDatabaseOpened',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
      onConnected: (code: number, userId: string) => {
        this.addHistory(
          'onConnected',
          JSON.stringify({ code, userId }, null, 4),
          code
        );
      },
    };
    let promise = engine?.connect(token, timeout, callback);
    promise?.then((code: number) => {
      this.addHistory('connect', JSON.stringify({ code: code }, null, 4), code);
    });
    //fun_connect_call
  };

  disconnect = (dict: any) => {
    //fun_disconnect_call
    let receivePush = Boolean(dict?.receivePush);
    let promise = engine?.disconnect(receivePush);
    promise?.then((code: number) => {
      this.addHistory(
        'disconnect',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_disconnect_call
  };

  createTextMessage = (dict: any) => {
    //fun_createTextMessage_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let text = String(dict?.text);
    let promise = engine?.createTextMessage(type, targetId, channelId, text);
    promise?.then((data: RCIMIWTextMessage) => {
      this.addHistory(
        'createTextMessage',
        JSON.stringify({ data: data }, null, 4),
        0
      );
    });
    return promise!;
    //fun_createTextMessage_call
  };

  createImageMessage = (dict: any) => {
    //fun_createImageMessage_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let path = String(dict?.path);
    let promise = engine?.createImageMessage(type, targetId, channelId, path);
    promise?.then((data: RCIMIWImageMessage) => {
      this.addHistory(
        'createImageMessage',
        JSON.stringify({ data: data }, null, 4),
        0
      );
    });
    return promise!;
    //fun_createImageMessage_call
  };

  createFileMessage = (dict: any) => {
    //fun_createFileMessage_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let path = String(dict?.path);
    let promise = engine?.createFileMessage(type, targetId, channelId, path);
    promise?.then((data: RCIMIWFileMessage) => {
      this.addHistory(
        'createFileMessage',
        JSON.stringify({ data: data }, null, 4),
        0
      );
    });
    return promise!;
    //fun_createFileMessage_call
  };

  createSightMessage = (dict: any) => {
    //fun_createSightMessage_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let path = String(dict?.path);
    let duration = Number(dict?.duration);
    let promise = engine?.createSightMessage(
      type,
      targetId,
      channelId,
      path,
      duration
    );
    promise?.then((data: RCIMIWSightMessage) => {
      this.addHistory(
        'createSightMessage',
        JSON.stringify({ data: data }, null, 4),
        0
      );
    });
    return promise!;
    //fun_createSightMessage_call
  };

  createVoiceMessage = (dict: any) => {
    //fun_createVoiceMessage_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let path = String(dict?.path);
    let duration = Number(dict?.duration);
    let promise = engine?.createVoiceMessage(
      type,
      targetId,
      channelId,
      path,
      duration
    );
    promise?.then((data: RCIMIWVoiceMessage) => {
      this.addHistory(
        'createVoiceMessage',
        JSON.stringify({ data: data }, null, 4),
        0
      );
    });
    return promise!;
    //fun_createVoiceMessage_call
  };

  createReferenceMessage = (dict: any) => {
    //fun_createReferenceMessage_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let referenceMessage = dict?.referenceMessage;
    let text = String(dict?.text);
    let promise = engine?.createReferenceMessage(
      type,
      targetId,
      channelId,
      referenceMessage,
      text
    );
    promise?.then((data: RCIMIWReferenceMessage) => {
      this.addHistory(
        'createReferenceMessage',
        JSON.stringify({ data: data }, null, 4),
        0
      );
    });
    return promise!;
    //fun_createReferenceMessage_call
  };

  createGIFMessage = (dict: any) => {
    //fun_createGIFMessage_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let path = String(dict?.path);
    let promise = engine?.createGIFMessage(type, targetId, channelId, path);
    promise?.then((data: RCIMIWGIFMessage) => {
      this.addHistory(
        'createGIFMessage',
        JSON.stringify({ data: data }, null, 4),
        0
      );
    });
    return promise!;
    //fun_createGIFMessage_call
  };

  createCustomMessage = (dict: any) => {
    //fun_createCustomMessage_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let policy: RCIMIWCustomMessagePolicy = dict?.policy;
    let messageIdentifier = String(dict?.messageIdentifier);
    let fields = dict?.fields;
    let promise = engine?.createCustomMessage(
      type,
      targetId,
      channelId,
      policy,
      messageIdentifier,
      fields
    );
    promise?.then((data: RCIMIWCustomMessage) => {
      this.addHistory(
        'createCustomMessage',
        JSON.stringify({ data: data }, null, 4),
        0
      );
    });
    return promise!;
    //fun_createCustomMessage_call
  };

  createLocationMessage = (dict: any) => {
    //fun_createLocationMessage_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let longitude = dict?.longitude;
    let latitude = dict?.latitude;
    let poiName = String(dict?.poiName);
    let thumbnailPath = String(dict?.thumbnailPath);
    let promise = engine?.createLocationMessage(
      type,
      targetId,
      channelId,
      longitude,
      latitude,
      poiName,
      thumbnailPath
    );
    promise?.then((data: RCIMIWLocationMessage) => {
      this.addHistory(
        'createLocationMessage',
        JSON.stringify({ data: data }, null, 4),
        0
      );
    });
    return promise!;
    //fun_createLocationMessage_call
  };

  sendMessage = (dict: any) => {
    //fun_sendMessage_call
    let message = dict?.message;
    const callback = {
      onMessageSaved: (message: RCIMIWMessage) => {
        this.addHistory(
          'onMessageSaved',
          JSON.stringify({ message }, null, 4),
          0
        );
      },
      onMessageSent: (code: number, message: RCIMIWMessage) => {
        this.addHistory(
          'onMessageSent',
          JSON.stringify({ code, message }, null, 4),
          code
        );
      },
    };
    let promise = engine?.sendMessage(message, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'sendMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_sendMessage_call
  };

  sendMediaMessage = (dict: any) => {
    //fun_sendMediaMessage_call
    let message = dict?.message;
    const listener = {
      onMediaMessageSaved: (message: RCIMIWMediaMessage) => {
        currentSendingMediaMessage = message;
        this.addHistory(
          'onMediaMessageSaved',
          JSON.stringify({ message }, null, 4),
          0
        );
      },
      onMediaMessageSending: (
        message: RCIMIWMediaMessage,
        progress: number
      ) => {
        this.addHistory(
          'onMediaMessageSending',
          JSON.stringify({ message, progress }, null, 4),
          0
        );
      },
      onSendingMediaMessageCanceled: (message: RCIMIWMediaMessage) => {
        this.addHistory(
          'onSendingMediaMessageCanceled',
          JSON.stringify({ message }, null, 4),
          0
        );
      },
      onMediaMessageSent: (code: number, message: RCIMIWMediaMessage) => {
        this.addHistory(
          'onMediaMessageSent',
          JSON.stringify({ code, message }, null, 4),
          code
        );
      },
    };
    let promise = engine?.sendMediaMessage(message, listener);
    promise?.then((code: number) => {
      this.addHistory(
        'sendMediaMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_sendMediaMessage_call
  };

  cancelSendingMediaMessage = (dict: any) => {
    //fun_cancelSendingMediaMessage_call
    let message = dict?.message;
    const callback = {
      onCancelSendingMediaMessageCalled: (
        code: number,
        message: RCIMIWMediaMessage
      ) => {
        this.addHistory(
          'onCancelSendingMediaMessageCalled',
          JSON.stringify({ code, message }, null, 4),
          code
        );
      },
    };
    let promise = engine?.cancelSendingMediaMessage(message, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'cancelSendingMediaMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_cancelSendingMediaMessage_call
  };

  downloadMediaMessage = (dict: any) => {
    //fun_downloadMediaMessage_call
    let message = dict?.message;
    const listener = {
      onMediaMessageDownloading: (
        message: RCIMIWMediaMessage,
        progress: number
      ) => {
        this.addHistory(
          'onMediaMessageDownloading',
          JSON.stringify({ message, progress }, null, 4),
          0
        );
      },
      onDownloadingMediaMessageCanceled: (message: RCIMIWMediaMessage) => {
        currentDownloadingMediaMessage = null;
        this.addHistory(
          'onDownloadingMediaMessageCanceled',
          JSON.stringify({ message }, null, 4),
          0
        );
      },
      onMediaMessageDownloaded: (code: number, message: RCIMIWMediaMessage) => {
        currentDownloadingMediaMessage = null;
        this.addHistory(
          'onMediaMessageDownloaded',
          JSON.stringify({ code, message }, null, 4),
          code
        );
      },
    };
    let promise = engine?.downloadMediaMessage(message, listener);
    promise?.then((code: number) => {
      this.addHistory(
        'downloadMediaMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    currentDownloadingMediaMessage = message;
    //fun_downloadMediaMessage_call
  };

  cancelDownloadingMediaMessage = (dict: any) => {
    //fun_cancelDownloadingMediaMessage_call
    let message = dict?.message;
    const callback = {
      onCancelDownloadingMediaMessageCalled: (
        code: number,
        message: RCIMIWMediaMessage
      ) => {
        this.addHistory(
          'onCancelDownloadingMediaMessageCalled',
          JSON.stringify({ code, message }, null, 4),
          code
        );
      },
    };
    let promise = engine?.cancelDownloadingMediaMessage(message, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'cancelDownloadingMediaMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_cancelDownloadingMediaMessage_call
  };

  loadConversation = (dict: any) => {
    //fun_loadConversation_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let promise = engine?.loadConversation(type, targetId, channelId);
    promise?.then((code: number) => {
      this.addHistory(
        'loadConversation',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadConversation_call
  };

  getConversation = (dict: any) => {
    //fun_getConversation_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    const callback = {
      onSuccess: (t: RCIMIWConversation) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getConversation(type, targetId, channelId, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getConversation',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getConversation_call
  };

  loadConversations = (dict: any) => {
    //fun_loadConversations_call
    let conversationTypes = dict?.conversationTypes;
    let channelId = String(dict?.channelId);
    let startTime = Number(dict?.startTime);
    let count = Number(dict?.count);
    let promise = engine?.loadConversations(
      conversationTypes,
      channelId,
      startTime,
      count
    );
    promise?.then((code: number) => {
      this.addHistory(
        'loadConversations',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadConversations_call
  };

  getConversations = (dict: any) => {
    //fun_getConversations_call
    let conversationTypes = dict?.conversationTypes;
    let channelId = String(dict?.channelId);
    let startTime = Number(dict?.startTime);
    let count = Number(dict?.count);
    const callback = {
      onSuccess: (t: Array<RCIMIWConversation>) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getConversations(
      conversationTypes,
      channelId,
      startTime,
      count,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'getConversations',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getConversations_call
  };

  removeConversation = (dict: any) => {
    //fun_removeConversation_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    const callback = {
      onConversationRemoved: (code: number) => {
        this.addHistory(
          'onConversationRemoved',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.removeConversation(
      type,
      targetId,
      channelId,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'removeConversation',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_removeConversation_call
  };

  removeConversations = (dict: any) => {
    //fun_removeConversations_call
    let conversationTypes = dict?.conversationTypes;
    let channelId = String(dict?.channelId);
    const callback = {
      onConversationsRemoved: (code: number) => {
        this.addHistory(
          'onConversationsRemoved',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.removeConversations(
      conversationTypes,
      channelId,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'removeConversations',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_removeConversations_call
  };

  loadUnreadCount = (dict: any) => {
    //fun_loadUnreadCount_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let promise = engine?.loadUnreadCount(type, targetId, channelId);
    promise?.then((code: number) => {
      this.addHistory(
        'loadUnreadCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadUnreadCount_call
  };

  getUnreadCount = (dict: any) => {
    //fun_getUnreadCount_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    const callback = {
      onSuccess: (t: number) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getUnreadCount(type, targetId, channelId, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getUnreadCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getUnreadCount_call
  };

  loadTotalUnreadCount = (dict: any) => {
    //fun_loadTotalUnreadCount_call
    let channelId = String(dict?.channelId);
    let promise = engine?.loadTotalUnreadCount(channelId);
    promise?.then((code: number) => {
      this.addHistory(
        'loadTotalUnreadCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadTotalUnreadCount_call
  };

  getTotalUnreadCount = (dict: any) => {
    //fun_getTotalUnreadCount_call
    let channelId = String(dict?.channelId);
    const callback = {
      onSuccess: (t: number) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getTotalUnreadCount(channelId, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getTotalUnreadCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getTotalUnreadCount_call
  };

  loadUnreadMentionedCount = (dict: any) => {
    //fun_loadUnreadMentionedCount_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let promise = engine?.loadUnreadMentionedCount(type, targetId, channelId);
    promise?.then((code: number) => {
      this.addHistory(
        'loadUnreadMentionedCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadUnreadMentionedCount_call
  };

  getUnreadMentionedCount = (dict: any) => {
    //fun_getUnreadMentionedCount_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    const callback = {
      onSuccess: (t: number) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getUnreadMentionedCount(
      type,
      targetId,
      channelId,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'getUnreadMentionedCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getUnreadMentionedCount_call
  };

  loadUltraGroupAllUnreadCount = () => {
    //fun_loadUltraGroupAllUnreadCount_call
    let promise = engine?.loadUltraGroupAllUnreadCount();
    promise?.then((code: number) => {
      this.addHistory(
        'loadUltraGroupAllUnreadCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadUltraGroupAllUnreadCount_call
  };

  getUltraGroupAllUnreadCount = (dict: any) => {
    //fun_getUltraGroupAllUnreadCount_call
    const callback = {
      onSuccess: (t: number) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getUltraGroupAllUnreadCount(callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getUltraGroupAllUnreadCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getUltraGroupAllUnreadCount_call
  };

  loadUltraGroupAllUnreadMentionedCount = () => {
    //fun_loadUltraGroupAllUnreadMentionedCount_call
    let promise = engine?.loadUltraGroupAllUnreadMentionedCount();
    promise?.then((code: number) => {
      this.addHistory(
        'loadUltraGroupAllUnreadMentionedCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadUltraGroupAllUnreadMentionedCount_call
  };

  getUltraGroupAllUnreadMentionedCount = (dict: any) => {
    //fun_getUltraGroupAllUnreadMentionedCount_call
    const callback = {
      onSuccess: (t: number) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getUltraGroupAllUnreadMentionedCount(callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getUltraGroupAllUnreadMentionedCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getUltraGroupAllUnreadMentionedCount_call
  };

  loadUltraGroupUnreadCount = (dict: any) => {
    //fun_loadUltraGroupUnreadCount_call
    let targetId = String(dict?.targetId);
    let promise = engine?.loadUltraGroupUnreadCount(targetId);
    promise?.then((code: number) => {
      this.addHistory(
        'loadUltraGroupUnreadCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadUltraGroupUnreadCount_call
  };

  getUltraGroupUnreadCount = (dict: any) => {
    //fun_getUltraGroupUnreadCount_call
    let targetId = String(dict?.targetId);
    const callback = {
      onSuccess: (t: number) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getUltraGroupUnreadCount(targetId, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getUltraGroupUnreadCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getUltraGroupUnreadCount_call
  };

  loadUltraGroupUnreadMentionedCount = (dict: any) => {
    //fun_loadUltraGroupUnreadMentionedCount_call
    let targetId = String(dict?.targetId);
    let promise = engine?.loadUltraGroupUnreadMentionedCount(targetId);
    promise?.then((code: number) => {
      this.addHistory(
        'loadUltraGroupUnreadMentionedCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadUltraGroupUnreadMentionedCount_call
  };

  getUltraGroupUnreadMentionedCount = (dict: any) => {
    //fun_getUltraGroupUnreadMentionedCount_call
    let targetId = String(dict?.targetId);
    const callback = {
      onSuccess: (t: number) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getUltraGroupUnreadMentionedCount(targetId, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getUltraGroupUnreadMentionedCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getUltraGroupUnreadMentionedCount_call
  };

  loadUnreadCountByConversationTypes = (dict: any) => {
    //fun_loadUnreadCountByConversationTypes_call
    let conversationTypes = dict?.conversationTypes;
    let channelId = String(dict?.channelId);
    let contain = Boolean(dict?.contain);
    let promise = engine?.loadUnreadCountByConversationTypes(
      conversationTypes,
      channelId,
      contain
    );
    promise?.then((code: number) => {
      this.addHistory(
        'loadUnreadCountByConversationTypes',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadUnreadCountByConversationTypes_call
  };

  getUnreadCountByConversationTypes = (dict: any) => {
    //fun_getUnreadCountByConversationTypes_call
    let conversationTypes = dict?.conversationTypes;
    let channelId = String(dict?.channelId);
    let contain = Boolean(dict?.contain);
    const callback = {
      onSuccess: (t: number) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getUnreadCountByConversationTypes(
      conversationTypes,
      channelId,
      contain,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'getUnreadCountByConversationTypes',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getUnreadCountByConversationTypes_call
  };

  clearUnreadCount = (dict: any) => {
    //fun_clearUnreadCount_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let timestamp = Number(dict?.timestamp);
    const callback = {
      onUnreadCountCleared: (code: number) => {
        this.addHistory(
          'onUnreadCountCleared',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.clearUnreadCount(
      type,
      targetId,
      channelId,
      timestamp,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'clearUnreadCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_clearUnreadCount_call
  };

  saveDraftMessage = (dict: any) => {
    //fun_saveDraftMessage_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let draft = String(dict?.draft);
    const callback = {
      onDraftMessageSaved: (code: number) => {
        this.addHistory(
          'onDraftMessageSaved',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.saveDraftMessage(
      type,
      targetId,
      channelId,
      draft,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'saveDraftMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_saveDraftMessage_call
  };

  loadDraftMessage = (dict: any) => {
    //fun_loadDraftMessage_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let promise = engine?.loadDraftMessage(type, targetId, channelId);
    promise?.then((code: number) => {
      this.addHistory(
        'loadDraftMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadDraftMessage_call
  };

  getDraftMessage = (dict: any) => {
    //fun_getDraftMessage_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    const callback = {
      onSuccess: (t: string) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getDraftMessage(type, targetId, channelId, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getDraftMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getDraftMessage_call
  };

  clearDraftMessage = (dict: any) => {
    //fun_clearDraftMessage_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    const callback = {
      onDraftMessageCleared: (code: number) => {
        this.addHistory(
          'onDraftMessageCleared',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.clearDraftMessage(
      type,
      targetId,
      channelId,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'clearDraftMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_clearDraftMessage_call
  };

  loadBlockedConversations = (dict: any) => {
    //fun_loadBlockedConversations_call
    let conversationTypes = dict?.conversationTypes;
    let channelId = String(dict?.channelId);
    let promise = engine?.loadBlockedConversations(
      conversationTypes,
      channelId
    );
    promise?.then((code: number) => {
      this.addHistory(
        'loadBlockedConversations',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadBlockedConversations_call
  };

  getBlockedConversations = (dict: any) => {
    //fun_getBlockedConversations_call
    let conversationTypes = dict?.conversationTypes;
    let channelId = String(dict?.channelId);
    const callback = {
      onSuccess: (t: Array<RCIMIWConversation>) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getBlockedConversations(
      conversationTypes,
      channelId,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'getBlockedConversations',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getBlockedConversations_call
  };

  changeConversationTopStatus = (dict: any) => {
    //fun_changeConversationTopStatus_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let top = Boolean(dict?.top);
    const callback = {
      onConversationTopStatusChanged: (code: number) => {
        this.addHistory(
          'onConversationTopStatusChanged',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.changeConversationTopStatus(
      type,
      targetId,
      channelId,
      top,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'changeConversationTopStatus',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_changeConversationTopStatus_call
  };

  loadConversationTopStatus = (dict: any) => {
    //fun_loadConversationTopStatus_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let promise = engine?.loadConversationTopStatus(type, targetId, channelId);
    promise?.then((code: number) => {
      this.addHistory(
        'loadConversationTopStatus',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadConversationTopStatus_call
  };

  getConversationTopStatus = (dict: any) => {
    //fun_getConversationTopStatus_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    const callback = {
      onSuccess: (t: Boolean) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getConversationTopStatus(
      type,
      targetId,
      channelId,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'getConversationTopStatus',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getConversationTopStatus_call
  };

  syncConversationReadStatus = (dict: any) => {
    //fun_syncConversationReadStatus_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let timestamp = Number(dict?.timestamp);
    const callback = {
      onConversationReadStatusSynced: (code: number) => {
        this.addHistory(
          'onConversationReadStatusSynced',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.syncConversationReadStatus(
      type,
      targetId,
      channelId,
      timestamp,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'syncConversationReadStatus',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_syncConversationReadStatus_call
  };

  sendTypingStatus = (dict: any) => {
    //fun_sendTypingStatus_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let currentType = String(dict?.currentType);
    let promise = engine?.sendTypingStatus(
      type,
      targetId,
      channelId,
      currentType
    );
    promise?.then((code: number) => {
      this.addHistory(
        'sendTypingStatus',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_sendTypingStatus_call
  };

  loadMessages = (dict: any) => {
    //fun_loadMessages_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let sentTime = Number(dict?.sentTime);
    let order: RCIMIWTimeOrder = dict?.order;
    let policy: RCIMIWMessageOperationPolicy = dict?.policy;
    let count = Number(dict?.count);
    let promise = engine?.loadMessages(
      type,
      targetId,
      channelId,
      sentTime,
      order,
      policy,
      count
    );
    promise?.then((code: number) => {
      this.addHistory(
        'loadMessages',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadMessages_call
  };

  getMessages = (dict: any) => {
    //fun_getMessages_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let sentTime = Number(dict?.sentTime);
    let order: RCIMIWTimeOrder = dict?.order;
    let policy: RCIMIWMessageOperationPolicy = dict?.policy;
    let count = Number(dict?.count);
    const callback = {
      onSuccess: (t: Array<RCIMIWMessage>) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getMessages(
      type,
      targetId,
      channelId,
      sentTime,
      order,
      policy,
      count,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'getMessages',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getMessages_call
  };

  getMessageById = (dict: any) => {
    //fun_getMessageById_call
    let messageId = Number(dict?.messageId);
    const callback = {
      onSuccess: (t: RCIMIWMessage) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getMessageById(messageId, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getMessageById',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getMessageById_call
  };

  getMessageByUId = (dict: any) => {
    //fun_getMessageByUId_call
    let messageUId = String(dict?.messageUId);
    const callback = {
      onSuccess: (t: RCIMIWMessage) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getMessageByUId(messageUId, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getMessageByUId',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getMessageByUId_call
  };

  loadFirstUnreadMessage = (dict: any) => {
    //fun_loadFirstUnreadMessage_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let promise = engine?.loadFirstUnreadMessage(type, targetId, channelId);
    promise?.then((code: number) => {
      this.addHistory(
        'loadFirstUnreadMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadFirstUnreadMessage_call
  };

  getFirstUnreadMessage = (dict: any) => {
    //fun_getFirstUnreadMessage_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    const callback = {
      onSuccess: (t: RCIMIWMessage) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getFirstUnreadMessage(
      type,
      targetId,
      channelId,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'getFirstUnreadMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getFirstUnreadMessage_call
  };

  loadUnreadMentionedMessages = (dict: any) => {
    //fun_loadUnreadMentionedMessages_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let promise = engine?.loadUnreadMentionedMessages(
      type,
      targetId,
      channelId
    );
    promise?.then((code: number) => {
      this.addHistory(
        'loadUnreadMentionedMessages',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadUnreadMentionedMessages_call
  };

  getUnreadMentionedMessages = (dict: any) => {
    //fun_getUnreadMentionedMessages_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    const callback = {
      onSuccess: (t: Array<RCIMIWMessage>) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getUnreadMentionedMessages(
      type,
      targetId,
      channelId,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'getUnreadMentionedMessages',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getUnreadMentionedMessages_call
  };

  insertMessage = (dict: any) => {
    //fun_insertMessage_call
    let message = dict?.message;
    const callback = {
      onMessageInserted: (code: number, message: RCIMIWMessage) => {
        this.addHistory(
          'onMessageInserted',
          JSON.stringify({ code, message }, null, 4),
          code
        );
      },
    };
    let promise = engine?.insertMessage(message, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'insertMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_insertMessage_call
  };

  insertMessages = (dict: any) => {
    //fun_insertMessages_call
    let messages = dict?.messages;
    const callback = {
      onMessagesInserted: (code: number, messages: Array<RCIMIWMessage>) => {
        this.addHistory(
          'onMessagesInserted',
          JSON.stringify({ code, messages }, null, 4),
          code
        );
      },
    };
    let promise = engine?.insertMessages(messages, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'insertMessages',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_insertMessages_call
  };

  clearMessages = (dict: any) => {
    //fun_clearMessages_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let timestamp = Number(dict?.timestamp);
    let policy: RCIMIWMessageOperationPolicy = dict?.policy;
    const callback = {
      onMessagesCleared: (code: number) => {
        this.addHistory(
          'onMessagesCleared',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.clearMessages(
      type,
      targetId,
      channelId,
      timestamp,
      policy,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'clearMessages',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_clearMessages_call
  };

  deleteLocalMessages = (dict: any) => {
    //fun_deleteLocalMessages_call
    let messages = dict?.messages;
    const callback = {
      onLocalMessagesDeleted: (
        code: number,
        messages: Array<RCIMIWMessage>
      ) => {
        this.addHistory(
          'onLocalMessagesDeleted',
          JSON.stringify({ code, messages }, null, 4),
          code
        );
      },
    };
    let promise = engine?.deleteLocalMessages(messages, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'deleteLocalMessages',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_deleteLocalMessages_call
  };

  deleteMessages = (dict: any) => {
    //fun_deleteMessages_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let messages = dict?.messages;
    const callback = {
      onMessagesDeleted: (code: number, messages: Array<RCIMIWMessage>) => {
        this.addHistory(
          'onMessagesDeleted',
          JSON.stringify({ code, messages }, null, 4),
          code
        );
      },
    };
    let promise = engine?.deleteMessages(
      type,
      targetId,
      channelId,
      messages,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'deleteMessages',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_deleteMessages_call
  };

  recallMessage = (dict: any) => {
    //fun_recallMessage_call
    let message = dict?.message;
    const callback = {
      onMessageRecalled: (code: number, message: RCIMIWMessage) => {
        this.addHistory(
          'onMessageRecalled',
          JSON.stringify({ code, message }, null, 4),
          code
        );
      },
    };
    let promise = engine?.recallMessage(message, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'recallMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_recallMessage_call
  };

  sendPrivateReadReceiptMessage = (dict: any) => {
    //fun_sendPrivateReadReceiptMessage_call
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let timestamp = Number(dict?.timestamp);
    const callback = {
      onPrivateReadReceiptMessageSent: (code: number) => {
        this.addHistory(
          'onPrivateReadReceiptMessageSent',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.sendPrivateReadReceiptMessage(
      targetId,
      channelId,
      timestamp,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'sendPrivateReadReceiptMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_sendPrivateReadReceiptMessage_call
  };

  sendGroupReadReceiptRequest = (dict: any) => {
    //fun_sendGroupReadReceiptRequest_call
    let message = dict?.message;
    const callback = {
      onGroupReadReceiptRequestSent: (code: number, message: RCIMIWMessage) => {
        this.addHistory(
          'onGroupReadReceiptRequestSent',
          JSON.stringify({ code, message }, null, 4),
          code
        );
      },
    };
    let promise = engine?.sendGroupReadReceiptRequest(message, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'sendGroupReadReceiptRequest',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_sendGroupReadReceiptRequest_call
  };

  sendGroupReadReceiptResponse = (dict: any) => {
    //fun_sendGroupReadReceiptResponse_call
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let messages = dict?.messages;
    const callback = {
      onGroupReadReceiptResponseSent: (
        code: number,
        message: Array<RCIMIWMessage>
      ) => {
        this.addHistory(
          'onGroupReadReceiptResponseSent',
          JSON.stringify({ code, message }, null, 4),
          code
        );
      },
    };
    let promise = engine?.sendGroupReadReceiptResponse(
      targetId,
      channelId,
      messages,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'sendGroupReadReceiptResponse',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_sendGroupReadReceiptResponse_call
  };

  updateMessageExpansion = (dict: any) => {
    //fun_updateMessageExpansion_call
    let messageUId = String(dict?.messageUId);
    let expansion = dict?.expansion;
    const callback = {
      onMessageExpansionUpdated: (code: number) => {
        this.addHistory(
          'onMessageExpansionUpdated',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.updateMessageExpansion(
      messageUId,
      expansion,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'updateMessageExpansion',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_updateMessageExpansion_call
  };

  removeMessageExpansionForKeys = (dict: any) => {
    //fun_removeMessageExpansionForKeys_call
    let messageUId = String(dict?.messageUId);
    let keys = dict?.keys;
    const callback = {
      onMessageExpansionForKeysRemoved: (code: number) => {
        this.addHistory(
          'onMessageExpansionForKeysRemoved',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.removeMessageExpansionForKeys(
      messageUId,
      keys,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'removeMessageExpansionForKeys',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_removeMessageExpansionForKeys_call
  };

  changeMessageSentStatus = (dict: any) => {
    //fun_changeMessageSentStatus_call
    let messageId = Number(dict?.messageId);
    let sentStatus: RCIMIWSentStatus = dict?.sentStatus;
    const callback = {
      onMessageSentStatusChanged: (code: number) => {
        this.addHistory(
          'onMessageSentStatusChanged',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.changeMessageSentStatus(
      messageId,
      sentStatus,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'changeMessageSentStatus',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_changeMessageSentStatus_call
  };

  changeMessageReceiveStatus = (dict: any) => {
    //fun_changeMessageReceiveStatus_call
    let messageId = Number(dict?.messageId);
    let receivedStatus: RCIMIWReceivedStatus = dict?.receivedStatus;
    const callback = {
      onMessageReceiveStatusChanged: (code: number) => {
        this.addHistory(
          'onMessageReceiveStatusChanged',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.changeMessageReceiveStatus(
      messageId,
      receivedStatus,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'changeMessageReceiveStatus',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_changeMessageReceiveStatus_call
  };

  joinChatRoom = (dict: any) => {
    //fun_joinChatRoom_call
    let targetId = String(dict?.targetId);
    let messageCount = Number(dict?.messageCount);
    let autoCreate = Boolean(dict?.autoCreate);
    const callback = {
      onChatRoomJoined: (code: number, targetId: string) => {
        this.addHistory(
          'onChatRoomJoined',
          JSON.stringify({ code, targetId }, null, 4),
          code
        );
      },
    };
    let promise = engine?.joinChatRoom(
      targetId,
      messageCount,
      autoCreate,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'joinChatRoom',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_joinChatRoom_call
  };

  leaveChatRoom = (dict: any) => {
    //fun_leaveChatRoom_call
    let targetId = String(dict?.targetId);
    const callback = {
      onChatRoomLeft: (code: number, targetId: string) => {
        this.addHistory(
          'onChatRoomLeft',
          JSON.stringify({ code, targetId }, null, 4),
          code
        );
      },
    };
    let promise = engine?.leaveChatRoom(targetId, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'leaveChatRoom',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_leaveChatRoom_call
  };

  loadChatRoomMessages = (dict: any) => {
    //fun_loadChatRoomMessages_call
    let targetId = String(dict?.targetId);
    let timestamp = Number(dict?.timestamp);
    let order: RCIMIWTimeOrder = dict?.order;
    let count = Number(dict?.count);
    let promise = engine?.loadChatRoomMessages(
      targetId,
      timestamp,
      order,
      count
    );
    promise?.then((code: number) => {
      this.addHistory(
        'loadChatRoomMessages',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadChatRoomMessages_call
  };

  getChatRoomMessages = (dict: any) => {
    //fun_getChatRoomMessages_call
    let targetId = String(dict?.targetId);
    let timestamp = Number(dict?.timestamp);
    let order: RCIMIWTimeOrder = dict?.order;
    let count = Number(dict?.count);
    const callback = {
      onSuccess: (t: Array<RCIMIWMessage>) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getChatRoomMessages(
      targetId,
      timestamp,
      order,
      count,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'getChatRoomMessages',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getChatRoomMessages_call
  };

  addChatRoomEntry = (dict: any) => {
    //fun_addChatRoomEntry_call
    let targetId = String(dict?.targetId);
    let key = String(dict?.key);
    let value = String(dict?.value);
    let deleteWhenLeft = Boolean(dict?.deleteWhenLeft);
    let overwrite = Boolean(dict?.overwrite);
    const callback = {
      onChatRoomEntryAdded: (code: number) => {
        this.addHistory(
          'onChatRoomEntryAdded',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.addChatRoomEntry(
      targetId,
      key,
      value,
      deleteWhenLeft,
      overwrite,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'addChatRoomEntry',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_addChatRoomEntry_call
  };

  addChatRoomEntries = (dict: any) => {
    //fun_addChatRoomEntries_call
    let targetId = String(dict?.targetId);
    let entries = dict?.entries;
    let deleteWhenLeft = Boolean(dict?.deleteWhenLeft);
    let overwrite = Boolean(dict?.overwrite);
    const callback = {
      onChatRoomEntriesAdded: (code: number, errors: Map<string, number>) => {
        this.addHistory(
          'onChatRoomEntriesAdded',
          JSON.stringify({ code, errors }, null, 4),
          code
        );
      },
    };
    let promise = engine?.addChatRoomEntries(
      targetId,
      entries,
      deleteWhenLeft,
      overwrite,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'addChatRoomEntries',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_addChatRoomEntries_call
  };

  loadChatRoomEntry = (dict: any) => {
    //fun_loadChatRoomEntry_call
    let targetId = String(dict?.targetId);
    let key = String(dict?.key);
    let promise = engine?.loadChatRoomEntry(targetId, key);
    promise?.then((code: number) => {
      this.addHistory(
        'loadChatRoomEntry',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadChatRoomEntry_call
  };

  getChatRoomEntry = (dict: any) => {
    //fun_getChatRoomEntry_call
    let targetId = String(dict?.targetId);
    let key = String(dict?.key);
    const callback = {
      onSuccess: (t: Map<string, string>) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getChatRoomEntry(targetId, key, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getChatRoomEntry',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getChatRoomEntry_call
  };

  loadChatRoomAllEntries = (dict: any) => {
    //fun_loadChatRoomAllEntries_call
    let targetId = String(dict?.targetId);
    let promise = engine?.loadChatRoomAllEntries(targetId);
    promise?.then((code: number) => {
      this.addHistory(
        'loadChatRoomAllEntries',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadChatRoomAllEntries_call
  };

  getChatRoomAllEntries = (dict: any) => {
    //fun_getChatRoomAllEntries_call
    let targetId = String(dict?.targetId);
    const callback = {
      onSuccess: (t: Map<string, string>) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getChatRoomAllEntries(targetId, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getChatRoomAllEntries',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getChatRoomAllEntries_call
  };

  removeChatRoomEntry = (dict: any) => {
    //fun_removeChatRoomEntry_call
    let targetId = String(dict?.targetId);
    let key = String(dict?.key);
    let force = Boolean(dict?.force);
    const callback = {
      onChatRoomEntryRemoved: (code: number) => {
        this.addHistory(
          'onChatRoomEntryRemoved',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.removeChatRoomEntry(targetId, key, force, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'removeChatRoomEntry',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_removeChatRoomEntry_call
  };

  removeChatRoomEntries = (dict: any) => {
    //fun_removeChatRoomEntries_call
    let targetId = String(dict?.targetId);
    let keys = dict?.keys;
    let force = Boolean(dict?.force);
    const callback = {
      onChatRoomEntriesRemoved: (code: number) => {
        this.addHistory(
          'onChatRoomEntriesRemoved',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.removeChatRoomEntries(
      targetId,
      keys,
      force,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'removeChatRoomEntries',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_removeChatRoomEntries_call
  };

  addToBlacklist = (dict: any) => {
    //fun_addToBlacklist_call
    let userId = String(dict?.userId);
    const callback = {
      onBlacklistAdded: (code: number, userId: string) => {
        this.addHistory(
          'onBlacklistAdded',
          JSON.stringify({ code, userId }, null, 4),
          code
        );
      },
    };
    let promise = engine?.addToBlacklist(userId, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'addToBlacklist',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_addToBlacklist_call
  };

  removeFromBlacklist = (dict: any) => {
    //fun_removeFromBlacklist_call
    let userId = String(dict?.userId);
    const callback = {
      onBlacklistRemoved: (code: number, userId: string) => {
        this.addHistory(
          'onBlacklistRemoved',
          JSON.stringify({ code, userId }, null, 4),
          code
        );
      },
    };
    let promise = engine?.removeFromBlacklist(userId, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'removeFromBlacklist',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_removeFromBlacklist_call
  };

  loadBlacklistStatus = (dict: any) => {
    //fun_loadBlacklistStatus_call
    let userId = String(dict?.userId);
    let promise = engine?.loadBlacklistStatus(userId);
    promise?.then((code: number) => {
      this.addHistory(
        'loadBlacklistStatus',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadBlacklistStatus_call
  };

  getBlacklistStatus = (dict: any) => {
    //fun_getBlacklistStatus_call
    let userId = String(dict?.userId);
    const callback = {
      onSuccess: (t: RCIMIWBlacklistStatus) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getBlacklistStatus(userId, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getBlacklistStatus',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getBlacklistStatus_call
  };

  loadBlacklist = () => {
    //fun_loadBlacklist_call
    let promise = engine?.loadBlacklist();
    promise?.then((code: number) => {
      this.addHistory(
        'loadBlacklist',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadBlacklist_call
  };

  getBlacklist = (dict: any) => {
    //fun_getBlacklist_call
    const callback = {
      onSuccess: (t: Array<string>) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getBlacklist(callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getBlacklist',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getBlacklist_call
  };

  searchMessages = (dict: any) => {
    //fun_searchMessages_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let keyword = String(dict?.keyword);
    let startTime = Number(dict?.startTime);
    let count = Number(dict?.count);
    const callback = {
      onSuccess: (t: Array<RCIMIWMessage>) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.searchMessages(
      type,
      targetId,
      channelId,
      keyword,
      startTime,
      count,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'searchMessages',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_searchMessages_call
  };

  searchMessagesByTimeRange = (dict: any) => {
    //fun_searchMessagesByTimeRange_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let keyword = String(dict?.keyword);
    let startTime = Number(dict?.startTime);
    let endTime = Number(dict?.endTime);
    let offset = Number(dict?.offset);
    let count = Number(dict?.count);
    const callback = {
      onSuccess: (t: Array<RCIMIWMessage>) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.searchMessagesByTimeRange(
      type,
      targetId,
      channelId,
      keyword,
      startTime,
      endTime,
      offset,
      count,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'searchMessagesByTimeRange',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_searchMessagesByTimeRange_call
  };

  searchMessagesByUserId = (dict: any) => {
    //fun_searchMessagesByUserId_call
    let userId = String(dict?.userId);
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let startTime = Number(dict?.startTime);
    let count = Number(dict?.count);
    const callback = {
      onSuccess: (t: Array<RCIMIWMessage>) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.searchMessagesByUserId(
      userId,
      type,
      targetId,
      channelId,
      startTime,
      count,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'searchMessagesByUserId',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_searchMessagesByUserId_call
  };

  searchConversations = (dict: any) => {
    //fun_searchConversations_call
    let conversationTypes = dict?.conversationTypes;
    let channelId = String(dict?.channelId);
    let messageTypes = dict?.messageTypes;
    let keyword = String(dict?.keyword);
    const callback = {
      onSuccess: (t: Array<RCIMIWSearchConversationResult>) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.searchConversations(
      conversationTypes,
      channelId,
      messageTypes,
      keyword,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'searchConversations',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_searchConversations_call
  };

  changeNotificationQuietHours = (dict: any) => {
    //fun_changeNotificationQuietHours_call
    let startTime = String(dict?.startTime);
    let spanMinutes = Number(dict?.spanMinutes);
    let level: RCIMIWPushNotificationQuietHoursLevel = dict?.level;
    const callback = {
      onNotificationQuietHoursChanged: (code: number) => {
        this.addHistory(
          'onNotificationQuietHoursChanged',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.changeNotificationQuietHours(
      startTime,
      spanMinutes,
      level,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'changeNotificationQuietHours',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_changeNotificationQuietHours_call
  };

  removeNotificationQuietHours = (dict: any) => {
    //fun_removeNotificationQuietHours_call
    const callback = {
      onNotificationQuietHoursRemoved: (code: number) => {
        this.addHistory(
          'onNotificationQuietHoursRemoved',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.removeNotificationQuietHours(callback);
    promise?.then((code: number) => {
      this.addHistory(
        'removeNotificationQuietHours',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_removeNotificationQuietHours_call
  };

  loadNotificationQuietHours = () => {
    //fun_loadNotificationQuietHours_call
    let promise = engine?.loadNotificationQuietHours();
    promise?.then((code: number) => {
      this.addHistory(
        'loadNotificationQuietHours',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadNotificationQuietHours_call
  };

  getNotificationQuietHours = (dict: any) => {
    //fun_getNotificationQuietHours_call
    const callback = {
      onSuccess: (
        startTime: string,
        spanMinutes: number,
        level: RCIMIWPushNotificationQuietHoursLevel
      ) => {
        this.addHistory(
          'onSuccess',
          JSON.stringify({ startTime, spanMinutes, level }, null, 4),
          0
        );
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getNotificationQuietHours(callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getNotificationQuietHours',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getNotificationQuietHours_call
  };

  changeConversationNotificationLevel = (dict: any) => {
    //fun_changeConversationNotificationLevel_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let level: RCIMIWPushNotificationLevel = dict?.level;
    const callback = {
      onConversationNotificationLevelChanged: (code: number) => {
        this.addHistory(
          'onConversationNotificationLevelChanged',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.changeConversationNotificationLevel(
      type,
      targetId,
      channelId,
      level,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'changeConversationNotificationLevel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_changeConversationNotificationLevel_call
  };

  loadConversationNotificationLevel = (dict: any) => {
    //fun_loadConversationNotificationLevel_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let promise = engine?.loadConversationNotificationLevel(
      type,
      targetId,
      channelId
    );
    promise?.then((code: number) => {
      this.addHistory(
        'loadConversationNotificationLevel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadConversationNotificationLevel_call
  };

  getConversationNotificationLevel = (dict: any) => {
    //fun_getConversationNotificationLevel_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    const callback = {
      onSuccess: (t: RCIMIWPushNotificationLevel) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getConversationNotificationLevel(
      type,
      targetId,
      channelId,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'getConversationNotificationLevel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getConversationNotificationLevel_call
  };

  changeConversationTypeNotificationLevel = (dict: any) => {
    //fun_changeConversationTypeNotificationLevel_call
    let type: RCIMIWConversationType = dict?.type;
    let level: RCIMIWPushNotificationLevel = dict?.level;
    const callback = {
      onConversationTypeNotificationLevelChanged: (code: number) => {
        this.addHistory(
          'onConversationTypeNotificationLevelChanged',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.changeConversationTypeNotificationLevel(
      type,
      level,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'changeConversationTypeNotificationLevel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_changeConversationTypeNotificationLevel_call
  };

  loadConversationTypeNotificationLevel = (dict: any) => {
    //fun_loadConversationTypeNotificationLevel_call
    let type: RCIMIWConversationType = dict?.type;
    let promise = engine?.loadConversationTypeNotificationLevel(type);
    promise?.then((code: number) => {
      this.addHistory(
        'loadConversationTypeNotificationLevel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadConversationTypeNotificationLevel_call
  };

  getConversationTypeNotificationLevel = (dict: any) => {
    //fun_getConversationTypeNotificationLevel_call
    let type: RCIMIWConversationType = dict?.type;
    const callback = {
      onSuccess: (t: RCIMIWPushNotificationLevel) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getConversationTypeNotificationLevel(type, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getConversationTypeNotificationLevel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getConversationTypeNotificationLevel_call
  };

  changeUltraGroupDefaultNotificationLevel = (dict: any) => {
    //fun_changeUltraGroupDefaultNotificationLevel_call
    let targetId = String(dict?.targetId);
    let level: RCIMIWPushNotificationLevel = dict?.level;
    const callback = {
      onUltraGroupDefaultNotificationLevelChanged: (code: number) => {
        this.addHistory(
          'onUltraGroupDefaultNotificationLevelChanged',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.changeUltraGroupDefaultNotificationLevel(
      targetId,
      level,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'changeUltraGroupDefaultNotificationLevel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_changeUltraGroupDefaultNotificationLevel_call
  };

  loadUltraGroupDefaultNotificationLevel = (dict: any) => {
    //fun_loadUltraGroupDefaultNotificationLevel_call
    let targetId = String(dict?.targetId);
    let promise = engine?.loadUltraGroupDefaultNotificationLevel(targetId);
    promise?.then((code: number) => {
      this.addHistory(
        'loadUltraGroupDefaultNotificationLevel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadUltraGroupDefaultNotificationLevel_call
  };

  getUltraGroupDefaultNotificationLevel = (dict: any) => {
    //fun_getUltraGroupDefaultNotificationLevel_call
    let targetId = String(dict?.targetId);
    const callback = {
      onSuccess: (t: RCIMIWPushNotificationLevel) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getUltraGroupDefaultNotificationLevel(
      targetId,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'getUltraGroupDefaultNotificationLevel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getUltraGroupDefaultNotificationLevel_call
  };

  changeUltraGroupChannelDefaultNotificationLevel = (dict: any) => {
    //fun_changeUltraGroupChannelDefaultNotificationLevel_call
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let level: RCIMIWPushNotificationLevel = dict?.level;
    const callback = {
      onUltraGroupChannelDefaultNotificationLevelChanged: (code: number) => {
        this.addHistory(
          'onUltraGroupChannelDefaultNotificationLevelChanged',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.changeUltraGroupChannelDefaultNotificationLevel(
      targetId,
      channelId,
      level,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'changeUltraGroupChannelDefaultNotificationLevel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_changeUltraGroupChannelDefaultNotificationLevel_call
  };

  loadUltraGroupChannelDefaultNotificationLevel = (dict: any) => {
    //fun_loadUltraGroupChannelDefaultNotificationLevel_call
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let promise = engine?.loadUltraGroupChannelDefaultNotificationLevel(
      targetId,
      channelId
    );
    promise?.then((code: number) => {
      this.addHistory(
        'loadUltraGroupChannelDefaultNotificationLevel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadUltraGroupChannelDefaultNotificationLevel_call
  };

  getUltraGroupChannelDefaultNotificationLevel = (dict: any) => {
    //fun_getUltraGroupChannelDefaultNotificationLevel_call
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    const callback = {
      onSuccess: (t: RCIMIWPushNotificationLevel) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getUltraGroupChannelDefaultNotificationLevel(
      targetId,
      channelId,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'getUltraGroupChannelDefaultNotificationLevel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getUltraGroupChannelDefaultNotificationLevel_call
  };

  changePushContentShowStatus = (dict: any) => {
    //fun_changePushContentShowStatus_call
    let showContent = Boolean(dict?.showContent);
    const callback = {
      onPushContentShowStatusChanged: (code: number) => {
        this.addHistory(
          'onPushContentShowStatusChanged',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.changePushContentShowStatus(showContent, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'changePushContentShowStatus',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_changePushContentShowStatus_call
  };

  changePushLanguage = (dict: any) => {
    //fun_changePushLanguage_call
    let language = String(dict?.language);
    const callback = {
      onPushLanguageChanged: (code: number) => {
        this.addHistory(
          'onPushLanguageChanged',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.changePushLanguage(language, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'changePushLanguage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_changePushLanguage_call
  };

  changePushReceiveStatus = (dict: any) => {
    //fun_changePushReceiveStatus_call
    let receive = Boolean(dict?.receive);
    const callback = {
      onPushReceiveStatusChanged: (code: number) => {
        this.addHistory(
          'onPushReceiveStatusChanged',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.changePushReceiveStatus(receive, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'changePushReceiveStatus',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_changePushReceiveStatus_call
  };

  sendGroupMessageToDesignatedUsers = (dict: any) => {
    //fun_sendGroupMessageToDesignatedUsers_call
    let message = dict?.message;
    let userIds = dict?.userIds;
    const callback = {
      onMessageSaved: (message: RCIMIWMessage) => {
        this.addHistory(
          'onMessageSaved',
          JSON.stringify({ message }, null, 4),
          0
        );
      },
      onMessageSent: (code: number, message: RCIMIWMessage) => {
        this.addHistory(
          'onMessageSent',
          JSON.stringify({ code, message }, null, 4),
          code
        );
      },
    };
    let promise = engine?.sendGroupMessageToDesignatedUsers(
      message,
      userIds,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'sendGroupMessageToDesignatedUsers',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_sendGroupMessageToDesignatedUsers_call
  };

  loadMessageCount = (dict: any) => {
    //fun_loadMessageCount_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let promise = engine?.loadMessageCount(type, targetId, channelId);
    promise?.then((code: number) => {
      this.addHistory(
        'loadMessageCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadMessageCount_call
  };

  getMessageCount = (dict: any) => {
    //fun_getMessageCount_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    const callback = {
      onSuccess: (t: number) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getMessageCount(type, targetId, channelId, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getMessageCount',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getMessageCount_call
  };

  loadTopConversations = (dict: any) => {
    //fun_loadTopConversations_call
    let conversationTypes = dict?.conversationTypes;
    let channelId = String(dict?.channelId);
    let promise = engine?.loadTopConversations(conversationTypes, channelId);
    promise?.then((code: number) => {
      this.addHistory(
        'loadTopConversations',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadTopConversations_call
  };

  getTopConversations = (dict: any) => {
    //fun_getTopConversations_call
    let conversationTypes = dict?.conversationTypes;
    let channelId = String(dict?.channelId);
    const callback = {
      onSuccess: (t: Array<RCIMIWConversation>) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getTopConversations(
      conversationTypes,
      channelId,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'getTopConversations',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getTopConversations_call
  };

  syncUltraGroupReadStatus = (dict: any) => {
    //fun_syncUltraGroupReadStatus_call
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let timestamp = Number(dict?.timestamp);
    const callback = {
      onUltraGroupReadStatusSynced: (code: number) => {
        this.addHistory(
          'onUltraGroupReadStatusSynced',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.syncUltraGroupReadStatus(
      targetId,
      channelId,
      timestamp,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'syncUltraGroupReadStatus',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_syncUltraGroupReadStatus_call
  };

  loadConversationsForAllChannel = (dict: any) => {
    //fun_loadConversationsForAllChannel_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    let promise = engine?.loadConversationsForAllChannel(type, targetId);
    promise?.then((code: number) => {
      this.addHistory(
        'loadConversationsForAllChannel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadConversationsForAllChannel_call
  };

  getConversationsForAllChannel = (dict: any) => {
    //fun_getConversationsForAllChannel_call
    let type: RCIMIWConversationType = dict?.type;
    let targetId = String(dict?.targetId);
    const callback = {
      onSuccess: (t: Array<RCIMIWConversation>) => {
        this.addHistory('onSuccess', JSON.stringify({ t }, null, 4), 0);
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getConversationsForAllChannel(
      type,
      targetId,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'getConversationsForAllChannel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getConversationsForAllChannel_call
  };

  modifyUltraGroupMessage = (dict: any) => {
    //fun_modifyUltraGroupMessage_call
    let messageUId = String(dict?.messageUId);
    let message = dict?.message;
    const callback = {
      onUltraGroupMessageModified: (code: number) => {
        this.addHistory(
          'onUltraGroupMessageModified',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.modifyUltraGroupMessage(
      messageUId,
      message,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'modifyUltraGroupMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_modifyUltraGroupMessage_call
  };

  recallUltraGroupMessage = (dict: any) => {
    //fun_recallUltraGroupMessage_call
    let message = dict?.message;
    let deleteRemote = Boolean(dict?.deleteRemote);
    const callback = {
      onUltraGroupMessageRecalled: (code: number) => {
        this.addHistory(
          'onUltraGroupMessageRecalled',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.recallUltraGroupMessage(
      message,
      deleteRemote,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'recallUltraGroupMessage',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_recallUltraGroupMessage_call
  };

  clearUltraGroupMessages = (dict: any) => {
    //fun_clearUltraGroupMessages_call
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let timestamp = Number(dict?.timestamp);
    let policy: RCIMIWMessageOperationPolicy = dict?.policy;
    const callback = {
      onUltraGroupMessagesCleared: (code: number) => {
        this.addHistory(
          'onUltraGroupMessagesCleared',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.clearUltraGroupMessages(
      targetId,
      channelId,
      timestamp,
      policy,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'clearUltraGroupMessages',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_clearUltraGroupMessages_call
  };

  sendUltraGroupTypingStatus = (dict: any) => {
    //fun_sendUltraGroupTypingStatus_call
    let targetId = String(dict?.targetId);
    let channelId = String(dict?.channelId);
    let typingStatus: RCIMIWUltraGroupTypingStatus = dict?.typingStatus;
    const callback = {
      onUltraGroupTypingStatusSent: (code: number) => {
        this.addHistory(
          'onUltraGroupTypingStatusSent',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.sendUltraGroupTypingStatus(
      targetId,
      channelId,
      typingStatus,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'sendUltraGroupTypingStatus',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_sendUltraGroupTypingStatus_call
  };

  clearUltraGroupMessagesForAllChannel = (dict: any) => {
    //fun_clearUltraGroupMessagesForAllChannel_call
    let targetId = String(dict?.targetId);
    let timestamp = Number(dict?.timestamp);
    const callback = {
      onUltraGroupMessagesClearedForAllChannel: (code: number) => {
        this.addHistory(
          'onUltraGroupMessagesClearedForAllChannel',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.clearUltraGroupMessagesForAllChannel(
      targetId,
      timestamp,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'clearUltraGroupMessagesForAllChannel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_clearUltraGroupMessagesForAllChannel_call
  };

  loadBatchRemoteUltraGroupMessages = (dict: any) => {
    //fun_loadBatchRemoteUltraGroupMessages_call
    let messages = dict?.messages;
    let promise = engine?.loadBatchRemoteUltraGroupMessages(messages);
    promise?.then((code: number) => {
      this.addHistory(
        'loadBatchRemoteUltraGroupMessages',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_loadBatchRemoteUltraGroupMessages_call
  };

  getBatchRemoteUltraGroupMessages = (dict: any) => {
    //fun_getBatchRemoteUltraGroupMessages_call
    let messages = dict?.messages;
    const callback = {
      onSuccess: (
        matchedMessages: Array<RCIMIWMessage>,
        notMatchedMessages: Array<RCIMIWMessage>
      ) => {
        this.addHistory(
          'onSuccess',
          JSON.stringify({ matchedMessages, notMatchedMessages }, null, 4),
          0
        );
      },
      onError: (code: number) => {
        this.addHistory('onError', JSON.stringify({ code }, null, 4), code);
      },
    };
    let promise = engine?.getBatchRemoteUltraGroupMessages(messages, callback);
    promise?.then((code: number) => {
      this.addHistory(
        'getBatchRemoteUltraGroupMessages',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_getBatchRemoteUltraGroupMessages_call
  };

  updateUltraGroupMessageExpansion = (dict: any) => {
    //fun_updateUltraGroupMessageExpansion_call
    let messageUId = String(dict?.messageUId);
    let expansion = dict?.expansion;
    const callback = {
      onUltraGroupMessageExpansionUpdated: (code: number) => {
        this.addHistory(
          'onUltraGroupMessageExpansionUpdated',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.updateUltraGroupMessageExpansion(
      messageUId,
      expansion,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'updateUltraGroupMessageExpansion',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_updateUltraGroupMessageExpansion_call
  };

  removeUltraGroupMessageExpansionForKeys = (dict: any) => {
    //fun_removeUltraGroupMessageExpansionForKeys_call
    let messageUId = String(dict?.messageUId);
    let keys = dict?.keys;
    const callback = {
      onUltraGroupMessageExpansionForKeysRemoved: (code: number) => {
        this.addHistory(
          'onUltraGroupMessageExpansionForKeysRemoved',
          JSON.stringify({ code }, null, 4),
          code
        );
      },
    };
    let promise = engine?.removeUltraGroupMessageExpansionForKeys(
      messageUId,
      keys,
      callback
    );
    promise?.then((code: number) => {
      this.addHistory(
        'removeUltraGroupMessageExpansionForKeys',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_removeUltraGroupMessageExpansionForKeys_call
  };

  changeLogLevel = (dict: any) => {
    //fun_changeLogLevel_call
    let level: RCIMIWLogLevel = dict?.level;
    let promise = engine?.changeLogLevel(level);
    promise?.then((code: number) => {
      this.addHistory(
        'changeLogLevel',
        JSON.stringify({ code: code }, null, 4),
        code
      );
    });
    //fun_changeLogLevel_call
  };

  /**
   * Interface Auto End
   */

  constructor(props: IProps) {
    super(props);
    this.state = {
      history: [],
      rcImDemoConfig: RCIMDemoConfig,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  rowClicked = (clickedRow: any) => {
    // 1.判断是否存在 row
    if (!clickedRow) {
      return;
    }
    // 2.判断点击事件是否必须有 engine 的支持
    if (!clickedRow.isOptionalEngine && !engine) {
      RRCToast.show('请初始化引擎');
      return;
    }
    // 3.执行点击事件
    this.setState({ clickedRow: clickedRow }, () => {
      if (clickedRow.action && clickedRow.action?.length > 0) {
        if (clickedRow.action == 'setListener') {
          // 设置监听
          this.addListener();
        } else {
          // 其他
          if (clickedRow.actionStyle == RCIMDemoActionStyle.None) {
            this.executeFunction(clickedRow);
          } else {
            rcInputAlertView.show();
          }
        }
      } else {
        RRCToast.show('Config action 不存在：', clickedRow?.title);
      }
    });
  };

  splitToArray = (value: string, toType: RCIMDemoParamValueType) => {
    if (!value || value == '') {
      return [];
    }
    let array: any[];
    array = value.split(',');
    let result: any[] = [];
    for (let i = 0; i < array?.length; i++) {
      let element: any = array[i];
      result.push(
        this.convertType(
          element,
          toType ? toType : RCIMDemoParamValueType.String
        )
      );
    }
    return result;
  };

  convertType = (
    value: any,
    toType?: RCIMDemoParamValueType,
    arrySplitType?: RCIMDemoParamValueType
  ) => {
    let result: any;
    switch (toType) {
      case RCIMDemoParamValueType.String:
        result = String(value ? value : '');
        break;
      case RCIMDemoParamValueType.Number:
        result = Number(value ? value : 0);
        break;
      case RCIMDemoParamValueType.Boolean:
        result = Boolean(value ? value : false);
        break;
      case RCIMDemoParamValueType.Array:
        result = this.splitToArray(
          value,
          arrySplitType ? arrySplitType : RCIMDemoParamValueType.String
        );
        break;
      case RCIMDemoParamValueType.Any:
        result = value;
        break;
      default:
        result = value;
        break;
    }
    return result;
  };

  executeFunction = (data: any) => {
    console.log('executeFunction:', data);
    // 1.判断配置文件中 action 是否存在
    if (data?.action?.length > 0) {
      // 2.初始化一些变量
      let func: string = data?.action; // 方法名称
      let dict: any = {}; // 组装新参数
      // 3.遍历传入的参数
      for (let i = 0; i < data?.params?.length; i++) {
        let param = data?.params[i];
        // 4.判断 key 是否存在
        if (param?.key) {
          let key: string = param.key;
          if (param?.value) {
            dict[key] = this.convertType(
              param?.value,
              param?.valueType,
              param?.arrySplitType
            );
          } else {
            if (param?.defaultValue) {
              // 存在默认值
              dict[key] = this.convertType(
                param?.defaultValue,
                param?.valueType,
                param?.arrySplitType
              );
            } else {
              // 不存在默认值
              if (!param?.isOptional && param?.title) {
                // 必传参数
                RRCToast.show('缺少必传参数，请检查: ' + param?.title);
                return;
              } else {
                // 非必传参数
                dict[key] = this.convertType(
                  param?.value,
                  param?.valueType,
                  param?.arrySplitType
                );
              }
            }
          }
        } else {
          RRCToast.show('Config 文件中 参数 key 不存在');
          return;
        }
      }
      // 处理合并类型
      for (let i = 0; i < data?.params?.length; i++) {
        let param = data?.params[i];
        if (!param?.title && param?.mergerKeys) {
          if (param?.mergerType == RCIMDemoParamMergerType.Map) {
            let mergerKeys = [];
            let mergerValues = [];
            for (let j = 0; j < data?.params?.length; j++) {
              let tempParam = data?.params[j];
              if (
                tempParam?.key &&
                param?.mergerKeys?.indexOf(tempParam?.key) != -1
              ) {
                if (mergerKeys?.length > 0) {
                  mergerValues = tempParam?.value?.split(',');
                } else {
                  mergerKeys = tempParam?.value?.split(',');
                }
              }
            }
            if (mergerKeys?.length != mergerValues?.length) {
              RRCToast.show('您输入的参数有误，请检查:', param?.key);
              return;
            }
            let map = new Map();
            for (let j = 0; j < mergerKeys.length; j++) {
              map.set(mergerKeys[j], mergerValues[j]);
            }
            param.value = map;
            dict[param?.key] = param.value;
          } else {
            RRCToast.show('参数合并未处理类型,请检查:', param?.mergerType);
          }
        }
      }
      // 处理 MediaMessage(取消下载中的、发送中的媒体消息)
      if (data?.useConstant && data?.paramKey) {
        if (data?.useConstant == 'currentSendingMediaMessage') {
          if (!currentSendingMediaMessage) {
            RRCToast.show('没有发送中的媒体消息');
            return;
          }
          dict[data?.paramKey] = currentSendingMediaMessage;
        } else if (data?.useConstant == 'currentDownloadingMediaMessage') {
          if (!currentDownloadingMediaMessage) {
            RRCToast.show('没有下载中的媒体消息');
            return;
          }
          dict[data?.paramKey] = currentDownloadingMediaMessage;
        } else {
          RRCToast.show('Home 未处理类型');
          return;
        }
      }
      if (data?.action == 'nodeAction') {
        eval('this.' + func)(dict, data);
      } else {
        eval('this.' + func)(dict);
      }
      rcInputAlertView.hidden();
    } else {
      RRCToast.show('Config 文件中 action 不存在');
    }
  };

  selectDate = (data: any) => {
    console.log('date:', data);
  };

  render() {
    let history: any;
    if (this.state.history && this.state.history.length > 0) {
      history = this.state.history[this.state.history.length - 1];
    }
    return (
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            height: TOPSAFE_HEIGHT + 44,
            paddingTop: TOPSAFE_HEIGHT,
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text
              style={{ alignSelf: 'center', fontWeight: '600', fontSize: 17 }}
            >
              {'RN IM Wrapper测试专用DEMO'}
            </Text>
          </View>
          <View style={{ height: 0.5, backgroundColor: '#C0C0C0' }} />
        </View>
        <ScrollView style={{ flex: 1 }}>
          {this.state.rcImDemoConfig?.map(
            (section: any, sectionIndex: number) => {
              return (
                <View key={sectionIndex}>
                  <TouchableOpacity
                    onPress={() => {
                      let rcImDemoConfig = JSON.parse(
                        JSON.stringify(this.state.rcImDemoConfig),
                        null,
                        4
                      );
                      let tempSection = rcImDemoConfig[sectionIndex];
                      tempSection.unFold = !section.unFold;
                      this.setState({ rcImDemoConfig: rcImDemoConfig });
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                      }}
                    >
                      <Text
                        style={{
                          paddingVertical: 8,
                          fontSize: 18,
                          fontWeight: '600',
                        }}
                      >
                        {section?.title ? section?.title : '-'}
                      </Text>
                      <Image
                        style={{ width: 20, height: 20, alignSelf: 'center' }}
                        source={{
                          uri: `data:image/png;base64,${
                            section?.unFold ? iconUpArrow : iconDownArrow
                          }`,
                        }}
                      />
                    </View>
                    {!section.unFold && (
                      <View
                        style={{ backgroundColor: '#C0C0C0', height: 0.5 }}
                      />
                    )}
                  </TouchableOpacity>
                  {section?.unFold && (
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginBottom: 8,
                      }}
                    >
                      {section?.items?.map((row: any, rowIndex: number) => {
                        return (
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              padding: 6,
                              borderWidth: 0.5,
                              borderColor: '#000000',
                              borderRadius: 5,
                              marginLeft: 16,
                              marginVertical: 8,
                            }}
                            onPress={() => this.rowClicked(row)}
                            key={rowIndex}
                          >
                            <Text style={{}}>
                              {row?.title ? row?.title : '-'}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            }
          )}
        </ScrollView>
        {history && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#C0C0C050',
            }}
          >
            <Text
              style={{
                color: history.status == 0 ? '#31be77' : 'red',
                marginLeft: 16,
                flex: 1,
                alignSelf: 'center',
              }}
            >
              {history.operation}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ paddingRight: 8, paddingLeft: 16, paddingVertical: 8 }}
                onPress={() => {
                  rcTextAlertView.show();
                }}
              >
                <Text style={{ color: 'blue' }}>详情</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingRight: 16, paddingLeft: 8, paddingVertical: 8 }}
                onPress={() => {
                  DeviceEventEmitter.addListener('onHistoryChange', () => {
                    let history = this.state.history;
                    history.length = 0;
                    this.setState({ history: history });
                  });
                  this.props.navigation?.navigate('Details', {
                    history: this.state.history,
                  });
                }}
              >
                <Text style={{ color: 'blue' }}>更多</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <RCInputAlertView
          item={this.state.clickedRow}
          sureCallback={(data: any) => this.executeFunction(data)}
          ref={(ref) => {
            rcInputAlertView = ref!;
          }}
        ></RCInputAlertView>
        <RCTextAlertView
          showText={history?.data}
          ref={(ref) => {
            rcTextAlertView = ref!;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default Home;
