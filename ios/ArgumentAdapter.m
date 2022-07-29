

#import "ArgumentAdapter.h"

RCIMIWMessageOperationPolicy toMessageOperationPolicy(NSUInteger policy) {
  static NSArray<NSNumber *> *RCIMIWMessageOperationPolicy_array = nil;
  if (!RCIMIWMessageOperationPolicy_array) {
    RCIMIWMessageOperationPolicy_array = @[
      @(RCIMIWMessageOperationPolicyLocal),
      @(RCIMIWMessageOperationPolicyRemote),
      @(RCIMIWMessageOperationPolicyLocalRemote)
    ];
  }
  if (policy > [RCIMIWMessageOperationPolicy_array count] - 1)
    policy = [RCIMIWMessageOperationPolicy_array count] - 1;
  return (RCIMIWMessageOperationPolicy)
      [RCIMIWMessageOperationPolicy_array[policy] integerValue];
}

NSUInteger MessageOperationPolicyToNum(RCIMIWMessageOperationPolicy policy) {
  static NSArray<NSNumber *> *RCIMIWMessageOperationPolicy_array = nil;
  if (!RCIMIWMessageOperationPolicy_array) {
    RCIMIWMessageOperationPolicy_array = @[
      @(RCIMIWMessageOperationPolicyLocal),
      @(RCIMIWMessageOperationPolicyRemote),
      @(RCIMIWMessageOperationPolicyLocalRemote)
    ];
  }
  return [RCIMIWMessageOperationPolicy_array indexOfObject:@(policy)];
}

RCIMIWVIVOPushType toVIVOPushType(NSUInteger type) {
  static NSArray<NSNumber *> *RCIMIWVIVOPushType_array = nil;
  if (!RCIMIWVIVOPushType_array) {
    RCIMIWVIVOPushType_array =
        @[ @(RCIMIWVIVOPushTypeOperate), @(RCIMIWVIVOPushTypeSystem) ];
  }
  if (type > [RCIMIWVIVOPushType_array count] - 1)
    type = [RCIMIWVIVOPushType_array count] - 1;
  return (RCIMIWVIVOPushType)[RCIMIWVIVOPushType_array[type] integerValue];
}

NSUInteger VIVOPushTypeToNum(RCIMIWVIVOPushType type) {
  static NSArray<NSNumber *> *RCIMIWVIVOPushType_array = nil;
  if (!RCIMIWVIVOPushType_array) {
    RCIMIWVIVOPushType_array =
        @[ @(RCIMIWVIVOPushTypeOperate), @(RCIMIWVIVOPushTypeSystem) ];
  }
  return [RCIMIWVIVOPushType_array indexOfObject:@(type)];
}

RCIMIWSentStatus toSentStatus(NSUInteger status) {
  static NSArray<NSNumber *> *RCIMIWSentStatus_array = nil;
  if (!RCIMIWSentStatus_array) {
    RCIMIWSentStatus_array = @[
      @(RCIMIWSentStatusSending), @(RCIMIWSentStatusFailed),
      @(RCIMIWSentStatusSent), @(RCIMIWSentStatusReceived),
      @(RCIMIWSentStatusRead), @(RCIMIWSentStatusDestroyed),
      @(RCIMIWSentStatusCanceled)
    ];
  }
  if (status > [RCIMIWSentStatus_array count] - 1)
    status = [RCIMIWSentStatus_array count] - 1;
  return (RCIMIWSentStatus)[RCIMIWSentStatus_array[status] integerValue];
}

NSUInteger SentStatusToNum(RCIMIWSentStatus status) {
  static NSArray<NSNumber *> *RCIMIWSentStatus_array = nil;
  if (!RCIMIWSentStatus_array) {
    RCIMIWSentStatus_array = @[
      @(RCIMIWSentStatusSending), @(RCIMIWSentStatusFailed),
      @(RCIMIWSentStatusSent), @(RCIMIWSentStatusReceived),
      @(RCIMIWSentStatusRead), @(RCIMIWSentStatusDestroyed),
      @(RCIMIWSentStatusCanceled)
    ];
  }
  return [RCIMIWSentStatus_array indexOfObject:@(status)];
}

RCIMIWPushNotificationQuietHoursLevel
toPushNotificationQuietHoursLevel(NSUInteger level) {
  static NSArray<NSNumber *> *RCIMIWPushNotificationQuietHoursLevel_array = nil;
  if (!RCIMIWPushNotificationQuietHoursLevel_array) {
    RCIMIWPushNotificationQuietHoursLevel_array = @[
      @(RCIMIWPushNotificationQuietHoursLevelNone),
      @(RCIMIWPushNotificationQuietHoursLevelMention),
      @(RCIMIWPushNotificationQuietHoursLevelBlocked)
    ];
  }
  if (level > [RCIMIWPushNotificationQuietHoursLevel_array count] - 1)
    level = [RCIMIWPushNotificationQuietHoursLevel_array count] - 1;
  return (RCIMIWPushNotificationQuietHoursLevel)
      [RCIMIWPushNotificationQuietHoursLevel_array[level] integerValue];
}

NSUInteger PushNotificationQuietHoursLevelToNum(
    RCIMIWPushNotificationQuietHoursLevel level) {
  static NSArray<NSNumber *> *RCIMIWPushNotificationQuietHoursLevel_array = nil;
  if (!RCIMIWPushNotificationQuietHoursLevel_array) {
    RCIMIWPushNotificationQuietHoursLevel_array = @[
      @(RCIMIWPushNotificationQuietHoursLevelNone),
      @(RCIMIWPushNotificationQuietHoursLevelMention),
      @(RCIMIWPushNotificationQuietHoursLevelBlocked)
    ];
  }
  return [RCIMIWPushNotificationQuietHoursLevel_array indexOfObject:@(level)];
}

RCIMIWMessageDirection toMessageDirection(NSUInteger direction) {
  static NSArray<NSNumber *> *RCIMIWMessageDirection_array = nil;
  if (!RCIMIWMessageDirection_array) {
    RCIMIWMessageDirection_array =
        @[ @(RCIMIWMessageDirectionSend), @(RCIMIWMessageDirectionReceive) ];
  }
  if (direction > [RCIMIWMessageDirection_array count] - 1)
    direction = [RCIMIWMessageDirection_array count] - 1;
  return (RCIMIWMessageDirection)
      [RCIMIWMessageDirection_array[direction] integerValue];
}

NSUInteger MessageDirectionToNum(RCIMIWMessageDirection direction) {
  static NSArray<NSNumber *> *RCIMIWMessageDirection_array = nil;
  if (!RCIMIWMessageDirection_array) {
    RCIMIWMessageDirection_array =
        @[ @(RCIMIWMessageDirectionSend), @(RCIMIWMessageDirectionReceive) ];
  }
  return [RCIMIWMessageDirection_array indexOfObject:@(direction)];
}

RCIMIWReceivedStatus toReceivedStatus(NSUInteger status) {
  static NSArray<NSNumber *> *RCIMIWReceivedStatus_array = nil;
  if (!RCIMIWReceivedStatus_array) {
    RCIMIWReceivedStatus_array = @[
      @(RCIMIWReceivedStatusUnread), @(RCIMIWReceivedStatusRead),
      @(RCIMIWReceivedStatusListened), @(RCIMIWReceivedStatusDownloaded),
      @(RCIMIWReceivedStatusRetrieved), @(RCIMIWReceivedStatusMultipleReceive)
    ];
  }
  if (status > [RCIMIWReceivedStatus_array count] - 1)
    status = [RCIMIWReceivedStatus_array count] - 1;
  return (
      RCIMIWReceivedStatus)[RCIMIWReceivedStatus_array[status] integerValue];
}

NSUInteger ReceivedStatusToNum(RCIMIWReceivedStatus status) {
  static NSArray<NSNumber *> *RCIMIWReceivedStatus_array = nil;
  if (!RCIMIWReceivedStatus_array) {
    RCIMIWReceivedStatus_array = @[
      @(RCIMIWReceivedStatusUnread), @(RCIMIWReceivedStatusRead),
      @(RCIMIWReceivedStatusListened), @(RCIMIWReceivedStatusDownloaded),
      @(RCIMIWReceivedStatusRetrieved), @(RCIMIWReceivedStatusMultipleReceive)
    ];
  }
  return [RCIMIWReceivedStatus_array indexOfObject:@(status)];
}

RCIMIWChatRoomMemberActionType toChatRoomMemberActionType(NSUInteger type) {
  static NSArray<NSNumber *> *RCIMIWChatRoomMemberActionType_array = nil;
  if (!RCIMIWChatRoomMemberActionType_array) {
    RCIMIWChatRoomMemberActionType_array = @[
      @(RCIMIWChatRoomMemberActionTypeUnknown),
      @(RCIMIWChatRoomMemberActionTypeJoin),
      @(RCIMIWChatRoomMemberActionTypeLeave)
    ];
  }
  if (type > [RCIMIWChatRoomMemberActionType_array count] - 1)
    type = [RCIMIWChatRoomMemberActionType_array count] - 1;
  return (RCIMIWChatRoomMemberActionType)
      [RCIMIWChatRoomMemberActionType_array[type] integerValue];
}

NSUInteger ChatRoomMemberActionTypeToNum(RCIMIWChatRoomMemberActionType type) {
  static NSArray<NSNumber *> *RCIMIWChatRoomMemberActionType_array = nil;
  if (!RCIMIWChatRoomMemberActionType_array) {
    RCIMIWChatRoomMemberActionType_array = @[
      @(RCIMIWChatRoomMemberActionTypeUnknown),
      @(RCIMIWChatRoomMemberActionTypeJoin),
      @(RCIMIWChatRoomMemberActionTypeLeave)
    ];
  }
  return [RCIMIWChatRoomMemberActionType_array indexOfObject:@(type)];
}

RCIMIWPushNotificationLevel toPushNotificationLevel(NSUInteger level) {
  static NSArray<NSNumber *> *RCIMIWPushNotificationLevel_array = nil;
  if (!RCIMIWPushNotificationLevel_array) {
    RCIMIWPushNotificationLevel_array = @[
      @(RCIMIWPushNotificationLevelAllMessage),
      @(RCIMIWPushNotificationLevelNone), @(RCIMIWPushNotificationLevelMention),
      @(RCIMIWPushNotificationLevelMentionUsers),
      @(RCIMIWPushNotificationLevelMentionAll),
      @(RCIMIWPushNotificationLevelBlocked)
    ];
  }
  if (level > [RCIMIWPushNotificationLevel_array count] - 1)
    level = [RCIMIWPushNotificationLevel_array count] - 1;
  return (RCIMIWPushNotificationLevel)
      [RCIMIWPushNotificationLevel_array[level] integerValue];
}

NSUInteger PushNotificationLevelToNum(RCIMIWPushNotificationLevel level) {
  static NSArray<NSNumber *> *RCIMIWPushNotificationLevel_array = nil;
  if (!RCIMIWPushNotificationLevel_array) {
    RCIMIWPushNotificationLevel_array = @[
      @(RCIMIWPushNotificationLevelAllMessage),
      @(RCIMIWPushNotificationLevelNone), @(RCIMIWPushNotificationLevelMention),
      @(RCIMIWPushNotificationLevelMentionUsers),
      @(RCIMIWPushNotificationLevelMentionAll),
      @(RCIMIWPushNotificationLevelBlocked)
    ];
  }
  return [RCIMIWPushNotificationLevel_array indexOfObject:@(level)];
}

RCIMIWMessageType toMessageType(NSUInteger type) {
  static NSArray<NSNumber *> *RCIMIWMessageType_array = nil;
  if (!RCIMIWMessageType_array) {
    RCIMIWMessageType_array = @[
      @(RCIMIWMessageTypeUnknown), @(RCIMIWMessageTypeCustom),
      @(RCIMIWMessageTypeText), @(RCIMIWMessageTypeVoice),
      @(RCIMIWMessageTypeImage), @(RCIMIWMessageTypeFile),
      @(RCIMIWMessageTypeSight), @(RCIMIWMessageTypeGIF),
      @(RCIMIWMessageTypeRecall), @(RCIMIWMessageTypeReference),
      @(RCIMIWMessageTypeCommand), @(RCIMIWMessageTypeCommandNotification)
    ];
  }
  if (type > [RCIMIWMessageType_array count] - 1)
    type = [RCIMIWMessageType_array count] - 1;
  return (RCIMIWMessageType)[RCIMIWMessageType_array[type] integerValue];
}

NSUInteger MessageTypeToNum(RCIMIWMessageType type) {
  static NSArray<NSNumber *> *RCIMIWMessageType_array = nil;
  if (!RCIMIWMessageType_array) {
    RCIMIWMessageType_array = @[
      @(RCIMIWMessageTypeUnknown), @(RCIMIWMessageTypeCustom),
      @(RCIMIWMessageTypeText), @(RCIMIWMessageTypeVoice),
      @(RCIMIWMessageTypeImage), @(RCIMIWMessageTypeFile),
      @(RCIMIWMessageTypeSight), @(RCIMIWMessageTypeGIF),
      @(RCIMIWMessageTypeRecall), @(RCIMIWMessageTypeReference),
      @(RCIMIWMessageTypeCommand), @(RCIMIWMessageTypeCommandNotification)
    ];
  }
  return [RCIMIWMessageType_array indexOfObject:@(type)];
}

RCIMIWMessageBlockType toMessageBlockType(NSUInteger type) {
  static NSArray<NSNumber *> *RCIMIWMessageBlockType_array = nil;
  if (!RCIMIWMessageBlockType_array) {
    RCIMIWMessageBlockType_array = @[
      @(RCIMIWMessageBlockTypeUnknown), @(RCIMIWMessageBlockTypeGlobal),
      @(RCIMIWMessageBlockTypeCustom), @(RCIMIWMessageBlockTypeThirdParty)
    ];
  }
  if (type > [RCIMIWMessageBlockType_array count] - 1)
    type = [RCIMIWMessageBlockType_array count] - 1;
  return (
      RCIMIWMessageBlockType)[RCIMIWMessageBlockType_array[type] integerValue];
}

NSUInteger MessageBlockTypeToNum(RCIMIWMessageBlockType type) {
  static NSArray<NSNumber *> *RCIMIWMessageBlockType_array = nil;
  if (!RCIMIWMessageBlockType_array) {
    RCIMIWMessageBlockType_array = @[
      @(RCIMIWMessageBlockTypeUnknown), @(RCIMIWMessageBlockTypeGlobal),
      @(RCIMIWMessageBlockTypeCustom), @(RCIMIWMessageBlockTypeThirdParty)
    ];
  }
  return [RCIMIWMessageBlockType_array indexOfObject:@(type)];
}

RCIMIWTimeOrder toTimeOrder(NSUInteger order) {
  static NSArray<NSNumber *> *RCIMIWTimeOrder_array = nil;
  if (!RCIMIWTimeOrder_array) {
    RCIMIWTimeOrder_array =
        @[ @(RCIMIWTimeOrderBefore), @(RCIMIWTimeOrderAfter) ];
  }
  if (order > [RCIMIWTimeOrder_array count] - 1)
    order = [RCIMIWTimeOrder_array count] - 1;
  return (RCIMIWTimeOrder)[RCIMIWTimeOrder_array[order] integerValue];
}

NSUInteger TimeOrderToNum(RCIMIWTimeOrder order) {
  static NSArray<NSNumber *> *RCIMIWTimeOrder_array = nil;
  if (!RCIMIWTimeOrder_array) {
    RCIMIWTimeOrder_array =
        @[ @(RCIMIWTimeOrderBefore), @(RCIMIWTimeOrderAfter) ];
  }
  return [RCIMIWTimeOrder_array indexOfObject:@(order)];
}

RCIMIWCustomMessagePolicy toCustomMessagePolicy(NSUInteger policy) {
  static NSArray<NSNumber *> *RCIMIWCustomMessagePolicy_array = nil;
  if (!RCIMIWCustomMessagePolicy_array) {
    RCIMIWCustomMessagePolicy_array = @[
      @(RCIMIWCustomMessagePolicyCommand), @(RCIMIWCustomMessagePolicyNormal),
      @(RCIMIWCustomMessagePolicyStatus), @(RCIMIWCustomMessagePolicyStorage)
    ];
  }
  if (policy > [RCIMIWCustomMessagePolicy_array count] - 1)
    policy = [RCIMIWCustomMessagePolicy_array count] - 1;
  return (RCIMIWCustomMessagePolicy)
      [RCIMIWCustomMessagePolicy_array[policy] integerValue];
}

NSUInteger CustomMessagePolicyToNum(RCIMIWCustomMessagePolicy policy) {
  static NSArray<NSNumber *> *RCIMIWCustomMessagePolicy_array = nil;
  if (!RCIMIWCustomMessagePolicy_array) {
    RCIMIWCustomMessagePolicy_array = @[
      @(RCIMIWCustomMessagePolicyCommand), @(RCIMIWCustomMessagePolicyNormal),
      @(RCIMIWCustomMessagePolicyStatus), @(RCIMIWCustomMessagePolicyStorage)
    ];
  }
  return [RCIMIWCustomMessagePolicy_array indexOfObject:@(policy)];
}

RCIMIWChatRoomStatus toChatRoomStatus(NSUInteger status) {
  static NSArray<NSNumber *> *RCIMIWChatRoomStatus_array = nil;
  if (!RCIMIWChatRoomStatus_array) {
    RCIMIWChatRoomStatus_array = @[
      @(RCIMIWChatRoomStatusReset), @(RCIMIWChatRoomStatusDestroyManual),
      @(RCIMIWChatRoomStatusDestroyAuto)
    ];
  }
  if (status > [RCIMIWChatRoomStatus_array count] - 1)
    status = [RCIMIWChatRoomStatus_array count] - 1;
  return (
      RCIMIWChatRoomStatus)[RCIMIWChatRoomStatus_array[status] integerValue];
}

NSUInteger ChatRoomStatusToNum(RCIMIWChatRoomStatus status) {
  static NSArray<NSNumber *> *RCIMIWChatRoomStatus_array = nil;
  if (!RCIMIWChatRoomStatus_array) {
    RCIMIWChatRoomStatus_array = @[
      @(RCIMIWChatRoomStatusReset), @(RCIMIWChatRoomStatusDestroyManual),
      @(RCIMIWChatRoomStatusDestroyAuto)
    ];
  }
  return [RCIMIWChatRoomStatus_array indexOfObject:@(status)];
}

RCIMIWConversationType toConversationType(NSUInteger type) {
  static NSArray<NSNumber *> *RCIMIWConversationType_array = nil;
  if (!RCIMIWConversationType_array) {
    RCIMIWConversationType_array = @[
      @(RCIMIWConversationTypeInvalid), @(RCIMIWConversationTypePrivate),
      @(RCIMIWConversationTypeGroup), @(RCIMIWConversationTypeChatroom),
      @(RCIMIWConversationTypeSystem), @(RCIMIWConversationTypeUltraGroup)
    ];
  }
  if (type > [RCIMIWConversationType_array count] - 1)
    type = [RCIMIWConversationType_array count] - 1;
  return (
      RCIMIWConversationType)[RCIMIWConversationType_array[type] integerValue];
}

NSUInteger ConversationTypeToNum(RCIMIWConversationType type) {
  static NSArray<NSNumber *> *RCIMIWConversationType_array = nil;
  if (!RCIMIWConversationType_array) {
    RCIMIWConversationType_array = @[
      @(RCIMIWConversationTypeInvalid), @(RCIMIWConversationTypePrivate),
      @(RCIMIWConversationTypeGroup), @(RCIMIWConversationTypeChatroom),
      @(RCIMIWConversationTypeSystem), @(RCIMIWConversationTypeUltraGroup)
    ];
  }
  return [RCIMIWConversationType_array indexOfObject:@(type)];
}

RCIMIWErrorCode toErrorCode(NSUInteger code) {
  static NSArray<NSNumber *> *RCIMIWErrorCode_array = nil;
  if (!RCIMIWErrorCode_array) {
    RCIMIWErrorCode_array = @[
      @(RCIMIWErrorCodeSuccess), @(RCIMIWErrorCodeParamError),
      @(RCIMIWErrorCodeEngineDestroyed), @(RCIMIWErrorCodeNativeOperationError),
      @(RCIMIWErrorCodeResultUnknown)
    ];
  }
  if (code > [RCIMIWErrorCode_array count] - 1)
    code = [RCIMIWErrorCode_array count] - 1;
  return (RCIMIWErrorCode)[RCIMIWErrorCode_array[code] integerValue];
}

NSUInteger ErrorCodeToNum(RCIMIWErrorCode code) {
  static NSArray<NSNumber *> *RCIMIWErrorCode_array = nil;
  if (!RCIMIWErrorCode_array) {
    RCIMIWErrorCode_array = @[
      @(RCIMIWErrorCodeSuccess), @(RCIMIWErrorCodeParamError),
      @(RCIMIWErrorCodeEngineDestroyed), @(RCIMIWErrorCodeNativeOperationError),
      @(RCIMIWErrorCodeResultUnknown)
    ];
  }
  return [RCIMIWErrorCode_array indexOfObject:@(code)];
}

RCIMIWUltraGroupTypingStatus toUltraGroupTypingStatus(NSUInteger status) {
  static NSArray<NSNumber *> *RCIMIWUltraGroupTypingStatus_array = nil;
  if (!RCIMIWUltraGroupTypingStatus_array) {
    RCIMIWUltraGroupTypingStatus_array =
        @[ @(RCIMIWUltraGroupTypingStatusText) ];
  }
  if (status > [RCIMIWUltraGroupTypingStatus_array count] - 1)
    status = [RCIMIWUltraGroupTypingStatus_array count] - 1;
  return (RCIMIWUltraGroupTypingStatus)
      [RCIMIWUltraGroupTypingStatus_array[status] integerValue];
}

NSUInteger UltraGroupTypingStatusToNum(RCIMIWUltraGroupTypingStatus status) {
  static NSArray<NSNumber *> *RCIMIWUltraGroupTypingStatus_array = nil;
  if (!RCIMIWUltraGroupTypingStatus_array) {
    RCIMIWUltraGroupTypingStatus_array =
        @[ @(RCIMIWUltraGroupTypingStatusText) ];
  }
  return [RCIMIWUltraGroupTypingStatus_array indexOfObject:@(status)];
}

RCIMIWMentionedType toMentionedType(NSUInteger type) {
  static NSArray<NSNumber *> *RCIMIWMentionedType_array = nil;
  if (!RCIMIWMentionedType_array) {
    RCIMIWMentionedType_array =
        @[ @(RCIMIWMentionedTypeAll), @(RCIMIWMentionedTypePart) ];
  }
  if (type > [RCIMIWMentionedType_array count] - 1)
    type = [RCIMIWMentionedType_array count] - 1;
  return (RCIMIWMentionedType)[RCIMIWMentionedType_array[type] integerValue];
}

NSUInteger MentionedTypeToNum(RCIMIWMentionedType type) {
  static NSArray<NSNumber *> *RCIMIWMentionedType_array = nil;
  if (!RCIMIWMentionedType_array) {
    RCIMIWMentionedType_array =
        @[ @(RCIMIWMentionedTypeAll), @(RCIMIWMentionedTypePart) ];
  }
  return [RCIMIWMentionedType_array indexOfObject:@(type)];
}

RCIMIWChatRoomEntriesOperationType
toChatRoomEntriesOperationType(NSUInteger type) {
  static NSArray<NSNumber *> *RCIMIWChatRoomEntriesOperationType_array = nil;
  if (!RCIMIWChatRoomEntriesOperationType_array) {
    RCIMIWChatRoomEntriesOperationType_array = @[
      @(RCIMIWChatRoomEntriesOperationTypeUpdate),
      @(RCIMIWChatRoomEntriesOperationTypeRemove)
    ];
  }
  if (type > [RCIMIWChatRoomEntriesOperationType_array count] - 1)
    type = [RCIMIWChatRoomEntriesOperationType_array count] - 1;
  return (RCIMIWChatRoomEntriesOperationType)
      [RCIMIWChatRoomEntriesOperationType_array[type] integerValue];
}

NSUInteger
ChatRoomEntriesOperationTypeToNum(RCIMIWChatRoomEntriesOperationType type) {
  static NSArray<NSNumber *> *RCIMIWChatRoomEntriesOperationType_array = nil;
  if (!RCIMIWChatRoomEntriesOperationType_array) {
    RCIMIWChatRoomEntriesOperationType_array = @[
      @(RCIMIWChatRoomEntriesOperationTypeUpdate),
      @(RCIMIWChatRoomEntriesOperationTypeRemove)
    ];
  }
  return [RCIMIWChatRoomEntriesOperationType_array indexOfObject:@(type)];
}

RCIMIWLogLevel toLogLevel(NSUInteger level) {
  static NSArray<NSNumber *> *RCIMIWLogLevel_array = nil;
  if (!RCIMIWLogLevel_array) {
    RCIMIWLogLevel_array = @[
      @(RCIMIWLogLevelNone), @(RCIMIWLogLevelError), @(RCIMIWLogLevelWarn),
      @(RCIMIWLogLevelInfo), @(RCIMIWLogLevelDebug), @(RCIMIWLogLevelVerbose)
    ];
  }
  if (level > [RCIMIWLogLevel_array count] - 1)
    level = [RCIMIWLogLevel_array count] - 1;
  return (RCIMIWLogLevel)[RCIMIWLogLevel_array[level] integerValue];
}

NSUInteger LogLevelToNum(RCIMIWLogLevel level) {
  static NSArray<NSNumber *> *RCIMIWLogLevel_array = nil;
  if (!RCIMIWLogLevel_array) {
    RCIMIWLogLevel_array = @[
      @(RCIMIWLogLevelNone), @(RCIMIWLogLevelError), @(RCIMIWLogLevelWarn),
      @(RCIMIWLogLevelInfo), @(RCIMIWLogLevelDebug), @(RCIMIWLogLevelVerbose)
    ];
  }
  return [RCIMIWLogLevel_array indexOfObject:@(level)];
}

RCIMIWBlacklistStatus toBlacklistStatus(NSUInteger status) {
  static NSArray<NSNumber *> *RCIMIWBlacklistStatus_array = nil;
  if (!RCIMIWBlacklistStatus_array) {
    RCIMIWBlacklistStatus_array = @[
      @(RCIMIWBlacklistStatusUnknown), @(RCIMIWBlacklistStatusInBlacklist),
      @(RCIMIWBlacklistStatusNotInBlacklist)
    ];
  }
  if (status > [RCIMIWBlacklistStatus_array count] - 1)
    status = [RCIMIWBlacklistStatus_array count] - 1;
  return (
      RCIMIWBlacklistStatus)[RCIMIWBlacklistStatus_array[status] integerValue];
}

NSUInteger BlacklistStatusToNum(RCIMIWBlacklistStatus status) {
  static NSArray<NSNumber *> *RCIMIWBlacklistStatus_array = nil;
  if (!RCIMIWBlacklistStatus_array) {
    RCIMIWBlacklistStatus_array = @[
      @(RCIMIWBlacklistStatusUnknown), @(RCIMIWBlacklistStatusInBlacklist),
      @(RCIMIWBlacklistStatusNotInBlacklist)
    ];
  }
  return [RCIMIWBlacklistStatus_array indexOfObject:@(status)];
}

RCIMIWConnectionStatus toConnectionStatus(NSUInteger status) {
  static NSArray<NSNumber *> *RCIMIWConnectionStatus_array = nil;
  if (!RCIMIWConnectionStatus_array) {
    RCIMIWConnectionStatus_array = @[
      @(RCIMIWConnectionStatusNetworkUnavailable),
      @(RCIMIWConnectionStatusConnected), @(RCIMIWConnectionStatusConnecting),
      @(RCIMIWConnectionStatusUnconnected),
      @(RCIMIWConnectionStatusKickedOfflineByOtherClient),
      @(RCIMIWConnectionStatusTokenIncorrect),
      @(RCIMIWConnectionStatusConnUserBlocked),
      @(RCIMIWConnectionStatusSignOut), @(RCIMIWConnectionStatusSuspend),
      @(RCIMIWConnectionStatusTimeout)
    ];
  }
  if (status > [RCIMIWConnectionStatus_array count] - 1)
    status = [RCIMIWConnectionStatus_array count] - 1;
  return (RCIMIWConnectionStatus)
      [RCIMIWConnectionStatus_array[status] integerValue];
}

NSUInteger ConnectionStatusToNum(RCIMIWConnectionStatus status) {
  static NSArray<NSNumber *> *RCIMIWConnectionStatus_array = nil;
  if (!RCIMIWConnectionStatus_array) {
    RCIMIWConnectionStatus_array = @[
      @(RCIMIWConnectionStatusNetworkUnavailable),
      @(RCIMIWConnectionStatusConnected), @(RCIMIWConnectionStatusConnecting),
      @(RCIMIWConnectionStatusUnconnected),
      @(RCIMIWConnectionStatusKickedOfflineByOtherClient),
      @(RCIMIWConnectionStatusTokenIncorrect),
      @(RCIMIWConnectionStatusConnUserBlocked),
      @(RCIMIWConnectionStatusSignOut), @(RCIMIWConnectionStatusSuspend),
      @(RCIMIWConnectionStatusTimeout)
    ];
  }
  return [RCIMIWConnectionStatus_array indexOfObject:@(status)];
}
