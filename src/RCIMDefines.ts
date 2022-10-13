export interface RCIMIWAndroidPushOptions {
    /**
     *Android 平台 Push 唯一标识。
     *目前支持小米、华为推送平台，默认开发者不需要进行设置。
     *当消息产生推送时，消息的 messageUId 作为 notificationId 使用。
     */
    notificationId?: string;

    /**
     *小米的渠道 ID
     *该条消息针对小米使用的推送渠道。
     */
    channelIdMi?: string;

    /**
     *华为的渠道 ID
     *该条消息针对华为使用的推送渠道，如开发者集成了华为推送，需要指定 channelId 时，可向 Android 端研发人员获取，channelId 由开发者自行创建。
     */
    channelIdHW?: string;

    /**
     *OPPO 的渠道 ID。
     *该条消息针对 OPPO 使用的推送渠道，如开发者集成了 OPPO 推送，需要指定 channelId 时，可向 Android 端研发人员获取，channelId 由开发者自行创建。
     */
    channelIdOPPO?: string;

    /**
     *VIVO 推送通道类型 开发者集成了 VIVO 推送，需要指定推送类型时，可进行设置。
     */
    pushTypeVIVO?: RCIMIWVIVOPushType;

    /**
     *FCM 通知类型推送时所使用的分组 id
     */
    collapseKeyFCM?: string;

    /**
     *FCM 通知类型的推送所使用的通知图片 url
     */
    imageUrlFCM?: string;

    /**
     *华为推送消息级别
     */
    importanceHW?: RCIMIWImportanceHW;

    /**
     *华为通知栏消息右侧大图标 URL，如果不设置，则不展示通知栏右侧图标。
     *URL使用的协议必须是HTTPS协议，取值样例：https://example.com/image.png。图标文件须小于 512KB，图标建议规格大小：40dp x 40dp，弧角大小为 8dp，超出建议规格大小的图标会存在图片压缩或显示不全的情况。
     */
    imageUrlHW?: string;

    /**
     *小米 Large icon 链接
     *Large icon 可以出现在大图版和多字版消息中，显示在右边。国内版仅 MIUI12 以上版本支持，以下版本均不支持；国际版支持。
     *图片要求：大小 120  120px，格式为 png 或者 jpg 格式
     */
    imageUrlMi?: string;

    /**
     *FCM 通知的频道 ID，该应用程序必须使用此频道 ID 创建一个频道，然后才能收到带有该频道 ID 的任何通知。
     *如果您未在请求中发送此频道 ID，或者如果应用尚未创建提供的频道 ID，则 FCM 使用应用清单中指定的频道 ID。
     */
    channelIdFCM?: string;
}

export interface RCIMIWMessagePushOptions {
    /**
     *是否发送通知
     *@return
     */
    disableNotification?: boolean;

    /**
     *通知栏是否屏蔽通知标题
     *true 不显示通知标题，false 显示通知标题
     *默认情况下融云单聊消息通知标题为用户名、群聊消息为群名称，设置后不会再显示通知标题。
     *此属性只针目标用户为iOS 平台时有效，Android 第三方推送平台的通知标题为必填项，所以暂不支持。
     */
    disablePushTitle?: boolean;

    /**
     *推送标题
     *默认标题显示规则：内置消息：单聊通知标题显示为发送者名称，群聊通知标题显示为群名称。 自定义消息：默认不显示标题。
     *@return
     */
    pushTitle?: string;

    /**
     *推送内容。
     *@return
     */
    pushContent?: string;

    /**
     *远程推送附加信息.
     *@return
     */
    pushData?: string;

    /**
     *是否强制显示通知详情。 当目标用户设置推送不显示消息详情时， 可通过此功能，强制设置该条消息显示推送详情。
     *@return
     */
    forceShowDetailContent?: boolean;

    /**
     *推送模板 ID
     *设置后根据目标用户通过 setPushLanguageCode 设置的语言环境，匹配模板中设置的语言内容进行推送
     *未匹配成功时使用默认内容进行推送,模板内容在“开发者后台-自定义推送文案”中进行设置 注：RCMessagePushConfig 中的 Title 和 PushContent
     *优先级高于模板 ID（templateId）中对应的标题和推送内容
     *@return
     */
    templateId?: string;

    /**
     *如果对端设备是 iOS，设置 isVoIPPush 为 True，会走 VoIP 通道推送 Push。
     *@return
     */
    voIPPush?: boolean;

    /**
     *iOS 平台相关配置
     *@return
     */
    iOSPushOptions?: RCIMIWIOSPushOptions;

    /**
     *Android 平台相关配置
     *@return
     */
    androidPushOptions?: RCIMIWAndroidPushOptions;
}

export interface RCIMIWIOSPushOptions {
    /**
     *iOS 平台通知栏分组 ID 相同的 thread-id 推送分为一组 iOS10 开始支持
     *@return
     */
    threadId?: string;

    /**
     *iOS 富文本推送的类型开发者自己定义，自己在 App 端进行解析判断，与 richMediaUri 一起使用，当设置 category 后，推送时默认携带 mutable-content 进行推送，属性值为 1。
     *如果不设置后台默认取消息类型字符串，如RC:TxtMsg
     *@return
     */
    category?: string;

    /**
     *iOS 平台通知覆盖 ID apnsCollapseId 相同时，新收到的通知会覆盖老的通知，最大 64 字节 iOS10 开始支持
     *@return
     */
    apnsCollapseId?: string;

    /**
     *iOS 富文本推送内容的 URL，与 category 一起使用。
     *@return
     */
    richMediaUri?: string;
}

export interface RCIMIWCompressOptions {
    /**
     *原图压缩比
     */
    originalImageQuality?: number;

    /**
     *原图最长边的最大宽度
     */
    originalImageSize?: number;

    /**
     *原图大小限制 配置发送图片时，如果图片大小不超过则发送原图
     */
    originalImageMaxSize?: number;

    /**
     *缩略图压缩比例
     */
    thumbnailQuality?: number;

    /**
     *缩略图压缩宽、高
     */
    thumbnailMaxSize?: number;

    /**
     *缩略图压缩最小宽、高
     */
    thumbnailMinSize?: number;

    /**
     *小视频压缩宽度,建议使用16的倍数
     */
    sightCompressWidth?: number;

    /**
     *小视频压缩高度，建议使用16的倍数
     */
    sightCompressHeight?: number;

    /**
     *位置消息缩略图压缩比例
     */
    locationThumbnailQuality?: number;

    /**
     *位置消息压缩的宽度
     */
    locationThumbnailWidth?: number;

    /**
     *位置消息压缩的高度
     */
    locationThumbnailHeight?: number;
}

export interface RCIMIWEngineOptions {
    /**
     *私有部署的导航服务器地址。
     */
    naviServer?: string;

    /**
     *私有部署的媒体服务器地址，即文件和图片的上传地址。使用私有云时必须填写。
     */
    fileServer?: string;

    /**
     *配置数据上传地址
     */
    statisticServer?: string;

    /**
     *设置断线重连时是否踢出重连设备。
     *用户没有开通多设备登录功能的前提下，同一个账号在一台新设备上登录的时候，会把这个账号在之前登录的设备上踢出。
     */
    kickReconnectDevice?: boolean;

    /**
     *压缩项配置
     */
    compressOptions?: RCIMIWCompressOptions;

    /**
     *Android 推送参数配置
     */
    pushOptions?: RCIMIWPushOptions;
}

export interface RCIMIWUnknownMessage extends RCIMIWMessage {
    /**
     *消息数据
     */
    rawData?: string;

    /**
     *消息的标识
     */
    objectName?: string;
}

export interface RCIMIWUserInfo {
    /**
     *用户 id。
     *@return
     */
    userId?: string;

    /**
     *名称（昵称）。
     *@return
     */
    name?: string;

    /**
     *用户头像地址。
     *@return
     */
    portrait?: string;

    /**
     *备注
     *@return
     */
    alias?: string;

    /**
     *附加信息。
     *@return
     */
    extra?: string;
}

export interface RCIMIWCustomMessage extends RCIMIWMessage {
    /**
     *自定义消息的标识符
     */
    identifier?: string;

    /**
     *自定义的消息存储策略
     *@return
     */
    policy?: RCIMIWCustomMessagePolicy;

    /**
     *自定义消息的键值对
     *@return
     */
    fields?: { [propName: string]: string };
}

export interface RCIMIWMessage {
    /**
     *会话类型
     */
    conversationType?: RCIMIWConversationType;

    /**
     *消息的类型
     *@return
     */
    messageType?: RCIMIWMessageType;

    /**
     *会话 ID
     */
    targetId?: string;

    /**
     *所属会话的业务标识，长度限制 20 字符
     *@return
     */
    channelId?: string;

    /**
     *本地存储的消息的唯一值（数据库索引唯一值）
     *@return
     */
    messageId?: number;

    /**
     *服务器消息唯一 ID（在同一个 Appkey 下全局唯一）
     */
    messageUId?: string;

    /**
     *是否是离线消息，只在接收消息的回调方法中有效，如果消息为离线消息，则为 YES ，其他情况均为 NO
     */
    offLine?: boolean;

    /**
     *群阅读回执状态
     */
    groupReadReceiptInfo?: RCIMIWGroupReadReceiptInfo;

    /**
     *消息的接收时间（Unix 时间戳、毫秒）
     */
    receivedTime?: number;

    /**
     *消息的发送时间（Unix 时间戳、毫秒）
     */
    sentTime?: number;

    /**
     *消息的接收状态
     */
    receivedStatus?: RCIMIWReceivedStatus;

    /**
     *消息的发送状态
     */
    sentStatus?: RCIMIWSentStatus;

    /**
     *消息的发送者 ID
     */
    senderUserId?: string;

    /**
     *消息的方向
     */
    direction?: RCIMIWMessageDirection;

    /**
     *消息携带的用户信息
     */
    userInfo?: RCIMIWUserInfo;

    /**
     *消息的 @ 信息
     *@return
     */
    mentionedInfo?: RCIMIWMentionedInfo;

    /**
     *消息推送配置
     */
    pushOptions?: RCIMIWMessagePushOptions;

    /**
     *消息的附加字段
     */
    extra?: string;

    /**
     *消息扩展信息列表，该属性在消息发送时确定，发送之后不能再做修改
     *扩展信息只支持单聊和群组，其它会话类型不能设置扩展信息
     *默认消息扩展字典 key 长度不超过 32 ，value 长度不超过 4096 ，单次设置扩展数量最大为 20，消息的扩展总数不能超过 300
     */
    expansion?: { [propName: string]: string };
}

export interface RCIMIWImageMessage extends RCIMIWMediaMessage {
    /**
     *图片的缩略图数据
     */
    thumbnailBase64String?: string;

    /**
     *是否为原图
     */
    original?: boolean;
}

export interface RCIMIWFileMessage extends RCIMIWMediaMessage {
    /**
     *文件名
     */
    name?: string;

    /**
     *文件类型
     */
    fileType?: string;

    /**
     *文件大小，单位为 Byte
     */
    size?: number;
}

export interface RCIMIWRecallNotificationMessage extends RCIMIWMessage {
    /**
     *是否是管理员操作
     */
    admin?: boolean;

    /**
     *是否删除
     */
    deleted?: boolean;

    /**
     *撤回的时间（毫秒）
     */
    recallTime?: number;

    /**
     *撤回动作的时间（毫秒）
     */
    recallActionTime?: number;

    /**
     *被撤回的原消息
     */
    originalMessage?: RCIMIWMessage;
}

export interface RCIMIWMediaMessage extends RCIMIWMessage {
    /**
     *本地路径
     */
    local?: string;

    /**
     *远端路径
     */
    remote?: string;
}

export interface RCIMIWTextMessage extends RCIMIWMessage {
    /**
     *文本内容
     */
    text?: string;
}

export interface RCIMIWGIFMessage extends RCIMIWMediaMessage {
    /**
     *GIF 图的大小，单位字节
     */
    dataSize?: number;

    /**
     *GIF 图的宽
     */
    width?: number;

    /**
     *GIF 图的高
     */
    height?: number;
}

export interface RCIMIWCommandMessage extends RCIMIWMessage {
    /**
     *命令的名称
     */
    name?: string;

    /**
     *命令的扩展数据，可以为任意字符串，如存放您定义的json数据。
     */
    data?: string;
}

export interface RCIMIWVoiceMessage extends RCIMIWMediaMessage {
    /**
     *语音的长度，单位：秒
     */
    duration?: number;
}

export interface RCIMIWMentionedInfo {
    /**
     *@ 提醒的类型
     */
    type?: RCIMIWMentionedType;

    /**
     *@ 的用户 ID 列表
     */
    userIdList?: Array<string>;

    /**
     *包含 @ 提醒的消息，本地通知和远程推送显示的内容
     */
    mentionedContent?: string;
}

export interface RCIMIWCommandNotificationMessage extends RCIMIWMessage {
    /**
     *命令提醒的名称
     */
    name?: string;

    /**
     *命令提醒消息的扩展数据，可以为任意字符串，如存放您定义的 json 数据。
     */
    data?: string;
}

export interface RCIMIWSightMessage extends RCIMIWMediaMessage {
    /**
     *视频时长
     */
    duration?: number;

    /**
     *视频大小
     */
    size?: number;

    /**
     *视频的名称
     */
    name?: string;

    /**
     *缩略图数据
     */
    thumbnailBase64String?: string;
}

export interface RCIMIWLocationMessage extends RCIMIWMessage {
    /**
     *经度信息
     *@return
     */
    longitude?: number;

    /**
     *纬度信息
     *@return
     */
    latitude?: number;

    /**
     *POI 信息
     *@return
     */
    poiName?: string;

    /**
     *缩略图地址
     *@return
     */
    thumbnailPath?: string;
}

export interface RCIMIWReferenceMessage extends RCIMIWMessage {
    /**
     *引用文本
     */
    text?: string;

    /**
     *被引用的消息
     */
    referenceMessage?: RCIMIWMessage;
}

export interface RCIMIWBlockedMessageInfo {
    /**
     *封禁的会话类型
     */
    conversationType?: RCIMIWConversationType;

    /**
     *封禁的会话 ID
     */
    targetId?: string;

    /**
     *封禁的消息 Uid
     */
    blockedMsgUId?: string;

    /**
     *封禁的类型
     */
    blockType?: RCIMIWMessageBlockType;

    /**
     *封禁的附加信息
     */
    extra?: string;
}

export interface RCIMIWTypingStatus {
    /**
     *当前正在输入的用户 ID
     *@return
     */
    userId?: string;

    /**
     *当前正在输入的消息类型名，为发送方调用发送接口时传入的 currentType
     *@return
     */
    contentType?: string;

    /**
     *输入时间
     *@return
     */
    sentTime?: number;
}

export interface RCIMIWUltraGroupTypingStatusInfo {
    /**
     *会话 ID
     */
    targetId?: string;

    /**
     *所属会话的业务标识
     */
    channelId?: string;

    /**
     *用户id
     *@return
     */
    userId?: string;

    /**
     *用户数
     *@return
     */
    userNums?: number;

    /**
     *输入状态
     *@return
     */
    status?: RCIMIWUltraGroupTypingStatus;

    /**
     *服务端收到用户操作的上行时间.
     *@return
     */
    timestamp?: number;
}

export interface RCIMIWGroupReadReceiptInfo {
    /**
     *是否为需要回执的消息。 true: 需要回执的消息。 false: 普通消息。
     */
    readReceiptMessage?: boolean;

    /**
     *是否发送过消息回执响应。 仅对消息接收方有效。
     */
    hasRespond?: boolean;

    /**
     *会话中响应过该消息回执的成员 userId 列表。 key: userId value: respondTime
     */
    respondUserIds?: { [propName: string]: number };
}

export interface RCIMIWChatRoomMemberAction {
    /**
     *操作的用户
     */
    userId?: string;

    /**
     *事件类型
     */
    actionType?: RCIMIWChatRoomMemberActionType;
}

export interface RCIMIWSearchConversationResult {
    /**
     *获取会话的实体，用来容纳和存储客户端的会话信息，对应会话列表中的会话。
     */
    conversation?: RCIMIWConversation;

    /**
     *获取匹配会话数量
     */
    count?: number;
}

export interface RCIMIWConversation {
    /**
     *获取会话类型
     */
    conversationType?: RCIMIWConversationType;

    /**
     *会话 ID
     *@return
     */
    targetId?: string;

    /**
     *获取渠道 ID
     *@return
     */
    channelId?: string;

    /**
     *获取未读消息数。
     */
    unreadCount?: number;

    /**
     *获取本会话里自己被 @ 的消息数量。
     */
    mentionedCount?: number;

    /**
     *获取置顶状态
     */
    top?: boolean;

    /**
     *会话草稿
     *@return
     */
    draft?: string;

    /**
     *获取最后一条消息
     */
    lastMessage?: RCIMIWMessage;

    /**
     *会话的通知级别
     *@return
     */
    notificationLevel?: RCIMIWPushNotificationLevel;
}

export interface RCIMIWPushOptions {
    /**
     *
     */
    idMI?: string;

    /**
     *
     */
    appKeyMI?: string;

    /**
     *
     */
    appIdMeizu?: string;

    /**
     *
     */
    appKeyMeizu?: string;

    /**
     *
     */
    appKeyOPPO?: string;

    /**
     *
     */
    appSecretOPPO?: string;

    /**
     *
     */
    enableHWPush?: boolean;

    /**
     *
     */
    enableFCM?: boolean;

    /**
     *
     */
    enableVIVOPush?: boolean;
}

export enum RCIMIWImportanceHW {
    /**
     *表示消息为服务与通讯类。消息提醒方式为锁屏+铃声+震动。
     */
    NORMAL,

    /**
     *表示消息为资讯营销类。消息提醒方式为静默通知，仅在下拉通知栏展示。
     */
    LOW
}

export enum RCIMIWMessageOperationPolicy {
    /**
     *本地
     */
    LOCAL,

    /**
     *远端
     */
    REMOTE,

    /**
     *本地和远端
     */
    LOCAL_REMOTE
}

export enum RCIMIWVIVOPushType {
    /**
     *运营消息
     */
    OPERATE,

    /**
     *系统消息
     */
    SYSTEM
}

export enum RCIMIWSentStatus {
    /**
     *发送中
     */
    SENDING,

    /**
     *发送失败
     */
    FAILED,

    /**
     *已发送
     */
    SENT,

    /**
     *对方已接收
     */
    RECEIVED,

    /**
     *对方已读
     */
    READ,

    /**
     *对方已销毁
     */
    DESTROYED,

    /**
     *对方已取消
     */
    CANCELED
}

export enum RCIMIWPushNotificationQuietHoursLevel {
    /**
     *未设置（向上查询群或者APP级别设置） 存量数据中0表示未设置
     */
    NONE,

    /**
     *群聊超级群仅@消息通知，单聊代表消息不通知
     */
    MENTION_MESSAGE,

    /**
     *消息通知被屏蔽，即不接收消息通知
     */
    BLOCKED
}

export enum RCIMIWMessageDirection {
    /**
     *发送方
     */
    SEND,

    /**
     *接收方
     */
    RECEIVE
}

export enum RCIMIWReceivedStatus {
    /**
     *未读
     */
    UNREAD,

    /**
     *已读
     */
    READ,

    /**
     *已听
     */
    LISTENED,

    /**
     *已下载
     */
    DOWNLOADED,

    /**
     * 该消息已经被其他登录的多端收取过。（即该消息已经被其他端收取过后。当前端才登录，并重新拉取了这条消息。客户可以通过这个状态更新 UI，比如不再提示）
     */
    RETRIEVED,

    /**
     *该消息是被多端同时收取的。（即其他端正同时登录，一条消息被同时发往多端。客户可以通过这个状态值更新自己的某些 UI 状态）。
     */
    MULTIPLE_RECEIVE
}

export enum RCIMIWChatRoomMemberActionType {
    /**
     *未知
     */
    UNKNOWN,

    /**
     *已加入
     */
    JOIN,

    /**
     *已离开
     */
    LEAVE
}

export enum RCIMIWPushNotificationLevel {
    /**
     *全部消息通知（接收全部消息通知 -- 显示指定关闭免打扰功能）
     */
    ALL_MESSAGE,

    /**
     *未设置（向上查询群或者APP级别设置）//存量数据中0表示未设置
     */
    NONE,

    /**
     *群聊，超级群 @所有人 或者 @成员列表有自己 时通知；单聊代表消息不通知
     */
    MENTION,

    /**
     *群聊，超级群 @成员列表有自己时通知，@所有人不通知；单聊代表消息不通知
     */
    MENTION_USERS,

    /**
     *群聊，超级群 @所有人通知，其他情况都不通知；单聊代表消息不通知
     */
    MENTION_ALL,

    /**
     *消息通知被屏蔽，即不接收消息通知
     */
    BLOCKED
}

export enum RCIMIWMessageType {
    /**
     *无效类型
     */
    UNKNOWN,

    /**
     *自定义
     */
    CUSTOM,

    /**
     *文本
     */
    TEXT,

    /**
     *语音
     */
    VOICE,

    /**
     *图片
     */
    IMAGE,

    /**
     *文件
     */
    FILE,

    /**
     *小视频
     */
    SIGHT,

    /**
     *GIF 图
     */
    GIF,

    /**
     *撤回
     */
    RECALL,

    /**
     *引用
     */
    REFERENCE,

    /**
     *命令
     */
    COMMAND,

    /**
     *命令通知
     */
    COMMAND_NOTIFICATION,

    /**
     *位置消息
     */
    LOCATION
}

export enum RCIMIWMessageBlockType {
    /**
     *未知
     */
    UNKNOWN,

    /**
     *全局敏感词：命中了融云内置的全局敏感词
     */
    GLOBAL,

    /**
     *自定义敏感词拦截：命中了客户在融云自定义的敏感词
     */
    CUSTOM,

    /**
     *第三方审核拦截：命中了第三方（数美）或模板路由决定不下发的状态
     */
    THIRD_PARTY
}

export enum RCIMIWTimeOrder {
    /**
     *时间递减
     */
    BEFORE,

    /**
     *时间递增
     */
    AFTER
}

export enum RCIMIWCustomMessagePolicy {
    /**
     *客户端不存储，支持离线消息机制，不计入未读消息数
     */
    COMMAND,

    /**
     *客户端存储，支持离线消息机制，且存入服务端历史消息，计入未读消息数
     */
    NORMAL,

    /**
     *客户端不存储，服务端不存储，不计入未读消息数
     */
    STATUS,

    /**
     *客户端存储，支持离线消息机制，且存入服务端历史消息，不计入未读消息数
     */
    STORAGE
}

export enum RCIMIWChatRoomStatus {
    /**
     *聊天室被重置
     */
    RESET,

    /**
     *用户调用IM Server API 手动销毁聊天室
     */
    DESTROY_MANUAL,

    /**
     *IM Server 自动销毁聊天室
     */
    DESTROY_AUTO
}

export enum RCIMIWConversationType {
    /**
     *暂不支持
     */
    INVALID,

    /**
     *单聊
     */
    PRIVATE,

    /**
     *群聊
     */
    GROUP,

    /**
     *聊天室
     */
    CHATROOM,

    /**
     *系统会话
     */
    SYSTEM,

    /**
     *超级群
     */
    ULTRA_GROUP
}

export enum RCIMIWErrorCode {
    /**
     *
     */
    SUCCESS,

    /**
     *
     */
    PARAM_ERROR,

    /**
     *
     */
    ENGINE_DESTROYED,

    /**
     *
     */
    NATIVE_OPERATION_ERROR,

    /**
     *
     */
    RESULT_UNKNOWN
}

export enum RCIMIWUltraGroupTypingStatus {
    /**
     *正在输入文本
     */
    TEXT
}

export enum RCIMIWMentionedType {
    /**
     * @ 所有人
     */
    ALL,

    /**
     * @ 指定的人
     */
    PART
}

export enum RCIMIWChatRoomEntriesOperationType {
    /**
     *更新操作
     */
    Update,

    /**
     *删除操作
     */
    Remove
}

export enum RCIMIWLogLevel {
    /**
     *不输出任何日志
     */
    NONE,

    /**
     *只输出错误的日志
     */
    ERROR,

    /**
     *输出错误和警告的日志
     */
    WARN,

    /**
     *输出错误、警告和一般的日志
     */
    INFO,

    /**
     *输出输出错误、警告和一般的日志以及 debug 日志
     */
    DEBUG,

    /**
     *输出所有日志
     */
    VERBOSE
}

export enum RCIMIWBlacklistStatus {
    /**
     *未知
     */
    UNKNOWN,

    /**
     *在黑名单中
     */
    IN_BLACKLIST,

    /**
     *不在黑名单
     */
    NOT_IN_BLACKLIST
}

export enum RCIMIWConnectionStatus {
    /**
     *网络不可用
     */
    NETWORK_UNAVAILABLE,

    /**
     *连接成功
     */
    CONNECTED,

    /**
     *连接中
     */
    CONNECTING,

    /**
     *未连接
     */
    UNCONNECTED,

    /**
     *用户账户在其他设备登录，本机会被踢掉线
     */
    KICKED_OFFLINE_BY_OTHER_CLIENT,

    /**
     *Token 不正确
     */
    TOKEN_INCORRECT,

    /**
     *用户被开发者后台封禁
     */
    CONN_USER_BLOCKED,

    /**
     *用户主动调用 disconnect 或 logout 接口断开连接
     */
    SIGN_OUT,

    /**
     *连接暂时挂起（多是由于网络问题导致），SDK 会在合适时机进行自动重连
     */
    SUSPEND,

    /**
     *自动连接超时，SDK 将不会继续连接，用户需要做超时处理，再自行调用 connectWithToken 接口进行连接
     */
    TIMEOUT,

    /**
     *异常情况
     */
    UNKNOWN
}
