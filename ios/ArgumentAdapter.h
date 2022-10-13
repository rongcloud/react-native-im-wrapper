
#ifndef ArgumentAdapter_h
#define ArgumentAdapter_h

#import <RongIMWrapper/RongIMWrapper.h>

#ifdef __cplusplus
extern "C" {
#endif

RCIMIWImportanceHW toImportanceHW(NSUInteger w);

NSUInteger ImportanceHWToNum(RCIMIWImportanceHW w);

RCIMIWMessageOperationPolicy toMessageOperationPolicy(NSUInteger policy);

NSUInteger MessageOperationPolicyToNum(RCIMIWMessageOperationPolicy policy);

RCIMIWVIVOPushType toVIVOPushType(NSUInteger type);

NSUInteger VIVOPushTypeToNum(RCIMIWVIVOPushType type);

RCIMIWSentStatus toSentStatus(NSUInteger status);

NSUInteger SentStatusToNum(RCIMIWSentStatus status);

RCIMIWPushNotificationQuietHoursLevel toPushNotificationQuietHoursLevel(NSUInteger level);

NSUInteger PushNotificationQuietHoursLevelToNum(RCIMIWPushNotificationQuietHoursLevel level);

RCIMIWMessageDirection toMessageDirection(NSUInteger direction);

NSUInteger MessageDirectionToNum(RCIMIWMessageDirection direction);

RCIMIWReceivedStatus toReceivedStatus(NSUInteger status);

NSUInteger ReceivedStatusToNum(RCIMIWReceivedStatus status);

RCIMIWChatRoomMemberActionType toChatRoomMemberActionType(NSUInteger type);

NSUInteger ChatRoomMemberActionTypeToNum(RCIMIWChatRoomMemberActionType type);

RCIMIWPushNotificationLevel toPushNotificationLevel(NSUInteger level);

NSUInteger PushNotificationLevelToNum(RCIMIWPushNotificationLevel level);

RCIMIWMessageType toMessageType(NSUInteger type);

NSUInteger MessageTypeToNum(RCIMIWMessageType type);

RCIMIWMessageBlockType toMessageBlockType(NSUInteger type);

NSUInteger MessageBlockTypeToNum(RCIMIWMessageBlockType type);

RCIMIWTimeOrder toTimeOrder(NSUInteger order);

NSUInteger TimeOrderToNum(RCIMIWTimeOrder order);

RCIMIWCustomMessagePolicy toCustomMessagePolicy(NSUInteger policy);

NSUInteger CustomMessagePolicyToNum(RCIMIWCustomMessagePolicy policy);

RCIMIWChatRoomStatus toChatRoomStatus(NSUInteger status);

NSUInteger ChatRoomStatusToNum(RCIMIWChatRoomStatus status);

RCIMIWConversationType toConversationType(NSUInteger type);

NSUInteger ConversationTypeToNum(RCIMIWConversationType type);

RCIMIWErrorCode toErrorCode(NSUInteger code);

NSUInteger ErrorCodeToNum(RCIMIWErrorCode code);

RCIMIWUltraGroupTypingStatus toUltraGroupTypingStatus(NSUInteger status);

NSUInteger UltraGroupTypingStatusToNum(RCIMIWUltraGroupTypingStatus status);

RCIMIWMentionedType toMentionedType(NSUInteger type);

NSUInteger MentionedTypeToNum(RCIMIWMentionedType type);

RCIMIWChatRoomEntriesOperationType toChatRoomEntriesOperationType(NSUInteger type);

NSUInteger ChatRoomEntriesOperationTypeToNum(RCIMIWChatRoomEntriesOperationType type);

RCIMIWLogLevel toLogLevel(NSUInteger level);

NSUInteger LogLevelToNum(RCIMIWLogLevel level);

RCIMIWBlacklistStatus toBlacklistStatus(NSUInteger status);

NSUInteger BlacklistStatusToNum(RCIMIWBlacklistStatus status);

RCIMIWConnectionStatus toConnectionStatus(NSUInteger status);

NSUInteger ConnectionStatusToNum(RCIMIWConnectionStatus status);


#ifdef __cplusplus
}
#endif

#endif /* ArgumentAdapter_h */
