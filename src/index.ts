import {logger} from './Logger';
import {
    IRCIMIWAddChatRoomEntriesCallback,
    IRCIMIWAddChatRoomEntryCallback,
    IRCIMIWAddToBlacklistCallback,
    IRCIMIWCancelDownloadingMediaMessageCallback,
    IRCIMIWCancelSendingMediaMessageCallback,
    IRCIMIWChangeConversationNotificationLevelCallback,
    IRCIMIWChangeConversationTopStatusCallback,
    IRCIMIWChangeConversationTypeNotificationLevelCallback,
    IRCIMIWChangeMessageReceivedStatusCallback,
    IRCIMIWChangeMessageSentStatusCallback,
    IRCIMIWChangeNotificationQuietHoursCallback,
    IRCIMIWChangePushContentShowStatusCallback,
    IRCIMIWChangePushLanguageCallback,
    IRCIMIWChangePushReceiveStatusCallback,
    IRCIMIWChangeUltraGroupChannelDefaultNotificationLevelCallback,
    IRCIMIWChangeUltraGroupDefaultNotificationLevelCallback,
    IRCIMIWClearDraftMessageCallback,
    IRCIMIWClearMessagesCallback,
    IRCIMIWClearUltraGroupMessagesCallback,
    IRCIMIWClearUltraGroupMessagesForAllChannelCallback,
    IRCIMIWClearUnreadCountCallback,
    IRCIMIWConnectCallback,
    IRCIMIWDeleteLocalMessagesCallback,
    IRCIMIWDeleteMessagesCallback,
    IRCIMIWDownloadMediaMessageListener,
    IRCIMIWGetBatchRemoteUltraGroupMessagesCallback,
    IRCIMIWGetBlacklistCallback,
    IRCIMIWGetBlacklistStatusCallback,
    IRCIMIWGetBlockedConversationsCallback,
    IRCIMIWGetChatRoomAllEntriesCallback,
    IRCIMIWGetChatRoomEntryCallback,
    IRCIMIWGetChatRoomMessagesCallback,
    IRCIMIWGetConversationCallback,
    IRCIMIWGetConversationNotificationLevelCallback,
    IRCIMIWGetConversationsCallback,
    IRCIMIWGetConversationsForAllChannelCallback,
    IRCIMIWGetConversationTopStatusCallback,
    IRCIMIWGetConversationTypeNotificationLevelCallback,
    IRCIMIWGetDraftMessageCallback,
    IRCIMIWGetFirstUnreadMessageCallback,
    IRCIMIWGetMessageCallback,
    IRCIMIWGetMessageCountCallback,
    IRCIMIWGetMessagesCallback,
    IRCIMIWGetNotificationQuietHoursCallback,
    IRCIMIWGetTopConversationsCallback,
    IRCIMIWGetTotalUnreadCountCallback,
    IRCIMIWGetUltraGroupAllUnreadCountCallback,
    IRCIMIWGetUltraGroupAllUnreadMentionedCountCallback,
    IRCIMIWGetUltraGroupChannelDefaultNotificationLevelCallback,
    IRCIMIWGetUltraGroupDefaultNotificationLevelCallback,
    IRCIMIWGetUltraGroupUnreadCountCallback,
    IRCIMIWGetUltraGroupUnreadMentionedCountCallback,
    IRCIMIWGetUnreadCountByConversationTypesCallback,
    IRCIMIWGetUnreadCountCallback,
    IRCIMIWGetUnreadMentionedCountCallback,
    IRCIMIWGetUnreadMentionedMessagesCallback,
    IRCIMIWInsertMessageCallback,
    IRCIMIWInsertMessagesCallback,
    IRCIMIWJoinChatRoomCallback,
    IRCIMIWLeaveChatRoomCallback,
    IRCIMIWListener,
    IRCIMIWModifyUltraGroupMessageCallback,
    IRCIMIWObjectCallback,
    IRCIMIWRecallMessageCallback,
    IRCIMIWRecallUltraGroupMessageCallback,
    IRCIMIWRemoveChatRoomEntriesCallback,
    IRCIMIWRemoveChatRoomEntryCallback,
    IRCIMIWRemoveConversationCallback,
    IRCIMIWRemoveConversationsCallback,
    IRCIMIWRemoveFromBlacklistCallback,
    IRCIMIWRemoveMessageExpansionForKeysCallback,
    IRCIMIWRemoveNotificationQuietHoursCallback,
    IRCIMIWRemoveUltraGroupMessageExpansionForKeysCallback,
    IRCIMIWSaveDraftMessageCallback,
    IRCIMIWSearchConversationsCallback,
    IRCIMIWSearchMessagesByTimeRangeCallback,
    IRCIMIWSearchMessagesByUserIdCallback,
    IRCIMIWSearchMessagesCallback,
    IRCIMIWSendGroupMessageToDesignatedUsersCallback,
    IRCIMIWSendGroupReadReceiptRequestCallback,
    IRCIMIWSendGroupReadReceiptResponseCallback,
    IRCIMIWSendMediaMessageListener,
    IRCIMIWSendMessageCallback,
    IRCIMIWSendPrivateReadReceiptMessageCallback,
    IRCIMIWSendUltraGroupTypingStatusCallback,
    IRCIMIWSyncConversationReadStatusCallback,
    IRCIMIWSyncUltraGroupReadStatusCallback,
    IRCIMIWUpdateMessageExpansionCallback,
    IRCIMIWUpdateUltraGroupMessageExpansionCallback,
    RCIMIWAndroidPushOptions,
    RCIMIWBlacklistStatus,
    RCIMIWBlockedMessageInfo,
    RCIMIWChatRoomEntriesOperationType,
    RCIMIWChatRoomMemberAction,
    RCIMIWChatRoomMemberActionType,
    RCIMIWChatRoomStatus,
    RCIMIWCommandMessage,
    RCIMIWCommandNotificationMessage,
    RCIMIWCompressOptions,
    RCIMIWConnectCallback,
    RCIMIWConnectionStatus,
    RCIMIWConversation,
    RCIMIWConversationType,
    RCIMIWCustomMessage,
    RCIMIWCustomMessagePolicy,
    RCIMIWDownloadMediaMessageListener,
    RCIMIWEngineOptions,
    RCIMIWErrorCode,
    RCIMIWFileMessage,
    RCIMIWGIFMessage,
    RCIMIWGroupReadReceiptInfo,
    RCIMIWImageMessage,
    RCIMIWImportanceHW,
    RCIMIWIOSPushOptions,
    RCIMIWLocationMessage,
    RCIMIWLogLevel,
    RCIMIWMediaMessage,
    RCIMIWMentionedInfo,
    RCIMIWMentionedType,
    RCIMIWMessage,
    RCIMIWMessageBlockType,
    RCIMIWMessageDirection,
    RCIMIWMessageOperationPolicy,
    RCIMIWMessagePushOptions,
    RCIMIWMessageType,
    RCIMIWPushNotificationLevel,
    RCIMIWPushNotificationQuietHoursLevel,
    RCIMIWPushOptions,
    RCIMIWRecallNotificationMessage,
    RCIMIWReceivedStatus,
    RCIMIWReferenceMessage,
    RCIMIWSearchConversationResult,
    RCIMIWSendGroupMessageToDesignatedUsersCallback,
    RCIMIWSendMediaMessageListener,
    RCIMIWSendMessageCallback,
    RCIMIWSentStatus,
    RCIMIWSightMessage,
    RCIMIWTextMessage,
    RCIMIWTimeOrder,
    RCIMIWTypingStatus,
    RCIMIWUltraGroupTypingStatus,
    RCIMIWUltraGroupTypingStatusInfo,
    RCIMIWUnknownMessage,
    RCIMIWUserInfo,
    RCIMIWVIVOPushType,
    RCIMIWVoiceMessage
} from './RCIMDefines';
import {RCIMIWEngine} from './RCIMEngine';

export {
    IRCIMIWAddChatRoomEntriesCallback,
    IRCIMIWAddChatRoomEntryCallback,
    IRCIMIWAddToBlacklistCallback,
    IRCIMIWCancelDownloadingMediaMessageCallback,
    IRCIMIWCancelSendingMediaMessageCallback,
    IRCIMIWChangeConversationNotificationLevelCallback,
    IRCIMIWChangeConversationTopStatusCallback,
    IRCIMIWChangeConversationTypeNotificationLevelCallback,
    IRCIMIWChangeMessageReceivedStatusCallback,
    IRCIMIWChangeMessageSentStatusCallback,
    IRCIMIWChangeNotificationQuietHoursCallback,
    IRCIMIWChangePushContentShowStatusCallback,
    IRCIMIWChangePushLanguageCallback,
    IRCIMIWChangePushReceiveStatusCallback,
    IRCIMIWChangeUltraGroupChannelDefaultNotificationLevelCallback,
    IRCIMIWChangeUltraGroupDefaultNotificationLevelCallback,
    IRCIMIWClearDraftMessageCallback,
    IRCIMIWClearMessagesCallback,
    IRCIMIWClearUltraGroupMessagesCallback,
    IRCIMIWClearUltraGroupMessagesForAllChannelCallback,
    IRCIMIWClearUnreadCountCallback,
    IRCIMIWConnectCallback,
    IRCIMIWDeleteLocalMessagesCallback,
    IRCIMIWDeleteMessagesCallback,
    IRCIMIWDownloadMediaMessageListener,
    IRCIMIWGetBatchRemoteUltraGroupMessagesCallback,
    IRCIMIWGetBlacklistCallback,
    IRCIMIWGetBlacklistStatusCallback,
    IRCIMIWGetBlockedConversationsCallback,
    IRCIMIWGetChatRoomAllEntriesCallback,
    IRCIMIWGetChatRoomEntryCallback,
    IRCIMIWGetChatRoomMessagesCallback,
    IRCIMIWGetConversationCallback,
    IRCIMIWGetConversationNotificationLevelCallback,
    IRCIMIWGetConversationsCallback,
    IRCIMIWGetConversationsForAllChannelCallback,
    IRCIMIWGetConversationTopStatusCallback,
    IRCIMIWGetConversationTypeNotificationLevelCallback,
    IRCIMIWGetDraftMessageCallback,
    IRCIMIWGetFirstUnreadMessageCallback,
    IRCIMIWGetMessageCallback,
    IRCIMIWGetMessageCountCallback,
    IRCIMIWGetMessagesCallback,
    IRCIMIWGetNotificationQuietHoursCallback,
    IRCIMIWGetTopConversationsCallback,
    IRCIMIWGetTotalUnreadCountCallback,
    IRCIMIWGetUltraGroupAllUnreadCountCallback,
    IRCIMIWGetUltraGroupAllUnreadMentionedCountCallback,
    IRCIMIWGetUltraGroupChannelDefaultNotificationLevelCallback,
    IRCIMIWGetUltraGroupDefaultNotificationLevelCallback,
    IRCIMIWGetUltraGroupUnreadCountCallback,
    IRCIMIWGetUltraGroupUnreadMentionedCountCallback,
    IRCIMIWGetUnreadCountByConversationTypesCallback,
    IRCIMIWGetUnreadCountCallback,
    IRCIMIWGetUnreadMentionedCountCallback,
    IRCIMIWGetUnreadMentionedMessagesCallback,
    IRCIMIWInsertMessageCallback,
    IRCIMIWInsertMessagesCallback,
    IRCIMIWJoinChatRoomCallback,
    IRCIMIWLeaveChatRoomCallback,
    IRCIMIWListener,
    IRCIMIWModifyUltraGroupMessageCallback,
    IRCIMIWObjectCallback,
    IRCIMIWRecallMessageCallback,
    IRCIMIWRecallUltraGroupMessageCallback,
    IRCIMIWRemoveChatRoomEntriesCallback,
    IRCIMIWRemoveChatRoomEntryCallback,
    IRCIMIWRemoveConversationCallback,
    IRCIMIWRemoveConversationsCallback,
    IRCIMIWRemoveFromBlacklistCallback,
    IRCIMIWRemoveMessageExpansionForKeysCallback,
    IRCIMIWRemoveNotificationQuietHoursCallback,
    IRCIMIWRemoveUltraGroupMessageExpansionForKeysCallback,
    IRCIMIWSaveDraftMessageCallback,
    IRCIMIWSearchConversationsCallback,
    IRCIMIWSearchMessagesByTimeRangeCallback,
    IRCIMIWSearchMessagesByUserIdCallback,
    IRCIMIWSearchMessagesCallback,
    IRCIMIWSendGroupMessageToDesignatedUsersCallback,
    IRCIMIWSendGroupReadReceiptRequestCallback,
    IRCIMIWSendGroupReadReceiptResponseCallback,
    IRCIMIWSendMediaMessageListener,
    IRCIMIWSendMessageCallback,
    IRCIMIWSendPrivateReadReceiptMessageCallback,
    IRCIMIWSendUltraGroupTypingStatusCallback,
    IRCIMIWSyncConversationReadStatusCallback,
    IRCIMIWSyncUltraGroupReadStatusCallback,
    IRCIMIWUpdateMessageExpansionCallback,
    IRCIMIWUpdateUltraGroupMessageExpansionCallback,
    logger,
    RCIMIWAndroidPushOptions,
    RCIMIWBlacklistStatus,
    RCIMIWBlockedMessageInfo,
    RCIMIWChatRoomEntriesOperationType,
    RCIMIWChatRoomMemberAction,
    RCIMIWChatRoomMemberActionType,
    RCIMIWChatRoomStatus,
    RCIMIWCommandMessage,
    RCIMIWCommandNotificationMessage,
    RCIMIWCompressOptions,
    RCIMIWConnectCallback,
    RCIMIWConnectionStatus,
    RCIMIWConversation,
    RCIMIWConversationType,
    RCIMIWCustomMessage,
    RCIMIWCustomMessagePolicy,
    RCIMIWDownloadMediaMessageListener,
    RCIMIWEngine,
    RCIMIWEngineOptions,
    RCIMIWErrorCode,
    RCIMIWFileMessage,
    RCIMIWGIFMessage,
    RCIMIWGroupReadReceiptInfo,
    RCIMIWImageMessage,
    RCIMIWImportanceHW,
    RCIMIWIOSPushOptions,
    RCIMIWLocationMessage,
    RCIMIWLogLevel,
    RCIMIWMediaMessage,
    RCIMIWMentionedInfo,
    RCIMIWMentionedType,
    RCIMIWMessage,
    RCIMIWMessageBlockType,
    RCIMIWMessageDirection,
    RCIMIWMessageOperationPolicy,
    RCIMIWMessagePushOptions,
    RCIMIWMessageType,
    RCIMIWPushNotificationLevel,
    RCIMIWPushNotificationQuietHoursLevel,
    RCIMIWPushOptions,
    RCIMIWRecallNotificationMessage,
    RCIMIWReceivedStatus,
    RCIMIWReferenceMessage,
    RCIMIWSearchConversationResult,
    RCIMIWSendGroupMessageToDesignatedUsersCallback,
    RCIMIWSendMediaMessageListener,
    RCIMIWSendMessageCallback,
    RCIMIWSentStatus,
    RCIMIWSightMessage,
    RCIMIWTextMessage,
    RCIMIWTimeOrder,
    RCIMIWTypingStatus,
    RCIMIWUltraGroupTypingStatus,
    RCIMIWUltraGroupTypingStatusInfo,
    RCIMIWUnknownMessage,
    RCIMIWUserInfo,
    RCIMIWVIVOPushType,
    RCIMIWVoiceMessage
}
