package cn.rongcloud.im.wrapper.rn;

import androidx.annotation.NonNull;
import cn.rongcloud.im.wrapper.RCIMIWEngine;
import cn.rongcloud.im.wrapper.RCIMIWEngineImpl;
import cn.rongcloud.im.wrapper.callback.IRCIMIWAddChatRoomEntriesCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWAddChatRoomEntryCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWAddToBlacklistCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWCancelDownloadingMediaMessageCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWCancelSendingMediaMessageCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWChangeConversationNotificationLevelCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWChangeConversationTopStatusCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWChangeConversationTypeNotificationLevelCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWChangeMessageReceivedStatusCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWChangeMessageSentStatusCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWChangeNotificationQuietHoursCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWChangePushContentShowStatusCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWChangePushLanguageCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWChangePushReceiveStatusCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWChangeUltraGroupChannelDefaultNotificationLevelCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWChangeUltraGroupDefaultNotificationLevelCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWClearDraftMessageCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWClearMessagesCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWClearUltraGroupMessagesCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWClearUltraGroupMessagesForAllChannelCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWClearUnreadCountCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWDeleteLocalMessagesCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWDeleteMessagesCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetBatchRemoteUltraGroupMessagesCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetBlacklistCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetBlacklistStatusCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetBlockedConversationsCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetChatRoomAllEntriesCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetChatRoomEntryCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetChatRoomMessagesCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetConversationCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetConversationNotificationLevelCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetConversationTopStatusCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetConversationTypeNotificationLevelCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetConversationsCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetConversationsForAllChannelCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetDraftMessageCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetFirstUnreadMessageCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetMessageCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetMessageCountCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetMessagesCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetNotificationQuietHoursCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetTopConversationsCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetTotalUnreadCountCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetUltraGroupAllUnreadCountCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetUltraGroupAllUnreadMentionedCountCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetUltraGroupChannelDefaultNotificationLevelCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetUltraGroupDefaultNotificationLevelCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetUltraGroupUnreadCountCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetUltraGroupUnreadMentionedCountCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetUnreadCountByConversationTypesCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetUnreadCountCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetUnreadMentionedCountCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWGetUnreadMentionedMessagesCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWInsertMessageCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWInsertMessagesCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWJoinChatRoomCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWLeaveChatRoomCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWModifyUltraGroupMessageCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWRecallMessageCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWRecallUltraGroupMessageCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWRemoveChatRoomEntriesCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWRemoveChatRoomEntryCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWRemoveConversationCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWRemoveConversationsCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWRemoveFromBlacklistCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWRemoveMessageExpansionForKeysCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWRemoveNotificationQuietHoursCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWRemoveUltraGroupMessageExpansionForKeysCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWSaveDraftMessageCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWSearchConversationsCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWSearchMessagesByTimeRangeCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWSearchMessagesByUserIdCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWSearchMessagesCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWSendGroupReadReceiptRequestCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWSendGroupReadReceiptResponseCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWSendPrivateReadReceiptMessageCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWSendUltraGroupTypingStatusCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWSyncConversationReadStatusCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWSyncUltraGroupReadStatusCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWUpdateMessageExpansionCallback;
import cn.rongcloud.im.wrapper.callback.IRCIMIWUpdateUltraGroupMessageExpansionCallback;
import cn.rongcloud.im.wrapper.callback.RCIMIWConnectCallback;
import cn.rongcloud.im.wrapper.callback.RCIMIWSendGroupMessageToDesignatedUsersCallback;
import cn.rongcloud.im.wrapper.callback.RCIMIWSendMessageCallback;
import cn.rongcloud.im.wrapper.chatroom.RCIMIWChatRoomMemberAction;
import cn.rongcloud.im.wrapper.constants.RCIMIWBlacklistStatus;
import cn.rongcloud.im.wrapper.constants.RCIMIWBlockedMessageInfo;
import cn.rongcloud.im.wrapper.constants.RCIMIWChatRoomEntriesOperationType;
import cn.rongcloud.im.wrapper.constants.RCIMIWChatRoomStatus;
import cn.rongcloud.im.wrapper.constants.RCIMIWConnectionStatus;
import cn.rongcloud.im.wrapper.constants.RCIMIWConversationType;
import cn.rongcloud.im.wrapper.constants.RCIMIWCustomMessagePolicy;
import cn.rongcloud.im.wrapper.constants.RCIMIWErrorCode;
import cn.rongcloud.im.wrapper.constants.RCIMIWLogLevel;
import cn.rongcloud.im.wrapper.constants.RCIMIWMessageOperationPolicy;
import cn.rongcloud.im.wrapper.constants.RCIMIWMessageType;
import cn.rongcloud.im.wrapper.constants.RCIMIWPushNotificationLevel;
import cn.rongcloud.im.wrapper.constants.RCIMIWPushNotificationQuietHoursLevel;
import cn.rongcloud.im.wrapper.constants.RCIMIWReceivedStatus;
import cn.rongcloud.im.wrapper.constants.RCIMIWSentStatus;
import cn.rongcloud.im.wrapper.constants.RCIMIWTimeOrder;
import cn.rongcloud.im.wrapper.constants.RCIMIWTypingStatus;
import cn.rongcloud.im.wrapper.constants.RCIMIWUltraGroupTypingStatus;
import cn.rongcloud.im.wrapper.constants.RCIMIWUltraGroupTypingStatusInfo;
import cn.rongcloud.im.wrapper.conversation.RCIMIWConversation;
import cn.rongcloud.im.wrapper.conversation.RCIMIWSearchConversationResult;
import cn.rongcloud.im.wrapper.listener.RCIMIWDownloadMediaMessageListener;
import cn.rongcloud.im.wrapper.listener.RCIMIWListener;
import cn.rongcloud.im.wrapper.listener.RCIMIWSendMediaMessageListener;
import cn.rongcloud.im.wrapper.messages.RCIMIWCustomMessage;
import cn.rongcloud.im.wrapper.messages.RCIMIWFileMessage;
import cn.rongcloud.im.wrapper.messages.RCIMIWGIFMessage;
import cn.rongcloud.im.wrapper.messages.RCIMIWImageMessage;
import cn.rongcloud.im.wrapper.messages.RCIMIWLocationMessage;
import cn.rongcloud.im.wrapper.messages.RCIMIWMediaMessage;
import cn.rongcloud.im.wrapper.messages.RCIMIWMessage;
import cn.rongcloud.im.wrapper.messages.RCIMIWReferenceMessage;
import cn.rongcloud.im.wrapper.messages.RCIMIWSightMessage;
import cn.rongcloud.im.wrapper.messages.RCIMIWTextMessage;
import cn.rongcloud.im.wrapper.messages.RCIMIWVoiceMessage;
import cn.rongcloud.im.wrapper.options.RCIMIWEngineOptions;
import cn.rongcloud.im.wrapper.platform.RCIMIWPlatformConverter;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ReactNativeImModule extends ReactContextBaseJavaModule {
  private RCIMIWEngine engine;
  private ReactApplicationContext context;
  private RCTDeviceEventEmitter eventEmitter;

  public ReactNativeImModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.context = reactContext;
  }

  @Override
  @NonNull
  public String getName() {
    return "RCReactNativeIM";
  }

  @Override
  public void initialize() {
    super.initialize();
    eventEmitter = this.context.getJSModule(RCTDeviceEventEmitter.class);
  }

  private boolean check_engine(Promise promise) {
    if (engine == null) {
      promise.reject(String.valueOf(RCIMIWErrorCode.ENGINE_DESTROYED), "engine is null");
      return false;
    }

    return true;
  }

  @ReactMethod
  public void create(String appKey, ReadableMap options) {
    RCIMIWEngineOptions rcimiwEngineOptions =
        RCIMIWPlatformConverter.convertEngineOptions(options.toHashMap());
    if (engine == null) {
      engine = RCIMIWEngineImpl.create(this.context, appKey, rcimiwEngineOptions);
      engine.setListener(new RCIMIWListenerImpl());
    }
  }

  @ReactMethod
  public void destroy(Promise promise) {
    if (engine != null) {
      engine.destroy();
      engine = null;
    }
    promise.resolve(0);
  }

  @ReactMethod
  public void connect(String token, Double timeout, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.connect(
            token,
            timeout.intValue(),
            new RCIMIWConnectCallback() {
              @Override
              public void onDatabaseOpened(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("Connect:onDatabaseOpened", writableMap);
              }

              @Override
              public void onConnected(int code, String userId) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                writableMap.putString("userId", userId);
                eventEmitter.emit("Connect:onConnected", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void disconnect(boolean receivePush, Promise promise) {

    if (!check_engine(promise)) return;
    int r = engine.disconnect(receivePush);
    promise.resolve(r);
  }

  @ReactMethod
  public void createTextMessage(
      int type, String targetId, String channelId, String text, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    RCIMIWTextMessage r = engine.createTextMessage(_type, targetId, channelId, text);
    WritableMap map = Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(r));
    promise.resolve(map);
  }

  @ReactMethod
  public void createImageMessage(
      int type, String targetId, String channelId, String path, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    RCIMIWImageMessage r = engine.createImageMessage(_type, targetId, channelId, path);
    WritableMap map = Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMediaMessage(r));
    promise.resolve(map);
  }

  @ReactMethod
  public void createFileMessage(
      int type, String targetId, String channelId, String path, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    RCIMIWFileMessage r = engine.createFileMessage(_type, targetId, channelId, path);
    WritableMap map = Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMediaMessage(r));
    promise.resolve(map);
  }

  @ReactMethod
  public void createSightMessage(
      int type, String targetId, String channelId, String path, Double duration, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    RCIMIWSightMessage r =
        engine.createSightMessage(_type, targetId, channelId, path, duration.intValue());
    WritableMap map = Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMediaMessage(r));
    promise.resolve(map);
  }

  @ReactMethod
  public void createVoiceMessage(
      int type, String targetId, String channelId, String path, Double duration, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    RCIMIWVoiceMessage r =
        engine.createVoiceMessage(_type, targetId, channelId, path, duration.intValue());
    WritableMap map = Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMediaMessage(r));
    promise.resolve(map);
  }

  @ReactMethod
  public void createReferenceMessage(
      int type,
      String targetId,
      String channelId,
      ReadableMap referenceMessage,
      String text,
      Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];
    if (referenceMessage == null) referenceMessage = Arguments.createMap();
    RCIMIWMessage _referenceMessage =
        RCIMIWPlatformConverter.convertMessage(referenceMessage.toHashMap());

    if (!check_engine(promise)) return;
    RCIMIWReferenceMessage r =
        engine.createReferenceMessage(_type, targetId, channelId, _referenceMessage, text);
    WritableMap map = Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(r));
    promise.resolve(map);
  }

  @ReactMethod
  public void createGIFMessage(
      int type, String targetId, String channelId, String path, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    RCIMIWGIFMessage r = engine.createGIFMessage(_type, targetId, channelId, path);
    WritableMap map = Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMediaMessage(r));
    promise.resolve(map);
  }

  @ReactMethod
  public void createCustomMessage(
      int type,
      String targetId,
      String channelId,
      int policy,
      String messageIdentifier,
      ReadableMap fields,
      Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];
    RCIMIWCustomMessagePolicy _policy = RCIMIWCustomMessagePolicy.values()[policy];
    Map<String, String> _fields = fields != null ? (Map) fields.toHashMap() : new HashMap<>();

    if (!check_engine(promise)) return;
    RCIMIWCustomMessage r =
        engine.createCustomMessage(_type, targetId, channelId, _policy, messageIdentifier, _fields);
    WritableMap map = Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(r));
    promise.resolve(map);
  }

  @ReactMethod
  public void createLocationMessage(
      int type,
      String targetId,
      String channelId,
      Double longitude,
      Double latitude,
      String poiName,
      String thumbnailPath,
      Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    RCIMIWLocationMessage r =
        engine.createLocationMessage(
            _type,
            targetId,
            channelId,
            longitude.doubleValue(),
            latitude.doubleValue(),
            poiName,
            thumbnailPath);
    WritableMap map = Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(r));
    promise.resolve(map);
  }

  @ReactMethod
  public void sendMessage(ReadableMap message, String eventId, Promise promise) {
    if (message == null) message = Arguments.createMap();
    RCIMIWMessage _message = RCIMIWPlatformConverter.convertMessage(message.toHashMap());

    if (!check_engine(promise)) return;
    int r =
        engine.sendMessage(
            _message,
            new RCIMIWSendMessageCallback() {
              @Override
              public void onMessageSaved(RCIMIWMessage message) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
                }
                ;
                eventEmitter.emit("SendMessage:onMessageSaved", writableMap);
              }

              @Override
              public void onMessageSent(int code, RCIMIWMessage message) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
                }
                ;
                eventEmitter.emit("SendMessage:onMessageSent", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void sendMediaMessage(ReadableMap message, String eventId, Promise promise) {
    if (message == null) message = Arguments.createMap();
    RCIMIWMediaMessage _message = RCIMIWPlatformConverter.convertMediaMessage(message.toHashMap());

    if (!check_engine(promise)) return;
    int r =
        engine.sendMediaMessage(
            _message,
            new RCIMIWSendMediaMessageListener() {
              @Override
              public void onMediaMessageSaved(RCIMIWMediaMessage message) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(
                          RCIMIWPlatformConverter.convertMediaMessage(message)));
                }
                ;
                eventEmitter.emit("SendMediaMessage:onMediaMessageSaved", writableMap);
              }

              @Override
              public void onMediaMessageSending(RCIMIWMediaMessage message, int progress) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(
                          RCIMIWPlatformConverter.convertMediaMessage(message)));
                }
                ;
                writableMap.putDouble("progress", progress);
                eventEmitter.emit("SendMediaMessage:onMediaMessageSending", writableMap);
              }

              @Override
              public void onSendingMediaMessageCanceled(RCIMIWMediaMessage message) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(
                          RCIMIWPlatformConverter.convertMediaMessage(message)));
                }
                ;
                eventEmitter.emit("SendMediaMessage:onSendingMediaMessageCanceled", writableMap);
              }

              @Override
              public void onMediaMessageSent(int code, RCIMIWMediaMessage message) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(
                          RCIMIWPlatformConverter.convertMediaMessage(message)));
                }
                ;
                eventEmitter.emit("SendMediaMessage:onMediaMessageSent", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void cancelSendingMediaMessage(ReadableMap message, String eventId, Promise promise) {
    if (message == null) message = Arguments.createMap();
    RCIMIWMediaMessage _message = RCIMIWPlatformConverter.convertMediaMessage(message.toHashMap());

    if (!check_engine(promise)) return;
    int r =
        engine.cancelSendingMediaMessage(
            _message,
            new IRCIMIWCancelSendingMediaMessageCallback() {
              @Override
              public void onCancelSendingMediaMessageCalled(int code, RCIMIWMediaMessage message) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(
                          RCIMIWPlatformConverter.convertMediaMessage(message)));
                }
                ;
                eventEmitter.emit(
                    "CancelSendingMediaMessage:onCancelSendingMediaMessageCalled", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void downloadMediaMessage(ReadableMap message, String eventId, Promise promise) {
    if (message == null) message = Arguments.createMap();
    RCIMIWMediaMessage _message = RCIMIWPlatformConverter.convertMediaMessage(message.toHashMap());

    if (!check_engine(promise)) return;
    int r =
        engine.downloadMediaMessage(
            _message,
            new RCIMIWDownloadMediaMessageListener() {
              @Override
              public void onMediaMessageDownloading(RCIMIWMediaMessage message, int progress) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(
                          RCIMIWPlatformConverter.convertMediaMessage(message)));
                }
                ;
                writableMap.putDouble("progress", progress);
                eventEmitter.emit("DownloadMediaMessage:onMediaMessageDownloading", writableMap);
              }

              @Override
              public void onDownloadingMediaMessageCanceled(RCIMIWMediaMessage message) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(
                          RCIMIWPlatformConverter.convertMediaMessage(message)));
                }
                ;
                eventEmitter.emit(
                    "DownloadMediaMessage:onDownloadingMediaMessageCanceled", writableMap);
              }

              @Override
              public void onMediaMessageDownloaded(int code, RCIMIWMediaMessage message) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(
                          RCIMIWPlatformConverter.convertMediaMessage(message)));
                }
                ;
                eventEmitter.emit("DownloadMediaMessage:onMediaMessageDownloaded", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void cancelDownloadingMediaMessage(ReadableMap message, String eventId, Promise promise) {
    if (message == null) message = Arguments.createMap();
    RCIMIWMediaMessage _message = RCIMIWPlatformConverter.convertMediaMessage(message.toHashMap());

    if (!check_engine(promise)) return;
    int r =
        engine.cancelDownloadingMediaMessage(
            _message,
            new IRCIMIWCancelDownloadingMediaMessageCallback() {
              @Override
              public void onCancelDownloadingMediaMessageCalled(
                  int code, RCIMIWMediaMessage message) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(
                          RCIMIWPlatformConverter.convertMediaMessage(message)));
                }
                ;
                eventEmitter.emit(
                    "CancelDownloadingMediaMessage:onCancelDownloadingMediaMessageCalled",
                    writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadConversation(int type, String targetId, String channelId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r = engine.loadConversation(_type, targetId, channelId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getConversation(
      int type, String targetId, String channelId, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.getConversation(
            _type,
            targetId,
            channelId,
            new IRCIMIWGetConversationCallback() {
              @Override
              public void onSuccess(RCIMIWConversation t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                if (t != null) {
                  writableMap.putMap(
                      "t", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertConversation(t)));
                }
                ;
                eventEmitter.emit("GetConversation:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetConversation:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadConversations(
      ReadableArray conversationTypes,
      String channelId,
      Double startTime,
      Double count,
      Promise promise) {
    List<RCIMIWConversationType> _conversationTypes = new ArrayList<>();
    for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
      _conversationTypes.add(RCIMIWConversationType.values()[conversationTypes.getInt(i)]);
    }

    if (!check_engine(promise)) return;
    int r =
        engine.loadConversations(
            _conversationTypes, channelId, startTime.longValue(), count.intValue());
    promise.resolve(r);
  }

  @ReactMethod
  public void getConversations(
      ReadableArray conversationTypes,
      String channelId,
      Double startTime,
      Double count,
      String eventId,
      Promise promise) {
    List<RCIMIWConversationType> _conversationTypes = new ArrayList<>();
    for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
      _conversationTypes.add(RCIMIWConversationType.values()[conversationTypes.getInt(i)]);
    }

    if (!check_engine(promise)) return;
    int r =
        engine.getConversations(
            _conversationTypes,
            channelId,
            startTime.longValue(),
            count.intValue(),
            new IRCIMIWGetConversationsCallback() {
              @Override
              public void onSuccess(List<RCIMIWConversation> t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                WritableArray _t = Arguments.createArray();
                for (int i = 0; t != null && i < t.size(); i++) {
                  RCIMIWConversation obj = t.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertConversation(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _t.pushMap(__map);
                }
                writableMap.putArray("t", _t);
                eventEmitter.emit("GetConversations:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetConversations:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void removeConversation(
      int type, String targetId, String channelId, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.removeConversation(
            _type,
            targetId,
            channelId,
            new IRCIMIWRemoveConversationCallback() {
              @Override
              public void onConversationRemoved(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("RemoveConversation:onConversationRemoved", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void removeConversations(
      ReadableArray conversationTypes, String channelId, String eventId, Promise promise) {
    List<RCIMIWConversationType> _conversationTypes = new ArrayList<>();
    for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
      _conversationTypes.add(RCIMIWConversationType.values()[conversationTypes.getInt(i)]);
    }

    if (!check_engine(promise)) return;
    int r =
        engine.removeConversations(
            _conversationTypes,
            channelId,
            new IRCIMIWRemoveConversationsCallback() {
              @Override
              public void onConversationsRemoved(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("RemoveConversations:onConversationsRemoved", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadUnreadCount(int type, String targetId, String channelId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r = engine.loadUnreadCount(_type, targetId, channelId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getUnreadCount(
      int type, String targetId, String channelId, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.getUnreadCount(
            _type,
            targetId,
            channelId,
            new IRCIMIWGetUnreadCountCallback() {
              @Override
              public void onSuccess(Integer t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("t", t);
                eventEmitter.emit("GetUnreadCount:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetUnreadCount:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadTotalUnreadCount(String channelId, Promise promise) {

    if (!check_engine(promise)) return;
    int r = engine.loadTotalUnreadCount(channelId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getTotalUnreadCount(String channelId, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.getTotalUnreadCount(
            channelId,
            new IRCIMIWGetTotalUnreadCountCallback() {
              @Override
              public void onSuccess(Integer t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("t", t);
                eventEmitter.emit("GetTotalUnreadCount:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetTotalUnreadCount:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadUnreadMentionedCount(
      int type, String targetId, String channelId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r = engine.loadUnreadMentionedCount(_type, targetId, channelId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getUnreadMentionedCount(
      int type, String targetId, String channelId, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.getUnreadMentionedCount(
            _type,
            targetId,
            channelId,
            new IRCIMIWGetUnreadMentionedCountCallback() {
              @Override
              public void onSuccess(Integer t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("t", t);
                eventEmitter.emit("GetUnreadMentionedCount:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetUnreadMentionedCount:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadUltraGroupAllUnreadCount(Promise promise) {

    if (!check_engine(promise)) return;
    int r = engine.loadUltraGroupAllUnreadCount();
    promise.resolve(r);
  }

  @ReactMethod
  public void getUltraGroupAllUnreadCount(String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.getUltraGroupAllUnreadCount(
            new IRCIMIWGetUltraGroupAllUnreadCountCallback() {
              @Override
              public void onSuccess(Integer t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("t", t);
                eventEmitter.emit("GetUltraGroupAllUnreadCount:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetUltraGroupAllUnreadCount:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadUltraGroupAllUnreadMentionedCount(Promise promise) {

    if (!check_engine(promise)) return;
    int r = engine.loadUltraGroupAllUnreadMentionedCount();
    promise.resolve(r);
  }

  @ReactMethod
  public void getUltraGroupAllUnreadMentionedCount(String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.getUltraGroupAllUnreadMentionedCount(
            new IRCIMIWGetUltraGroupAllUnreadMentionedCountCallback() {
              @Override
              public void onSuccess(Integer t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("t", t);
                eventEmitter.emit("GetUltraGroupAllUnreadMentionedCount:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetUltraGroupAllUnreadMentionedCount:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadUltraGroupUnreadCount(String targetId, Promise promise) {

    if (!check_engine(promise)) return;
    int r = engine.loadUltraGroupUnreadCount(targetId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getUltraGroupUnreadCount(String targetId, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.getUltraGroupUnreadCount(
            targetId,
            new IRCIMIWGetUltraGroupUnreadCountCallback() {
              @Override
              public void onSuccess(Integer t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("t", t);
                eventEmitter.emit("GetUltraGroupUnreadCount:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetUltraGroupUnreadCount:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadUltraGroupUnreadMentionedCount(String targetId, Promise promise) {

    if (!check_engine(promise)) return;
    int r = engine.loadUltraGroupUnreadMentionedCount(targetId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getUltraGroupUnreadMentionedCount(String targetId, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.getUltraGroupUnreadMentionedCount(
            targetId,
            new IRCIMIWGetUltraGroupUnreadMentionedCountCallback() {
              @Override
              public void onSuccess(Integer t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("t", t);
                eventEmitter.emit("GetUltraGroupUnreadMentionedCount:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetUltraGroupUnreadMentionedCount:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadUnreadCountByConversationTypes(
      ReadableArray conversationTypes, String channelId, boolean contain, Promise promise) {
    List<RCIMIWConversationType> _conversationTypes = new ArrayList<>();
    for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
      _conversationTypes.add(RCIMIWConversationType.values()[conversationTypes.getInt(i)]);
    }

    if (!check_engine(promise)) return;
    int r = engine.loadUnreadCountByConversationTypes(_conversationTypes, channelId, contain);
    promise.resolve(r);
  }

  @ReactMethod
  public void getUnreadCountByConversationTypes(
      ReadableArray conversationTypes,
      String channelId,
      boolean contain,
      String eventId,
      Promise promise) {
    List<RCIMIWConversationType> _conversationTypes = new ArrayList<>();
    for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
      _conversationTypes.add(RCIMIWConversationType.values()[conversationTypes.getInt(i)]);
    }

    if (!check_engine(promise)) return;
    int r =
        engine.getUnreadCountByConversationTypes(
            _conversationTypes,
            channelId,
            contain,
            new IRCIMIWGetUnreadCountByConversationTypesCallback() {
              @Override
              public void onSuccess(Integer t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("t", t);
                eventEmitter.emit("GetUnreadCountByConversationTypes:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetUnreadCountByConversationTypes:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void clearUnreadCount(
      int type,
      String targetId,
      String channelId,
      Double timestamp,
      String eventId,
      Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.clearUnreadCount(
            _type,
            targetId,
            channelId,
            timestamp.longValue(),
            new IRCIMIWClearUnreadCountCallback() {
              @Override
              public void onUnreadCountCleared(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("ClearUnreadCount:onUnreadCountCleared", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void saveDraftMessage(
      int type, String targetId, String channelId, String draft, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.saveDraftMessage(
            _type,
            targetId,
            channelId,
            draft,
            new IRCIMIWSaveDraftMessageCallback() {
              @Override
              public void onDraftMessageSaved(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("SaveDraftMessage:onDraftMessageSaved", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadDraftMessage(int type, String targetId, String channelId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r = engine.loadDraftMessage(_type, targetId, channelId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getDraftMessage(
      int type, String targetId, String channelId, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.getDraftMessage(
            _type,
            targetId,
            channelId,
            new IRCIMIWGetDraftMessageCallback() {
              @Override
              public void onSuccess(String t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putString("t", t);
                eventEmitter.emit("GetDraftMessage:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetDraftMessage:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void clearDraftMessage(
      int type, String targetId, String channelId, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.clearDraftMessage(
            _type,
            targetId,
            channelId,
            new IRCIMIWClearDraftMessageCallback() {
              @Override
              public void onDraftMessageCleared(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("ClearDraftMessage:onDraftMessageCleared", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadBlockedConversations(
      ReadableArray conversationTypes, String channelId, Promise promise) {
    List<RCIMIWConversationType> _conversationTypes = new ArrayList<>();
    for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
      _conversationTypes.add(RCIMIWConversationType.values()[conversationTypes.getInt(i)]);
    }

    if (!check_engine(promise)) return;
    int r = engine.loadBlockedConversations(_conversationTypes, channelId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getBlockedConversations(
      ReadableArray conversationTypes, String channelId, String eventId, Promise promise) {
    List<RCIMIWConversationType> _conversationTypes = new ArrayList<>();
    for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
      _conversationTypes.add(RCIMIWConversationType.values()[conversationTypes.getInt(i)]);
    }

    if (!check_engine(promise)) return;
    int r =
        engine.getBlockedConversations(
            _conversationTypes,
            channelId,
            new IRCIMIWGetBlockedConversationsCallback() {
              @Override
              public void onSuccess(List<RCIMIWConversation> t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                WritableArray _t = Arguments.createArray();
                for (int i = 0; t != null && i < t.size(); i++) {
                  RCIMIWConversation obj = t.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertConversation(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _t.pushMap(__map);
                }
                writableMap.putArray("t", _t);
                eventEmitter.emit("GetBlockedConversations:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetBlockedConversations:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void changeConversationTopStatus(
      int type, String targetId, String channelId, boolean top, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.changeConversationTopStatus(
            _type,
            targetId,
            channelId,
            top,
            new IRCIMIWChangeConversationTopStatusCallback() {
              @Override
              public void onConversationTopStatusChanged(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "ChangeConversationTopStatus:onConversationTopStatusChanged", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadConversationTopStatus(
      int type, String targetId, String channelId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r = engine.loadConversationTopStatus(_type, targetId, channelId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getConversationTopStatus(
      int type, String targetId, String channelId, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.getConversationTopStatus(
            _type,
            targetId,
            channelId,
            new IRCIMIWGetConversationTopStatusCallback() {
              @Override
              public void onSuccess(Boolean t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putBoolean("t", t);
                eventEmitter.emit("GetConversationTopStatus:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetConversationTopStatus:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void syncConversationReadStatus(
      int type,
      String targetId,
      String channelId,
      Double timestamp,
      String eventId,
      Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.syncConversationReadStatus(
            _type,
            targetId,
            channelId,
            timestamp.longValue(),
            new IRCIMIWSyncConversationReadStatusCallback() {
              @Override
              public void onConversationReadStatusSynced(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "SyncConversationReadStatus:onConversationReadStatusSynced", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void sendTypingStatus(
      int type, String targetId, String channelId, String currentType, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r = engine.sendTypingStatus(_type, targetId, channelId, currentType);
    promise.resolve(r);
  }

  @ReactMethod
  public void loadMessages(
      int type,
      String targetId,
      String channelId,
      Double sentTime,
      int order,
      int policy,
      Double count,
      Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];
    RCIMIWTimeOrder _order = RCIMIWTimeOrder.values()[order];
    RCIMIWMessageOperationPolicy _policy = RCIMIWMessageOperationPolicy.values()[policy];

    if (!check_engine(promise)) return;
    int r =
        engine.loadMessages(
            _type, targetId, channelId, sentTime.longValue(), _order, _policy, count.intValue());
    promise.resolve(r);
  }

  @ReactMethod
  public void getMessages(
      int type,
      String targetId,
      String channelId,
      Double sentTime,
      int order,
      int policy,
      Double count,
      String eventId,
      Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];
    RCIMIWTimeOrder _order = RCIMIWTimeOrder.values()[order];
    RCIMIWMessageOperationPolicy _policy = RCIMIWMessageOperationPolicy.values()[policy];

    if (!check_engine(promise)) return;
    int r =
        engine.getMessages(
            _type,
            targetId,
            channelId,
            sentTime.longValue(),
            _order,
            _policy,
            count.intValue(),
            new IRCIMIWGetMessagesCallback() {
              @Override
              public void onSuccess(List<RCIMIWMessage> t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                WritableArray _t = Arguments.createArray();
                for (int i = 0; t != null && i < t.size(); i++) {
                  RCIMIWMessage obj = t.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _t.pushMap(__map);
                }
                writableMap.putArray("t", _t);
                eventEmitter.emit("GetMessages:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetMessages:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void getMessageById(Double messageId, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.getMessageById(
            messageId.intValue(),
            new IRCIMIWGetMessageCallback() {
              @Override
              public void onSuccess(RCIMIWMessage t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                if (t != null) {
                  writableMap.putMap(
                      "t", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(t)));
                }
                ;
                eventEmitter.emit("GetMessageById:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetMessageById:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void getMessageByUId(String messageUId, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.getMessageByUId(
            messageUId,
            new IRCIMIWGetMessageCallback() {
              @Override
              public void onSuccess(RCIMIWMessage t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                if (t != null) {
                  writableMap.putMap(
                      "t", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(t)));
                }
                ;
                eventEmitter.emit("GetMessageByUId:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetMessageByUId:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadFirstUnreadMessage(int type, String targetId, String channelId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r = engine.loadFirstUnreadMessage(_type, targetId, channelId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getFirstUnreadMessage(
      int type, String targetId, String channelId, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.getFirstUnreadMessage(
            _type,
            targetId,
            channelId,
            new IRCIMIWGetFirstUnreadMessageCallback() {
              @Override
              public void onSuccess(RCIMIWMessage t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                if (t != null) {
                  writableMap.putMap(
                      "t", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(t)));
                }
                ;
                eventEmitter.emit("GetFirstUnreadMessage:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetFirstUnreadMessage:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadUnreadMentionedMessages(
      int type, String targetId, String channelId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r = engine.loadUnreadMentionedMessages(_type, targetId, channelId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getUnreadMentionedMessages(
      int type, String targetId, String channelId, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.getUnreadMentionedMessages(
            _type,
            targetId,
            channelId,
            new IRCIMIWGetUnreadMentionedMessagesCallback() {
              @Override
              public void onSuccess(List<RCIMIWMessage> t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                WritableArray _t = Arguments.createArray();
                for (int i = 0; t != null && i < t.size(); i++) {
                  RCIMIWMessage obj = t.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _t.pushMap(__map);
                }
                writableMap.putArray("t", _t);
                eventEmitter.emit("GetUnreadMentionedMessages:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetUnreadMentionedMessages:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void insertMessage(ReadableMap message, String eventId, Promise promise) {
    if (message == null) message = Arguments.createMap();
    RCIMIWMessage _message = RCIMIWPlatformConverter.convertMessage(message.toHashMap());

    if (!check_engine(promise)) return;
    int r =
        engine.insertMessage(
            _message,
            new IRCIMIWInsertMessageCallback() {
              @Override
              public void onMessageInserted(int code, RCIMIWMessage message) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
                }
                ;
                eventEmitter.emit("InsertMessage:onMessageInserted", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void insertMessages(ReadableArray messages, String eventId, Promise promise) {
    List<RCIMIWMessage> _messages = new ArrayList<>();
    for (int i = 0; messages != null && i < messages.size(); i++) {
      ReadableMap _map = messages.getMap(i);
      if (_map != null) {
        _messages.add(RCIMIWPlatformConverter.convertMessage(_map.toHashMap()));
      }
    }

    if (!check_engine(promise)) return;
    int r =
        engine.insertMessages(
            _messages,
            new IRCIMIWInsertMessagesCallback() {
              @Override
              public void onMessagesInserted(int code, List<RCIMIWMessage> messages) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                WritableArray _messages = Arguments.createArray();
                for (int i = 0; messages != null && i < messages.size(); i++) {
                  RCIMIWMessage obj = messages.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _messages.pushMap(__map);
                }
                writableMap.putArray("messages", _messages);
                eventEmitter.emit("InsertMessages:onMessagesInserted", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void clearMessages(
      int type,
      String targetId,
      String channelId,
      Double timestamp,
      int policy,
      String eventId,
      Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];
    RCIMIWMessageOperationPolicy _policy = RCIMIWMessageOperationPolicy.values()[policy];

    if (!check_engine(promise)) return;
    int r =
        engine.clearMessages(
            _type,
            targetId,
            channelId,
            timestamp.longValue(),
            _policy,
            new IRCIMIWClearMessagesCallback() {
              @Override
              public void onMessagesCleared(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("ClearMessages:onMessagesCleared", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void deleteLocalMessages(ReadableArray messages, String eventId, Promise promise) {
    List<RCIMIWMessage> _messages = new ArrayList<>();
    for (int i = 0; messages != null && i < messages.size(); i++) {
      ReadableMap _map = messages.getMap(i);
      if (_map != null) {
        _messages.add(RCIMIWPlatformConverter.convertMessage(_map.toHashMap()));
      }
    }

    if (!check_engine(promise)) return;
    int r =
        engine.deleteLocalMessages(
            _messages,
            new IRCIMIWDeleteLocalMessagesCallback() {
              @Override
              public void onLocalMessagesDeleted(int code, List<RCIMIWMessage> messages) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                WritableArray _messages = Arguments.createArray();
                for (int i = 0; messages != null && i < messages.size(); i++) {
                  RCIMIWMessage obj = messages.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _messages.pushMap(__map);
                }
                writableMap.putArray("messages", _messages);
                eventEmitter.emit("DeleteLocalMessages:onLocalMessagesDeleted", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void deleteMessages(
      int type,
      String targetId,
      String channelId,
      ReadableArray messages,
      String eventId,
      Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];
    List<RCIMIWMessage> _messages = new ArrayList<>();
    for (int i = 0; messages != null && i < messages.size(); i++) {
      ReadableMap _map = messages.getMap(i);
      if (_map != null) {
        _messages.add(RCIMIWPlatformConverter.convertMessage(_map.toHashMap()));
      }
    }

    if (!check_engine(promise)) return;
    int r =
        engine.deleteMessages(
            _type,
            targetId,
            channelId,
            _messages,
            new IRCIMIWDeleteMessagesCallback() {
              @Override
              public void onMessagesDeleted(int code, List<RCIMIWMessage> messages) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                WritableArray _messages = Arguments.createArray();
                for (int i = 0; messages != null && i < messages.size(); i++) {
                  RCIMIWMessage obj = messages.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _messages.pushMap(__map);
                }
                writableMap.putArray("messages", _messages);
                eventEmitter.emit("DeleteMessages:onMessagesDeleted", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void recallMessage(ReadableMap message, String eventId, Promise promise) {
    if (message == null) message = Arguments.createMap();
    RCIMIWMessage _message = RCIMIWPlatformConverter.convertMessage(message.toHashMap());

    if (!check_engine(promise)) return;
    int r =
        engine.recallMessage(
            _message,
            new IRCIMIWRecallMessageCallback() {
              @Override
              public void onMessageRecalled(int code, RCIMIWMessage message) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
                }
                ;
                eventEmitter.emit("RecallMessage:onMessageRecalled", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void sendPrivateReadReceiptMessage(
      String targetId, String channelId, Double timestamp, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.sendPrivateReadReceiptMessage(
            targetId,
            channelId,
            timestamp.longValue(),
            new IRCIMIWSendPrivateReadReceiptMessageCallback() {
              @Override
              public void onPrivateReadReceiptMessageSent(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "SendPrivateReadReceiptMessage:onPrivateReadReceiptMessageSent", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void sendGroupReadReceiptRequest(ReadableMap message, String eventId, Promise promise) {
    if (message == null) message = Arguments.createMap();
    RCIMIWMessage _message = RCIMIWPlatformConverter.convertMessage(message.toHashMap());

    if (!check_engine(promise)) return;
    int r =
        engine.sendGroupReadReceiptRequest(
            _message,
            new IRCIMIWSendGroupReadReceiptRequestCallback() {
              @Override
              public void onGroupReadReceiptRequestSent(int code, RCIMIWMessage message) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
                }
                ;
                eventEmitter.emit(
                    "SendGroupReadReceiptRequest:onGroupReadReceiptRequestSent", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void sendGroupReadReceiptResponse(
      String targetId, String channelId, ReadableArray messages, String eventId, Promise promise) {
    List<RCIMIWMessage> _messages = new ArrayList<>();
    for (int i = 0; messages != null && i < messages.size(); i++) {
      ReadableMap _map = messages.getMap(i);
      if (_map != null) {
        _messages.add(RCIMIWPlatformConverter.convertMessage(_map.toHashMap()));
      }
    }

    if (!check_engine(promise)) return;
    int r =
        engine.sendGroupReadReceiptResponse(
            targetId,
            channelId,
            _messages,
            new IRCIMIWSendGroupReadReceiptResponseCallback() {
              @Override
              public void onGroupReadReceiptResponseSent(int code, List<RCIMIWMessage> message) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                WritableArray _message = Arguments.createArray();
                for (int i = 0; message != null && i < message.size(); i++) {
                  RCIMIWMessage obj = message.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _message.pushMap(__map);
                }
                writableMap.putArray("message", _message);
                eventEmitter.emit(
                    "SendGroupReadReceiptResponse:onGroupReadReceiptResponseSent", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void updateMessageExpansion(
      String messageUId, ReadableMap expansion, String eventId, Promise promise) {
    Map<String, String> _expansion =
        expansion != null ? (Map) expansion.toHashMap() : new HashMap<>();

    if (!check_engine(promise)) return;
    int r =
        engine.updateMessageExpansion(
            messageUId,
            _expansion,
            new IRCIMIWUpdateMessageExpansionCallback() {
              @Override
              public void onMessageExpansionUpdated(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("UpdateMessageExpansion:onMessageExpansionUpdated", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void removeMessageExpansionForKeys(
      String messageUId, ReadableArray keys, String eventId, Promise promise) {
    List<String> _keys = new ArrayList<>();
    for (int i = 0; keys != null && i < keys.size(); i++) {
      String _s = keys.getString(i);
      if (_s != null) _keys.add(_s);
    }

    if (!check_engine(promise)) return;
    int r =
        engine.removeMessageExpansionForKeys(
            messageUId,
            _keys,
            new IRCIMIWRemoveMessageExpansionForKeysCallback() {
              @Override
              public void onMessageExpansionForKeysRemoved(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "RemoveMessageExpansionForKeys:onMessageExpansionForKeysRemoved", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void changeMessageSentStatus(
      Double messageId, int sentStatus, String eventId, Promise promise) {
    RCIMIWSentStatus _sentStatus = RCIMIWSentStatus.values()[sentStatus];

    if (!check_engine(promise)) return;
    int r =
        engine.changeMessageSentStatus(
            messageId.intValue(),
            _sentStatus,
            new IRCIMIWChangeMessageSentStatusCallback() {
              @Override
              public void onMessageSentStatusChanged(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "ChangeMessageSentStatus:onMessageSentStatusChanged", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void changeMessageReceiveStatus(
      Double messageId, int receivedStatus, String eventId, Promise promise) {
    RCIMIWReceivedStatus _receivedStatus = RCIMIWReceivedStatus.values()[receivedStatus];

    if (!check_engine(promise)) return;
    int r =
        engine.changeMessageReceiveStatus(
            messageId.intValue(),
            _receivedStatus,
            new IRCIMIWChangeMessageReceivedStatusCallback() {
              @Override
              public void onMessageReceiveStatusChanged(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "ChangeMessageReceiveStatus:onMessageReceiveStatusChanged", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void joinChatRoom(
      String targetId, Double messageCount, boolean autoCreate, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.joinChatRoom(
            targetId,
            messageCount.intValue(),
            autoCreate,
            new IRCIMIWJoinChatRoomCallback() {
              @Override
              public void onChatRoomJoined(int code, String targetId) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                writableMap.putString("targetId", targetId);
                eventEmitter.emit("JoinChatRoom:onChatRoomJoined", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void leaveChatRoom(String targetId, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.leaveChatRoom(
            targetId,
            new IRCIMIWLeaveChatRoomCallback() {
              @Override
              public void onChatRoomLeft(int code, String targetId) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                writableMap.putString("targetId", targetId);
                eventEmitter.emit("LeaveChatRoom:onChatRoomLeft", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadChatRoomMessages(
      String targetId, Double timestamp, int order, Double count, Promise promise) {
    RCIMIWTimeOrder _order = RCIMIWTimeOrder.values()[order];

    if (!check_engine(promise)) return;
    int r = engine.loadChatRoomMessages(targetId, timestamp.longValue(), _order, count.intValue());
    promise.resolve(r);
  }

  @ReactMethod
  public void getChatRoomMessages(
      String targetId, Double timestamp, int order, Double count, String eventId, Promise promise) {
    RCIMIWTimeOrder _order = RCIMIWTimeOrder.values()[order];

    if (!check_engine(promise)) return;
    int r =
        engine.getChatRoomMessages(
            targetId,
            timestamp.longValue(),
            _order,
            count.intValue(),
            new IRCIMIWGetChatRoomMessagesCallback() {
              @Override
              public void onSuccess(List<RCIMIWMessage> t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                WritableArray _t = Arguments.createArray();
                for (int i = 0; t != null && i < t.size(); i++) {
                  RCIMIWMessage obj = t.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _t.pushMap(__map);
                }
                writableMap.putArray("t", _t);
                eventEmitter.emit("GetChatRoomMessages:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetChatRoomMessages:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void addChatRoomEntry(
      String targetId,
      String key,
      String value,
      boolean deleteWhenLeft,
      boolean overwrite,
      String eventId,
      Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.addChatRoomEntry(
            targetId,
            key,
            value,
            deleteWhenLeft,
            overwrite,
            new IRCIMIWAddChatRoomEntryCallback() {
              @Override
              public void onChatRoomEntryAdded(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("AddChatRoomEntry:onChatRoomEntryAdded", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void addChatRoomEntries(
      String targetId,
      ReadableMap entries,
      boolean deleteWhenLeft,
      boolean overwrite,
      String eventId,
      Promise promise) {
    Map<String, String> _entries = entries != null ? (Map) entries.toHashMap() : new HashMap<>();

    if (!check_engine(promise)) return;
    int r =
        engine.addChatRoomEntries(
            targetId,
            _entries,
            deleteWhenLeft,
            overwrite,
            new IRCIMIWAddChatRoomEntriesCallback() {
              @Override
              public void onChatRoomEntriesAdded(int code, Map<String, Integer> errors) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                if (errors == null) errors = new HashMap<>();
                WritableMap _errors = Arguments.makeNativeMap((Map) errors);
                writableMap.putMap("errors", _errors);
                eventEmitter.emit("AddChatRoomEntries:onChatRoomEntriesAdded", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadChatRoomEntry(String targetId, String key, Promise promise) {

    if (!check_engine(promise)) return;
    int r = engine.loadChatRoomEntry(targetId, key);
    promise.resolve(r);
  }

  @ReactMethod
  public void getChatRoomEntry(String targetId, String key, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.getChatRoomEntry(
            targetId,
            key,
            new IRCIMIWGetChatRoomEntryCallback() {
              @Override
              public void onSuccess(Map<String, String> t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                if (t == null) t = new HashMap<>();
                WritableMap _t = Arguments.makeNativeMap((Map) t);
                writableMap.putMap("t", _t);
                eventEmitter.emit("GetChatRoomEntry:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetChatRoomEntry:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadChatRoomAllEntries(String targetId, Promise promise) {

    if (!check_engine(promise)) return;
    int r = engine.loadChatRoomAllEntries(targetId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getChatRoomAllEntries(String targetId, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.getChatRoomAllEntries(
            targetId,
            new IRCIMIWGetChatRoomAllEntriesCallback() {
              @Override
              public void onSuccess(Map<String, String> t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                if (t == null) t = new HashMap<>();
                WritableMap _t = Arguments.makeNativeMap((Map) t);
                writableMap.putMap("t", _t);
                eventEmitter.emit("GetChatRoomAllEntries:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetChatRoomAllEntries:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void removeChatRoomEntry(
      String targetId, String key, boolean force, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.removeChatRoomEntry(
            targetId,
            key,
            force,
            new IRCIMIWRemoveChatRoomEntryCallback() {
              @Override
              public void onChatRoomEntryRemoved(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("RemoveChatRoomEntry:onChatRoomEntryRemoved", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void removeChatRoomEntries(
      String targetId, ReadableArray keys, boolean force, String eventId, Promise promise) {
    List<String> _keys = new ArrayList<>();
    for (int i = 0; keys != null && i < keys.size(); i++) {
      String _s = keys.getString(i);
      if (_s != null) _keys.add(_s);
    }

    if (!check_engine(promise)) return;
    int r =
        engine.removeChatRoomEntries(
            targetId,
            _keys,
            force,
            new IRCIMIWRemoveChatRoomEntriesCallback() {
              @Override
              public void onChatRoomEntriesRemoved(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("RemoveChatRoomEntries:onChatRoomEntriesRemoved", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void addToBlacklist(String userId, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.addToBlacklist(
            userId,
            new IRCIMIWAddToBlacklistCallback() {
              @Override
              public void onBlacklistAdded(int code, String userId) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                writableMap.putString("userId", userId);
                eventEmitter.emit("AddToBlacklist:onBlacklistAdded", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void removeFromBlacklist(String userId, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.removeFromBlacklist(
            userId,
            new IRCIMIWRemoveFromBlacklistCallback() {
              @Override
              public void onBlacklistRemoved(int code, String userId) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                writableMap.putString("userId", userId);
                eventEmitter.emit("RemoveFromBlacklist:onBlacklistRemoved", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadBlacklistStatus(String userId, Promise promise) {

    if (!check_engine(promise)) return;
    int r = engine.loadBlacklistStatus(userId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getBlacklistStatus(String userId, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.getBlacklistStatus(
            userId,
            new IRCIMIWGetBlacklistStatusCallback() {
              @Override
              public void onSuccess(RCIMIWBlacklistStatus t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putInt("t", t.ordinal());
                eventEmitter.emit("GetBlacklistStatus:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetBlacklistStatus:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadBlacklist(Promise promise) {

    if (!check_engine(promise)) return;
    int r = engine.loadBlacklist();
    promise.resolve(r);
  }

  @ReactMethod
  public void getBlacklist(String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.getBlacklist(
            new IRCIMIWGetBlacklistCallback() {
              @Override
              public void onSuccess(List<String> t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                if (t == null) t = new ArrayList<>();
                WritableArray _t = Arguments.makeNativeArray(t);
                writableMap.putArray("t", _t);
                eventEmitter.emit("GetBlacklist:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetBlacklist:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void searchMessages(
      int type,
      String targetId,
      String channelId,
      String keyword,
      Double startTime,
      Double count,
      String eventId,
      Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.searchMessages(
            _type,
            targetId,
            channelId,
            keyword,
            startTime.longValue(),
            count.intValue(),
            new IRCIMIWSearchMessagesCallback() {
              @Override
              public void onSuccess(List<RCIMIWMessage> t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                WritableArray _t = Arguments.createArray();
                for (int i = 0; t != null && i < t.size(); i++) {
                  RCIMIWMessage obj = t.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _t.pushMap(__map);
                }
                writableMap.putArray("t", _t);
                eventEmitter.emit("SearchMessages:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("SearchMessages:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void searchMessagesByTimeRange(
      int type,
      String targetId,
      String channelId,
      String keyword,
      Double startTime,
      Double endTime,
      Double offset,
      Double count,
      String eventId,
      Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.searchMessagesByTimeRange(
            _type,
            targetId,
            channelId,
            keyword,
            startTime.longValue(),
            endTime.longValue(),
            offset.intValue(),
            count.intValue(),
            new IRCIMIWSearchMessagesByTimeRangeCallback() {
              @Override
              public void onSuccess(List<RCIMIWMessage> t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                WritableArray _t = Arguments.createArray();
                for (int i = 0; t != null && i < t.size(); i++) {
                  RCIMIWMessage obj = t.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _t.pushMap(__map);
                }
                writableMap.putArray("t", _t);
                eventEmitter.emit("SearchMessagesByTimeRange:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("SearchMessagesByTimeRange:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void searchMessagesByUserId(
      String userId,
      int type,
      String targetId,
      String channelId,
      Double startTime,
      Double count,
      String eventId,
      Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.searchMessagesByUserId(
            userId,
            _type,
            targetId,
            channelId,
            startTime.longValue(),
            count.intValue(),
            new IRCIMIWSearchMessagesByUserIdCallback() {
              @Override
              public void onSuccess(List<RCIMIWMessage> t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                WritableArray _t = Arguments.createArray();
                for (int i = 0; t != null && i < t.size(); i++) {
                  RCIMIWMessage obj = t.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _t.pushMap(__map);
                }
                writableMap.putArray("t", _t);
                eventEmitter.emit("SearchMessagesByUserId:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("SearchMessagesByUserId:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void searchConversations(
      ReadableArray conversationTypes,
      String channelId,
      ReadableArray messageTypes,
      String keyword,
      String eventId,
      Promise promise) {
    List<RCIMIWConversationType> _conversationTypes = new ArrayList<>();
    for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
      _conversationTypes.add(RCIMIWConversationType.values()[conversationTypes.getInt(i)]);
    }
    List<RCIMIWMessageType> _messageTypes = new ArrayList<>();
    for (int i = 0; messageTypes != null && i < messageTypes.size(); i++) {
      _messageTypes.add(RCIMIWMessageType.values()[messageTypes.getInt(i)]);
    }

    if (!check_engine(promise)) return;
    int r =
        engine.searchConversations(
            _conversationTypes,
            channelId,
            _messageTypes,
            keyword,
            new IRCIMIWSearchConversationsCallback() {
              @Override
              public void onSuccess(List<RCIMIWSearchConversationResult> t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                WritableArray _t = Arguments.createArray();
                for (int i = 0; t != null && i < t.size(); i++) {
                  RCIMIWSearchConversationResult obj = t.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map =
                      RCIMIWPlatformConverter.convertSearchConversationResult(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _t.pushMap(__map);
                }
                writableMap.putArray("t", _t);
                eventEmitter.emit("SearchConversations:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("SearchConversations:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void changeNotificationQuietHours(
      String startTime, Double spanMinutes, int level, String eventId, Promise promise) {
    RCIMIWPushNotificationQuietHoursLevel _level =
        RCIMIWPushNotificationQuietHoursLevel.values()[level];

    if (!check_engine(promise)) return;
    int r =
        engine.changeNotificationQuietHours(
            startTime,
            spanMinutes.intValue(),
            _level,
            new IRCIMIWChangeNotificationQuietHoursCallback() {
              @Override
              public void onNotificationQuietHoursChanged(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "ChangeNotificationQuietHours:onNotificationQuietHoursChanged", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void removeNotificationQuietHours(String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.removeNotificationQuietHours(
            new IRCIMIWRemoveNotificationQuietHoursCallback() {
              @Override
              public void onNotificationQuietHoursRemoved(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "RemoveNotificationQuietHours:onNotificationQuietHoursRemoved", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadNotificationQuietHours(Promise promise) {

    if (!check_engine(promise)) return;
    int r = engine.loadNotificationQuietHours();
    promise.resolve(r);
  }

  @ReactMethod
  public void getNotificationQuietHours(String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.getNotificationQuietHours(
            new IRCIMIWGetNotificationQuietHoursCallback() {
              @Override
              public void onSuccess(
                  String startTime, int spanMinutes, RCIMIWPushNotificationQuietHoursLevel level) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putString("startTime", startTime);
                writableMap.putDouble("spanMinutes", spanMinutes);
                writableMap.putInt("level", level.ordinal());
                eventEmitter.emit("GetNotificationQuietHours:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetNotificationQuietHours:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void changeConversationNotificationLevel(
      int type, String targetId, String channelId, int level, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];
    RCIMIWPushNotificationLevel _level = RCIMIWPushNotificationLevel.values()[level];

    if (!check_engine(promise)) return;
    int r =
        engine.changeConversationNotificationLevel(
            _type,
            targetId,
            channelId,
            _level,
            new IRCIMIWChangeConversationNotificationLevelCallback() {
              @Override
              public void onConversationNotificationLevelChanged(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "ChangeConversationNotificationLevel:onConversationNotificationLevelChanged",
                    writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadConversationNotificationLevel(
      int type, String targetId, String channelId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r = engine.loadConversationNotificationLevel(_type, targetId, channelId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getConversationNotificationLevel(
      int type, String targetId, String channelId, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.getConversationNotificationLevel(
            _type,
            targetId,
            channelId,
            new IRCIMIWGetConversationNotificationLevelCallback() {
              @Override
              public void onSuccess(RCIMIWPushNotificationLevel t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putInt("t", t.ordinal());
                eventEmitter.emit("GetConversationNotificationLevel:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetConversationNotificationLevel:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void changeConversationTypeNotificationLevel(
      int type, int level, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];
    RCIMIWPushNotificationLevel _level = RCIMIWPushNotificationLevel.values()[level];

    if (!check_engine(promise)) return;
    int r =
        engine.changeConversationTypeNotificationLevel(
            _type,
            _level,
            new IRCIMIWChangeConversationTypeNotificationLevelCallback() {
              @Override
              public void onConversationTypeNotificationLevelChanged(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "ChangeConversationTypeNotificationLevel:onConversationTypeNotificationLevelChanged",
                    writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadConversationTypeNotificationLevel(int type, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r = engine.loadConversationTypeNotificationLevel(_type);
    promise.resolve(r);
  }

  @ReactMethod
  public void getConversationTypeNotificationLevel(int type, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.getConversationTypeNotificationLevel(
            _type,
            new IRCIMIWGetConversationTypeNotificationLevelCallback() {
              @Override
              public void onSuccess(RCIMIWPushNotificationLevel t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putInt("t", t.ordinal());
                eventEmitter.emit("GetConversationTypeNotificationLevel:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetConversationTypeNotificationLevel:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void changeUltraGroupDefaultNotificationLevel(
      String targetId, int level, String eventId, Promise promise) {
    RCIMIWPushNotificationLevel _level = RCIMIWPushNotificationLevel.values()[level];

    if (!check_engine(promise)) return;
    int r =
        engine.changeUltraGroupDefaultNotificationLevel(
            targetId,
            _level,
            new IRCIMIWChangeUltraGroupDefaultNotificationLevelCallback() {
              @Override
              public void onUltraGroupDefaultNotificationLevelChanged(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "ChangeUltraGroupDefaultNotificationLevel:onUltraGroupDefaultNotificationLevelChanged",
                    writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadUltraGroupDefaultNotificationLevel(String targetId, Promise promise) {

    if (!check_engine(promise)) return;
    int r = engine.loadUltraGroupDefaultNotificationLevel(targetId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getUltraGroupDefaultNotificationLevel(
      String targetId, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.getUltraGroupDefaultNotificationLevel(
            targetId,
            new IRCIMIWGetUltraGroupDefaultNotificationLevelCallback() {
              @Override
              public void onSuccess(RCIMIWPushNotificationLevel t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putInt("t", t.ordinal());
                eventEmitter.emit("GetUltraGroupDefaultNotificationLevel:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetUltraGroupDefaultNotificationLevel:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void changeUltraGroupChannelDefaultNotificationLevel(
      String targetId, String channelId, int level, String eventId, Promise promise) {
    RCIMIWPushNotificationLevel _level = RCIMIWPushNotificationLevel.values()[level];

    if (!check_engine(promise)) return;
    int r =
        engine.changeUltraGroupChannelDefaultNotificationLevel(
            targetId,
            channelId,
            _level,
            new IRCIMIWChangeUltraGroupChannelDefaultNotificationLevelCallback() {
              @Override
              public void onUltraGroupChannelDefaultNotificationLevelChanged(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "ChangeUltraGroupChannelDefaultNotificationLevel:onUltraGroupChannelDefaultNotificationLevelChanged",
                    writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadUltraGroupChannelDefaultNotificationLevel(
      String targetId, String channelId, Promise promise) {

    if (!check_engine(promise)) return;
    int r = engine.loadUltraGroupChannelDefaultNotificationLevel(targetId, channelId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getUltraGroupChannelDefaultNotificationLevel(
      String targetId, String channelId, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.getUltraGroupChannelDefaultNotificationLevel(
            targetId,
            channelId,
            new IRCIMIWGetUltraGroupChannelDefaultNotificationLevelCallback() {
              @Override
              public void onSuccess(RCIMIWPushNotificationLevel t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putInt("t", t.ordinal());
                eventEmitter.emit(
                    "GetUltraGroupChannelDefaultNotificationLevel:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "GetUltraGroupChannelDefaultNotificationLevel:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void changePushContentShowStatus(boolean showContent, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.changePushContentShowStatus(
            showContent,
            new IRCIMIWChangePushContentShowStatusCallback() {
              @Override
              public void onPushContentShowStatusChanged(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "ChangePushContentShowStatus:onPushContentShowStatusChanged", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void changePushLanguage(String language, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.changePushLanguage(
            language,
            new IRCIMIWChangePushLanguageCallback() {
              @Override
              public void onPushLanguageChanged(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("ChangePushLanguage:onPushLanguageChanged", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void changePushReceiveStatus(boolean receive, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.changePushReceiveStatus(
            receive,
            new IRCIMIWChangePushReceiveStatusCallback() {
              @Override
              public void onPushReceiveStatusChanged(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "ChangePushReceiveStatus:onPushReceiveStatusChanged", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void sendGroupMessageToDesignatedUsers(
      ReadableMap message, ReadableArray userIds, String eventId, Promise promise) {
    if (message == null) message = Arguments.createMap();
    RCIMIWMessage _message = RCIMIWPlatformConverter.convertMessage(message.toHashMap());
    List<String> _userIds = new ArrayList<>();
    for (int i = 0; userIds != null && i < userIds.size(); i++) {
      String _s = userIds.getString(i);
      if (_s != null) _userIds.add(_s);
    }

    if (!check_engine(promise)) return;
    int r =
        engine.sendGroupMessageToDesignatedUsers(
            _message,
            _userIds,
            new RCIMIWSendGroupMessageToDesignatedUsersCallback() {
              @Override
              public void onMessageSaved(RCIMIWMessage message) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
                }
                ;
                eventEmitter.emit("SendGroupMessageToDesignatedUsers:onMessageSaved", writableMap);
              }

              @Override
              public void onMessageSent(int code, RCIMIWMessage message) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                if (message != null) {
                  writableMap.putMap(
                      "message",
                      Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
                }
                ;
                eventEmitter.emit("SendGroupMessageToDesignatedUsers:onMessageSent", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadMessageCount(int type, String targetId, String channelId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r = engine.loadMessageCount(_type, targetId, channelId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getMessageCount(
      int type, String targetId, String channelId, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.getMessageCount(
            _type,
            targetId,
            channelId,
            new IRCIMIWGetMessageCountCallback() {
              @Override
              public void onSuccess(Integer t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("t", t);
                eventEmitter.emit("GetMessageCount:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetMessageCount:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadTopConversations(
      ReadableArray conversationTypes, String channelId, Promise promise) {
    List<RCIMIWConversationType> _conversationTypes = new ArrayList<>();
    for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
      _conversationTypes.add(RCIMIWConversationType.values()[conversationTypes.getInt(i)]);
    }

    if (!check_engine(promise)) return;
    int r = engine.loadTopConversations(_conversationTypes, channelId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getTopConversations(
      ReadableArray conversationTypes, String channelId, String eventId, Promise promise) {
    List<RCIMIWConversationType> _conversationTypes = new ArrayList<>();
    for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
      _conversationTypes.add(RCIMIWConversationType.values()[conversationTypes.getInt(i)]);
    }

    if (!check_engine(promise)) return;
    int r =
        engine.getTopConversations(
            _conversationTypes,
            channelId,
            new IRCIMIWGetTopConversationsCallback() {
              @Override
              public void onSuccess(List<RCIMIWConversation> t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                WritableArray _t = Arguments.createArray();
                for (int i = 0; t != null && i < t.size(); i++) {
                  RCIMIWConversation obj = t.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertConversation(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _t.pushMap(__map);
                }
                writableMap.putArray("t", _t);
                eventEmitter.emit("GetTopConversations:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetTopConversations:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void syncUltraGroupReadStatus(
      String targetId, String channelId, Double timestamp, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.syncUltraGroupReadStatus(
            targetId,
            channelId,
            timestamp.longValue(),
            new IRCIMIWSyncUltraGroupReadStatusCallback() {
              @Override
              public void onUltraGroupReadStatusSynced(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "SyncUltraGroupReadStatus:onUltraGroupReadStatusSynced", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadConversationsForAllChannel(int type, String targetId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r = engine.loadConversationsForAllChannel(_type, targetId);
    promise.resolve(r);
  }

  @ReactMethod
  public void getConversationsForAllChannel(
      int type, String targetId, String eventId, Promise promise) {
    RCIMIWConversationType _type = RCIMIWConversationType.values()[type];

    if (!check_engine(promise)) return;
    int r =
        engine.getConversationsForAllChannel(
            _type,
            targetId,
            new IRCIMIWGetConversationsForAllChannelCallback() {
              @Override
              public void onSuccess(List<RCIMIWConversation> t) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                WritableArray _t = Arguments.createArray();
                for (int i = 0; t != null && i < t.size(); i++) {
                  RCIMIWConversation obj = t.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertConversation(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _t.pushMap(__map);
                }
                writableMap.putArray("t", _t);
                eventEmitter.emit("GetConversationsForAllChannel:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetConversationsForAllChannel:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void modifyUltraGroupMessage(
      String messageUId, ReadableMap message, String eventId, Promise promise) {
    if (message == null) message = Arguments.createMap();
    RCIMIWMessage _message = RCIMIWPlatformConverter.convertMessage(message.toHashMap());

    if (!check_engine(promise)) return;
    int r =
        engine.modifyUltraGroupMessage(
            messageUId,
            _message,
            new IRCIMIWModifyUltraGroupMessageCallback() {
              @Override
              public void onUltraGroupMessageModified(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "ModifyUltraGroupMessage:onUltraGroupMessageModified", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void recallUltraGroupMessage(
      ReadableMap message, boolean deleteRemote, String eventId, Promise promise) {
    if (message == null) message = Arguments.createMap();
    RCIMIWMessage _message = RCIMIWPlatformConverter.convertMessage(message.toHashMap());

    if (!check_engine(promise)) return;
    int r =
        engine.recallUltraGroupMessage(
            _message,
            deleteRemote,
            new IRCIMIWRecallUltraGroupMessageCallback() {
              @Override
              public void onUltraGroupMessageRecalled(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "RecallUltraGroupMessage:onUltraGroupMessageRecalled", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void clearUltraGroupMessages(
      String targetId,
      String channelId,
      Double timestamp,
      int policy,
      String eventId,
      Promise promise) {
    RCIMIWMessageOperationPolicy _policy = RCIMIWMessageOperationPolicy.values()[policy];

    if (!check_engine(promise)) return;
    int r =
        engine.clearUltraGroupMessages(
            targetId,
            channelId,
            timestamp.longValue(),
            _policy,
            new IRCIMIWClearUltraGroupMessagesCallback() {
              @Override
              public void onUltraGroupMessagesCleared(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "ClearUltraGroupMessages:onUltraGroupMessagesCleared", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void sendUltraGroupTypingStatus(
      String targetId, String channelId, int typingStatus, String eventId, Promise promise) {
    RCIMIWUltraGroupTypingStatus _typingStatus =
        RCIMIWUltraGroupTypingStatus.values()[typingStatus];

    if (!check_engine(promise)) return;
    int r =
        engine.sendUltraGroupTypingStatus(
            targetId,
            channelId,
            _typingStatus,
            new IRCIMIWSendUltraGroupTypingStatusCallback() {
              @Override
              public void onUltraGroupTypingStatusSent(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "SendUltraGroupTypingStatus:onUltraGroupTypingStatusSent", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void clearUltraGroupMessagesForAllChannel(
      String targetId, Double timestamp, String eventId, Promise promise) {

    if (!check_engine(promise)) return;
    int r =
        engine.clearUltraGroupMessagesForAllChannel(
            targetId,
            timestamp.longValue(),
            new IRCIMIWClearUltraGroupMessagesForAllChannelCallback() {
              @Override
              public void onUltraGroupMessagesClearedForAllChannel(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "ClearUltraGroupMessagesForAllChannel:onUltraGroupMessagesClearedForAllChannel",
                    writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void loadBatchRemoteUltraGroupMessages(ReadableArray messages, Promise promise) {
    List<RCIMIWMessage> _messages = new ArrayList<>();
    for (int i = 0; messages != null && i < messages.size(); i++) {
      ReadableMap _map = messages.getMap(i);
      if (_map != null) {
        _messages.add(RCIMIWPlatformConverter.convertMessage(_map.toHashMap()));
      }
    }

    if (!check_engine(promise)) return;
    int r = engine.loadBatchRemoteUltraGroupMessages(_messages);
    promise.resolve(r);
  }

  @ReactMethod
  public void getBatchRemoteUltraGroupMessages(
      ReadableArray messages, String eventId, Promise promise) {
    List<RCIMIWMessage> _messages = new ArrayList<>();
    for (int i = 0; messages != null && i < messages.size(); i++) {
      ReadableMap _map = messages.getMap(i);
      if (_map != null) {
        _messages.add(RCIMIWPlatformConverter.convertMessage(_map.toHashMap()));
      }
    }

    if (!check_engine(promise)) return;
    int r =
        engine.getBatchRemoteUltraGroupMessages(
            _messages,
            new IRCIMIWGetBatchRemoteUltraGroupMessagesCallback() {
              @Override
              public void onSuccess(
                  List<RCIMIWMessage> matchedMessages, List<RCIMIWMessage> notMatchedMessages) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                WritableArray _matchedMessages = Arguments.createArray();
                for (int i = 0; matchedMessages != null && i < matchedMessages.size(); i++) {
                  RCIMIWMessage obj = matchedMessages.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _matchedMessages.pushMap(__map);
                }
                writableMap.putArray("matchedMessages", _matchedMessages);
                WritableArray _notMatchedMessages = Arguments.createArray();
                for (int i = 0; notMatchedMessages != null && i < notMatchedMessages.size(); i++) {
                  RCIMIWMessage obj = notMatchedMessages.get(i);
                  if (obj == null) continue;
                  Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
                  if (_map == null) _map = new HashMap<>();
                  ReadableMap __map = Arguments.makeNativeMap(_map);
                  _notMatchedMessages.pushMap(__map);
                }
                writableMap.putArray("notMatchedMessages", _notMatchedMessages);
                eventEmitter.emit("GetBatchRemoteUltraGroupMessages:onSuccess", writableMap);
              }

              @Override
              public void onError(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit("GetBatchRemoteUltraGroupMessages:onError", writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void updateUltraGroupMessageExpansion(
      String messageUId, ReadableMap expansion, String eventId, Promise promise) {
    Map<String, String> _expansion =
        expansion != null ? (Map) expansion.toHashMap() : new HashMap<>();

    if (!check_engine(promise)) return;
    int r =
        engine.updateUltraGroupMessageExpansion(
            messageUId,
            _expansion,
            new IRCIMIWUpdateUltraGroupMessageExpansionCallback() {
              @Override
              public void onUltraGroupMessageExpansionUpdated(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "UpdateUltraGroupMessageExpansion:onUltraGroupMessageExpansionUpdated",
                    writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void removeUltraGroupMessageExpansionForKeys(
      String messageUId, ReadableArray keys, String eventId, Promise promise) {
    List<String> _keys = new ArrayList<>();
    for (int i = 0; keys != null && i < keys.size(); i++) {
      String _s = keys.getString(i);
      if (_s != null) _keys.add(_s);
    }

    if (!check_engine(promise)) return;
    int r =
        engine.removeUltraGroupMessageExpansionForKeys(
            messageUId,
            _keys,
            new IRCIMIWRemoveUltraGroupMessageExpansionForKeysCallback() {
              @Override
              public void onUltraGroupMessageExpansionForKeysRemoved(int code) {
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("eventId", eventId);
                writableMap.putDouble("code", code);
                eventEmitter.emit(
                    "RemoveUltraGroupMessageExpansionForKeys:onUltraGroupMessageExpansionForKeysRemoved",
                    writableMap);
              }
            });
    promise.resolve(r);
  }

  @ReactMethod
  public void changeLogLevel(int level, Promise promise) {
    RCIMIWLogLevel _level = RCIMIWLogLevel.values()[level];

    if (!check_engine(promise)) return;
    int r = engine.changeLogLevel(_level);
    promise.resolve(r);
  }

  private class RCIMIWListenerImpl extends RCIMIWListener {
    @Override
    public void onMessageReceived(
        RCIMIWMessage message, int left, boolean offline, boolean hasPackage) {
      String eventName = "IRCIMIWListener:onMessageReceived";
      WritableMap arguments = Arguments.createMap();
      if (message != null) {
        arguments.putMap(
            "message", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
      }
      arguments.putDouble("left", left);
      arguments.putBoolean("offline", offline);
      arguments.putBoolean("hasPackage", hasPackage);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConnectionStatusChanged(RCIMIWConnectionStatus status) {
      String eventName = "IRCIMIWListener:onConnectionStatusChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putInt("status", status.ordinal());

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConversationTopStatusSynced(
        RCIMIWConversationType type, String targetId, String channelId, boolean top) {
      String eventName = "IRCIMIWListener:onConversationTopStatusSynced";
      WritableMap arguments = Arguments.createMap();
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putBoolean("top", top);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onRemoteMessageRecalled(RCIMIWMessage message) {
      String eventName = "IRCIMIWListener:onRemoteMessageRecalled";
      WritableMap arguments = Arguments.createMap();
      if (message != null) {
        arguments.putMap(
            "message", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onPrivateReadReceiptReceived(String targetId, String channelId, long timestamp) {
      String eventName = "IRCIMIWListener:onPrivateReadReceiptReceived";
      WritableMap arguments = Arguments.createMap();
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putDouble("timestamp", timestamp);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onRemoteMessageExpansionUpdated(
        Map<String, String> expansion, RCIMIWMessage message) {
      String eventName = "IRCIMIWListener:onRemoteMessageExpansionUpdated";
      WritableMap arguments = Arguments.createMap();
      if (expansion == null) expansion = new HashMap<>();
      WritableMap _expansion = Arguments.makeNativeMap((Map) expansion);
      arguments.putMap("expansion", _expansion);
      if (message != null) {
        arguments.putMap(
            "message", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onRemoteMessageExpansionForKeyRemoved(RCIMIWMessage message, List<String> keys) {
      String eventName = "IRCIMIWListener:onRemoteMessageExpansionForKeyRemoved";
      WritableMap arguments = Arguments.createMap();
      if (message != null) {
        arguments.putMap(
            "message", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
      }
      if (keys == null) keys = new ArrayList<>();
      WritableArray _keys = Arguments.makeNativeArray(keys);
      arguments.putArray("keys", _keys);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onChatRoomMemberChanged(String targetId, List<RCIMIWChatRoomMemberAction> actions) {
      String eventName = "IRCIMIWListener:onChatRoomMemberChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putString("targetId", targetId);
      WritableArray _actions = Arguments.createArray();
      for (int i = 0; actions != null && i < actions.size(); i++) {
        RCIMIWChatRoomMemberAction obj = actions.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertChatRoomMemberAction(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _actions.pushMap(__map);
      }
      arguments.putArray("actions", _actions);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onTypingStatusChanged(
        RCIMIWConversationType type,
        String targetId,
        String channelId,
        List<RCIMIWTypingStatus> userTypingStatus) {
      String eventName = "IRCIMIWListener:onTypingStatusChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      WritableArray _userTypingStatus = Arguments.createArray();
      for (int i = 0; userTypingStatus != null && i < userTypingStatus.size(); i++) {
        RCIMIWTypingStatus obj = userTypingStatus.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertTypingStatus(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _userTypingStatus.pushMap(__map);
      }
      arguments.putArray("userTypingStatus", _userTypingStatus);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConversationReadStatusSyncMessageReceived(
        RCIMIWConversationType type, String targetId, long timestamp) {
      String eventName = "IRCIMIWListener:onConversationReadStatusSyncMessageReceived";
      WritableMap arguments = Arguments.createMap();
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putDouble("timestamp", timestamp);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onChatRoomEntriesSynced(String roomId) {
      String eventName = "IRCIMIWListener:onChatRoomEntriesSynced";
      WritableMap arguments = Arguments.createMap();
      arguments.putString("roomId", roomId);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onChatRoomEntriesChanged(
        RCIMIWChatRoomEntriesOperationType operationType,
        String roomId,
        Map<String, String> entries) {
      String eventName = "IRCIMIWListener:onChatRoomEntriesChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putInt("operationType", operationType.ordinal());
      arguments.putString("roomId", roomId);
      if (entries == null) entries = new HashMap<>();
      WritableMap _entries = Arguments.makeNativeMap((Map) entries);
      arguments.putMap("entries", _entries);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onRemoteUltraGroupMessageExpansionUpdated(List<RCIMIWMessage> messages) {
      String eventName = "IRCIMIWListener:onRemoteUltraGroupMessageExpansionUpdated";
      WritableMap arguments = Arguments.createMap();
      WritableArray _messages = Arguments.createArray();
      for (int i = 0; messages != null && i < messages.size(); i++) {
        RCIMIWMessage obj = messages.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _messages.pushMap(__map);
      }
      arguments.putArray("messages", _messages);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onRemoteUltraGroupMessageModified(List<RCIMIWMessage> messages) {
      String eventName = "IRCIMIWListener:onRemoteUltraGroupMessageModified";
      WritableMap arguments = Arguments.createMap();
      WritableArray _messages = Arguments.createArray();
      for (int i = 0; messages != null && i < messages.size(); i++) {
        RCIMIWMessage obj = messages.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _messages.pushMap(__map);
      }
      arguments.putArray("messages", _messages);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onRemoteUltraGroupMessageRecalled(List<RCIMIWMessage> messages) {
      String eventName = "IRCIMIWListener:onRemoteUltraGroupMessageRecalled";
      WritableMap arguments = Arguments.createMap();
      WritableArray _messages = Arguments.createArray();
      for (int i = 0; messages != null && i < messages.size(); i++) {
        RCIMIWMessage obj = messages.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _messages.pushMap(__map);
      }
      arguments.putArray("messages", _messages);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupReadTimeReceived(String targetId, String channelId, long timestamp) {
      String eventName = "IRCIMIWListener:onUltraGroupReadTimeReceived";
      WritableMap arguments = Arguments.createMap();
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putDouble("timestamp", timestamp);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupTypingStatusChanged(List<RCIMIWUltraGroupTypingStatusInfo> info) {
      String eventName = "IRCIMIWListener:onUltraGroupTypingStatusChanged";
      WritableMap arguments = Arguments.createMap();
      WritableArray _info = Arguments.createArray();
      for (int i = 0; info != null && i < info.size(); i++) {
        RCIMIWUltraGroupTypingStatusInfo obj = info.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertUltraGroupTypingStatusInfo(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _info.pushMap(__map);
      }
      arguments.putArray("info", _info);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessageBlocked(RCIMIWBlockedMessageInfo info) {
      String eventName = "IRCIMIWListener:onMessageBlocked";
      WritableMap arguments = Arguments.createMap();
      if (info != null) {
        arguments.putMap(
            "info",
            Arguments.makeNativeMap(RCIMIWPlatformConverter.convertBlockedMessageInfo(info)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onChatRoomStatusChanged(String targetId, RCIMIWChatRoomStatus status) {
      String eventName = "IRCIMIWListener:onChatRoomStatusChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putString("targetId", targetId);
      arguments.putInt("status", status.ordinal());

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onGroupMessageReadReceiptRequestReceived(String targetId, String messageUId) {
      String eventName = "IRCIMIWListener:onGroupMessageReadReceiptRequestReceived";
      WritableMap arguments = Arguments.createMap();
      arguments.putString("targetId", targetId);
      arguments.putString("messageUId", messageUId);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onGroupMessageReadReceiptResponseReceived(
        String targetId, String messageUId, Map<String, Long> respondUserIds) {
      String eventName = "IRCIMIWListener:onGroupMessageReadReceiptResponseReceived";
      WritableMap arguments = Arguments.createMap();
      arguments.putString("targetId", targetId);
      arguments.putString("messageUId", messageUId);
      if (respondUserIds == null) respondUserIds = new HashMap<>();
      WritableMap _respondUserIds = Arguments.makeNativeMap((Map) respondUserIds);
      arguments.putMap("respondUserIds", _respondUserIds);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConnected(int code, String userId) {
      String eventName = "IRCIMIWListener:onConnected";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("userId", userId);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onDatabaseOpened(int code) {
      String eventName = "IRCIMIWListener:onDatabaseOpened";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConversationLoaded(
        int code,
        RCIMIWConversationType type,
        String targetId,
        String channelId,
        RCIMIWConversation conversation) {
      String eventName = "IRCIMIWListener:onConversationLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      if (conversation != null) {
        arguments.putMap(
            "conversation",
            Arguments.makeNativeMap(RCIMIWPlatformConverter.convertConversation(conversation)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConversationsLoaded(
        int code,
        List<RCIMIWConversationType> conversationTypes,
        String channelId,
        long startTime,
        int count,
        List<RCIMIWConversation> conversations) {
      String eventName = "IRCIMIWListener:onConversationsLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      WritableArray _conversationTypes = Arguments.createArray();
      for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
        _conversationTypes.pushInt(conversationTypes.get(i).ordinal());
      }
      arguments.putArray("conversationTypes", _conversationTypes);
      arguments.putString("channelId", channelId);
      arguments.putDouble("startTime", startTime);
      arguments.putDouble("count", count);
      WritableArray _conversations = Arguments.createArray();
      for (int i = 0; conversations != null && i < conversations.size(); i++) {
        RCIMIWConversation obj = conversations.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertConversation(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _conversations.pushMap(__map);
      }
      arguments.putArray("conversations", _conversations);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConversationRemoved(
        int code, RCIMIWConversationType type, String targetId, String channelId) {
      String eventName = "IRCIMIWListener:onConversationRemoved";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConversationsRemoved(
        int code, List<RCIMIWConversationType> conversationTypes, String channelId) {
      String eventName = "IRCIMIWListener:onConversationsRemoved";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      WritableArray _conversationTypes = Arguments.createArray();
      for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
        _conversationTypes.pushInt(conversationTypes.get(i).ordinal());
      }
      arguments.putArray("conversationTypes", _conversationTypes);
      arguments.putString("channelId", channelId);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onTotalUnreadCountLoaded(int code, String channelId, int count) {
      String eventName = "IRCIMIWListener:onTotalUnreadCountLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("channelId", channelId);
      arguments.putDouble("count", count);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUnreadCountLoaded(
        int code, RCIMIWConversationType type, String targetId, String channelId, int count) {
      String eventName = "IRCIMIWListener:onUnreadCountLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putDouble("count", count);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUnreadCountByConversationTypesLoaded(
        int code,
        List<RCIMIWConversationType> conversationTypes,
        String channelId,
        boolean contain,
        int count) {
      String eventName = "IRCIMIWListener:onUnreadCountByConversationTypesLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      WritableArray _conversationTypes = Arguments.createArray();
      for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
        _conversationTypes.pushInt(conversationTypes.get(i).ordinal());
      }
      arguments.putArray("conversationTypes", _conversationTypes);
      arguments.putString("channelId", channelId);
      arguments.putBoolean("contain", contain);
      arguments.putDouble("count", count);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUnreadMentionedCountLoaded(
        int code, RCIMIWConversationType type, String targetId, String channelId, int count) {
      String eventName = "IRCIMIWListener:onUnreadMentionedCountLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putDouble("count", count);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupAllUnreadCountLoaded(int code, int count) {
      String eventName = "IRCIMIWListener:onUltraGroupAllUnreadCountLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putDouble("count", count);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupAllUnreadMentionedCountLoaded(int code, int count) {
      String eventName = "IRCIMIWListener:onUltraGroupAllUnreadMentionedCountLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putDouble("count", count);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUnreadCountCleared(
        int code, RCIMIWConversationType type, String targetId, String channelId, long timestamp) {
      String eventName = "IRCIMIWListener:onUnreadCountCleared";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putDouble("timestamp", timestamp);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onDraftMessageSaved(
        int code, RCIMIWConversationType type, String targetId, String channelId, String draft) {
      String eventName = "IRCIMIWListener:onDraftMessageSaved";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putString("draft", draft);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onDraftMessageCleared(
        int code, RCIMIWConversationType type, String targetId, String channelId) {
      String eventName = "IRCIMIWListener:onDraftMessageCleared";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onDraftMessageLoaded(
        int code, RCIMIWConversationType type, String targetId, String channelId, String draft) {
      String eventName = "IRCIMIWListener:onDraftMessageLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putString("draft", draft);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onBlockedConversationsLoaded(
        int code,
        List<RCIMIWConversationType> conversationTypes,
        String channelId,
        List<RCIMIWConversation> conversations) {
      String eventName = "IRCIMIWListener:onBlockedConversationsLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      WritableArray _conversationTypes = Arguments.createArray();
      for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
        _conversationTypes.pushInt(conversationTypes.get(i).ordinal());
      }
      arguments.putArray("conversationTypes", _conversationTypes);
      arguments.putString("channelId", channelId);
      WritableArray _conversations = Arguments.createArray();
      for (int i = 0; conversations != null && i < conversations.size(); i++) {
        RCIMIWConversation obj = conversations.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertConversation(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _conversations.pushMap(__map);
      }
      arguments.putArray("conversations", _conversations);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConversationTopStatusChanged(
        int code, RCIMIWConversationType type, String targetId, String channelId, boolean top) {
      String eventName = "IRCIMIWListener:onConversationTopStatusChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putBoolean("top", top);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConversationTopStatusLoaded(
        int code, RCIMIWConversationType type, String targetId, String channelId, boolean top) {
      String eventName = "IRCIMIWListener:onConversationTopStatusLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putBoolean("top", top);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConversationReadStatusSynced(
        int code, RCIMIWConversationType type, String targetId, String channelId, long timestamp) {
      String eventName = "IRCIMIWListener:onConversationReadStatusSynced";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putDouble("timestamp", timestamp);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessageAttached(RCIMIWMessage message) {
      String eventName = "IRCIMIWListener:onMessageAttached";
      WritableMap arguments = Arguments.createMap();
      if (message != null) {
        arguments.putMap(
            "message", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessageSent(int code, RCIMIWMessage message) {
      String eventName = "IRCIMIWListener:onMessageSent";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      if (message != null) {
        arguments.putMap(
            "message", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMediaMessageAttached(RCIMIWMediaMessage message) {
      String eventName = "IRCIMIWListener:onMediaMessageAttached";
      WritableMap arguments = Arguments.createMap();
      if (message != null) {
        arguments.putMap(
            "message",
            Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMediaMessage(message)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMediaMessageSending(RCIMIWMediaMessage message, int progress) {
      String eventName = "IRCIMIWListener:onMediaMessageSending";
      WritableMap arguments = Arguments.createMap();
      if (message != null) {
        arguments.putMap(
            "message",
            Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMediaMessage(message)));
      }
      arguments.putDouble("progress", progress);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onSendingMediaMessageCanceled(int code, RCIMIWMediaMessage message) {
      String eventName = "IRCIMIWListener:onSendingMediaMessageCanceled";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      if (message != null) {
        arguments.putMap(
            "message",
            Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMediaMessage(message)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMediaMessageSent(int code, RCIMIWMediaMessage message) {
      String eventName = "IRCIMIWListener:onMediaMessageSent";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      if (message != null) {
        arguments.putMap(
            "message",
            Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMediaMessage(message)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMediaMessageDownloading(RCIMIWMediaMessage message, int progress) {
      String eventName = "IRCIMIWListener:onMediaMessageDownloading";
      WritableMap arguments = Arguments.createMap();
      if (message != null) {
        arguments.putMap(
            "message",
            Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMediaMessage(message)));
      }
      arguments.putDouble("progress", progress);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMediaMessageDownloaded(int code, RCIMIWMediaMessage message) {
      String eventName = "IRCIMIWListener:onMediaMessageDownloaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      if (message != null) {
        arguments.putMap(
            "message",
            Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMediaMessage(message)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onDownloadingMediaMessageCanceled(int code, RCIMIWMediaMessage message) {
      String eventName = "IRCIMIWListener:onDownloadingMediaMessageCanceled";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      if (message != null) {
        arguments.putMap(
            "message",
            Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMediaMessage(message)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessagesLoaded(
        int code,
        RCIMIWConversationType type,
        String targetId,
        String channelId,
        long sentTime,
        RCIMIWTimeOrder order,
        List<RCIMIWMessage> messages) {
      String eventName = "IRCIMIWListener:onMessagesLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putDouble("sentTime", sentTime);
      arguments.putInt("order", order.ordinal());
      WritableArray _messages = Arguments.createArray();
      for (int i = 0; messages != null && i < messages.size(); i++) {
        RCIMIWMessage obj = messages.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _messages.pushMap(__map);
      }
      arguments.putArray("messages", _messages);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUnreadMentionedMessagesLoaded(
        int code,
        RCIMIWConversationType type,
        String targetId,
        String channelId,
        List<RCIMIWMessage> messages) {
      String eventName = "IRCIMIWListener:onUnreadMentionedMessagesLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      WritableArray _messages = Arguments.createArray();
      for (int i = 0; messages != null && i < messages.size(); i++) {
        RCIMIWMessage obj = messages.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _messages.pushMap(__map);
      }
      arguments.putArray("messages", _messages);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onFirstUnreadMessageLoaded(
        int code,
        RCIMIWConversationType type,
        String targetId,
        String channelId,
        RCIMIWMessage message) {
      String eventName = "IRCIMIWListener:onFirstUnreadMessageLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      if (message != null) {
        arguments.putMap(
            "message", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessageInserted(int code, RCIMIWMessage message) {
      String eventName = "IRCIMIWListener:onMessageInserted";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      if (message != null) {
        arguments.putMap(
            "message", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessagesInserted(int code, List<RCIMIWMessage> messages) {
      String eventName = "IRCIMIWListener:onMessagesInserted";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      WritableArray _messages = Arguments.createArray();
      for (int i = 0; messages != null && i < messages.size(); i++) {
        RCIMIWMessage obj = messages.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _messages.pushMap(__map);
      }
      arguments.putArray("messages", _messages);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessagesCleared(
        int code, RCIMIWConversationType type, String targetId, String channelId, long timestamp) {
      String eventName = "IRCIMIWListener:onMessagesCleared";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putDouble("timestamp", timestamp);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onLocalMessagesDeleted(int code, List<RCIMIWMessage> messages) {
      String eventName = "IRCIMIWListener:onLocalMessagesDeleted";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      WritableArray _messages = Arguments.createArray();
      for (int i = 0; messages != null && i < messages.size(); i++) {
        RCIMIWMessage obj = messages.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _messages.pushMap(__map);
      }
      arguments.putArray("messages", _messages);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessagesDeleted(
        int code,
        RCIMIWConversationType type,
        String targetId,
        String channelId,
        List<RCIMIWMessage> messages) {
      String eventName = "IRCIMIWListener:onMessagesDeleted";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      WritableArray _messages = Arguments.createArray();
      for (int i = 0; messages != null && i < messages.size(); i++) {
        RCIMIWMessage obj = messages.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _messages.pushMap(__map);
      }
      arguments.putArray("messages", _messages);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessageRecalled(int code, RCIMIWMessage message) {
      String eventName = "IRCIMIWListener:onMessageRecalled";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      if (message != null) {
        arguments.putMap(
            "message", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onPrivateReadReceiptMessageSent(
        int code, String targetId, String channelId, long timestamp) {
      String eventName = "IRCIMIWListener:onPrivateReadReceiptMessageSent";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putDouble("timestamp", timestamp);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessageExpansionUpdated(
        int code, String messageUId, Map<String, String> expansion) {
      String eventName = "IRCIMIWListener:onMessageExpansionUpdated";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("messageUId", messageUId);
      if (expansion == null) expansion = new HashMap<>();
      WritableMap _expansion = Arguments.makeNativeMap((Map) expansion);
      arguments.putMap("expansion", _expansion);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessageExpansionForKeysRemoved(int code, String messageUId, List<String> keys) {
      String eventName = "IRCIMIWListener:onMessageExpansionForKeysRemoved";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("messageUId", messageUId);
      if (keys == null) keys = new ArrayList<>();
      WritableArray _keys = Arguments.makeNativeArray(keys);
      arguments.putArray("keys", _keys);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessageReceiveStatusChanged(int code, long messageId) {
      String eventName = "IRCIMIWListener:onMessageReceiveStatusChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putDouble("messageId", messageId);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessageSentStatusChanged(int code, long messageId) {
      String eventName = "IRCIMIWListener:onMessageSentStatusChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putDouble("messageId", messageId);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onChatRoomJoined(int code, String targetId) {
      String eventName = "IRCIMIWListener:onChatRoomJoined";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onChatRoomJoining(String targetId) {
      String eventName = "IRCIMIWListener:onChatRoomJoining";
      WritableMap arguments = Arguments.createMap();
      arguments.putString("targetId", targetId);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onChatRoomLeft(int code, String targetId) {
      String eventName = "IRCIMIWListener:onChatRoomLeft";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onChatRoomMessagesLoaded(
        int code, String targetId, List<RCIMIWMessage> messages, long syncTime) {
      String eventName = "IRCIMIWListener:onChatRoomMessagesLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      WritableArray _messages = Arguments.createArray();
      for (int i = 0; messages != null && i < messages.size(); i++) {
        RCIMIWMessage obj = messages.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _messages.pushMap(__map);
      }
      arguments.putArray("messages", _messages);
      arguments.putDouble("syncTime", syncTime);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onChatRoomEntryAdded(int code, String targetId, String key) {
      String eventName = "IRCIMIWListener:onChatRoomEntryAdded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      arguments.putString("key", key);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onChatRoomEntriesAdded(
        int code, String targetId, Map<String, String> entries, Map<String, Integer> errorEntries) {
      String eventName = "IRCIMIWListener:onChatRoomEntriesAdded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      if (entries == null) entries = new HashMap<>();
      WritableMap _entries = Arguments.makeNativeMap((Map) entries);
      arguments.putMap("entries", _entries);
      if (errorEntries == null) errorEntries = new HashMap<>();
      WritableMap _errorEntries = Arguments.makeNativeMap((Map) errorEntries);
      arguments.putMap("errorEntries", _errorEntries);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onChatRoomEntryLoaded(int code, String targetId, Map<String, String> entry) {
      String eventName = "IRCIMIWListener:onChatRoomEntryLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      if (entry == null) entry = new HashMap<>();
      WritableMap _entry = Arguments.makeNativeMap((Map) entry);
      arguments.putMap("entry", _entry);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onChatRoomAllEntriesLoaded(int code, String targetId, Map<String, String> entries) {
      String eventName = "IRCIMIWListener:onChatRoomAllEntriesLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      if (entries == null) entries = new HashMap<>();
      WritableMap _entries = Arguments.makeNativeMap((Map) entries);
      arguments.putMap("entries", _entries);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onChatRoomEntryRemoved(int code, String targetId, String key) {
      String eventName = "IRCIMIWListener:onChatRoomEntryRemoved";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      arguments.putString("key", key);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onChatRoomEntriesRemoved(int code, String targetId, List<String> keys) {
      String eventName = "IRCIMIWListener:onChatRoomEntriesRemoved";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      if (keys == null) keys = new ArrayList<>();
      WritableArray _keys = Arguments.makeNativeArray(keys);
      arguments.putArray("keys", _keys);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onBlacklistAdded(int code, String userId) {
      String eventName = "IRCIMIWListener:onBlacklistAdded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("userId", userId);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onBlacklistRemoved(int code, String userId) {
      String eventName = "IRCIMIWListener:onBlacklistRemoved";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("userId", userId);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onBlacklistStatusLoaded(int code, String userId, RCIMIWBlacklistStatus status) {
      String eventName = "IRCIMIWListener:onBlacklistStatusLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("userId", userId);
      arguments.putInt("status", status.ordinal());

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onBlacklistLoaded(int code, List<String> userIds) {
      String eventName = "IRCIMIWListener:onBlacklistLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      if (userIds == null) userIds = new ArrayList<>();
      WritableArray _userIds = Arguments.makeNativeArray(userIds);
      arguments.putArray("userIds", _userIds);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessagesSearched(
        int code,
        RCIMIWConversationType type,
        String targetId,
        String channelId,
        String keyword,
        long startTime,
        int count,
        List<RCIMIWMessage> messages) {
      String eventName = "IRCIMIWListener:onMessagesSearched";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putString("keyword", keyword);
      arguments.putDouble("startTime", startTime);
      arguments.putDouble("count", count);
      WritableArray _messages = Arguments.createArray();
      for (int i = 0; messages != null && i < messages.size(); i++) {
        RCIMIWMessage obj = messages.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _messages.pushMap(__map);
      }
      arguments.putArray("messages", _messages);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessagesSearchedByTimeRange(
        int code,
        RCIMIWConversationType type,
        String targetId,
        String channelId,
        String keyword,
        long startTime,
        long endTime,
        int offset,
        int count,
        List<RCIMIWMessage> messages) {
      String eventName = "IRCIMIWListener:onMessagesSearchedByTimeRange";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putString("keyword", keyword);
      arguments.putDouble("startTime", startTime);
      arguments.putDouble("endTime", endTime);
      arguments.putDouble("offset", offset);
      arguments.putDouble("count", count);
      WritableArray _messages = Arguments.createArray();
      for (int i = 0; messages != null && i < messages.size(); i++) {
        RCIMIWMessage obj = messages.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _messages.pushMap(__map);
      }
      arguments.putArray("messages", _messages);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessagesSearchedByUserId(
        int code,
        String userId,
        RCIMIWConversationType type,
        String targetId,
        String channelId,
        long startTime,
        int count,
        List<RCIMIWMessage> messages) {
      String eventName = "IRCIMIWListener:onMessagesSearchedByUserId";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("userId", userId);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putDouble("startTime", startTime);
      arguments.putDouble("count", count);
      WritableArray _messages = Arguments.createArray();
      for (int i = 0; messages != null && i < messages.size(); i++) {
        RCIMIWMessage obj = messages.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _messages.pushMap(__map);
      }
      arguments.putArray("messages", _messages);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConversationsSearched(
        int code,
        List<RCIMIWConversationType> conversationTypes,
        String channelId,
        List<RCIMIWMessageType> messageTypes,
        String keyword,
        List<RCIMIWSearchConversationResult> conversations) {
      String eventName = "IRCIMIWListener:onConversationsSearched";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      WritableArray _conversationTypes = Arguments.createArray();
      for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
        _conversationTypes.pushInt(conversationTypes.get(i).ordinal());
      }
      arguments.putArray("conversationTypes", _conversationTypes);
      arguments.putString("channelId", channelId);
      WritableArray _messageTypes = Arguments.createArray();
      for (int i = 0; messageTypes != null && i < messageTypes.size(); i++) {
        _messageTypes.pushInt(messageTypes.get(i).ordinal());
      }
      arguments.putArray("messageTypes", _messageTypes);
      arguments.putString("keyword", keyword);
      WritableArray _conversations = Arguments.createArray();
      for (int i = 0; conversations != null && i < conversations.size(); i++) {
        RCIMIWSearchConversationResult obj = conversations.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertSearchConversationResult(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _conversations.pushMap(__map);
      }
      arguments.putArray("conversations", _conversations);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onGroupReadReceiptRequestSent(int code, RCIMIWMessage message) {
      String eventName = "IRCIMIWListener:onGroupReadReceiptRequestSent";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      if (message != null) {
        arguments.putMap(
            "message", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onGroupReadReceiptResponseSent(
        int code, String targetId, String channelId, List<RCIMIWMessage> messages) {
      String eventName = "IRCIMIWListener:onGroupReadReceiptResponseSent";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      WritableArray _messages = Arguments.createArray();
      for (int i = 0; messages != null && i < messages.size(); i++) {
        RCIMIWMessage obj = messages.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _messages.pushMap(__map);
      }
      arguments.putArray("messages", _messages);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onNotificationQuietHoursChanged(
        int code, String startTime, int spanMinutes, RCIMIWPushNotificationQuietHoursLevel level) {
      String eventName = "IRCIMIWListener:onNotificationQuietHoursChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("startTime", startTime);
      arguments.putDouble("spanMinutes", spanMinutes);
      arguments.putInt("level", level.ordinal());

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onNotificationQuietHoursRemoved(int code) {
      String eventName = "IRCIMIWListener:onNotificationQuietHoursRemoved";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onNotificationQuietHoursLoaded(
        int code, String startTime, int spanMinutes, RCIMIWPushNotificationQuietHoursLevel level) {
      String eventName = "IRCIMIWListener:onNotificationQuietHoursLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("startTime", startTime);
      arguments.putDouble("spanMinutes", spanMinutes);
      arguments.putInt("level", level.ordinal());

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConversationNotificationLevelChanged(
        int code,
        RCIMIWConversationType type,
        String targetId,
        String channelId,
        RCIMIWPushNotificationLevel level) {
      String eventName = "IRCIMIWListener:onConversationNotificationLevelChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putInt("level", level.ordinal());

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConversationNotificationLevelLoaded(
        int code,
        RCIMIWConversationType type,
        String targetId,
        String channelId,
        RCIMIWPushNotificationLevel level) {
      String eventName = "IRCIMIWListener:onConversationNotificationLevelLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putInt("level", level.ordinal());

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConversationTypeNotificationLevelChanged(
        int code, RCIMIWConversationType type, RCIMIWPushNotificationLevel level) {
      String eventName = "IRCIMIWListener:onConversationTypeNotificationLevelChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putInt("level", level.ordinal());

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConversationTypeNotificationLevelLoaded(
        int code, RCIMIWConversationType type, RCIMIWPushNotificationLevel level) {
      String eventName = "IRCIMIWListener:onConversationTypeNotificationLevelLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putInt("level", level.ordinal());

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupDefaultNotificationLevelChanged(
        int code, String targetId, RCIMIWPushNotificationLevel level) {
      String eventName = "IRCIMIWListener:onUltraGroupDefaultNotificationLevelChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      arguments.putInt("level", level.ordinal());

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupDefaultNotificationLevelLoaded(
        int code, String targetId, RCIMIWPushNotificationLevel level) {
      String eventName = "IRCIMIWListener:onUltraGroupDefaultNotificationLevelLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      arguments.putInt("level", level.ordinal());

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupChannelDefaultNotificationLevelChanged(
        int code, String targetId, String channelId, RCIMIWPushNotificationLevel level) {
      String eventName = "IRCIMIWListener:onUltraGroupChannelDefaultNotificationLevelChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putInt("level", level.ordinal());

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupChannelDefaultNotificationLevelLoaded(
        int code, String targetId, String channelId, RCIMIWPushNotificationLevel level) {
      String eventName = "IRCIMIWListener:onUltraGroupChannelDefaultNotificationLevelLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putInt("level", level.ordinal());

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onPushContentShowStatusChanged(int code, boolean showContent) {
      String eventName = "IRCIMIWListener:onPushContentShowStatusChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putBoolean("showContent", showContent);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onPushLanguageChanged(int code, String language) {
      String eventName = "IRCIMIWListener:onPushLanguageChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("language", language);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onPushReceiveStatusChanged(int code, boolean receive) {
      String eventName = "IRCIMIWListener:onPushReceiveStatusChanged";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putBoolean("receive", receive);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onMessageCountLoaded(
        int code, RCIMIWConversationType type, String targetId, String channelId, int count) {
      String eventName = "IRCIMIWListener:onMessageCountLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putDouble("count", count);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onTopConversationsLoaded(
        int code,
        List<RCIMIWConversationType> conversationTypes,
        String channelId,
        List<RCIMIWConversation> conversations) {
      String eventName = "IRCIMIWListener:onTopConversationsLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      WritableArray _conversationTypes = Arguments.createArray();
      for (int i = 0; conversationTypes != null && i < conversationTypes.size(); i++) {
        _conversationTypes.pushInt(conversationTypes.get(i).ordinal());
      }
      arguments.putArray("conversationTypes", _conversationTypes);
      arguments.putString("channelId", channelId);
      WritableArray _conversations = Arguments.createArray();
      for (int i = 0; conversations != null && i < conversations.size(); i++) {
        RCIMIWConversation obj = conversations.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertConversation(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _conversations.pushMap(__map);
      }
      arguments.putArray("conversations", _conversations);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onGroupMessageToDesignatedUsersAttached(RCIMIWMessage message) {
      String eventName = "IRCIMIWListener:onGroupMessageToDesignatedUsersAttached";
      WritableMap arguments = Arguments.createMap();
      if (message != null) {
        arguments.putMap(
            "message", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onGroupMessageToDesignatedUsersSent(int code, RCIMIWMessage message) {
      String eventName = "IRCIMIWListener:onGroupMessageToDesignatedUsersSent";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      if (message != null) {
        arguments.putMap(
            "message", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
      }

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupReadStatusSynced(
        int code, String targetId, String channelId, long timestamp) {
      String eventName = "IRCIMIWListener:onUltraGroupReadStatusSynced";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putDouble("timestamp", timestamp);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onConversationsLoadedForAllChannel(
        int code,
        RCIMIWConversationType type,
        String targetId,
        List<RCIMIWConversation> conversations) {
      String eventName = "IRCIMIWListener:onConversationsLoadedForAllChannel";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putInt("type", type.ordinal());
      arguments.putString("targetId", targetId);
      WritableArray _conversations = Arguments.createArray();
      for (int i = 0; conversations != null && i < conversations.size(); i++) {
        RCIMIWConversation obj = conversations.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertConversation(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _conversations.pushMap(__map);
      }
      arguments.putArray("conversations", _conversations);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupUnreadMentionedCountLoaded(int code, String targetId, int count) {
      String eventName = "IRCIMIWListener:onUltraGroupUnreadMentionedCountLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      arguments.putDouble("count", count);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupUnreadCountLoaded(int code, String targetId, int count) {
      String eventName = "IRCIMIWListener:onUltraGroupUnreadCountLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      arguments.putDouble("count", count);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupMessageModified(int code, String messageUId) {
      String eventName = "IRCIMIWListener:onUltraGroupMessageModified";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("messageUId", messageUId);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupMessageRecalled(int code, RCIMIWMessage message, boolean deleteRemote) {
      String eventName = "IRCIMIWListener:onUltraGroupMessageRecalled";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      if (message != null) {
        arguments.putMap(
            "message", Arguments.makeNativeMap(RCIMIWPlatformConverter.convertMessage(message)));
      }
      arguments.putBoolean("deleteRemote", deleteRemote);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupMessagesCleared(
        int code,
        String targetId,
        String channelId,
        long timestamp,
        RCIMIWMessageOperationPolicy policy) {
      String eventName = "IRCIMIWListener:onUltraGroupMessagesCleared";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putDouble("timestamp", timestamp);
      arguments.putInt("policy", policy.ordinal());

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupMessagesClearedForAllChannel(
        int code, String targetId, long timestamp) {
      String eventName = "IRCIMIWListener:onUltraGroupMessagesClearedForAllChannel";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      arguments.putDouble("timestamp", timestamp);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupTypingStatusSent(
        int code, String targetId, String channelId, RCIMIWUltraGroupTypingStatus typingStatus) {
      String eventName = "IRCIMIWListener:onUltraGroupTypingStatusSent";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("targetId", targetId);
      arguments.putString("channelId", channelId);
      arguments.putInt("typingStatus", typingStatus.ordinal());

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onBatchRemoteUltraGroupMessagesLoaded(
        int code, List<RCIMIWMessage> matchedMessages, List<RCIMIWMessage> notMatchedMessages) {
      String eventName = "IRCIMIWListener:onBatchRemoteUltraGroupMessagesLoaded";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      WritableArray _matchedMessages = Arguments.createArray();
      for (int i = 0; matchedMessages != null && i < matchedMessages.size(); i++) {
        RCIMIWMessage obj = matchedMessages.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _matchedMessages.pushMap(__map);
      }
      arguments.putArray("matchedMessages", _matchedMessages);
      WritableArray _notMatchedMessages = Arguments.createArray();
      for (int i = 0; notMatchedMessages != null && i < notMatchedMessages.size(); i++) {
        RCIMIWMessage obj = notMatchedMessages.get(i);
        if (obj == null) continue;
        Map<String, Object> _map = RCIMIWPlatformConverter.convertMessage(obj);
        if (_map == null) _map = new HashMap<>();
        ReadableMap __map = Arguments.makeNativeMap(_map);
        _notMatchedMessages.pushMap(__map);
      }
      arguments.putArray("notMatchedMessages", _notMatchedMessages);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupMessageExpansionUpdated(
        int code, Map<String, String> expansion, String messageUId) {
      String eventName = "IRCIMIWListener:onUltraGroupMessageExpansionUpdated";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      if (expansion == null) expansion = new HashMap<>();
      WritableMap _expansion = Arguments.makeNativeMap((Map) expansion);
      arguments.putMap("expansion", _expansion);
      arguments.putString("messageUId", messageUId);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }

    @Override
    public void onUltraGroupMessageExpansionForKeysRemoved(
        int code, String messageUId, List<String> keys) {
      String eventName = "IRCIMIWListener:onUltraGroupMessageExpansionForKeysRemoved";
      WritableMap arguments = Arguments.createMap();
      arguments.putDouble("code", code);
      arguments.putString("messageUId", messageUId);
      if (keys == null) keys = new ArrayList<>();
      WritableArray _keys = Arguments.makeNativeArray(keys);
      arguments.putArray("keys", _keys);

      context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, arguments);
    }
  }
}
