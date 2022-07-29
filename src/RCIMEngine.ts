import {
    DeviceEventEmitter,
    NativeEventEmitter,
    NativeModules,
    Platform,
} from 'react-native';

const {RCReactNativeIM} = NativeModules;

const RCReactNativeEventEmitter = Platform.OS === 'ios' ? new NativeEventEmitter(RCReactNativeIM) : DeviceEventEmitter;

import {RCIMIWEngineOptions} from './RCIMDefines';

import {logger} from './Logger';

import {
    RCIMIWBlacklistStatus,
    RCIMIWBlockedMessageInfo,
    RCIMIWChatRoomEntriesOperationType,
    RCIMIWChatRoomMemberAction,
    RCIMIWChatRoomStatus,
    RCIMIWConnectionStatus,
    RCIMIWConversation,
    RCIMIWConversationType,
    RCIMIWCustomMessage,
    RCIMIWCustomMessagePolicy,
    RCIMIWFileMessage,
    RCIMIWGIFMessage,
    RCIMIWImageMessage,
    RCIMIWLogLevel,
    RCIMIWMediaMessage,
    RCIMIWMessage,
    RCIMIWMessageOperationPolicy,
    RCIMIWMessageType,
    RCIMIWPushNotificationLevel,
    RCIMIWPushNotificationQuietHoursLevel,
    RCIMIWReceivedStatus,
    RCIMIWReferenceMessage,
    RCIMIWSearchConversationResult,
    RCIMIWSentStatus,
    RCIMIWSightMessage,
    RCIMIWTextMessage,
    RCIMIWTimeOrder,
    RCIMIWTypingStatus,
    RCIMIWUltraGroupTypingStatus,
    RCIMIWUltraGroupTypingStatusInfo,
    RCIMIWVoiceMessage
} from './RCIMDefines';

export class RCIMIWEngine {
    static _instance: RCIMIWEngine;

    /**
     * 创建接口引擎
     *
     * @param context 上下文
     * @param appKey  开发者后台获取的 AppKey
     * @param options 引擎配置项
     * @return 引擎实例
     */
    static create(appKey: string, options: RCIMIWEngineOptions = {}): RCIMIWEngine {
        logger.logObject('create', {appKey, options})
        if (!RCIMIWEngine._instance) {
            RCReactNativeIM.create(appKey, options)
            RCIMIWEngine._instance = new RCIMIWEngine()
        }
        return RCIMIWEngine._instance
    }

    /**
     * 销毁引擎
     * 引擎销毁后如果当前未退出登录，SDK 会自动退出，且仍接受 push
     */
    destroy(): Promise<number> {
        logger.logObject('destroy', {})
        return RCReactNativeIM.destroy();
    }

    /**
     * 根据消息 id 获取消息体（本地数据库索引唯一值）。
     *
     * @param messageId 消息的 messageId，可在消息对象中获取
     */
    getMessageById(messageId: number): Promise<RCIMIWMessage> {
        logger.logObject('getMessageById', {messageId})
        return RCReactNativeIM.getMessageById(messageId);
    }

    /**
     * 通过全局唯一 id 获取消息实体。
     *
     * @param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值。
     */
    getMessageByUId(messageUId: string): Promise<RCIMIWMessage> {
        logger.logObject('getMessageByUId', {messageUId})
        return RCReactNativeIM.getMessageByUId(messageUId);
    }

    setDeviceToken(deviceToken: string): Promise<number> {
        logger.logObject('setDeviceToken', {deviceToken})
        if (Platform.OS === "ios") {
            return RCReactNativeIM.setDeviceToken(deviceToken);
        }
        else {
            return new Promise<number>((resolve, reject) => {resolve(0)})
        }
    }

    /**
     *连接融云服务器，在整个应用程序全局，只需要调用一次。调用此接口返回非业务错误码时，SDK
     *会启动重连机制进行重连；如果仍没有连接成功，会在设备网络状态变化时再次进行重连。
     *@param token   调用 server api 获取到的 token
     *@param timeout 连接超时时间，单位：秒。
     *timeLimit <= 0，则 IM 将一直连接，直到连接成功或者无法连接（如 token 非法）
     *timeLimit > 0，则 IM 将最多连接 timeLimit 秒
     *如果在 timeLimit 秒内连接成功，后面再发生了网络变化或前后台切换，SDK 会自动重连； 如果在 timeLimit 秒无法连接成功则不再进行重连，通过 listener
     *告知连接超时，您需要再自行调用 connect 接口
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener 接口回调可以监听 {@link setOnConnectedListener}
     */
    connect(token: string, timeout: number): Promise<number> {
        logger.logObject('connect', {token, timeout})
        return RCReactNativeIM.connect(token, timeout);
    }

    /**
     *断开链接
     *注：因为 SDK 在前后台切换或者网络出现异常都会自动重连，保证连接可靠性。 所以除非您的 App 逻辑需要登出，否则一般不需要调用此方法进行手动断开
     *@param receivePush 退出后是否接收 push，true:断开后接收远程推送，false:断开后不再接收远程推送
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     */
    disconnect(receivePush: boolean): Promise<number> {
        logger.logObject('disconnect', {receivePush})
        return RCReactNativeIM.disconnect(receivePush);
    }

    /**
     *构建文本消息
     *@param type      会话类型，
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param text      文本内容
     *@return 文本消息实体
     */
    createTextMessage(type: RCIMIWConversationType, targetId: string, channelId: string, text: string): Promise<RCIMIWTextMessage> {
        logger.logObject('createTextMessage', {type, targetId, channelId, text})
        return RCReactNativeIM.createTextMessage(type, targetId, channelId, text);
    }

    /**
     *构建图片消息
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param path      图片消息的本地路径
     *@return 图片消息实体
     */
    createImageMessage(type: RCIMIWConversationType, targetId: string, channelId: string, path: string): Promise<RCIMIWImageMessage> {
        logger.logObject('createImageMessage', {type, targetId, channelId, path})
        return RCReactNativeIM.createImageMessage(type, targetId, channelId, path);
    }

    /**
     *构建文件消息
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param path      文件消息的本地路径
     *@return 文件消息实体
     */
    createFileMessage(type: RCIMIWConversationType, targetId: string, channelId: string, path: string): Promise<RCIMIWFileMessage> {
        logger.logObject('createFileMessage', {type, targetId, channelId, path})
        return RCReactNativeIM.createFileMessage(type, targetId, channelId, path);
    }

    /**
     *构建小视频消息
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param path      小视频消息的本地路径
     *@param duration  小视频消息的视频时长
     *@return 视频消息实体
     */
    createSightMessage(type: RCIMIWConversationType, targetId: string, channelId: string, path: string,
                       duration: number): Promise<RCIMIWSightMessage> {
        logger.logObject('createSightMessage', {type, targetId, channelId, path, duration})
        return RCReactNativeIM.createSightMessage(type, targetId, channelId, path, duration);
    }

    /**
     *构建语音消息 (高清语音)
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param path      语音消息的本地路径
     *@param duration  语音消息的消息时长
     *@return 语音消息的实体
     */
    createVoiceMessage(type: RCIMIWConversationType, targetId: string, channelId: string, path: string,
                       duration: number): Promise<RCIMIWVoiceMessage> {
        logger.logObject('createVoiceMessage', {type, targetId, channelId, path, duration})
        return RCReactNativeIM.createVoiceMessage(type, targetId, channelId, path, duration);
    }

    /**
     *构建引用消息
     *@param type             会话类型
     *@param targetId         会话 ID
     *@param channelId        频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param referenceMessage 引用的消息
     *@param text             引用的文本内容
     *@return 引用消息实体
     */
    createReferenceMessage(type: RCIMIWConversationType, targetId: string, channelId: string, referenceMessage: RCIMIWMessage,
                           text: string): Promise<RCIMIWReferenceMessage> {
        logger.logObject('createReferenceMessage', {type, targetId, channelId, referenceMessage, text})
        return RCReactNativeIM.createReferenceMessage(type, targetId, channelId, referenceMessage, text);
    }

    /**
     *构建 GIF 消息
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param path      GIF 消息的本地路径
     *@return GIF 消息实体
     */
    createGIFMessage(type: RCIMIWConversationType, targetId: string, channelId: string, path: string): Promise<RCIMIWGIFMessage> {
        logger.logObject('createGIFMessage', {type, targetId, channelId, path})
        return RCReactNativeIM.createGIFMessage(type, targetId, channelId, path);
    }

    /**
     *构建自定义消息
     *@param type              会话类型
     *@param targetId          会话 ID
     *@param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param policy            消息的存储策略
     *@param messageIdentifier 消息的标识符，需唯一
     *@param fields            消息的内容键值对
     *@return 自定义消息实体
     */
    createCustomMessage(type: RCIMIWConversationType, targetId: string, channelId: string, policy: RCIMIWCustomMessagePolicy,
                        messageIdentifier: string, fields: Map<string, string>): Promise<RCIMIWCustomMessage> {
        let _fields: any = Object.fromEntries(fields)
        logger.logObject('createCustomMessage', {type, targetId, channelId, policy, messageIdentifier, fields})
        return RCReactNativeIM.createCustomMessage(type, targetId, channelId, policy, messageIdentifier, _fields);
    }

    /**
     *发送普通消息
     *@param message 发送的消息实体
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener 接口回调可以监听 {@link setOnMessageAttachedListener},{@link setOnMessageSentListener}
     */
    sendMessage(message: RCIMIWMessage): Promise<number> {
        logger.logObject('sendMessage', {message})
        return RCReactNativeIM.sendMessage(message);
    }

    /**
     *发送媒体消息
     *@param message 发送的媒体消息实体
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener 接口回调可以监听 {@link setOnMediaMessageSendingListener},{@link setOnMediaMessageAttachedListener},{@link
     *setOnMediaMessageAttachedListener},{@link setOnMediaMessageSentListener}
     */
    sendMediaMessage(message: RCIMIWMediaMessage): Promise<number> {
        logger.logObject('sendMediaMessage', {message})
        return RCReactNativeIM.sendMediaMessage(message);
    }

    /**
     *取消发送媒体消息
     *@param message 需要取消发送的媒体消息实体
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener 接口回调可以监听 {@link setOnSendingMediaMessageCanceledListener}
     */
    cancelSendingMediaMessage(message: RCIMIWMediaMessage): Promise<number> {
        logger.logObject('cancelSendingMediaMessage', {message})
        return RCReactNativeIM.cancelSendingMediaMessage(message);
    }

    /**
     *下载媒体消息
     *@param message 需要下载的媒体消息实体
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnMediaMessageDownloadedListener}, {@link setOnMediaMessageDownloadingListener}
     */
    downloadMediaMessage(message: RCIMIWMediaMessage): Promise<number> {
        logger.logObject('downloadMediaMessage', {message})
        return RCReactNativeIM.downloadMediaMessage(message);
    }

    /**
     *取消下载媒体消息
     *@param message 需要取消下载的媒体消息实体
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnDownloadingMediaMessageCanceledListener}
     */
    cancelDownloadingMediaMessage(message: RCIMIWMediaMessage): Promise<number> {
        logger.logObject('cancelDownloadingMediaMessage', {message})
        return RCReactNativeIM.cancelDownloadingMediaMessage(message);
    }

    /**
     *加载某个会话
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnConversationLoadedListener}
     */
    loadConversation(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number> {
        logger.logObject('loadConversation', {type, targetId, channelId})
        return RCReactNativeIM.loadConversation(type, targetId, channelId);
    }

    /**
     *加载某些会话
     *@param types     会话类型
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param startTime 时间戳（毫秒），获取小于此时间戳的会话，传 0 为查询最新数据
     *@param count     查询的数量， 0 < count <= 50
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnConversationsLoadedListener}
     */
    loadConversations(types: Array<RCIMIWConversationType>, channelId: string, startTime: number, count: number): Promise<number> {
        types = types.filter(v => (v != null && v != undefined))
        logger.logObject('loadConversations', {types, channelId, startTime, count})
        return RCReactNativeIM.loadConversations(types, channelId, startTime, count);
    }

    /**
     *移除某个会话
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnConversationRemovedListener}
     */
    removeConversation(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number> {
        logger.logObject('removeConversation', {type, targetId, channelId})
        return RCReactNativeIM.removeConversation(type, targetId, channelId);
    }

    /**
     *根据会话类型移除会话
     *@param conversationTypes 会话类型集合
     *@param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnConversationsRemovedListener}
     */
    removeConversations(conversationTypes: Array<RCIMIWConversationType>, channelId: string): Promise<number> {
        conversationTypes = conversationTypes.filter(v => (v != null && v != undefined))
        logger.logObject('removeConversations', {conversationTypes, channelId})
        return RCReactNativeIM.removeConversations(conversationTypes, channelId);
    }

    /**
     *加载某个会话的未读数
     *注：不支持聊天室！
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUnreadCountLoadedListener}
     */
    loadUnreadCount(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number> {
        logger.logObject('loadUnreadCount', {type, targetId, channelId})
        return RCReactNativeIM.loadUnreadCount(type, targetId, channelId);
    }

    /**
     *加载所有未读数
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnTotalUnreadCountLoadedListener}
     */
    loadTotalUnreadCount(channelId: string): Promise<number> {
        logger.logObject('loadTotalUnreadCount', {channelId})
        return RCReactNativeIM.loadTotalUnreadCount(channelId);
    }

    /**
     *获取会话中未读的 @ 消息。
     *注：不支持聊天室！
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUnreadMentionedCountLoadedListener}
     */
    loadUnreadMentionedCount(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number> {
        logger.logObject('loadUnreadMentionedCount', {type, targetId, channelId})
        return RCReactNativeIM.loadUnreadMentionedCount(type, targetId, channelId);
    }

    /**
     *获取当前用户加入的所有超级群会话的未读消息数的总和。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupAllUnreadCountLoadedListener}
     */
    loadUltraGroupAllUnreadCount(): Promise<number> {
        logger.logObject('loadUltraGroupAllUnreadCount', {})
        return RCReactNativeIM.loadUltraGroupAllUnreadCount();
    }

    /**
     *获取当前用户加入的所有超级群会话中的未读 @ 消息数的总和。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupAllUnreadMentionedCountLoadedListener}
     */
    loadUltraGroupAllUnreadMentionedCount(): Promise<number> {
        logger.logObject('loadUltraGroupAllUnreadMentionedCount', {})
        return RCReactNativeIM.loadUltraGroupAllUnreadMentionedCount();
    }

    /**
     *获取指定会话的未读消息数
     *@param targetId 会话 ID
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupUnreadCountLoadedListener}
     */
    loadUltraGroupUnreadCount(targetId: string): Promise<number> {
        logger.logObject('loadUltraGroupUnreadCount', {targetId})
        return RCReactNativeIM.loadUltraGroupUnreadCount(targetId);
    }

    /**
     *获取超级群会话中被 @ 的消息数
     *@param targetId 会话 ID
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupUnreadMentionedCountLoadedListener}
     */
    loadUltraGroupUnreadMentionedCount(targetId: string): Promise<number> {
        logger.logObject('loadUltraGroupUnreadMentionedCount', {targetId})
        return RCReactNativeIM.loadUltraGroupUnreadMentionedCount(targetId);
    }

    /**
     *根据会话类型加载未读数
     *注：不支持聊天室！
     *@param conversationTypes 会话类型集合
     *@param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param contain           是否包含免打扰消息的未读消息数。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUnreadCountByConversationTypesLoadedListener}
     */
    loadUnreadCountByConversationTypes(conversationTypes: Array<RCIMIWConversationType>, channelId: string, contain: boolean): Promise<number> {
        conversationTypes = conversationTypes.filter(v => (v != null && v != undefined))
        logger.logObject('loadUnreadCountByConversationTypes', {conversationTypes, channelId, contain})
        return RCReactNativeIM.loadUnreadCountByConversationTypes(conversationTypes, channelId, contain);
    }

    /**
     *清除某个会话中的未读消息数。
     *注：不支持聊天室！
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param timestamp 该会话已阅读的最后一条消息的发送时间戳
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUnreadCountClearedListener}
     */
    clearUnreadCount(type: RCIMIWConversationType, targetId: string, channelId: string, timestamp: number): Promise<number> {
        logger.logObject('clearUnreadCount', {type, targetId, channelId, timestamp})
        return RCReactNativeIM.clearUnreadCount(type, targetId, channelId, timestamp);
    }

    /**
     *保存会话草稿信息。
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param draft     草稿的文字内容。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnDraftMessageSavedListener}
     */
    saveDraftMessage(type: RCIMIWConversationType, targetId: string, channelId: string, draft: string): Promise<number> {
        logger.logObject('saveDraftMessage', {type, targetId, channelId, draft})
        return RCReactNativeIM.saveDraftMessage(type, targetId, channelId, draft);
    }

    /**
     *获取会话中的草稿信息。
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnDraftMessageLoadedListener}
     */
    loadDraftMessage(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number> {
        logger.logObject('loadDraftMessage', {type, targetId, channelId})
        return RCReactNativeIM.loadDraftMessage(type, targetId, channelId);
    }

    /**
     *删除指定会话中的草稿信息。
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnDraftMessageClearedListener}
     */
    clearDraftMessage(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number> {
        logger.logObject('clearDraftMessage', {type, targetId, channelId})
        return RCReactNativeIM.clearDraftMessage(type, targetId, channelId);
    }

    /**
     *获取免打扰的会话列表。
     *@param conversationTypes 会话类型集合
     *@param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnBlockedConversationsLoadedListener}
     */
    loadBlockedConversations(conversationTypes: Array<RCIMIWConversationType>, channelId: string): Promise<number> {
        conversationTypes = conversationTypes.filter(v => (v != null && v != undefined))
        logger.logObject('loadBlockedConversations', {conversationTypes, channelId})
        return RCReactNativeIM.loadBlockedConversations(conversationTypes, channelId);
    }

    /**
     *设置会话的置顶状态。若会话不存在，调用此方法 SDK 自动创建会话并置顶。
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param top       是否置顶
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnConversationTopStatusChangedListener}
     */
    changeConversationTopStatus(type: RCIMIWConversationType, targetId: string, channelId: string, top: boolean): Promise<number> {
        logger.logObject('changeConversationTopStatus', {type, targetId, channelId, top})
        return RCReactNativeIM.changeConversationTopStatus(type, targetId, channelId, top);
    }

    /**
     *获取会话的置顶状态
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnConversationTopStatusLoadedListener}
     */
    loadConversationTopStatus(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number> {
        logger.logObject('loadConversationTopStatus', {type, targetId, channelId})
        return RCReactNativeIM.loadConversationTopStatus(type, targetId, channelId);
    }

    /**
     *同步会话阅读状态。
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param timestamp 会话中已读的最后一条消息的发送时间戳
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnConversationReadStatusSyncedListener}
     */
    syncConversationReadStatus(type: RCIMIWConversationType, targetId: string, channelId: string, timestamp: number): Promise<number> {
        logger.logObject('syncConversationReadStatus', {type, targetId, channelId, timestamp})
        return RCReactNativeIM.syncConversationReadStatus(type, targetId, channelId, timestamp);
    }

    /**
     *向会话中发送正在输入的状态，目前只支持单聊。
     *@param type        会话类型
     *@param targetId    会话 ID
     *@param channelId   频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param currentType 当前的状态
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     */
    sendTypingStatus(type: RCIMIWConversationType, targetId: string, channelId: string, currentType: string): Promise<number> {
        logger.logObject('sendTypingStatus', {type, targetId, channelId, currentType})
        return RCReactNativeIM.sendTypingStatus(type, targetId, channelId, currentType);
    }

    /**
     *加载历史消息
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param sentTime  当前消息时间戳
     *@param order     获取消息的方向。BEFORE：获取 sentTime 之前的消息 （时间递减），AFTER：获取 sentTime 之后的消息 （时间递增）
     *@param policy    消息的加载策略。LOCAL：只加载本地，REMOTE：只加载远端，LOCAL_REMOTE：本地远端都加载
     *@param count     获取的消息数量，0 < count <= 20
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnMessagesLoadedListener}
     */
    loadMessages(type: RCIMIWConversationType, targetId: string, channelId: string, sentTime: number, order: RCIMIWTimeOrder,
                 policy: RCIMIWMessageOperationPolicy, count: number): Promise<number> {
        logger.logObject('loadMessages', {type, targetId, channelId, sentTime, order, policy, count})
        return RCReactNativeIM.loadMessages(type, targetId, channelId, sentTime, order, policy, count);
    }

    /**
     *获取第一条未读消息。
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnFirstUnreadMessageLoadedListener}
     */
    loadFirstUnreadMessage(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number> {
        logger.logObject('loadFirstUnreadMessage', {type, targetId, channelId})
        return RCReactNativeIM.loadFirstUnreadMessage(type, targetId, channelId);
    }

    /**
     *获取会话中未读的 @ 消息。
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUnreadMentionedMessagesLoadedListener}
     */
    loadUnreadMentionedMessages(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number> {
        logger.logObject('loadUnreadMentionedMessages', {type, targetId, channelId})
        return RCReactNativeIM.loadUnreadMentionedMessages(type, targetId, channelId);
    }

    /**
     *插入一条消息
     *@param message 插入的消息
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnMessageInsertedListener}
     */
    insertMessage(message: RCIMIWMessage): Promise<number> {
        logger.logObject('insertMessage', {message})
        return RCReactNativeIM.insertMessage(message);
    }

    /**
     *插入多条消息
     *@param messages 插入的消息集合
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnMessagesInsertedListener}
     */
    insertMessages(messages: Array<RCIMIWMessage>): Promise<number> {
        messages = messages.filter(v => (v != null && v != undefined))
        logger.logObject('insertMessages', {messages})
        return RCReactNativeIM.insertMessages(messages);
    }

    /**
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param timestamp 清除消息截止时间戳，0 <= recordTime <= 当前会话最后一条消息的 sentTime, 0 清除所有消息，其他值清除小于等于 recordTime 的消息
     *@param policy    清除的策略
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnMessageClearedListener}
     */
    clearMessages(type: RCIMIWConversationType, targetId: string, channelId: string, timestamp: number,
                  policy: RCIMIWMessageOperationPolicy): Promise<number> {
        logger.logObject('clearMessages', {type, targetId, channelId, timestamp, policy})
        return RCReactNativeIM.clearMessages(type, targetId, channelId, timestamp, policy);
    }

    /**
     *@param messages 消息集合
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnLocalMessagesDeletedListener}
     */
    deleteLocalMessages(messages: Array<RCIMIWMessage>): Promise<number> {
        messages = messages.filter(v => (v != null && v != undefined))
        logger.logObject('deleteLocalMessages', {messages})
        return RCReactNativeIM.deleteLocalMessages(messages);
    }

    /**
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param messages  消息集合
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnMessagesDeletedListener}
     */
    deleteMessages(type: RCIMIWConversationType, targetId: string, channelId: string, messages: Array<RCIMIWMessage>): Promise<number> {
        messages = messages.filter(v => (v != null && v != undefined))
        logger.logObject('deleteMessages', {type, targetId, channelId, messages})
        return RCReactNativeIM.deleteMessages(type, targetId, channelId, messages);
    }

    /**
     *@param message 需要被撤回的消息
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnMessageRecalledListener}
     */
    recallMessage(message: RCIMIWMessage): Promise<number> {
        logger.logObject('recallMessage', {message})
        return RCReactNativeIM.recallMessage(message);
    }

    /**
     *发送某个会话中的消息阅读回执
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param timestamp 该会话中已读的最后一条消息的发送时间戳
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnPrivateReadReceiptMessageSentListener}
     */
    sendPrivateReadReceiptMessage(targetId: string, channelId: string, timestamp: number): Promise<number> {
        logger.logObject('sendPrivateReadReceiptMessage', {targetId, channelId, timestamp})
        return RCReactNativeIM.sendPrivateReadReceiptMessage(targetId, channelId, timestamp);
    }

    /**
     *发起消息已读回执请求
     *@param message 需要请求已读回执的消息
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnGroupReadReceiptRequestSentListener}
     */
    sendGroupReadReceiptRequest(message: RCIMIWMessage): Promise<number> {
        logger.logObject('sendGroupReadReceiptRequest', {message})
        return RCReactNativeIM.sendGroupReadReceiptRequest(message);
    }

    /**
     *发送已读回执
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param messages  会话中需要发送已读回执的消息列表
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnGroupReadReceiptResponseSentListener}
     */
    sendGroupReadReceiptResponse(targetId: string, channelId: string, messages: Array<RCIMIWMessage>): Promise<number> {
        messages = messages.filter(v => (v != null && v != undefined))
        logger.logObject('sendGroupReadReceiptResponse', {targetId, channelId, messages})
        return RCReactNativeIM.sendGroupReadReceiptResponse(targetId, channelId, messages);
    }

    /**
     *更新消息扩展信息
     *每条消息携带扩展信息键值对最大值 300个，单次设置扩展信息键值对最大值 20个
     *@param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值
     *@param expansion  要更新的消息扩展信息键值对，类型是 HashMap；Key 支持大小写英文字母、数字、部分特殊符号 + = - _ 的组合方式，不支持汉字。Value
     *    可以输入空格
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnMessageExpansionUpdatedListener}
     */
    updateMessageExpansion(messageUId: string, expansion: Map<string, string>): Promise<number> {
        let _expansion: any = Object.fromEntries(expansion)
        logger.logObject('updateMessageExpansion', {messageUId, expansion})
        return RCReactNativeIM.updateMessageExpansion(messageUId, _expansion);
    }

    /**
     *删除消息扩展信息中特定的键值对
     *@param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值
     *@param keys       消息扩展信息中待删除的 key 的列表，类型是 ArrayList
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnMessageExpansionForKeysRemovedListener}
     */
    removeMessageExpansionForKeys(messageUId: string, keys: Array<string>): Promise<number> {
        keys = keys.filter(v => (v != null && v != undefined))
        logger.logObject('removeMessageExpansionForKeys', {messageUId, keys})
        return RCReactNativeIM.removeMessageExpansionForKeys(messageUId, keys);
    }

    /**
     *设置消息发送状态。
     *@param messageId  消息的 messageId，可在消息对象中获取
     *@param sentStatus 要修改的状态
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnMessageSentStatusChangedListener}
     */
    changeMessageSentStatus(messageId: number, sentStatus: RCIMIWSentStatus): Promise<number> {
        logger.logObject('changeMessageSentStatus', {messageId, sentStatus})
        return RCReactNativeIM.changeMessageSentStatus(messageId, sentStatus);
    }

    /**
     *@param messageId      消息的 messageId，可在消息对象中获取
     *@param receivedStatus 要修改的状态
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnMessageReceiveStatusChangedListener}
     */
    changeMessageReceiveStatus(messageId: number, receivedStatus: RCIMIWReceivedStatus): Promise<number> {
        logger.logObject('changeMessageReceiveStatus', {messageId, receivedStatus})
        return RCReactNativeIM.changeMessageReceiveStatus(messageId, receivedStatus);
    }

    /**
     *加入聊天室。
     *@param targetId     会话 ID
     *@param messageCount 进入聊天室拉取消息数目，-1 时不拉取任何消息，0 时拉取 10 条消息，最多只能拉取 50
     *@param autoCreate   是否创建聊天室，TRUE 如果聊天室不存在，sdk 会创建聊天室并加入，如果已存在，则直接加入
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnChatRoomJoinedListener}
     */
    joinChatRoom(targetId: string, messageCount: number, autoCreate: boolean): Promise<number> {
        logger.logObject('joinChatRoom', {targetId, messageCount, autoCreate})
        return RCReactNativeIM.joinChatRoom(targetId, messageCount, autoCreate);
    }

    /**
     *退出聊天室。
     *@param targetId 会话 ID
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnChatRoomLeftListener}
     */
    leaveChatRoom(targetId: string): Promise<number> {
        logger.logObject('leaveChatRoom', {targetId})
        return RCReactNativeIM.leaveChatRoom(targetId);
    }

    /**
     *获取聊天室历史消息记录。
     *注：必须先开通聊天室消息云存储功能。
     *@param targetId  会话 ID
     *@param timestamp 起始的消息发送时间戳
     *@param order     拉取顺序 0:倒序，1:正序
     *@param count     要获取的消息数量，0 < count <= 50。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnChatRoomMessagesLoadedListener}
     */
    loadChatRoomMessages(targetId: string, timestamp: number, order: RCIMIWTimeOrder, count: number): Promise<number> {
        logger.logObject('loadChatRoomMessages', {targetId, timestamp, order, count})
        return RCReactNativeIM.loadChatRoomMessages(targetId, timestamp, order, count);
    }

    /**
     *设置聊天室自定义属性。
     *@param targetId       会话 ID
     *@param key            聊天室属性名称，Key 支持大小写英文字母、数字、部分特殊符号 + = - _ 的组合方式，最大长度 128 个字符
     *@param value          聊天室属性对应的值，最大长度 4096 个字符
     *@param deleteWhenLeft 用户掉线或退出时，是否自动删除该 Key、Value 值
     *@param overwrite      如果当前 key 存在，是否进行覆盖
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnChatRoomEntryAddedListener}
     */
    addChatRoomEntry(targetId: string, key: string, value: string, deleteWhenLeft: boolean, overwrite: boolean): Promise<number> {
        logger.logObject('addChatRoomEntry', {targetId, key, value, deleteWhenLeft, overwrite})
        return RCReactNativeIM.addChatRoomEntry(targetId, key, value, deleteWhenLeft, overwrite);
    }

    /**
     *批量设置聊天室自定义属性
     *@param targetId       会话 ID
     *@param entries        聊天室属性
     *@param deleteWhenLeft 用户掉线或退出时，是否自动删除该 Key、Value 值
     *@param overwrite      是否强制覆盖
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnChatRoomEntriesAddedListener}
     */
    addChatRoomEntries(targetId: string, entries: Map<string, string>, deleteWhenLeft: boolean, overwrite: boolean): Promise<number> {
        let _entries: any = Object.fromEntries(entries)
        logger.logObject('addChatRoomEntries', {targetId, entries, deleteWhenLeft, overwrite})
        return RCReactNativeIM.addChatRoomEntries(targetId, _entries, deleteWhenLeft, overwrite);
    }

    /**
     *获取聊天室单个属性。
     *@param targetId 会话 ID
     *@param key      聊天室属性键值
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnChatRoomEntryLoadedListener}
     */
    loadChatRoomEntry(targetId: string, key: string): Promise<number> {
        logger.logObject('loadChatRoomEntry', {targetId, key})
        return RCReactNativeIM.loadChatRoomEntry(targetId, key);
    }

    /**
     *获取聊天室所有属性。
     *@param targetId 会话 ID
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnAllChatRoomEntriesLoadedListener}
     */
    loadAllChatRoomEntries(targetId: string): Promise<number> {
        logger.logObject('loadAllChatRoomEntries', {targetId})
        return RCReactNativeIM.loadAllChatRoomEntries(targetId);
    }

    /**
     *删除聊天室自定义属性。
     *@param targetId 会话 ID
     *@param key      聊天室属性键值
     *@param force    是否强制删除
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnChatRoomEntryRemovedListener}
     */
    removeChatRoomEntry(targetId: string, key: string, force: boolean): Promise<number> {
        logger.logObject('removeChatRoomEntry', {targetId, key, force})
        return RCReactNativeIM.removeChatRoomEntry(targetId, key, force);
    }

    /**
     *批量删除聊天室自定义属性
     *@param targetId 会话 ID
     *@param keys     聊天室属性
     *@param force    是否强制覆盖
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnChatRoomEntriesRemovedListener}
     */
    removeChatRoomEntries(targetId: string, keys: Array<string>, force: boolean): Promise<number> {
        keys = keys.filter(v => (v != null && v != undefined))
        logger.logObject('removeChatRoomEntries', {targetId, keys, force})
        return RCReactNativeIM.removeChatRoomEntries(targetId, keys, force);
    }

    /**
     *将某个用户加入黑名单。
     *当你把对方加入黑名单后，对方再发消息时，就会提示“已被加入黑名单，消息发送失败”。 但你依然可以发消息个对方。
     *@param userId 用户 Id
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnBlacklistAddedListener}
     */
    addToBlacklist(userId: string): Promise<number> {
        logger.logObject('addToBlacklist', {userId})
        return RCReactNativeIM.addToBlacklist(userId);
    }

    /**
     *将某个用户从黑名单中移出。
     *@param userId 用户 Id
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnBlacklistRemovedListener}
     */
    removeFromBlacklist(userId: string): Promise<number> {
        logger.logObject('removeFromBlacklist', {userId})
        return RCReactNativeIM.removeFromBlacklist(userId);
    }

    /**
     *获取某用户是否在黑名单中。
     *@param userId 用户 Id
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnBlacklistStatusLoadedListener}
     */
    loadBlacklistStatus(userId: string): Promise<number> {
        logger.logObject('loadBlacklistStatus', {userId})
        return RCReactNativeIM.loadBlacklistStatus(userId);
    }

    /**
     *获取当前用户设置的黑名单列表。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnBlacklistLoadedListener}
     */
    loadBlacklist(): Promise<number> {
        logger.logObject('loadBlacklist', {})
        return RCReactNativeIM.loadBlacklist();
    }

    /**
     *根据关键字搜索指定会话中的消息。
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param keyword   搜索的关键字
     *@param startTime 查询 beginTime 之前的消息， 传 0 时从最新消息开始搜索，从该时间往前搜索。
     *@param count     查询的数量，0 < count <= 50。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnMessagesSearchedListener}
     */
    searchMessages(type: RCIMIWConversationType, targetId: string, channelId: string, keyword: string, startTime: number,
                   count: number): Promise<number> {
        logger.logObject('searchMessages', {type, targetId, channelId, keyword, startTime, count})
        return RCReactNativeIM.searchMessages(type, targetId, channelId, keyword, startTime, count);
    }

    /**
     *根据关键字搜索指定会话中某个时间段的消息。
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param keyword   搜索的关键字
     *@param startTime 开始时间
     *@param endTime   结束时间
     *@param offset    偏移量
     *@param count     返回的搜索结果数量，0 < count <= 50。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnMessagesSearchedByTimeRangeListener}
     */
    searchMessagesByTimeRange(type: RCIMIWConversationType, targetId: string, channelId: string, keyword: string, startTime: number, endTime: number,
                              offset: number, count: number): Promise<number> {
        logger.logObject('searchMessagesByTimeRange', {type, targetId, channelId, keyword, startTime, endTime, offset, count})
        return RCReactNativeIM.searchMessagesByTimeRange(type, targetId, channelId, keyword, startTime, endTime, offset, count);
    }

    /**
     *根据用户 id 搜索指定会话中的消息。
     *@param userId    用户 id
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param startTime 查询记录的起始时间， 传 0 时从最新消息开始搜索，从该时间往前搜索。
     *@param count     返回的搜索结果数量 0 < count <= 50。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnMessagesSearchedByUserIdListener}
     */
    searchMessagesByUserId(userId: string, type: RCIMIWConversationType, targetId: string, channelId: string, startTime: number,
                           count: number): Promise<number> {
        logger.logObject('searchMessagesByUserId', {userId, type, targetId, channelId, startTime, count})
        return RCReactNativeIM.searchMessagesByUserId(userId, type, targetId, channelId, startTime, count);
    }

    /**
     *根据关键字搜索会话。
     *@param conversationTypes 会话类型集合
     *@param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param messageTypes      搜索的消息类型
     *@param keyword           搜索的关键字。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnConversationsSearchedListener}
     */
    searchConversations(conversationTypes: Array<RCIMIWConversationType>, channelId: string, messageTypes: Array<RCIMIWMessageType>,
                        keyword: string): Promise<number> {
        conversationTypes = conversationTypes.filter(v => (v != null && v != undefined))
        messageTypes = messageTypes.filter(v => (v != null && v != undefined))
        logger.logObject('searchConversations', {conversationTypes, channelId, messageTypes, keyword})
        return RCReactNativeIM.searchConversations(conversationTypes, channelId, messageTypes, keyword);
    }

    /**
     *屏蔽某个时间段的消息提醒
     *@param startTime 开始消息免打扰时间，格式为 HH:MM:SS
     *@param spanMins  需要消息免打扰分钟数，0 < spanMins < 1440（ 比如，您设置的起始时间是 00：00， 结束时间为 01:00，则 spanMins 为 60 分钟。设置为
     *    1439 代表全天免打扰 （23  60 + 59 = 1439 ））
     *@param level     消息通知级别
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnNotificationQuietHoursChangedListener}
     */
    changeNotificationQuietHours(startTime: string, spanMins: number, level: RCIMIWPushNotificationQuietHoursLevel): Promise<number> {
        logger.logObject('changeNotificationQuietHours', {startTime, spanMins, level})
        return RCReactNativeIM.changeNotificationQuietHours(startTime, spanMins, level);
    }

    /**
     *删除已设置的全局时间段消息提醒屏蔽
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     */
    removeNotificationQuietHours(): Promise<number> {
        logger.logObject('removeNotificationQuietHours', {})
        return RCReactNativeIM.removeNotificationQuietHours();
    }

    /**
     *查询已设置的时间段消息提醒屏蔽
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     */
    loadNotificationQuietHours(): Promise<number> {
        logger.logObject('loadNotificationQuietHours', {})
        return RCReactNativeIM.loadNotificationQuietHours();
    }

    /**
     *设置会话的消息提醒状态
     *注：超级群调用该接口，channelId 为空时，相当于设置了 channelId 为空的频道的免打扰，不会屏蔽整个超级群会话下所有频道的免打扰
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param level     消息通知级别
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnConversationNotificationLevelChangedListener}
     */
    changeConversationNotificationLevel(type: RCIMIWConversationType, targetId: string, channelId: string,
                                        level: RCIMIWPushNotificationLevel): Promise<number> {
        logger.logObject('changeConversationNotificationLevel', {type, targetId, channelId, level})
        return RCReactNativeIM.changeConversationNotificationLevel(type, targetId, channelId, level);
    }

    /**
     *获取会话的消息提醒状态
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnConversationNotificationLevelLoadedListener}
     */
    loadConversationNotificationLevel(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number> {
        logger.logObject('loadConversationNotificationLevel', {type, targetId, channelId})
        return RCReactNativeIM.loadConversationNotificationLevel(type, targetId, channelId);
    }

    /**
     *设置会话类型的消息提醒状态
     *注：如要移除消息提醒状态，设置level为RCIMIWPushNotificationLevelDefault
     *@param type  会话类型
     *@param level 消息通知级别
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnConversationTypeNotificationLevelChangedListener}
     */
    changeConversationTypeNotificationLevel(type: RCIMIWConversationType, level: RCIMIWPushNotificationLevel): Promise<number> {
        logger.logObject('changeConversationTypeNotificationLevel', {type, level})
        return RCReactNativeIM.changeConversationTypeNotificationLevel(type, level);
    }

    /**
     *获取会话类型的消息提醒状态
     *@param type 会话类型
     *@return {@link setOnConversationTypeNotificationLevelLoadedListener}
     */
    loadConversationTypeNotificationLevel(type: RCIMIWConversationType): Promise<number> {
        logger.logObject('loadConversationTypeNotificationLevel', {type})
        return RCReactNativeIM.loadConversationTypeNotificationLevel(type);
    }

    /**
     *设置超级群的默认消息状态
     *一般由管理员设置的接口，针对超级群的所有群成员生效，针对超级群下所有频道生效，优先级较低。如果群成员自己超级群的免打扰级别，那么以群成员自己设置的为准。
     *@param targetId 会话 ID
     *@param level    消息通知级别
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupDefaultNotificationLevelChangedListener}
     */
    changeUltraGroupDefaultNotificationLevel(targetId: string, level: RCIMIWPushNotificationLevel): Promise<number> {
        logger.logObject('changeUltraGroupDefaultNotificationLevel', {targetId, level})
        return RCReactNativeIM.changeUltraGroupDefaultNotificationLevel(targetId, level);
    }

    /**
     *获取超级群的默认消息状态
     *@param targetId 会话 ID
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupDefaultNotificationLevelLoadedListener}
     */
    loadUltraGroupDefaultNotificationLevel(targetId: string): Promise<number> {
        logger.logObject('loadUltraGroupDefaultNotificationLevel', {targetId})
        return RCReactNativeIM.loadUltraGroupDefaultNotificationLevel(targetId);
    }

    /**
     *设置超级群频道的默认消息状态
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param level     消息通知级别
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupChannelDefaultNotificationLevelChangedListener}
     */
    changeUltraGroupChannelDefaultNotificationLevel(targetId: string, channelId: string, level: RCIMIWPushNotificationLevel): Promise<number> {
        logger.logObject('changeUltraGroupChannelDefaultNotificationLevel', {targetId, channelId, level})
        return RCReactNativeIM.changeUltraGroupChannelDefaultNotificationLevel(targetId, channelId, level);
    }

    /**
     *获取超级群频道的默认消息状态
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupChannelDefaultNotificationLevelLoadedListener}
     */
    loadUltraGroupChannelDefaultNotificationLevel(targetId: string, channelId: string): Promise<number> {
        logger.logObject('loadUltraGroupChannelDefaultNotificationLevel', {targetId, channelId})
        return RCReactNativeIM.loadUltraGroupChannelDefaultNotificationLevel(targetId, channelId);
    }

    /**
     *设置是否显示远程推送内容详情，此功能需要从服务端开启用户设置功能。
     *@param showContent 是否显示远程推送内容
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnPushContentShowStatusChangedListener}
     */
    changePushContentShowStatus(showContent: boolean): Promise<number> {
        logger.logObject('changePushContentShowStatus', {showContent})
        return RCReactNativeIM.changePushContentShowStatus(showContent);
    }

    /**
     *设置推送语言
     *@param language 推送语言， 目前仅支持 en_us、zh_cn、ar_sa
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnPushLanguageChangedListener}
     */
    changePushLanguage(language: string): Promise<number> {
        logger.logObject('changePushLanguage', {language})
        return RCReactNativeIM.changePushLanguage(language);
    }

    /**
     *设置是否接收远程推送。
     *前提：移动端未在线，Web 、MAC/PC 终端在线，移动端是否接收远程推送。
     *此功能需要从服务端开启用户设置功能。
     *@param receive 是否接收
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnPushReceiveStatusChangedListener}
     */
    changePushReceiveStatus(receive: boolean): Promise<number> {
        logger.logObject('changePushReceiveStatus', {receive})
        return RCReactNativeIM.changePushReceiveStatus(receive);
    }

    /**
     *给指定的群成员发送消息
     *@param message 要发送的消息
     *@param userIds 群成员集合
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnGroupMessageToDesignatedUsersAttachedListener}, {@link setOnGroupMessageToDesignatedUsersSentListener}
     */
    sendGroupMessageToDesignatedUsers(message: RCIMIWMessage, userIds: Array<string>): Promise<number> {
        userIds = userIds.filter(v => (v != null && v != undefined))
        logger.logObject('sendGroupMessageToDesignatedUsers', {message, userIds})
        return RCReactNativeIM.sendGroupMessageToDesignatedUsers(message, userIds);
    }

    /**
     *获取指定会话的消息总数。
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnMessageCountLoadedListener}
     */
    loadMessageCount(type: RCIMIWConversationType, targetId: string, channelId: string): Promise<number> {
        logger.logObject('loadMessageCount', {type, targetId, channelId})
        return RCReactNativeIM.loadMessageCount(type, targetId, channelId);
    }

    /**
     *根据会话类型,获取置顶会话列表
     *@param conversationTypes 会话类型集合
     *@param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnTopConversationsLoadedListener}
     */
    loadTopConversations(conversationTypes: Array<RCIMIWConversationType>, channelId: string): Promise<number> {
        conversationTypes = conversationTypes.filter(v => (v != null && v != undefined))
        logger.logObject('loadTopConversations', {conversationTypes, channelId})
        return RCReactNativeIM.loadTopConversations(conversationTypes, channelId);
    }

    /**
     *上报超级群的已读时间
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param timestamp 已读时间
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupReadStatusSyncedListener}
     */
    syncUltraGroupReadStatus(targetId: string, channelId: string, timestamp: number): Promise<number> {
        logger.logObject('syncUltraGroupReadStatus', {targetId, channelId, timestamp})
        return RCReactNativeIM.syncUltraGroupReadStatus(targetId, channelId, timestamp);
    }

    /**
     *获取特定会话下所有频道的会话列表，只支持超级群
     *@param type     会话类型
     *@param targetId 会话 ID
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnConversationsLoadedForAllChannelListener}
     */
    loadConversationsForAllChannel(type: RCIMIWConversationType, targetId: string): Promise<number> {
        logger.logObject('loadConversationsForAllChannel', {type, targetId})
        return RCReactNativeIM.loadConversationsForAllChannel(type, targetId);
    }

    /**
     *修改消息
     *@param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值
     *@param message    要修改的 message
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupMessageModifiedListener}
     */
    modifyUltraGroupMessage(messageUId: string, message: RCIMIWMessage): Promise<number> {
        logger.logObject('modifyUltraGroupMessage', {messageUId, message})
        return RCReactNativeIM.modifyUltraGroupMessage(messageUId, message);
    }

    /**
     *撤回超级群消息
     *@param message      需要撤回的消息
     *@param deleteRemote 是否删除远端消息
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupMessageRecalledListener}
     */
    recallUltraGroupMessage(message: RCIMIWMessage, deleteRemote: boolean): Promise<number> {
        logger.logObject('recallUltraGroupMessage', {message, deleteRemote})
        return RCReactNativeIM.recallUltraGroupMessage(message, deleteRemote);
    }

    /**
     *删除本地特定 channel 特点时间之前的消息
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param timestamp 时间戳
     *@param policy    清除策略
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupMessagesClearedListener}
     */
    clearUltraGroupMessages(targetId: string, channelId: string, timestamp: number, policy: RCIMIWMessageOperationPolicy): Promise<number> {
        logger.logObject('clearUltraGroupMessages', {targetId, channelId, timestamp, policy})
        return RCReactNativeIM.clearUltraGroupMessages(targetId, channelId, timestamp, policy);
    }

    /**
     *发送超级群输入状态
     *@param targetId     会话 ID
     *@param channelId    频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param typingStatus
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupTypingStatusSentListener}
     */
    sendUltraGroupTypingStatus(targetId: string, channelId: string, typingStatus: RCIMIWUltraGroupTypingStatus): Promise<number> {
        logger.logObject('sendUltraGroupTypingStatus', {targetId, channelId, typingStatus})
        return RCReactNativeIM.sendUltraGroupTypingStatus(targetId, channelId, typingStatus);
    }

    /**
     *删除本地所有 channel 特定时间之前的消息
     *@param targetId  会话 ID
     *@param timestamp 时间戳
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupMessagesClearedForAllChannelListener}
     */
    clearUltraGroupMessagesForAllChannel(targetId: string, timestamp: number): Promise<number> {
        logger.logObject('clearUltraGroupMessagesForAllChannel', {targetId, timestamp})
        return RCReactNativeIM.clearUltraGroupMessagesForAllChannel(targetId, timestamp);
    }

    /**
     *从服务获取批量消息
     *@param messages 获取的消息集合
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnBatchRemoteUltraGroupMessagesLoadedListener}
     */
    loadBatchRemoteUltraGroupMessages(messages: Array<RCIMIWMessage>): Promise<number> {
        messages = messages.filter(v => (v != null && v != undefined))
        logger.logObject('loadBatchRemoteUltraGroupMessages', {messages})
        return RCReactNativeIM.loadBatchRemoteUltraGroupMessages(messages);
    }

    /**
     *更新超级群消息扩展信息
     *@param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值
     *@param expansion  更新的消息扩展信息键值对，类型是 HashMap；Key 支持大小写英文字母、数字、部分特殊符号 + = - _ 的组合方式，不支持汉字。Value
     *    可以输入空格。
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupMessageExpansionUpdatedListener}
     */
    updateUltraGroupMessageExpansion(messageUId: string, expansion: Map<string, string>): Promise<number> {
        let _expansion: any = Object.fromEntries(expansion)
        logger.logObject('updateUltraGroupMessageExpansion', {messageUId, expansion})
        return RCReactNativeIM.updateUltraGroupMessageExpansion(messageUId, _expansion);
    }

    /**
     *删除超级群消息扩展信息中特定的键值对
     *@param messageUId 消息的 messageUid，可在消息对象中获取，且只有发送成功的消息才会有值
     *@param keys       消息扩展信息中待删除的 key 的列表，类型是 ArrayList
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     *@listener {@link setOnUltraGroupMessageExpansionRemovedListener}
     */
    removeUltraGroupMessageExpansion(messageUId: string, keys: Array<string>): Promise<number> {
        keys = keys.filter(v => (v != null && v != undefined))
        logger.logObject('removeUltraGroupMessageExpansion', {messageUId, keys})
        return RCReactNativeIM.removeUltraGroupMessageExpansion(messageUId, keys);
    }

    /**
     *修改日志等级
     *@param level 日志级别
     *@return 当次接口操作的状态码。0 代表调用成功 具体结果需要实现接口回调，非 0 代表当前接口调用操作失败，不会触发接口回调，详细错误参考错误码
     */
    changeLogLevel(level: RCIMIWLogLevel): Promise<number> {
        logger.logObject('changeLogLevel', {level})
        return RCReactNativeIM.changeLogLevel(level);
    }

    /**
     *收到消息的监听
     *@param message    接收到的消息对象
     *@param left       当客户端连接成功后，服务端会将所有补偿消息以消息包的形式下发给客户端，最多每 200 条消息为一个消息包，即一个 Package,
     *    客户端接受到消息包后，会逐条解析并通知应用。left 为当前消息包（Package）里还剩余的消息条数
     *@param offline    消息是否离线消息
     *@param hasPackage 是否在服务端还存在未下发的消息包
     */
    setOnMessageReceivedListener(listener?: (message: RCIMIWMessage, left: number, offline: boolean, hasPackage: boolean) => void): void {
        const eventName = 'IRCIMIWListener:onMessageReceived'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName,
                                                  (data: {message: RCIMIWMessage, left: number, offline: boolean, hasPackage: boolean}) => {
                                                      logger.logObject('onMessageReceived', data);
                                                      listener(data.message, data.left, data.offline, data.hasPackage)
                                                  })
        }
    }

    /**
     *网络状态变化
     *@param status SDK 与融云服务器的连接状态
     */
    setOnConnectionStatusChangedListener(listener?: (status: RCIMIWConnectionStatus) => void): void {
        const eventName = 'IRCIMIWListener:onConnectionStatusChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {status: RCIMIWConnectionStatus}) => {
                logger.logObject('onConnectionStatusChanged', data);
                listener(data.status)
            })
        }
    }

    /**
     *会话状态置顶多端同步监听
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param top       是否置顶
     */
    setOnConversationTopStatusSyncedListener(listener
                                             ?: (type: RCIMIWConversationType, targetId: string, channelId: string, top: boolean) => void): void {
        const eventName = 'IRCIMIWListener:onConversationTopStatusSynced'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName,
                                                  (data: {type: RCIMIWConversationType, targetId: string, channelId: string, top: boolean}) => {
                                                      logger.logObject('onConversationTopStatusSynced', data);
                                                      listener(data.type, data.targetId, data.channelId, data.top)
                                                  })
        }
    }

    /**
     *撤回消息监听器
     *@param message 原本的消息会变为撤回消息
     */
    setOnRemoteMessageRecalledListener(listener?: (message: RCIMIWMessage) => void): void {
        const eventName = 'IRCIMIWListener:onRemoteMessageRecalled'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {message: RCIMIWMessage}) => {
                logger.logObject('onRemoteMessageRecalled', data);
                listener(data.message)
            })
        }
    }

    /**
     *单聊中收到消息回执的回调。
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param timestamp 已阅读的最后一条消息的 sendTime
     */
    setOnPrivateReadReceiptReceivedListener(listener?: (targetId: string, channelId: string, timestamp: number) => void): void {
        const eventName = 'IRCIMIWListener:onPrivateReadReceiptReceived'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {targetId: string, channelId: string, timestamp: number}) => {
                logger.logObject('onPrivateReadReceiptReceived', data);
                listener(data.targetId, data.channelId, data.timestamp)
            })
        }
    }

    /**
     *消息扩展信息更改的回调
     *@param expansion 消息扩展信息中更新的键值对，只包含更新的键值对，不是全部的数据。如果想获取全部的键值对，请使用 message 的 expansion 属性。
     *@param message   发生变化的消息
     */
    setOnRemoteMessageExpansionUpdatedListener(listener?: (expansion: Map<string, string>, message: RCIMIWMessage) => void): void {
        const eventName = 'IRCIMIWListener:onRemoteMessageExpansionUpdated'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {expansion: any, message: RCIMIWMessage}) => {
                logger.logObject('onRemoteMessageExpansionUpdated', data);
                let _expansion = new Map<string, string>(Object.entries(data.expansion))
                listener(_expansion, data.message)
            })
        }
    }

    /**
     *消息扩展信息删除的回调
     *@param message 发生变化的消息
     *@param keys    消息扩展信息中删除的键值对 key 列表
     */
    setOnRemoteMessageExpansionForKeyRemovedListener(listener?: (message: RCIMIWMessage, keys: Array<string>) => void): void {
        const eventName = 'IRCIMIWListener:onRemoteMessageExpansionForKeyRemoved'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {message: RCIMIWMessage, keys: Array<string>}) => {
                logger.logObject('onRemoteMessageExpansionForKeyRemoved', data);
                listener(data.message, data.keys)
            })
        }
    }

    /**
     *聊天室用户进入、退出聊天室监听
     *@param targetId 会话 ID
     *@param actions  发生的事件
     */
    setOnChatRoomMemberChangedListener(listener?: (targetId: string, actions: Array<RCIMIWChatRoomMemberAction>) => void): void {
        const eventName = 'IRCIMIWListener:onChatRoomMemberChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {targetId: string, actions: Array<RCIMIWChatRoomMemberAction>}) => {
                logger.logObject('onChatRoomMemberChanged', data);
                listener(data.targetId, data.actions)
            })
        }
    }

    /**
     *会话输入状态发生变化。对于单聊而言，当对方正在输入时，监听会触发一次；当对方不处于输入状态时，该监听还会触发一次，但回调里输入用户列表为空。
     *@param type             会话类型
     *@param targetId         会话 ID
     *@param channelId        频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param userTypingStatus 发生状态变化的集合
     */
    setOnTypingStatusChangedListener(listener?: (type: RCIMIWConversationType, targetId: string, channelId: string,
                                                 userTypingStatus: Array<RCIMIWTypingStatus>) => void): void {
        const eventName = 'IRCIMIWListener:onTypingStatusChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName,
                (data: {type: RCIMIWConversationType, targetId: string, channelId: string, userTypingStatus: Array<RCIMIWTypingStatus>}) => {
                    logger.logObject('onTypingStatusChanged', data);
                    listener(data.type, data.targetId, data.channelId, data.userTypingStatus)
                })
        }
    }

    /**
     *同步消息未读状态监听接口。多端登录，收到其它端清除某一会话未读数通知的时候
     *@param type     会话类型
     *@param targetId 会话 ID
     */
    setOnConversationReadStatusSyncMessageReceivedListener(listener
                                                           ?: (type: RCIMIWConversationType, targetId: string, timestamp: number) => void): void {
        const eventName = 'IRCIMIWListener:onConversationReadStatusSyncMessageReceived'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {type: RCIMIWConversationType, targetId: string, timestamp: number}) => {
                logger.logObject('onConversationReadStatusSyncMessageReceived', data);
                listener(data.type, data.targetId, data.timestamp)
            })
        }
    }

    /**
     *聊天室 KV 同步完成的回调
     *@param roomId 聊天室 ID
     */
    setOnChatRoomEntriesSyncedListener(listener?: (roomId: string) => void): void {
        const eventName = 'IRCIMIWListener:onChatRoomEntriesSynced'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {roomId: string}) => {
                logger.logObject('onChatRoomEntriesSynced', data);
                listener(data.roomId)
            })
        }
    }

    /**
     *聊天室 KV 发生变化的回调
     *@param operationType 操作的类型
     *@param roomId        聊天室 ID
     *@param entries       发送变化的 KV
     */
    setOnChatRoomEntriesChangedListener(listener?: (operationType: RCIMIWChatRoomEntriesOperationType, roomId: string,
                                                    entries: Map<string, string>) => void): void {
        const eventName = 'IRCIMIWListener:onChatRoomEntriesChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName,
                                                  (data: {operationType: RCIMIWChatRoomEntriesOperationType, roomId: string, entries: any}) => {
                                                      logger.logObject('onChatRoomEntriesChanged', data);
                                                      let _entries = new Map<string, string>(Object.entries(data.entries))
                                                      listener(data.operationType, data.roomId, _entries)
                                                  })
        }
    }

    /**
     *超级群消息 kv 被更新
     *@param messages 被更新的消息集合
     */
    setOnRemoteUltraGroupMessageExpansionUpdatedListener(listener?: (messages: Array<RCIMIWMessage>) => void): void {
        const eventName = 'IRCIMIWListener:onRemoteUltraGroupMessageExpansionUpdated'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {messages: Array<RCIMIWMessage>}) => {
                logger.logObject('onRemoteUltraGroupMessageExpansionUpdated', data);
                listener(data.messages)
            })
        }
    }

    /**
     *超级群消息被更改
     *@param messages 被更新的消息集合
     */
    setOnRemoteUltraGroupMessageModifiedListener(listener?: (messages: Array<RCIMIWMessage>) => void): void {
        const eventName = 'IRCIMIWListener:onRemoteUltraGroupMessageModified'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {messages: Array<RCIMIWMessage>}) => {
                logger.logObject('onRemoteUltraGroupMessageModified', data);
                listener(data.messages)
            })
        }
    }

    /**
     *超级群消息被撤回
     *@param messages 撤回的消息集合
     */
    setOnRemoteUltraGroupMessageRecalledListener(listener?: (messages: Array<RCIMIWMessage>) => void): void {
        const eventName = 'IRCIMIWListener:onRemoteUltraGroupMessageRecalled'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {messages: Array<RCIMIWMessage>}) => {
                logger.logObject('onRemoteUltraGroupMessageRecalled', data);
                listener(data.messages)
            })
        }
    }

    /**
     *超级群已读的监听
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param timestamp
     */
    setOnUltraGroupReadTimeReceivedListener(listener?: (targetId: string, channelId: string, timestamp: number) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupReadTimeReceived'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {targetId: string, channelId: string, timestamp: number}) => {
                logger.logObject('onUltraGroupReadTimeReceived', data);
                listener(data.targetId, data.channelId, data.timestamp)
            })
        }
    }

    /**
     *用户输入状态变化的回调
     *当客户端收到用户输入状态的变化时，会回调此接口，通知发生变化的会话以及当前正在输入的RCUltraGroupTypingStatusInfo列表
     *@param info 正在输入的RCUltraGroupTypingStatusInfo列表（nil标示当前没有用户正在输入）
     */
    setOnUltraGroupTypingStatusChangedListener(listener?: (info: Array<RCIMIWUltraGroupTypingStatusInfo>) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupTypingStatusChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {info: Array<RCIMIWUltraGroupTypingStatusInfo>}) => {
                logger.logObject('onUltraGroupTypingStatusChanged', data);
                listener(data.info)
            })
        }
    }

    /**
     *发送含有敏感词消息被拦截的回调
     *@param info 被拦截消息的相关信息
     */
    setOnMessageBlockedListener(listener?: (info: RCIMIWBlockedMessageInfo) => void): void {
        const eventName = 'IRCIMIWListener:onMessageBlocked'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {info: RCIMIWBlockedMessageInfo}) => {
                logger.logObject('onMessageBlocked', data);
                listener(data.info)
            })
        }
    }

    /**
     *聊天室状态发生变化的监听
     *@param targetId 会话 ID
     *@param status   聊天室变化的状态
     */
    setOnChatRoomStatusChangedListener(listener?: (targetId: string, status: RCIMIWChatRoomStatus) => void): void {
        const eventName = 'IRCIMIWListener:onChatRoomStatusChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {targetId: string, status: RCIMIWChatRoomStatus}) => {
                logger.logObject('onChatRoomStatusChanged', data);
                listener(data.targetId, data.status)
            })
        }
    }

    /**
     *收到群聊已读回执请求的监听
     *@param targetId   会话 ID
     *@param messageUId 消息的 messageUid
     */
    setOnGroupMessageReadReceiptRequestReceivedListener(listener?: (targetId: string, messageUId: string) => void): void {
        const eventName = 'IRCIMIWListener:onGroupMessageReadReceiptRequestReceived'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {targetId: string, messageUId: string}) => {
                logger.logObject('onGroupMessageReadReceiptRequestReceived', data);
                listener(data.targetId, data.messageUId)
            })
        }
    }

    /**
     *收到群聊已读回执响应的监听
     *@param targetId       会话 ID
     *@param messageUId     收到回执响应的消息的 messageUId
     *@param respondUserIds 会话中响应了此消息的用户列表。其中 key： 用户 id ； value： 响应时间。
     */
    setOnGroupMessageReadReceiptResponseReceivedListener(listener?: (targetId: string, messageUId: string,
                                                                     respondUserIds: Map<string, number>) => void): void {
        const eventName = 'IRCIMIWListener:onGroupMessageReadReceiptResponseReceived'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {targetId: string, messageUId: string, respondUserIds: any}) => {
                logger.logObject('onGroupMessageReadReceiptResponseReceived', data);
                let _respondUserIds = new Map<string, number>(Object.entries(data.respondUserIds))
                listener(data.targetId, data.messageUId, _respondUserIds)
            })
        }
    }

    /**
     *{@link connect} 的接口监听，收到链接结果的回调
     *@param code   接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param userId 链接成功的用户 ID
     */
    setOnConnectedListener(listener?: (code: number, userId: string) => void): void {
        const eventName = 'IRCIMIWListener:onConnected'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, userId: string}) => {
                logger.logObject('onConnected', data);
                listener(data.code, data.userId)
            })
        }
    }

    /**
     *{@link connect} 的接口监听，数据库打开时发生的回调
     *@param code 接口回调的状态码，0 代表成功，非 0 代表出现异常
     */
    setOnDatabaseOpenedListener(listener?: (code: number) => void): void {
        const eventName = 'IRCIMIWListener:onDatabaseOpened'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number}) => {
                logger.logObject('onDatabaseOpened', data);
                listener(data.code)
            })
        }
    }

    /**
     *{@link loadConversation} 的接口监听
     *@param code         接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type         会话类型
     *@param targetId     会话 ID
     *@param channelId    频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param conversation 获取到的会话
     */
    setOnConversationLoadedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                                conversation: RCIMIWConversation) => void): void {
        const eventName = 'IRCIMIWListener:onConversationLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName,
                (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, conversation: RCIMIWConversation}) => {
                    logger.logObject('onConversationLoaded', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.conversation)
                })
        }
    }

    /**
     *{@link loadConversations} 的接口监听
     *@param code              接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param conversationTypes 会话类型集合
     *@param channelId         频道 ID，仅支持超级群使用，
     *@param startTime         时间戳（毫秒）
     *@param count             查询的数量
     *@param conversations     查询到的会话集合
     */
    setOnConversationsLoadedListener(listener?: (code: number, conversationTypes: Array<RCIMIWConversationType>, channelId: string, startTime: number,
                                                 count: number, conversations: Array<RCIMIWConversation>) => void): void {
        const eventName = 'IRCIMIWListener:onConversationsLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {
                                                                 code: number,
                                                                 conversationTypes: Array<RCIMIWConversationType>,
                                                                 channelId: string,
                                                                 startTime: number,
                                                                 count: number,
                                                                 conversations: Array<RCIMIWConversation>
                                                             }) => {
                logger.logObject('onConversationsLoaded', data);
                listener(data.code, data.conversationTypes, data.channelId, data.startTime, data.count, data.conversations)
            })
        }
    }

    /**
     *{@link removeConversation} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     */
    setOnConversationRemovedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string) => void): void {
        const eventName = 'IRCIMIWListener:onConversationRemoved'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName,
                                                  (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string}) => {
                                                      logger.logObject('onConversationRemoved', data);
                                                      listener(data.code, data.type, data.targetId, data.channelId)
                                                  })
        }
    }

    /**
     *{@link removeConversations} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param types     会话类型集合
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     */
    setOnConversationsRemovedListener(listener?: (code: number, types: Array<RCIMIWConversationType>, channelId: string) => void): void {
        const eventName = 'IRCIMIWListener:onConversationsRemoved'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, types: Array<RCIMIWConversationType>, channelId: string}) => {
                logger.logObject('onConversationsRemoved', data);
                listener(data.code, data.types, data.channelId)
            })
        }
    }

    /**
     *{@link loadTotalUnreadCount} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param count     未读数量
     */
    setOnTotalUnreadCountLoadedListener(listener?: (code: number, channelId: string, count: number) => void): void {
        const eventName = 'IRCIMIWListener:onTotalUnreadCountLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, channelId: string, count: number}) => {
                logger.logObject('onTotalUnreadCountLoaded', data);
                listener(data.code, data.channelId, data.count)
            })
        }
    }

    /**
     *{@link loadUnreadCount} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param count     未读数量
     */
    setOnUnreadCountLoadedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                               count: number) => void): void {
        const eventName = 'IRCIMIWListener:onUnreadCountLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, count: number}) => {
                    logger.logObject('onUnreadCountLoaded', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.count)
                })
        }
    }

    /**
     *{@link loadUnreadCountByConversationTypes} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param types     会话类型集合
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param contain   是否包含免打扰消息的未读消息数。
     *@param count     未读数量
     */
    setOnUnreadCountByConversationTypesLoadedListener(listener?: (code: number, types: Array<RCIMIWConversationType>, channelId: string,
                                                                  contain: boolean, count: number) => void): void {
        const eventName = 'IRCIMIWListener:onUnreadCountByConversationTypesLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, types: Array<RCIMIWConversationType>, channelId: string, contain: boolean, count: number}) => {
                    logger.logObject('onUnreadCountByConversationTypesLoaded', data);
                    listener(data.code, data.types, data.channelId, data.contain, data.count)
                })
        }
    }

    /**
     *{@link loadUnreadMentionedCount} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param count     未读数量
     */
    setOnUnreadMentionedCountLoadedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                                        count: number) => void): void {
        const eventName = 'IRCIMIWListener:onUnreadMentionedCountLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, count: number}) => {
                    logger.logObject('onUnreadMentionedCountLoaded', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.count)
                })
        }
    }

    /**
     *{@link loadUltraGroupAllUnreadMentionedCount} 的接口监听
     *@param code  接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param count 未读数量
     */
    setOnUltraGroupAllUnreadCountLoadedListener(listener?: (code: number, count: number) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupAllUnreadCountLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, count: number}) => {
                logger.logObject('onUltraGroupAllUnreadCountLoaded', data);
                listener(data.code, data.count)
            })
        }
    }

    /**
     *{@link loadUltraGroupAllUnreadMentionedCount} 的接口监听
     *@param code  接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param count 未读数量
     */
    setOnUltraGroupAllUnreadMentionedCountLoadedListener(listener?: (code: number, count: number) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupAllUnreadMentionedCountLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, count: number}) => {
                logger.logObject('onUltraGroupAllUnreadMentionedCountLoaded', data);
                listener(data.code, data.count)
            })
        }
    }

    /**
     *{@link clearUnreadCount} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param timestamp 该会话已阅读的最后一条消息的发送时间戳
     */
    setOnUnreadCountClearedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                                timestamp: number) => void): void {
        const eventName = 'IRCIMIWListener:onUnreadCountCleared'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, timestamp: number}) => {
                    logger.logObject('onUnreadCountCleared', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.timestamp)
                })
        }
    }

    /**
     *{@link saveDraftMessage} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param draft     草稿信息
     */
    setOnDraftMessageSavedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                               draft: string) => void): void {
        const eventName = 'IRCIMIWListener:onDraftMessageSaved'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, draft: string}) => {
                    logger.logObject('onDraftMessageSaved', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.draft)
                })
        }
    }

    /**
     *{@link clearDraftMessage} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     */
    setOnDraftMessageClearedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string) => void): void {
        const eventName = 'IRCIMIWListener:onDraftMessageCleared'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName,
                                                  (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string}) => {
                                                      logger.logObject('onDraftMessageCleared', data);
                                                      listener(data.code, data.type, data.targetId, data.channelId)
                                                  })
        }
    }

    /**
     *{@link loadDraftMessage} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常 接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param draft     草稿信息
     */
    setOnDraftMessageLoadedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                                draft: string) => void): void {
        const eventName = 'IRCIMIWListener:onDraftMessageLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, draft: string}) => {
                    logger.logObject('onDraftMessageLoaded', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.draft)
                })
        }
    }

    /**
     *{@link loadBlockedConversations} 的接口监听
     *@param code          接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param types         会话类型集合
     *@param channelId     频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param conversations 获取到的会话集合
     */
    setOnBlockedConversationsLoadedListener(listener?: (code: number, types: Array<RCIMIWConversationType>, channelId: string,
                                                        conversations: Array<RCIMIWConversation>) => void): void {
        const eventName = 'IRCIMIWListener:onBlockedConversationsLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName,
                (data: {code: number, types: Array<RCIMIWConversationType>, channelId: string, conversations: Array<RCIMIWConversation>}) => {
                    logger.logObject('onBlockedConversationsLoaded', data);
                    listener(data.code, data.types, data.channelId, data.conversations)
                })
        }
    }

    /**
     *{@link changeConversationTopStatus} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param top       是否置顶
     */
    setOnConversationTopStatusChangedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                                          top: boolean) => void): void {
        const eventName = 'IRCIMIWListener:onConversationTopStatusChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, top: boolean}) => {
                    logger.logObject('onConversationTopStatusChanged', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.top)
                })
        }
    }

    /**
     *{@link loadConversationTopStatus} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param top       是否置顶
     */
    setOnConversationTopStatusLoadedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                                         top: boolean) => void): void {
        const eventName = 'IRCIMIWListener:onConversationTopStatusLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, top: boolean}) => {
                    logger.logObject('onConversationTopStatusLoaded', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.top)
                })
        }
    }

    /**
     *{@link syncConversationReadStatus} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param timestamp 会话中已读的最后一条消息的发送时间戳
     */
    setOnConversationReadStatusSyncedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                                          timestamp: number) => void): void {
        const eventName = 'IRCIMIWListener:onConversationReadStatusSynced'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, timestamp: number}) => {
                    logger.logObject('onConversationReadStatusSynced', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.timestamp)
                })
        }
    }

    /**
     *{@link sendMessage} 的接口监听
     *@param message 发送的消息
     */
    setOnMessageAttachedListener(listener?: (message: RCIMIWMessage) => void): void {
        const eventName = 'IRCIMIWListener:onMessageAttached'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {message: RCIMIWMessage}) => {
                logger.logObject('onMessageAttached', data);
                listener(data.message)
            })
        }
    }

    /**
     *{@link sendMessage} 的接口监听
     *@param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param message 发送的消息
     */
    setOnMessageSentListener(listener?: (code: number, message: RCIMIWMessage) => void): void {
        const eventName = 'IRCIMIWListener:onMessageSent'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, message: RCIMIWMessage}) => {
                logger.logObject('onMessageSent', data);
                listener(data.code, data.message)
            })
        }
    }

    /**
     *{@link sendMediaMessage} 的接口监听
     *@param message 发送的消息
     */
    setOnMediaMessageAttachedListener(listener?: (message: RCIMIWMediaMessage) => void): void {
        const eventName = 'IRCIMIWListener:onMediaMessageAttached'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {message: RCIMIWMediaMessage}) => {
                logger.logObject('onMediaMessageAttached', data);
                listener(data.message)
            })
        }
    }

    /**
     *{@link sendMediaMessage} 的接口监听
     *@param message  发送的消息
     *@param progress 发送的进度
     */
    setOnMediaMessageSendingListener(listener?: (message: RCIMIWMediaMessage, progress: number) => void): void {
        const eventName = 'IRCIMIWListener:onMediaMessageSending'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {message: RCIMIWMediaMessage, progress: number}) => {
                logger.logObject('onMediaMessageSending', data);
                listener(data.message, data.progress)
            })
        }
    }

    /**
     *{@link cancelSendingMediaMessage} 的接口监听
     *@param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param message 发送的消息
     */
    setOnSendingMediaMessageCanceledListener(listener?: (code: number, message: RCIMIWMediaMessage) => void): void {
        const eventName = 'IRCIMIWListener:onSendingMediaMessageCanceled'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, message: RCIMIWMediaMessage}) => {
                logger.logObject('onSendingMediaMessageCanceled', data);
                listener(data.code, data.message)
            })
        }
    }

    /**
     *{@link sendMediaMessage} 的接口监听
     *@param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param message 发送的消息
     */
    setOnMediaMessageSentListener(listener?: (code: number, message: RCIMIWMediaMessage) => void): void {
        const eventName = 'IRCIMIWListener:onMediaMessageSent'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, message: RCIMIWMediaMessage}) => {
                logger.logObject('onMediaMessageSent', data);
                listener(data.code, data.message)
            })
        }
    }

    /**
     *{@link downloadMediaMessage} 的接口监听
     *@param message  下载的消息
     *@param progress 下载的进度
     */
    setOnMediaMessageDownloadingListener(listener?: (message: RCIMIWMediaMessage, progress: number) => void): void {
        const eventName = 'IRCIMIWListener:onMediaMessageDownloading'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {message: RCIMIWMediaMessage, progress: number}) => {
                logger.logObject('onMediaMessageDownloading', data);
                listener(data.message, data.progress)
            })
        }
    }

    /**
     *{@link downloadMediaMessage} 的接口监听
     *@param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param message 下载的消息
     */
    setOnMediaMessageDownloadedListener(listener?: (code: number, message: RCIMIWMediaMessage) => void): void {
        const eventName = 'IRCIMIWListener:onMediaMessageDownloaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, message: RCIMIWMediaMessage}) => {
                logger.logObject('onMediaMessageDownloaded', data);
                listener(data.code, data.message)
            })
        }
    }

    /**
     *{@link cancelDownloadingMediaMessage} 的接口监听
     *@param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param message 取消下载的消息
     */
    setOnDownloadingMediaMessageCanceledListener(listener?: (code: number, message: RCIMIWMediaMessage) => void): void {
        const eventName = 'IRCIMIWListener:onDownloadingMediaMessageCanceled'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, message: RCIMIWMediaMessage}) => {
                logger.logObject('onDownloadingMediaMessageCanceled', data);
                listener(data.code, data.message)
            })
        }
    }

    /**
     *{@link loadMessages} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param sentTime  当前消息时间戳
     *@param order     获取消息的方向。BEFORE：获取 sentTime 之前的消息 （时间递减），AFTER：获取 sentTime 之后的消息 （时间递增）
     *@param messages  获取到的消息集合
     */
    setOnMessagesLoadedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string, sentTime: number,
                                            order: RCIMIWTimeOrder, messages: Array<RCIMIWMessage>) => void): void {
        const eventName = 'IRCIMIWListener:onMessagesLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {
                                                                 code: number,
                                                                 type: RCIMIWConversationType,
                                                                 targetId: string,
                                                                 channelId: string,
                                                                 sentTime: number,
                                                                 order: RCIMIWTimeOrder,
                                                                 messages: Array<RCIMIWMessage>
                                                             }) => {
                logger.logObject('onMessagesLoaded', data);
                listener(data.code, data.type, data.targetId, data.channelId, data.sentTime, data.order, data.messages)
            })
        }
    }

    /**
     *{@link loadUnreadMentionedMessages} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param messages  获取到的消息集合
     */
    setOnUnreadMentionedMessagesLoadedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                                           messages: Array<RCIMIWMessage>) => void): void {
        const eventName = 'IRCIMIWListener:onUnreadMentionedMessagesLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName,
                (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, messages: Array<RCIMIWMessage>}) => {
                    logger.logObject('onUnreadMentionedMessagesLoaded', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.messages)
                })
        }
    }

    /**
     *{@link loadFirstUnreadMessage} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param message   获取到的消息
     */
    setOnFirstUnreadMessageLoadedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                                      message: RCIMIWMessage) => void): void {
        const eventName = 'IRCIMIWListener:onFirstUnreadMessageLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, message: RCIMIWMessage}) => {
                    logger.logObject('onFirstUnreadMessageLoaded', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.message)
                })
        }
    }

    /**
     *{@link insertMessage} 的接口监听
     *@param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param message 插入的消息
     */
    setOnMessageInsertedListener(listener?: (code: number, message: RCIMIWMessage) => void): void {
        const eventName = 'IRCIMIWListener:onMessageInserted'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, message: RCIMIWMessage}) => {
                logger.logObject('onMessageInserted', data);
                listener(data.code, data.message)
            })
        }
    }

    /**
     *{@link insertMessages} 的接口监听
     *@param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param messages 插入的消息集合
     */
    setOnMessagesInsertedListener(listener?: (code: number, messages: Array<RCIMIWMessage>) => void): void {
        const eventName = 'IRCIMIWListener:onMessagesInserted'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, messages: Array<RCIMIWMessage>}) => {
                logger.logObject('onMessagesInserted', data);
                listener(data.code, data.messages)
            })
        }
    }

    /**
     *{@link clearMessages} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param timestamp 时间戳
     */
    setOnMessageClearedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                            timestamp: number) => void): void {
        const eventName = 'IRCIMIWListener:onMessageCleared'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, timestamp: number}) => {
                    logger.logObject('onMessageCleared', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.timestamp)
                })
        }
    }

    /**
     *{@link deleteLocalMessages} 的接口监听
     *@param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param messages 删除的消息集合
     */
    setOnLocalMessagesDeletedListener(listener?: (code: number, messages: Array<RCIMIWMessage>) => void): void {
        const eventName = 'IRCIMIWListener:onLocalMessagesDeleted'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, messages: Array<RCIMIWMessage>}) => {
                logger.logObject('onLocalMessagesDeleted', data);
                listener(data.code, data.messages)
            })
        }
    }

    /**
     *{@link deleteMessages} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param messages  删除的消息集合
     */
    setOnMessagesDeletedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                             messages: Array<RCIMIWMessage>) => void): void {
        const eventName = 'IRCIMIWListener:onMessagesDeleted'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName,
                (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, messages: Array<RCIMIWMessage>}) => {
                    logger.logObject('onMessagesDeleted', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.messages)
                })
        }
    }

    /**
     *{@link recallMessage} 的接口监听
     *@param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param message 撤回的消息
     */
    setOnMessageRecalledListener(listener?: (code: number, message: RCIMIWMessage) => void): void {
        const eventName = 'IRCIMIWListener:onMessageRecalled'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, message: RCIMIWMessage}) => {
                logger.logObject('onMessageRecalled', data);
                listener(data.code, data.message)
            })
        }
    }

    /**
     *{@link sendPrivateReadReceiptMessage} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param timestamp 时间戳
     */
    setOnPrivateReadReceiptMessageSentListener(listener?: (code: number, targetId: string, channelId: string, timestamp: number) => void): void {
        const eventName = 'IRCIMIWListener:onPrivateReadReceiptMessageSent'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, targetId: string, channelId: string, timestamp: number}) => {
                logger.logObject('onPrivateReadReceiptMessageSent', data);
                listener(data.code, data.targetId, data.channelId, data.timestamp)
            })
        }
    }

    /**
     *{@link updateMessageExpansion} 的接口监听
     *@param code       接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param messageUId 消息的 messageUid
     *@param expansion  要更新的消息扩展信息键值对，类型是 HashMap
     */
    setOnMessageExpansionUpdatedListener(listener?: (code: number, messageUId: string, expansion: Map<string, string>) => void): void {
        const eventName = 'IRCIMIWListener:onMessageExpansionUpdated'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, messageUId: string, expansion: any}) => {
                logger.logObject('onMessageExpansionUpdated', data);
                let _expansion = new Map<string, string>(Object.entries(data.expansion))
                listener(data.code, data.messageUId, _expansion)
            })
        }
    }

    /**
     *{@link removeMessageExpansionForKeys} 的接口监听
     *@param code       接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param messageUId 消息的 messageUid
     *@param keys       消息扩展信息中待删除的 key 的列表，类型是 ArrayList
     */
    setOnMessageExpansionForKeysRemovedListener(listener?: (code: number, messageUId: string, keys: Array<string>) => void): void {
        const eventName = 'IRCIMIWListener:onMessageExpansionForKeysRemoved'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, messageUId: string, keys: Array<string>}) => {
                logger.logObject('onMessageExpansionForKeysRemoved', data);
                listener(data.code, data.messageUId, data.keys)
            })
        }
    }

    /**
     *{@link changeMessageReceiveStatus} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param messageId 消息的 messageId
     */
    setOnMessageReceiveStatusChangedListener(listener?: (code: number, messageId: number) => void): void {
        const eventName = 'IRCIMIWListener:onMessageReceiveStatusChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, messageId: number}) => {
                logger.logObject('onMessageReceiveStatusChanged', data);
                listener(data.code, data.messageId)
            })
        }
    }

    /**
     *{@link changeMessageSentStatus} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param messageId 消息的 messageId
     */
    setOnMessageSentStatusChangedListener(listener?: (code: number, messageId: number) => void): void {
        const eventName = 'IRCIMIWListener:onMessageSentStatusChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, messageId: number}) => {
                logger.logObject('onMessageSentStatusChanged', data);
                listener(data.code, data.messageId)
            })
        }
    }

    /**
     *{@link joinChatRoom} 的接口监听
     *@param targetId 会话 ID
     */
    setOnChatRoomJoinedListener(listener?: (code: number, targetId: string) => void): void {
        const eventName = 'IRCIMIWListener:onChatRoomJoined'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, targetId: string}) => {
                logger.logObject('onChatRoomJoined', data);
                listener(data.code, data.targetId)
            })
        }
    }

    /**
     *正在加入聊天室的回调
     *@param targetId 聊天室 ID
     */
    setOnChatRoomJoiningListener(listener?: (targetId: string) => void): void {
        const eventName = 'IRCIMIWListener:onChatRoomJoining'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {targetId: string}) => {
                logger.logObject('onChatRoomJoining', data);
                listener(data.targetId)
            })
        }
    }

    /**
     *{@link leaveChatRoom} 的接口监听
     *@param targetId 会话 ID
     */
    setOnChatRoomLeftListener(listener?: (code: number, targetId: string) => void): void {
        const eventName = 'IRCIMIWListener:onChatRoomLeft'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, targetId: string}) => {
                logger.logObject('onChatRoomLeft', data);
                listener(data.code, data.targetId)
            })
        }
    }

    /**
     *{@link loadChatRoomMessages} 的接口监听
     *@param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId 会话 ID
     *@param messages 加载到的消息
     *@param syncTime 下次拉取的时间戳
     */
    setOnChatRoomMessagesLoadedListener(listener?: (code: number, targetId: string, messages: Array<RCIMIWMessage>, syncTime: number) => void): void {
        const eventName = 'IRCIMIWListener:onChatRoomMessagesLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName,
                                                  (data: {code: number, targetId: string, messages: Array<RCIMIWMessage>, syncTime: number}) => {
                                                      logger.logObject('onChatRoomMessagesLoaded', data);
                                                      listener(data.code, data.targetId, data.messages, data.syncTime)
                                                  })
        }
    }

    /**
     *{@link addChatRoomEntry} 的接口监听
     *@param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId 会话 ID
     *@param key      聊天室属性名称
     */
    setOnChatRoomEntryAddedListener(listener?: (code: number, targetId: string, key: string) => void): void {
        const eventName = 'IRCIMIWListener:onChatRoomEntryAdded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, targetId: string, key: string}) => {
                logger.logObject('onChatRoomEntryAdded', data);
                listener(data.code, data.targetId, data.key)
            })
        }
    }

    /**
     *{@link addChatRoomEntries} 的接口监听
     *@param code         接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId     会话 ID
     *@param entries      聊天室属性
     *@param errorEntries 发生错误的属性
     */
    setOnChatRoomEntriesAddedListener(listener?: (code: number, targetId: string, entries: Map<string, string>,
                                                  errorEntries: Map<string, number>) => void): void {
        const eventName = 'IRCIMIWListener:onChatRoomEntriesAdded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, targetId: string, entries: any, errorEntries: any}) => {
                logger.logObject('onChatRoomEntriesAdded', data);
                let _entries = new Map<string, string>(Object.entries(data.entries))
                let _errorEntries = new Map<string, number>(Object.entries(data.errorEntries))
                listener(data.code, data.targetId, _entries, _errorEntries)
            })
        }
    }

    /**
     *{@link loadChatRoomEntry} 的接口监听
     *@param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId 会话 ID
     *@param entry    获取到的属性。
     */
    setOnChatRoomEntryLoadedListener(listener?: (code: number, targetId: string, entry: Map<string, string>) => void): void {
        const eventName = 'IRCIMIWListener:onChatRoomEntryLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, targetId: string, entry: any}) => {
                logger.logObject('onChatRoomEntryLoaded', data);
                let _entry = new Map<string, string>(Object.entries(data.entry))
                listener(data.code, data.targetId, _entry)
            })
        }
    }

    /**
     *{@link loadAllChatRoomEntries} 的接口监听
     *@param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId 会话 ID
     *@param entries  获取到的属性集合。
     */
    setOnAllChatRoomEntriesLoadedListener(listener?: (code: number, targetId: string, entries: Map<string, string>) => void): void {
        const eventName = 'IRCIMIWListener:onAllChatRoomEntriesLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, targetId: string, entries: any}) => {
                logger.logObject('onAllChatRoomEntriesLoaded', data);
                let _entries = new Map<string, string>(Object.entries(data.entries))
                listener(data.code, data.targetId, _entries)
            })
        }
    }

    /**
     *{@link removeChatRoomEntry} 的接口监听
     *@param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId 会话 ID
     *@param key      聊天室属性键值
     */
    setOnChatRoomEntryRemovedListener(listener?: (code: number, targetId: string, key: string) => void): void {
        const eventName = 'IRCIMIWListener:onChatRoomEntryRemoved'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, targetId: string, key: string}) => {
                logger.logObject('onChatRoomEntryRemoved', data);
                listener(data.code, data.targetId, data.key)
            })
        }
    }

    /**
     *{@link removeChatRoomEntries} 的接口监听
     *@param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId 会话 ID
     *@param keys     聊天室属性键值集合
     */
    setOnChatRoomEntriesRemovedListener(listener?: (code: number, targetId: string, keys: Array<string>) => void): void {
        const eventName = 'IRCIMIWListener:onChatRoomEntriesRemoved'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, targetId: string, keys: Array<string>}) => {
                logger.logObject('onChatRoomEntriesRemoved', data);
                listener(data.code, data.targetId, data.keys)
            })
        }
    }

    /**
     *{@link addToBlacklist} 的接口监听
     *@param code   接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param userId 用户 ID
     */
    setOnBlacklistAddedListener(listener?: (code: number, userId: string) => void): void {
        const eventName = 'IRCIMIWListener:onBlacklistAdded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, userId: string}) => {
                logger.logObject('onBlacklistAdded', data);
                listener(data.code, data.userId)
            })
        }
    }

    /**
     *{@link removeFromBlacklist} 的接口监听
     *@param code   接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param userId 用户 ID
     */
    setOnBlacklistRemovedListener(listener?: (code: number, userId: string) => void): void {
        const eventName = 'IRCIMIWListener:onBlacklistRemoved'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, userId: string}) => {
                logger.logObject('onBlacklistRemoved', data);
                listener(data.code, data.userId)
            })
        }
    }

    /**
     *{@link loadBlacklistStatus} 的接口监听
     *@param code   接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param userId 用户 ID
     *@param status 当前状态
     */
    setOnBlacklistStatusLoadedListener(listener?: (code: number, userId: string, status: RCIMIWBlacklistStatus) => void): void {
        const eventName = 'IRCIMIWListener:onBlacklistStatusLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, userId: string, status: RCIMIWBlacklistStatus}) => {
                logger.logObject('onBlacklistStatusLoaded', data);
                listener(data.code, data.userId, data.status)
            })
        }
    }

    /**
     *{@link loadBlacklist} 的接口监听
     *@param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param userIds 用户 ID 集合
     */
    setOnBlacklistLoadedListener(listener?: (code: number, userIds: Array<string>) => void): void {
        const eventName = 'IRCIMIWListener:onBlacklistLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, userIds: Array<string>}) => {
                logger.logObject('onBlacklistLoaded', data);
                listener(data.code, data.userIds)
            })
        }
    }

    /**
     *{@link searchMessages} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param keyword   搜索的关键字
     *@param startTime 查询 beginTime 之前的消息
     *@param count     查询的数量
     *@param messages  查询到的消息集合
     */
    setOnMessagesSearchedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string, keyword: string,
                                              startTime: number, count: number, messages: Array<RCIMIWMessage>) => void): void {
        const eventName = 'IRCIMIWListener:onMessagesSearched'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {
                                                                 code: number,
                                                                 type: RCIMIWConversationType,
                                                                 targetId: string,
                                                                 channelId: string,
                                                                 keyword: string,
                                                                 startTime: number,
                                                                 count: number,
                                                                 messages: Array<RCIMIWMessage>
                                                             }) => {
                logger.logObject('onMessagesSearched', data);
                listener(data.code, data.type, data.targetId, data.channelId, data.keyword, data.startTime, data.count, data.messages)
            })
        }
    }

    /**
     *{@link searchMessagesByTimeRange} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param keyword   搜索的关键字
     *@param startTime 开始时间
     *@param endTime   结束时间
     *@param offset    偏移量
     *@param count     查询的数量
     *@param messages  查询到的消息集合
     */
    setOnMessagesSearchedByTimeRangeListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                                         keyword: string, startTime: number, endTime: number, offset: number, count: number,
                                                         messages: Array<RCIMIWMessage>) => void): void {
        const eventName = 'IRCIMIWListener:onMessagesSearchedByTimeRange'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {
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
                                                             }) => {
                logger.logObject('onMessagesSearchedByTimeRange', data);
                listener(data.code, data.type, data.targetId, data.channelId, data.keyword, data.startTime, data.endTime, data.offset, data.count,
                         data.messages)
            })
        }
    }

    /**
     *{@link searchMessagesByUserId} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param userId    用户 id
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param startTime 查询记录的起始时间
     *@param count     查询的数量
     *@param messages  查询到的消息集合
     */
    setOnMessagesSearchedByUserIdListener(listener?: (code: number, userId: string, type: RCIMIWConversationType, targetId: string, channelId: string,
                                                      startTime: number, count: number, messages: Array<RCIMIWMessage>) => void): void {
        const eventName = 'IRCIMIWListener:onMessagesSearchedByUserId'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {
                                                                 code: number,
                                                                 userId: string,
                                                                 type: RCIMIWConversationType,
                                                                 targetId: string,
                                                                 channelId: string,
                                                                 startTime: number,
                                                                 count: number,
                                                                 messages: Array<RCIMIWMessage>
                                                             }) => {
                logger.logObject('onMessagesSearchedByUserId', data);
                listener(data.code, data.userId, data.type, data.targetId, data.channelId, data.startTime, data.count, data.messages)
            })
        }
    }

    /**
     *{@link searchConversations} 的接口监听
     *@param code              接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param conversationTypes 会话类型集合
     *@param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param messageTypes      搜索的消息类型
     *@param keyword           搜索的关键字
     *@param conversations     查询到的会话集合
     */
    setOnConversationsSearchedListener(listener?: (code: number, conversationTypes: Array<RCIMIWConversationType>, channelId: string,
                                                   messageTypes: Array<RCIMIWMessageType>, keyword: string,
                                                   conversations: Array<RCIMIWSearchConversationResult>) => void): void {
        const eventName = 'IRCIMIWListener:onConversationsSearched'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {
                                                                 code: number,
                                                                 conversationTypes: Array<RCIMIWConversationType>,
                                                                 channelId: string,
                                                                 messageTypes: Array<RCIMIWMessageType>,
                                                                 keyword: string,
                                                                 conversations: Array<RCIMIWSearchConversationResult>
                                                             }) => {
                logger.logObject('onConversationsSearched', data);
                listener(data.code, data.conversationTypes, data.channelId, data.messageTypes, data.keyword, data.conversations)
            })
        }
    }

    /**
     *sendGroupReadReceiptRequest 的接口监听
     *@param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param message 需要请求已读回执的消息
     */
    setOnGroupReadReceiptRequestSentListener(listener?: (code: number, message: RCIMIWMessage) => void): void {
        const eventName = 'IRCIMIWListener:onGroupReadReceiptRequestSent'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, message: RCIMIWMessage}) => {
                logger.logObject('onGroupReadReceiptRequestSent', data);
                listener(data.code, data.message)
            })
        }
    }

    /**
     *{@link sendGroupReadReceiptResponse} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param messages  会话中需要发送已读回执的消息列表
     */
    setOnGroupReadReceiptResponseSentListener(listener
                                              ?: (code: number, targetId: string, channelId: string, messages: Array<RCIMIWMessage>) => void): void {
        const eventName = 'IRCIMIWListener:onGroupReadReceiptResponseSent'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName,
                                                  (data: {code: number, targetId: string, channelId: string, messages: Array<RCIMIWMessage>}) => {
                                                      logger.logObject('onGroupReadReceiptResponseSent', data);
                                                      listener(data.code, data.targetId, data.channelId, data.messages)
                                                  })
        }
    }

    /**
     *{@link changeNotificationQuietHours} 的接口回调
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param startTime 开始消息免打扰时间
     *@param spanMins  需要消息免打扰分钟数，0 < spanMins < 1440（ 比如，您设置的起始时间是 00：00， 结束时间为 01:00，则 spanMins 为 60 分钟。设置为
     *    1439 代表全天免打扰 （23  60 + 59 = 1439 ））
     */
    setOnNotificationQuietHoursChangedListener(listener?: (code: number, startTime: string, spanMins: number,
                                                           level: RCIMIWPushNotificationQuietHoursLevel) => void): void {
        const eventName = 'IRCIMIWListener:onNotificationQuietHoursChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, startTime: string, spanMins: number, level: RCIMIWPushNotificationQuietHoursLevel}) => {
                    logger.logObject('onNotificationQuietHoursChanged', data);
                    listener(data.code, data.startTime, data.spanMins, data.level)
                })
        }
    }

    /**
     *{@link removeNotificationQuietHours} 的接口回调
     *@param code 接口回调的状态码，0 代表成功，非 0 代表出现异常
     */
    setOnNotificationQuietHoursRemovedListener(listener?: (code: number) => void): void {
        const eventName = 'IRCIMIWListener:onNotificationQuietHoursRemoved'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number}) => {
                logger.logObject('onNotificationQuietHoursRemoved', data);
                listener(data.code)
            })
        }
    }

    /**
     *{@link loadNotificationQuietHours} 的接口回调
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param startTime 开始消息免打扰时间
     *@param spanMins  已设置的屏蔽时间分钟数，0 < spanMins < 1440]
     */
    setOnNotificationQuietHoursLoadedListener(listener?: (code: number, startTime: string, spanMins: number,
                                                          level: RCIMIWPushNotificationQuietHoursLevel) => void): void {
        const eventName = 'IRCIMIWListener:onNotificationQuietHoursLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, startTime: string, spanMins: number, level: RCIMIWPushNotificationQuietHoursLevel}) => {
                    logger.logObject('onNotificationQuietHoursLoaded', data);
                    listener(data.code, data.startTime, data.spanMins, data.level)
                })
        }
    }

    /**
     *{@link changeConversationNotificationLevel} 的接口回调
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param level     消息通知级别
     */
    setOnConversationNotificationLevelChangedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                                                  level: RCIMIWPushNotificationLevel) => void): void {
        const eventName = 'IRCIMIWListener:onConversationNotificationLevelChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName,
                (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, level: RCIMIWPushNotificationLevel}) => {
                    logger.logObject('onConversationNotificationLevelChanged', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.level)
                })
        }
    }

    /**
     *{@link loadConversationNotificationLevel} 的接口回调
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param level     当前会话的消息通知级别
     */
    setOnConversationNotificationLevelLoadedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                                                 level: RCIMIWPushNotificationLevel) => void): void {
        const eventName = 'IRCIMIWListener:onConversationNotificationLevelLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName,
                (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, level: RCIMIWPushNotificationLevel}) => {
                    logger.logObject('onConversationNotificationLevelLoaded', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.level)
                })
        }
    }

    /**
     *{@link changeConversationTypeNotificationLevel} 的接口回调
     *@param code  接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type  会话类型
     *@param level 消息通知级别
     */
    setOnConversationTypeNotificationLevelChangedListener(listener?: (code: number, type: RCIMIWConversationType,
                                                                      level: RCIMIWPushNotificationLevel) => void): void {
        const eventName = 'IRCIMIWListener:onConversationTypeNotificationLevelChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName,
                                                  (data: {code: number, type: RCIMIWConversationType, level: RCIMIWPushNotificationLevel}) => {
                                                      logger.logObject('onConversationTypeNotificationLevelChanged', data);
                                                      listener(data.code, data.type, data.level)
                                                  })
        }
    }

    /**
     *{@link loadConversationTypeNotificationLevel} 的接口回调
     *@param code  接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type  会话类型
     *@param level 消息通知级别
     */
    setOnConversationTypeNotificationLevelLoadedListener(listener?: (code: number, type: RCIMIWConversationType,
                                                                     level: RCIMIWPushNotificationLevel) => void): void {
        const eventName = 'IRCIMIWListener:onConversationTypeNotificationLevelLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName,
                                                  (data: {code: number, type: RCIMIWConversationType, level: RCIMIWPushNotificationLevel}) => {
                                                      logger.logObject('onConversationTypeNotificationLevelLoaded', data);
                                                      listener(data.code, data.type, data.level)
                                                  })
        }
    }

    /**
     *{@link changeUltraGroupDefaultNotificationLevel} 的接口回调
     *@param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId 会话 ID
     *@param level    消息通知级别
     */
    setOnUltraGroupDefaultNotificationLevelChangedListener(listener
                                                           ?: (code: number, targetId: string, level: RCIMIWPushNotificationLevel) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupDefaultNotificationLevelChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, targetId: string, level: RCIMIWPushNotificationLevel}) => {
                logger.logObject('onUltraGroupDefaultNotificationLevelChanged', data);
                listener(data.code, data.targetId, data.level)
            })
        }
    }

    /**
     *{@link loadUltraGroupDefaultNotificationLevel} 的接口回调
     *@param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId 会话 ID
     *@param level    消息通知级别
     */
    setOnUltraGroupDefaultNotificationLevelLoadedListener(listener
                                                          ?: (code: number, targetId: string, level: RCIMIWPushNotificationLevel) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupDefaultNotificationLevelLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, targetId: string, level: RCIMIWPushNotificationLevel}) => {
                logger.logObject('onUltraGroupDefaultNotificationLevelLoaded', data);
                listener(data.code, data.targetId, data.level)
            })
        }
    }

    /**
     *{@link changeUltraGroupChannelDefaultNotificationLevel} 的接口回调
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用。
     *@param level     消息通知级别
     */
    setOnUltraGroupChannelDefaultNotificationLevelChangedListener(listener?: (code: number, targetId: string, channelId: string,
                                                                              level: RCIMIWPushNotificationLevel) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupChannelDefaultNotificationLevelChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName,
                                                  (data: {code: number, targetId: string, channelId: string, level: RCIMIWPushNotificationLevel}) => {
                                                      logger.logObject('onUltraGroupChannelDefaultNotificationLevelChanged', data);
                                                      listener(data.code, data.targetId, data.channelId, data.level)
                                                  })
        }
    }

    /**
     *{@link loadUltraGroupChannelDefaultNotificationLevel} 的接口回调
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用。
     *@param level     消息通知级别
     */
    setOnUltraGroupChannelDefaultNotificationLevelLoadedListener(listener?: (code: number, targetId: string, channelId: string,
                                                                             level: RCIMIWPushNotificationLevel) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupChannelDefaultNotificationLevelLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName,
                                                  (data: {code: number, targetId: string, channelId: string, level: RCIMIWPushNotificationLevel}) => {
                                                      logger.logObject('onUltraGroupChannelDefaultNotificationLevelLoaded', data);
                                                      listener(data.code, data.targetId, data.channelId, data.level)
                                                  })
        }
    }

    /**
     *{@link changePushContentShowStatus} 的接口监听
     *@param code        接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param showContent 是否显示远程推送内容
     */
    setOnPushContentShowStatusChangedListener(listener?: (code: number, showContent: boolean) => void): void {
        const eventName = 'IRCIMIWListener:onPushContentShowStatusChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, showContent: boolean}) => {
                logger.logObject('onPushContentShowStatusChanged', data);
                listener(data.code, data.showContent)
            })
        }
    }

    /**
     *{@link changePushLanguage} 的接口监听
     *@param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param language 推送语言
     */
    setOnPushLanguageChangedListener(listener?: (code: number, language: string) => void): void {
        const eventName = 'IRCIMIWListener:onPushLanguageChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, language: string}) => {
                logger.logObject('onPushLanguageChanged', data);
                listener(data.code, data.language)
            })
        }
    }

    /**
     *{@link changePushReceiveStatus} 的接口监听
     *@param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param receive 是否接收
     */
    setOnPushReceiveStatusChangedListener(listener?: (code: number, receive: boolean) => void): void {
        const eventName = 'IRCIMIWListener:onPushReceiveStatusChanged'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, receive: boolean}) => {
                logger.logObject('onPushReceiveStatusChanged', data);
                listener(data.code, data.receive)
            })
        }
    }

    /**
     *{@link loadMessageCount} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type      会话类型
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param count     消息的数量
     */
    setOnMessageCountLoadedListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string, channelId: string,
                                                count: number) => void): void {
        const eventName = 'IRCIMIWListener:onMessageCountLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, type: RCIMIWConversationType, targetId: string, channelId: string, count: number}) => {
                    logger.logObject('onMessageCountLoaded', data);
                    listener(data.code, data.type, data.targetId, data.channelId, data.count)
                })
        }
    }

    /**
     *@param code              接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param conversationTypes 会话类型集合
     *@param channelId         频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param conversations     加载的会话集合
     */
    setOnTopConversationsLoadedListener(listener?: (code: number, conversationTypes: Array<RCIMIWConversationType>, channelId: string,
                                                    conversations: Array<RCIMIWConversation>) => void): void {
        const eventName = 'IRCIMIWListener:onTopConversationsLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {
                                                                 code: number,
                                                                 conversationTypes: Array<RCIMIWConversationType>,
                                                                 channelId: string,
                                                                 conversations: Array<RCIMIWConversation>
                                                             }) => {
                logger.logObject('onTopConversationsLoaded', data);
                listener(data.code, data.conversationTypes, data.channelId, data.conversations)
            })
        }
    }

    /**
     *{@link sendGroupMessageToDesignatedUsers} 的接口回调
     *消息存入数据库的回调
     *@param message 发送的消息内容
     */
    setOnGroupMessageToDesignatedUsersAttachedListener(listener?: (message: RCIMIWMessage) => void): void {
        const eventName = 'IRCIMIWListener:onGroupMessageToDesignatedUsersAttached'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {message: RCIMIWMessage}) => {
                logger.logObject('onGroupMessageToDesignatedUsersAttached', data);
                listener(data.message)
            })
        }
    }

    /**
     *{@link sendGroupMessageToDesignatedUsers} 的接口回调
     *消息发送完成的回调
     *@param code    接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param message 发送的消息内容
     */
    setOnGroupMessageToDesignatedUsersSentListener(listener?: (code: number, message: RCIMIWMessage) => void): void {
        const eventName = 'IRCIMIWListener:onGroupMessageToDesignatedUsersSent'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, message: RCIMIWMessage}) => {
                logger.logObject('onGroupMessageToDesignatedUsersSent', data);
                listener(data.code, data.message)
            })
        }
    }

    /**
     *{@link syncUltraGroupReadStatus} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param timestamp 已读时间
     */
    setOnUltraGroupReadStatusSyncedListener(listener?: (code: number, targetId: string, channelId: string, timestamp: number) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupReadStatusSynced'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, targetId: string, channelId: string, timestamp: number}) => {
                logger.logObject('onUltraGroupReadStatusSynced', data);
                listener(data.code, data.targetId, data.channelId, data.timestamp)
            })
        }
    }

    /**
     *{@link loadConversationsForAllChannel} 的接口监听
     *@param code          接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param type          会话类型
     *@param targetId      会话 ID
     *@param conversations 获取到的会话集合
     */
    setOnConversationsLoadedForAllChannelListener(listener?: (code: number, type: RCIMIWConversationType, targetId: string,
                                                              conversations: Array<RCIMIWConversation>) => void): void {
        const eventName = 'IRCIMIWListener:onConversationsLoadedForAllChannel'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, type: RCIMIWConversationType, targetId: string, conversations: Array<RCIMIWConversation>}) => {
                    logger.logObject('onConversationsLoadedForAllChannel', data);
                    listener(data.code, data.type, data.targetId, data.conversations)
                })
        }
    }

    /**
     *{@link loadUltraGroupUnreadMentionedCount} 的接口监听
     *@param code     接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId 会话 ID
     *@param count    未读数量
     */
    setOnUltraGroupUnreadMentionedCountLoadedListener(listener?: (code: number, targetId: string, count: number) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupUnreadMentionedCountLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, targetId: string, count: number}) => {
                logger.logObject('onUltraGroupUnreadMentionedCountLoaded', data);
                listener(data.code, data.targetId, data.count)
            })
        }
    }

    /**
     *
     */
    setOnUltraGroupUnreadCountLoadedListener(listener?: (code: number, targetId: string, count: number) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupUnreadCountLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, targetId: string, count: number}) => {
                logger.logObject('onUltraGroupUnreadCountLoaded', data);
                listener(data.code, data.targetId, data.count)
            })
        }
    }

    /**
     *{@link modifyUltraGroupMessage} 的接口监听
     *@param code       接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param messageUId 消息的 messageUid
     */
    setOnUltraGroupMessageModifiedListener(listener?: (code: number, messageUId: string) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupMessageModified'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, messageUId: string}) => {
                logger.logObject('onUltraGroupMessageModified', data);
                listener(data.code, data.messageUId)
            })
        }
    }

    /**
     *{@link recallUltraGroupMessage} 的接口监听
     *@param code         接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param message      撤回的消息
     *@param deleteRemote 调用接口时传入的是否删除远端消息
     */
    setOnUltraGroupMessageRecalledListener(listener?: (code: number, message: RCIMIWMessage, deleteRemote: boolean) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupMessageRecalled'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, message: RCIMIWMessage, deleteRemote: boolean}) => {
                logger.logObject('onUltraGroupMessageRecalled', data);
                listener(data.code, data.message, data.deleteRemote)
            })
        }
    }

    /**
     *{@link clearUltraGroupMessages} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId  会话 ID
     *@param channelId 频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param timestamp 时间戳
     *@param policy    清除策略
     */
    setOnUltraGroupMessagesClearedListener(listener?: (code: number, targetId: string, channelId: string, timestamp: number,
                                                       policy: RCIMIWMessageOperationPolicy) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupMessagesCleared'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, targetId: string, channelId: string, timestamp: number, policy: RCIMIWMessageOperationPolicy}) => {
                    logger.logObject('onUltraGroupMessagesCleared', data);
                    listener(data.code, data.targetId, data.channelId, data.timestamp, data.policy)
                })
        }
    }

    /**
     *{@link clearUltraGroupMessagesForAllChannel} 的接口监听
     *@param code      接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId  会话 ID
     *@param timestamp 时间戳
     */
    setOnUltraGroupMessagesClearedForAllChannelListener(listener?: (code: number, targetId: string, timestamp: number) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupMessagesClearedForAllChannel'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, targetId: string, timestamp: number}) => {
                logger.logObject('onUltraGroupMessagesClearedForAllChannel', data);
                listener(data.code, data.targetId, data.timestamp)
            })
        }
    }

    /**
     *{@link sendUltraGroupTypingStatus} 的接口监听
     *@param code         接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param targetId     会话 ID
     *@param channelId    频道 ID，仅支持超级群使用，其他会话类型传 null 即可。
     *@param typingStatus
     */
    setOnUltraGroupTypingStatusSentListener(listener?: (code: number, targetId: string, channelId: string,
                                                        typingStatus: RCIMIWUltraGroupTypingStatus) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupTypingStatusSent'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, targetId: string, channelId: string, typingStatus: RCIMIWUltraGroupTypingStatus}) => {
                    logger.logObject('onUltraGroupTypingStatusSent', data);
                    listener(data.code, data.targetId, data.channelId, data.typingStatus)
                })
        }
    }

    /**
     *{@link loadBatchRemoteUltraGroupMessages} 的接口监听
     *@param code               接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param matchedMessages    从服务获取的消息列表
     *@param notMatchedMessages 非法参数或者从服务没有拿到对应消息
     */
    setOnBatchRemoteUltraGroupMessagesLoadedListener(listener?: (code: number, matchedMessages: Array<RCIMIWMessage>,
                                                                 notMatchedMessages: Array<RCIMIWMessage>) => void): void {
        const eventName = 'IRCIMIWListener:onBatchRemoteUltraGroupMessagesLoaded'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(
                eventName, (data: {code: number, matchedMessages: Array<RCIMIWMessage>, notMatchedMessages: Array<RCIMIWMessage>}) => {
                    logger.logObject('onBatchRemoteUltraGroupMessagesLoaded', data);
                    listener(data.code, data.matchedMessages, data.notMatchedMessages)
                })
        }
    }

    /**
     *{@link updateUltraGroupMessageExpansion} 的接口监听
     *@param code       接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param expansion  更新的消息扩展信息键值对
     *@param messageUId 消息的 messageUid
     */
    setOnUltraGroupMessageExpansionUpdatedListener(listener?: (code: number, expansion: Map<string, string>, messageUId: string) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupMessageExpansionUpdated'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, expansion: any, messageUId: string}) => {
                logger.logObject('onUltraGroupMessageExpansionUpdated', data);
                let _expansion = new Map<string, string>(Object.entries(data.expansion))
                listener(data.code, _expansion, data.messageUId)
            })
        }
    }

    /**
     *{@link removeUltraGroupMessageExpansion} 的接口监听
     *@param code       接口回调的状态码，0 代表成功，非 0 代表出现异常
     *@param messageUId 消息的 messageUid
     *@param keys       消息扩展信息中待删除的 key 的列表
     */
    setOnUltraGroupMessageExpansionRemovedListener(listener?: (code: number, messageUId: string, keys: Array<string>) => void): void {
        const eventName = 'IRCIMIWListener:onUltraGroupMessageExpansionRemoved'
        RCReactNativeEventEmitter.removeAllListeners(eventName)
        if (listener) {
            RCReactNativeEventEmitter.addListener(eventName, (data: {code: number, messageUId: string, keys: Array<string>}) => {
                logger.logObject('onUltraGroupMessageExpansionRemoved', data);
                listener(data.code, data.messageUId, data.keys)
            })
        }
    }
}
