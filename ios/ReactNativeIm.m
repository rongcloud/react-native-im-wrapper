#import "ReactNativeIm.h"
#import "ArgumentAdapter.h"
#import <RongIMLibCore/RongIMLibCore.h>
#import <RongIMWrapper/RongIMWrapper.h>
@interface RCReactNativeIM () <RCIMIWEngineDelegate> {
  RCIMIWEngine *engine;
}

@end
@implementation RCReactNativeIMVersion
static NSString *const VER = @"5.2.3";
+ (void)load {
  [RCUtilities setModuleName:@"imwrapperrn" version:VER];
}
@end

@implementation RCReactNativeIM

#define ENGINEDESTROYED                                                        \
  [NSString stringWithFormat:@"%ld", RCIMIWErrorCodeEngineDestroyed]

#define ENGINEASSERT                                                           \
  if (!engine) {                                                               \
    reject(ENGINEDESTROYED, @"engine is nil", nil);                            \
    return;                                                                    \
  }

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(create
                  : (NSString *)appKey options
                  : (NSDictionary *)options resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  RCIMIWEngineOptions *_options =
      [RCIMIWPlatformConverter convertEngineOptionsFromDict:options];
  engine = [RCIMIWEngine create:appKey options:_options];
  [engine setEngineDelegate:self];
  resolve(nil);
}

RCT_EXPORT_METHOD(destroy
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  if (engine) {
    [engine destroy];
    engine = nil;
  }
  resolve(nil);
}

RCT_EXPORT_METHOD(getMessageById
                  : (nonnull NSNumber *)messageId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  [engine getMessageById:messageId.longValue
      success:^(RCIMIWMessage *message) {
        resolve([RCIMIWPlatformConverter convertMessageToDict:message]);
      }
      error:^(NSInteger code) {
        resolve(nil);
      }];
}

RCT_EXPORT_METHOD(getMessageByUId
                  : (NSString *)messageUId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  [engine getMessageByUId:messageUId
      success:^(RCIMIWMessage *message) {
        resolve([RCIMIWPlatformConverter convertMessageToDict:message]);
      }
      error:^(NSInteger code) {
        resolve(nil);
      }];
}

RCT_EXPORT_METHOD(setDeviceToken
                  : (NSString *)deviceToken resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  if (!deviceToken) {
    resolve(@(-1));
    return;
  }
  [RCIMIWEngine
      setDeviceToken:[deviceToken dataUsingEncoding:NSUTF8StringEncoding]];
  resolve(@(0));
}

RCT_EXPORT_METHOD(connect
                  : (NSString *)token timeout
                  : (nonnull NSNumber *)timeout resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine connect:token timeout:timeout.intValue];
  resolve(@(r));
}

RCT_EXPORT_METHOD(disconnect
                  : (BOOL)receivePush resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine disconnect:receivePush];
  resolve(@(r));
}

RCT_EXPORT_METHOD(createTextMessage
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId text
                  : (NSString *)text resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWTextMessage *r = [engine createTextMessage:_type
                                          targetId:targetId
                                         channelId:channelId
                                              text:text];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(createImageMessage
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId path
                  : (NSString *)path resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWImageMessage *r = [engine createImageMessage:_type
                                            targetId:targetId
                                           channelId:channelId
                                                path:path];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMediaMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(createFileMessage
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId path
                  : (NSString *)path resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWFileMessage *r = [engine createFileMessage:_type
                                          targetId:targetId
                                         channelId:channelId
                                              path:path];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMediaMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(createSightMessage
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId path
                  : (NSString *)path duration
                  : (nonnull NSNumber *)duration resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWSightMessage *r = [engine createSightMessage:_type
                                            targetId:targetId
                                           channelId:channelId
                                                path:path
                                            duration:duration.intValue];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMediaMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(createVoiceMessage
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId path
                  : (NSString *)path duration
                  : (nonnull NSNumber *)duration resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWVoiceMessage *r = [engine createVoiceMessage:_type
                                            targetId:targetId
                                           channelId:channelId
                                                path:path
                                            duration:duration.intValue];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMediaMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(createReferenceMessage
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId referenceMessage
                  : (NSDictionary *)referenceMessage text
                  : (NSString *)text resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWMessage *_referenceMessage =
      [RCIMIWPlatformConverter convertMessageFromDict:referenceMessage];
  RCIMIWReferenceMessage *r = [engine createReferenceMessage:_type
                                                    targetId:targetId
                                                   channelId:channelId
                                            referenceMessage:_referenceMessage
                                                        text:text];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(createGIFMessage
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId path
                  : (NSString *)path resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWGIFMessage *r = [engine createGIFMessage:_type
                                        targetId:targetId
                                       channelId:channelId
                                            path:path];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMediaMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(createCustomMessage
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId policy
                  : (int)policy messageIdentifier
                  : (NSString *)messageIdentifier fields
                  : (NSDictionary *)fields resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWCustomMessagePolicy _policy = toCustomMessagePolicy(policy);
  RCIMIWCustomMessage *r = [engine createCustomMessage:_type
                                              targetId:targetId
                                             channelId:channelId
                                                policy:_policy
                                     messageIdentifier:messageIdentifier
                                                fields:fields];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(sendMessage
                  : (NSDictionary *)message resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessage *_message =
      [RCIMIWPlatformConverter convertMessageFromDict:message];
  NSInteger r = [engine sendMessage:_message];
  resolve(@(r));
}

RCT_EXPORT_METHOD(sendMediaMessage
                  : (NSDictionary *)message resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMediaMessage *_message =
      [RCIMIWPlatformConverter convertMediaMessageFromDict:message];
  NSInteger r = [engine sendMediaMessage:_message];
  resolve(@(r));
}

RCT_EXPORT_METHOD(cancelSendingMediaMessage
                  : (NSDictionary *)message resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMediaMessage *_message =
      [RCIMIWPlatformConverter convertMediaMessageFromDict:message];
  NSInteger r = [engine cancelSendingMediaMessage:_message];
  resolve(@(r));
}

RCT_EXPORT_METHOD(downloadMediaMessage
                  : (NSDictionary *)message resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMediaMessage *_message =
      [RCIMIWPlatformConverter convertMediaMessageFromDict:message];
  NSInteger r = [engine downloadMediaMessage:_message];
  resolve(@(r));
}

RCT_EXPORT_METHOD(cancelDownloadingMediaMessage
                  : (NSDictionary *)message resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMediaMessage *_message =
      [RCIMIWPlatformConverter convertMediaMessageFromDict:message];
  NSInteger r = [engine cancelDownloadingMediaMessage:_message];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadConversation
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadConversation:_type
                                targetId:targetId
                               channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadConversations
                  : (NSArray<NSNumber *> *)types channelId
                  : (NSString *)channelId startTime
                  : (nonnull NSNumber *)startTime count
                  : (nonnull NSNumber *)count resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadConversations:types
                                channelId:channelId
                                startTime:startTime.longLongValue
                                    count:count.intValue];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeConversation
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine removeConversation:_type
                                  targetId:targetId
                                 channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeConversations
                  : (NSArray<NSNumber *> *)conversationTypes channelId
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine removeConversations:conversationTypes
                                  channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUnreadCount
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadUnreadCount:_type
                               targetId:targetId
                              channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadTotalUnreadCount
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadTotalUnreadCount:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUnreadMentionedCount
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadUnreadMentionedCount:_type
                                        targetId:targetId
                                       channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUltraGroupAllUnreadCount
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadUltraGroupAllUnreadCount];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUltraGroupAllUnreadMentionedCount
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadUltraGroupAllUnreadMentionedCount];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUltraGroupUnreadCount
                  : (NSString *)targetId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadUltraGroupUnreadCount:targetId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUltraGroupUnreadMentionedCount
                  : (NSString *)targetId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadUltraGroupUnreadMentionedCount:targetId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUnreadCountByConversationTypes
                  : (NSArray<NSNumber *> *)conversationTypes channelId
                  : (NSString *)channelId contain
                  : (BOOL)contain resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadUnreadCountByConversationTypes:conversationTypes
                                                 channelId:channelId
                                                   contain:contain];
  resolve(@(r));
}

RCT_EXPORT_METHOD(clearUnreadCount
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId timestamp
                  : (nonnull NSNumber *)timestamp resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine clearUnreadCount:_type
                                targetId:targetId
                               channelId:channelId
                               timestamp:timestamp.longLongValue];
  resolve(@(r));
}

RCT_EXPORT_METHOD(saveDraftMessage
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId draft
                  : (NSString *)draft resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine saveDraftMessage:_type
                                targetId:targetId
                               channelId:channelId
                                   draft:draft];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadDraftMessage
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadDraftMessage:_type
                                targetId:targetId
                               channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(clearDraftMessage
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine clearDraftMessage:_type
                                 targetId:targetId
                                channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadBlockedConversations
                  : (NSArray<NSNumber *> *)conversationTypes channelId
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadBlockedConversations:conversationTypes
                                       channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeConversationTopStatus
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId top
                  : (BOOL)top resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine changeConversationTopStatus:_type
                                           targetId:targetId
                                          channelId:channelId
                                                top:top];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadConversationTopStatus
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadConversationTopStatus:_type
                                         targetId:targetId
                                        channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(syncConversationReadStatus
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId timestamp
                  : (nonnull NSNumber *)timestamp resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine syncConversationReadStatus:_type
                                          targetId:targetId
                                         channelId:channelId
                                         timestamp:timestamp.longLongValue];
  resolve(@(r));
}

RCT_EXPORT_METHOD(sendTypingStatus
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId currentType
                  : (NSString *)currentType resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine sendTypingStatus:_type
                                targetId:targetId
                               channelId:channelId
                             currentType:currentType];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadMessages
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId sentTime
                  : (nonnull NSNumber *)sentTime order
                  : (int)order policy
                  : (int)policy count
                  : (nonnull NSNumber *)count resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWTimeOrder _order = toTimeOrder(order);
  RCIMIWMessageOperationPolicy _policy = toMessageOperationPolicy(policy);
  NSInteger r = [engine loadMessages:_type
                            targetId:targetId
                           channelId:channelId
                            sentTime:sentTime.longLongValue
                               order:_order
                              policy:_policy
                               count:count.intValue];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadFirstUnreadMessage
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadFirstUnreadMessage:_type
                                      targetId:targetId
                                     channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUnreadMentionedMessages
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadUnreadMentionedMessages:_type
                                           targetId:targetId
                                          channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(insertMessage
                  : (NSDictionary *)message resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessage *_message =
      [RCIMIWPlatformConverter convertMessageFromDict:message];
  NSInteger r = [engine insertMessage:_message];
  resolve(@(r));
}

RCT_EXPORT_METHOD(insertMessages
                  : (NSArray<NSDictionary *> *)messages resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSArray<RCIMIWMessage *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [(NSMutableArray *)_messages
        addObject:[RCIMIWPlatformConverter
                      convertMessageFromDict:[messages objectAtIndex:i]]];
  NSInteger r = [engine insertMessages:_messages];
  resolve(@(r));
}

RCT_EXPORT_METHOD(clearMessages
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId timestamp
                  : (nonnull NSNumber *)timestamp policy
                  : (int)policy resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWMessageOperationPolicy _policy = toMessageOperationPolicy(policy);
  NSInteger r = [engine clearMessages:_type
                             targetId:targetId
                            channelId:channelId
                            timestamp:timestamp.longLongValue
                               policy:_policy];
  resolve(@(r));
}

RCT_EXPORT_METHOD(deleteLocalMessages
                  : (NSArray<NSDictionary *> *)messages resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSArray<RCIMIWMessage *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [(NSMutableArray *)_messages
        addObject:[RCIMIWPlatformConverter
                      convertMessageFromDict:[messages objectAtIndex:i]]];
  NSInteger r = [engine deleteLocalMessages:_messages];
  resolve(@(r));
}

RCT_EXPORT_METHOD(deleteMessages
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId messages
                  : (NSArray<NSDictionary *> *)messages resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSArray<RCIMIWMessage *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [(NSMutableArray *)_messages
        addObject:[RCIMIWPlatformConverter
                      convertMessageFromDict:[messages objectAtIndex:i]]];
  NSInteger r = [engine deleteMessages:_type
                              targetId:targetId
                             channelId:channelId
                              messages:_messages];
  resolve(@(r));
}

RCT_EXPORT_METHOD(recallMessage
                  : (NSDictionary *)message resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessage *_message =
      [RCIMIWPlatformConverter convertMessageFromDict:message];
  NSInteger r = [engine recallMessage:_message];
  resolve(@(r));
}

RCT_EXPORT_METHOD(sendPrivateReadReceiptMessage
                  : (NSString *)targetId channelId
                  : (NSString *)channelId timestamp
                  : (nonnull NSNumber *)timestamp resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine sendPrivateReadReceiptMessage:targetId
                                            channelId:channelId
                                            timestamp:timestamp.longLongValue];
  resolve(@(r));
}

RCT_EXPORT_METHOD(sendGroupReadReceiptRequest
                  : (NSDictionary *)message resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessage *_message =
      [RCIMIWPlatformConverter convertMessageFromDict:message];
  NSInteger r = [engine sendGroupReadReceiptRequest:_message];
  resolve(@(r));
}

RCT_EXPORT_METHOD(sendGroupReadReceiptResponse
                  : (NSString *)targetId channelId
                  : (NSString *)channelId messages
                  : (NSArray<NSDictionary *> *)messages resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSArray<RCIMIWMessage *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [(NSMutableArray *)_messages
        addObject:[RCIMIWPlatformConverter
                      convertMessageFromDict:[messages objectAtIndex:i]]];
  NSInteger r = [engine sendGroupReadReceiptResponse:targetId
                                           channelId:channelId
                                            messages:_messages];
  resolve(@(r));
}

RCT_EXPORT_METHOD(updateMessageExpansion
                  : (NSString *)messageUId expansion
                  : (NSDictionary *)expansion resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine updateMessageExpansion:messageUId expansion:expansion];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeMessageExpansionForKeys
                  : (NSString *)messageUId keys
                  : (NSArray<NSString *> *)keys resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine removeMessageExpansionForKeys:messageUId keys:keys];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeMessageSentStatus
                  : (nonnull NSNumber *)messageId sentStatus
                  : (int)sentStatus resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWSentStatus _sentStatus = toSentStatus(sentStatus);
  NSInteger r = [engine changeMessageSentStatus:messageId.intValue
                                     sentStatus:_sentStatus];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeMessageReceiveStatus
                  : (nonnull NSNumber *)messageId receivedStatus
                  : (int)receivedStatus resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWReceivedStatus _receivedStatus = toReceivedStatus(receivedStatus);
  NSInteger r = [engine changeMessageReceiveStatus:messageId.intValue
                                    receivedStatus:_receivedStatus];
  resolve(@(r));
}

RCT_EXPORT_METHOD(joinChatRoom
                  : (NSString *)targetId messageCount
                  : (nonnull NSNumber *)messageCount autoCreate
                  : (BOOL)autoCreate resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine joinChatRoom:targetId
                        messageCount:messageCount.intValue
                          autoCreate:autoCreate];
  resolve(@(r));
}

RCT_EXPORT_METHOD(leaveChatRoom
                  : (NSString *)targetId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine leaveChatRoom:targetId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadChatRoomMessages
                  : (NSString *)targetId timestamp
                  : (nonnull NSNumber *)timestamp order
                  : (int)order count
                  : (nonnull NSNumber *)count resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWTimeOrder _order = toTimeOrder(order);
  NSInteger r = [engine loadChatRoomMessages:targetId
                                   timestamp:timestamp.longLongValue
                                       order:_order
                                       count:count.intValue];
  resolve(@(r));
}

RCT_EXPORT_METHOD(addChatRoomEntry
                  : (NSString *)targetId key
                  : (NSString *)key value
                  : (NSString *)value deleteWhenLeft
                  : (BOOL)deleteWhenLeft overwrite
                  : (BOOL)overwrite resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine addChatRoomEntry:targetId
                                     key:key
                                   value:value
                          deleteWhenLeft:deleteWhenLeft
                               overwrite:overwrite];
  resolve(@(r));
}

RCT_EXPORT_METHOD(addChatRoomEntries
                  : (NSString *)targetId entries
                  : (NSDictionary *)entries deleteWhenLeft
                  : (BOOL)deleteWhenLeft overwrite
                  : (BOOL)overwrite resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine addChatRoomEntries:targetId
                                   entries:entries
                            deleteWhenLeft:deleteWhenLeft
                                 overwrite:overwrite];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadChatRoomEntry
                  : (NSString *)targetId key
                  : (NSString *)key resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadChatRoomEntry:targetId key:key];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadAllChatRoomEntries
                  : (NSString *)targetId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadAllChatRoomEntries:targetId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeChatRoomEntry
                  : (NSString *)targetId key
                  : (NSString *)key force
                  : (BOOL)force resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine removeChatRoomEntry:targetId key:key force:force];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeChatRoomEntries
                  : (NSString *)targetId keys
                  : (NSArray<NSString *> *)keys force
                  : (BOOL)force resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine removeChatRoomEntries:targetId keys:keys force:force];
  resolve(@(r));
}

RCT_EXPORT_METHOD(addToBlacklist
                  : (NSString *)userId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine addToBlacklist:userId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeFromBlacklist
                  : (NSString *)userId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine removeFromBlacklist:userId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadBlacklistStatus
                  : (NSString *)userId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadBlacklistStatus:userId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadBlacklist
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadBlacklist];
  resolve(@(r));
}

RCT_EXPORT_METHOD(searchMessages
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId keyword
                  : (NSString *)keyword startTime
                  : (nonnull NSNumber *)startTime count
                  : (nonnull NSNumber *)count resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine searchMessages:_type
                              targetId:targetId
                             channelId:channelId
                               keyword:keyword
                             startTime:startTime.longLongValue
                                 count:count.intValue];
  resolve(@(r));
}

RCT_EXPORT_METHOD(searchMessagesByTimeRange
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId keyword
                  : (NSString *)keyword startTime
                  : (nonnull NSNumber *)startTime endTime
                  : (nonnull NSNumber *)endTime offset
                  : (nonnull NSNumber *)offset count
                  : (nonnull NSNumber *)count resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine searchMessagesByTimeRange:_type
                                         targetId:targetId
                                        channelId:channelId
                                          keyword:keyword
                                        startTime:startTime.longLongValue
                                          endTime:endTime.longLongValue
                                           offset:offset.intValue
                                            count:count.intValue];
  resolve(@(r));
}

RCT_EXPORT_METHOD(searchMessagesByUserId
                  : (NSString *)userId type
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId startTime
                  : (nonnull NSNumber *)startTime count
                  : (nonnull NSNumber *)count resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine searchMessagesByUserId:userId
                                          type:_type
                                      targetId:targetId
                                     channelId:channelId
                                     startTime:startTime.longLongValue
                                         count:count.intValue];
  resolve(@(r));
}

RCT_EXPORT_METHOD(searchConversations
                  : (NSArray<NSNumber *> *)conversationTypes channelId
                  : (NSString *)channelId messageTypes
                  : (NSArray<NSNumber *> *)messageTypes keyword
                  : (NSString *)keyword resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine searchConversations:conversationTypes
                                  channelId:channelId
                               messageTypes:messageTypes
                                    keyword:keyword];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeNotificationQuietHours
                  : (NSString *)startTime spanMins
                  : (nonnull NSNumber *)spanMins level
                  : (int)level resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWPushNotificationQuietHoursLevel _level =
      toPushNotificationQuietHoursLevel(level);
  NSInteger r = [engine changeNotificationQuietHours:startTime
                                            spanMins:spanMins.intValue
                                               level:_level];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeNotificationQuietHours
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine removeNotificationQuietHours];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadNotificationQuietHours
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadNotificationQuietHours];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeConversationNotificationLevel
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId level
                  : (int)level resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWPushNotificationLevel _level = toPushNotificationLevel(level);
  NSInteger r = [engine changeConversationNotificationLevel:_type
                                                   targetId:targetId
                                                  channelId:channelId
                                                      level:_level];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadConversationNotificationLevel
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadConversationNotificationLevel:_type
                                                 targetId:targetId
                                                channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeConversationTypeNotificationLevel
                  : (int)type level
                  : (int)level resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWPushNotificationLevel _level = toPushNotificationLevel(level);
  NSInteger r = [engine changeConversationTypeNotificationLevel:_type
                                                          level:_level];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadConversationTypeNotificationLevel
                  : (int)type resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadConversationTypeNotificationLevel:_type];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeUltraGroupDefaultNotificationLevel
                  : (NSString *)targetId level
                  : (int)level resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWPushNotificationLevel _level = toPushNotificationLevel(level);
  NSInteger r = [engine changeUltraGroupDefaultNotificationLevel:targetId
                                                           level:_level];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUltraGroupDefaultNotificationLevel
                  : (NSString *)targetId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadUltraGroupDefaultNotificationLevel:targetId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeUltraGroupChannelDefaultNotificationLevel
                  : (NSString *)targetId channelId
                  : (NSString *)channelId level
                  : (int)level resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWPushNotificationLevel _level = toPushNotificationLevel(level);
  NSInteger r =
      [engine changeUltraGroupChannelDefaultNotificationLevel:targetId
                                                    channelId:channelId
                                                        level:_level];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUltraGroupChannelDefaultNotificationLevel
                  : (NSString *)targetId channelId
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r =
      [engine loadUltraGroupChannelDefaultNotificationLevel:targetId
                                                  channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changePushContentShowStatus
                  : (BOOL)showContent resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine changePushContentShowStatus:showContent];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changePushLanguage
                  : (NSString *)language resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine changePushLanguage:language];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changePushReceiveStatus
                  : (BOOL)receive resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine changePushReceiveStatus:receive];
  resolve(@(r));
}

RCT_EXPORT_METHOD(sendGroupMessageToDesignatedUsers
                  : (NSDictionary *)message userIds
                  : (NSArray<NSString *> *)userIds resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessage *_message =
      [RCIMIWPlatformConverter convertMessageFromDict:message];
  NSInteger r = [engine sendGroupMessageToDesignatedUsers:_message
                                                  userIds:userIds];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadMessageCount
                  : (int)type targetId
                  : (NSString *)targetId channelId
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadMessageCount:_type
                                targetId:targetId
                               channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadTopConversations
                  : (NSArray<NSNumber *> *)conversationTypes channelId
                  : (NSString *)channelId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadTopConversations:conversationTypes
                                   channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(syncUltraGroupReadStatus
                  : (NSString *)targetId channelId
                  : (NSString *)channelId timestamp
                  : (nonnull NSNumber *)timestamp resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine syncUltraGroupReadStatus:targetId
                                       channelId:channelId
                                       timestamp:timestamp.longLongValue];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadConversationsForAllChannel
                  : (int)type targetId
                  : (NSString *)targetId resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadConversationsForAllChannel:_type targetId:targetId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(modifyUltraGroupMessage
                  : (NSString *)messageUId message
                  : (NSDictionary *)message resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessage *_message =
      [RCIMIWPlatformConverter convertMessageFromDict:message];
  NSInteger r = [engine modifyUltraGroupMessage:messageUId message:_message];
  resolve(@(r));
}

RCT_EXPORT_METHOD(recallUltraGroupMessage
                  : (NSDictionary *)message deleteRemote
                  : (BOOL)deleteRemote resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessage *_message =
      [RCIMIWPlatformConverter convertMessageFromDict:message];
  NSInteger r = [engine recallUltraGroupMessage:_message
                                   deleteRemote:deleteRemote];
  resolve(@(r));
}

RCT_EXPORT_METHOD(clearUltraGroupMessages
                  : (NSString *)targetId channelId
                  : (NSString *)channelId timestamp
                  : (nonnull NSNumber *)timestamp policy
                  : (int)policy resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessageOperationPolicy _policy = toMessageOperationPolicy(policy);
  NSInteger r = [engine clearUltraGroupMessages:targetId
                                      channelId:channelId
                                      timestamp:timestamp.longLongValue
                                         policy:_policy];
  resolve(@(r));
}

RCT_EXPORT_METHOD(sendUltraGroupTypingStatus
                  : (NSString *)targetId channelId
                  : (NSString *)channelId typingStatus
                  : (int)typingStatus resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWUltraGroupTypingStatus _typingStatus =
      toUltraGroupTypingStatus(typingStatus);
  NSInteger r = [engine sendUltraGroupTypingStatus:targetId
                                         channelId:channelId
                                      typingStatus:_typingStatus];
  resolve(@(r));
}

RCT_EXPORT_METHOD(clearUltraGroupMessagesForAllChannel
                  : (NSString *)targetId timestamp
                  : (nonnull NSNumber *)timestamp resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r =
      [engine clearUltraGroupMessagesForAllChannel:targetId
                                         timestamp:timestamp.longLongValue];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadBatchRemoteUltraGroupMessages
                  : (NSArray<NSDictionary *> *)messages resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSArray<RCIMIWMessage *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [(NSMutableArray *)_messages
        addObject:[RCIMIWPlatformConverter
                      convertMessageFromDict:[messages objectAtIndex:i]]];
  NSInteger r = [engine loadBatchRemoteUltraGroupMessages:_messages];
  resolve(@(r));
}

RCT_EXPORT_METHOD(updateUltraGroupMessageExpansion
                  : (NSString *)messageUId expansion
                  : (NSDictionary *)expansion resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine updateUltraGroupMessageExpansion:messageUId
                                               expansion:expansion];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeUltraGroupMessageExpansion
                  : (NSString *)messageUId keys
                  : (NSArray<NSString *> *)keys resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine removeUltraGroupMessageExpansion:messageUId keys:keys];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeLogLevel
                  : (int)level resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWLogLevel _level = toLogLevel(level);
  NSInteger r = [engine changeLogLevel:_level];
  resolve(@(r));
}

- (void)onMessageReceived:(RCIMIWMessage *)message
                     left:(NSInteger)left
                  offline:(BOOL)offline
               hasPackage:(BOOL)hasPackage {
  NSString *eventName = @"IRCIMIWListener:onMessageReceived";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message]
               forKey:@"message"];
  [arguments setObject:@(left) forKey:@"left"];
  [arguments setObject:@(offline) forKey:@"offline"];
  [arguments setObject:@(hasPackage) forKey:@"hasPackage"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConnectionStatusChanged:(RCIMIWConnectionStatus)status {
  NSString *eventName = @"IRCIMIWListener:onConnectionStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(ConnectionStatusToNum(status)) forKey:@"status"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationTopStatusSynced:(RCIMIWConversationType)type
                             targetId:(NSString *)targetId
                            channelId:(NSString *)channelId
                                  top:(BOOL)top {
  NSString *eventName = @"IRCIMIWListener:onConversationTopStatusSynced";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(top) forKey:@"top"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onRemoteMessageRecalled:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onRemoteMessageRecalled";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message]
               forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onPrivateReadReceiptReceived:(NSString *)targetId
                           channelId:(NSString *)channelId
                           timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onPrivateReadReceiptReceived";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onRemoteMessageExpansionUpdated:
            (NSDictionary<NSString *, NSString *> *)expansion
                                message:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onRemoteMessageExpansionUpdated";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:expansion ? expansion : @{} forKey:@"expansion"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message]
               forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onRemoteMessageExpansionForKeyRemoved:(RCIMIWMessage *)message
                                         keys:(NSArray<NSString *> *)keys {
  NSString *eventName =
      @"IRCIMIWListener:onRemoteMessageExpansionForKeyRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message]
               forKey:@"message"];
  [arguments setObject:keys ? keys : @[] forKey:@"keys"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomMemberChanged:(NSString *)targetId
                        actions:
                            (NSArray<RCIMIWChatRoomMemberAction *> *)actions {
  NSString *eventName = @"IRCIMIWListener:onChatRoomMemberChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  NSMutableArray<NSDictionary *> *_actions = [NSMutableArray new];
  for (int i = 0; actions && i < actions.count; i++)
    [_actions
        addObject:[RCIMIWPlatformConverter
                      convertChatRoomMemberActionToDict:[actions
                                                            objectAtIndex:i]]];
  [arguments setObject:_actions forKey:@"actions"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onTypingStatusChanged:(RCIMIWConversationType)type
                     targetId:(NSString *)targetId
                    channelId:(NSString *)channelId
             userTypingStatus:
                 (NSArray<RCIMIWTypingStatus *> *)userTypingStatus {
  NSString *eventName = @"IRCIMIWListener:onTypingStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  NSMutableArray<NSDictionary *> *_userTypingStatus = [NSMutableArray new];
  for (int i = 0; userTypingStatus && i < userTypingStatus.count; i++)
    [_userTypingStatus
        addObject:[RCIMIWPlatformConverter
                      convertTypingStatusToDict:[userTypingStatus
                                                    objectAtIndex:i]]];
  [arguments setObject:_userTypingStatus forKey:@"userTypingStatus"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationReadStatusSyncMessageReceived:(RCIMIWConversationType)type
                                           targetId:(NSString *)targetId
                                          timestamp:(long long)timestamp {
  NSString *eventName =
      @"IRCIMIWListener:onConversationReadStatusSyncMessageReceived";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomEntriesSynced:(NSString *)roomId {
  NSString *eventName = @"IRCIMIWListener:onChatRoomEntriesSynced";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:roomId ? roomId : @"" forKey:@"roomId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)
    onChatRoomEntriesChanged:(RCIMIWChatRoomEntriesOperationType)operationType
                      roomId:(NSString *)roomId
                     entries:(NSDictionary<NSString *, NSString *> *)entries {
  NSString *eventName = @"IRCIMIWListener:onChatRoomEntriesChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(ChatRoomEntriesOperationTypeToNum(operationType))
                forKey:@"operationType"];
  [arguments setObject:roomId ? roomId : @"" forKey:@"roomId"];
  [arguments setObject:entries ? entries : @{} forKey:@"entries"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onRemoteUltraGroupMessageExpansionUpdated:
    (NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName =
      @"IRCIMIWListener:onRemoteUltraGroupMessageExpansionUpdated";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter
                             convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setObject:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onRemoteUltraGroupMessageModified:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onRemoteUltraGroupMessageModified";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter
                             convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setObject:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onRemoteUltraGroupMessageRecalled:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onRemoteUltraGroupMessageRecalled";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter
                             convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setObject:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupReadTimeReceived:(NSString *)targetId
                           channelId:(NSString *)channelId
                           timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupReadTimeReceived";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupTypingStatusChanged:
    (NSArray<RCIMIWUltraGroupTypingStatusInfo *> *)info {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupTypingStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  NSMutableArray<NSDictionary *> *_info = [NSMutableArray new];
  for (int i = 0; info && i < info.count; i++)
    [_info addObject:[RCIMIWPlatformConverter
                         convertUltraGroupTypingStatusInfoToDict:
                             [info objectAtIndex:i]]];
  [arguments setObject:_info forKey:@"info"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageBlocked:(RCIMIWBlockedMessageInfo *)info {
  NSString *eventName = @"IRCIMIWListener:onMessageBlocked";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments
      setValue:[RCIMIWPlatformConverter convertBlockedMessageInfoToDict:info]
        forKey:@"info"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomStatusChanged:(NSString *)targetId
                         status:(RCIMIWChatRoomStatus)status {
  NSString *eventName = @"IRCIMIWListener:onChatRoomStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:@(ChatRoomStatusToNum(status)) forKey:@"status"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onGroupMessageReadReceiptRequestReceived:(NSString *)targetId
                                      messageUId:(NSString *)messageUId {
  NSString *eventName =
      @"IRCIMIWListener:onGroupMessageReadReceiptRequestReceived";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:messageUId ? messageUId : @"" forKey:@"messageUId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onGroupMessageReadReceiptResponseReceived:(NSString *)targetId
                                       messageUId:(NSString *)messageUId
                                   respondUserIds:
                                       (NSDictionary<NSString *, NSNumber *> *)
                                           respondUserIds {
  NSString *eventName =
      @"IRCIMIWListener:onGroupMessageReadReceiptResponseReceived";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:messageUId ? messageUId : @"" forKey:@"messageUId"];
  [arguments setObject:respondUserIds ? respondUserIds : @{}
                forKey:@"respondUserIds"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConnected:(NSInteger)code userId:(nullable NSString *)userId {
  NSString *eventName = @"IRCIMIWListener:onConnected";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:userId ? userId : @"" forKey:@"userId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onDatabaseOpened:(NSInteger)code {
  NSString *eventName = @"IRCIMIWListener:onDatabaseOpened";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationLoaded:(NSInteger)code
                        type:(RCIMIWConversationType)type
                    targetId:(NSString *)targetId
                   channelId:(NSString *)channelId
                conversation:(nullable RCIMIWConversation *)conversation {
  NSString *eventName = @"IRCIMIWListener:onConversationLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments
      setValue:[RCIMIWPlatformConverter convertConversationToDict:conversation]
        forKey:@"conversation"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationsLoaded:(NSInteger)code
            conversationTypes:(NSArray<NSNumber *> *)conversationTypes
                    channelId:(NSString *)channelId
                    startTime:(long long)startTime
                        count:(int)count
                conversations:(NSArray<RCIMIWConversation *> *)conversations {
  NSString *eventName = @"IRCIMIWListener:onConversationsLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  NSMutableArray<NSNumber *> *_conversationTypes = [NSMutableArray new];
  for (int i = 0; conversationTypes && i < conversationTypes.count; i++)
    [_conversationTypes
        addObject:@(ConversationTypeToNum(
                      [conversationTypes objectAtIndex:i].intValue))];
  [arguments setObject:_conversationTypes forKey:@"conversationTypes"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(startTime) forKey:@"startTime"];
  [arguments setObject:@(count) forKey:@"count"];
  NSMutableArray<NSDictionary *> *_conversations = [NSMutableArray new];
  for (int i = 0; conversations && i < conversations.count; i++)
    [_conversations
        addObject:[RCIMIWPlatformConverter
                      convertConversationToDict:[conversations
                                                    objectAtIndex:i]]];
  [arguments setObject:_conversations forKey:@"conversations"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationRemoved:(NSInteger)code
                         type:(RCIMIWConversationType)type
                     targetId:(NSString *)targetId
                    channelId:(NSString *)channelId {
  NSString *eventName = @"IRCIMIWListener:onConversationRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationsRemoved:(NSInteger)code
                         types:(NSArray<NSNumber *> *)types
                     channelId:(NSString *)channelId {
  NSString *eventName = @"IRCIMIWListener:onConversationsRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  NSMutableArray<NSNumber *> *_types = [NSMutableArray new];
  for (int i = 0; types && i < types.count; i++)
    [_types
        addObject:@(ConversationTypeToNum([types objectAtIndex:i].intValue))];
  [arguments setObject:_types forKey:@"types"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onTotalUnreadCountLoaded:(NSInteger)code
                       channelId:(NSString *)channelId
                           count:(NSInteger)count {
  NSString *eventName = @"IRCIMIWListener:onTotalUnreadCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUnreadCountLoaded:(NSInteger)code
                       type:(RCIMIWConversationType)type
                   targetId:(NSString *)targetId
                  channelId:(NSString *)channelId
                      count:(NSInteger)count {
  NSString *eventName = @"IRCIMIWListener:onUnreadCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUnreadCountByConversationTypesLoaded:(NSInteger)code
                                         types:(NSArray<NSNumber *> *)types
                                     channelId:(NSString *)channelId
                                       contain:(BOOL)contain
                                         count:(NSInteger)count {
  NSString *eventName =
      @"IRCIMIWListener:onUnreadCountByConversationTypesLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  NSMutableArray<NSNumber *> *_types = [NSMutableArray new];
  for (int i = 0; types && i < types.count; i++)
    [_types
        addObject:@(ConversationTypeToNum([types objectAtIndex:i].intValue))];
  [arguments setObject:_types forKey:@"types"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(contain) forKey:@"contain"];
  [arguments setObject:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUnreadMentionedCountLoaded:(NSInteger)code
                                type:(RCIMIWConversationType)type
                            targetId:(NSString *)targetId
                           channelId:(NSString *)channelId
                               count:(NSInteger)count {
  NSString *eventName = @"IRCIMIWListener:onUnreadMentionedCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupAllUnreadCountLoaded:(NSInteger)code
                                   count:(NSInteger)count {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupAllUnreadCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupAllUnreadMentionedCountLoaded:(NSInteger)code
                                            count:(NSInteger)count {
  NSString *eventName =
      @"IRCIMIWListener:onUltraGroupAllUnreadMentionedCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUnreadCountCleared:(NSInteger)code
                        type:(RCIMIWConversationType)type
                    targetId:(NSString *)targetId
                   channelId:(NSString *)channelId
                   timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onUnreadCountCleared";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onDraftMessageSaved:(NSInteger)code
                       type:(RCIMIWConversationType)type
                   targetId:(NSString *)targetId
                  channelId:(NSString *)channelId
                      draft:(NSString *)draft {
  NSString *eventName = @"IRCIMIWListener:onDraftMessageSaved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:draft ? draft : @"" forKey:@"draft"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onDraftMessageCleared:(NSInteger)code
                         type:(RCIMIWConversationType)type
                     targetId:(NSString *)targetId
                    channelId:(NSString *)channelId {
  NSString *eventName = @"IRCIMIWListener:onDraftMessageCleared";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onDraftMessageLoaded:(NSInteger)code
                        type:(RCIMIWConversationType)type
                    targetId:(NSString *)targetId
                   channelId:(NSString *)channelId
                       draft:(NSString *)draft {
  NSString *eventName = @"IRCIMIWListener:onDraftMessageLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:draft ? draft : @"" forKey:@"draft"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onBlockedConversationsLoaded:(NSInteger)code
                               types:(NSArray<NSNumber *> *)types
                           channelId:(NSString *)channelId
                       conversations:(nullable NSArray<RCIMIWConversation *> *)
                                         conversations {
  NSString *eventName = @"IRCIMIWListener:onBlockedConversationsLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  NSMutableArray<NSNumber *> *_types = [NSMutableArray new];
  for (int i = 0; types && i < types.count; i++)
    [_types
        addObject:@(ConversationTypeToNum([types objectAtIndex:i].intValue))];
  [arguments setObject:_types forKey:@"types"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:conversations ? conversations : @[]
                forKey:@"conversations"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationTopStatusChanged:(NSInteger)code
                                  type:(RCIMIWConversationType)type
                              targetId:(NSString *)targetId
                             channelId:(NSString *)channelId
                                   top:(BOOL)top {
  NSString *eventName = @"IRCIMIWListener:onConversationTopStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(top) forKey:@"top"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationTopStatusLoaded:(NSInteger)code
                                 type:(RCIMIWConversationType)type
                             targetId:(NSString *)targetId
                            channelId:(NSString *)channelId
                                  top:(BOOL)top {
  NSString *eventName = @"IRCIMIWListener:onConversationTopStatusLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(top) forKey:@"top"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationReadStatusSynced:(NSInteger)code
                                  type:(RCIMIWConversationType)type
                              targetId:(NSString *)targetId
                             channelId:(NSString *)channelId
                             timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onConversationReadStatusSynced";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageAttached:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onMessageAttached";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message]
               forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageSent:(NSInteger)code
              message:(nullable RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onMessageSent";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message]
               forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMediaMessageAttached:(RCIMIWMediaMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onMediaMessageAttached";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments
      setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message]
        forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMediaMessageSending:(RCIMIWMediaMessage *)message
                     progress:(int)progress {
  NSString *eventName = @"IRCIMIWListener:onMediaMessageSending";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments
      setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message]
        forKey:@"message"];
  [arguments setObject:@(progress) forKey:@"progress"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onSendingMediaMessageCanceled:(NSInteger)code
                              message:(RCIMIWMediaMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onSendingMediaMessageCanceled";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments
      setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message]
        forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMediaMessageSent:(NSInteger)code
                   message:(RCIMIWMediaMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onMediaMessageSent";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments
      setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message]
        forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMediaMessageDownloading:(RCIMIWMediaMessage *)message
                         progress:(int)progress {
  NSString *eventName = @"IRCIMIWListener:onMediaMessageDownloading";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments
      setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message]
        forKey:@"message"];
  [arguments setObject:@(progress) forKey:@"progress"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMediaMessageDownloaded:(NSInteger)code
                         message:(RCIMIWMediaMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onMediaMessageDownloaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments
      setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message]
        forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onDownloadingMediaMessageCanceled:(NSInteger)code
                                  message:(RCIMIWMediaMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onDownloadingMediaMessageCanceled";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments
      setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message]
        forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessagesLoaded:(NSInteger)code
                    type:(RCIMIWConversationType)type
                targetId:(NSString *)targetId
               channelId:(NSString *)channelId
                sentTime:(long long)sentTime
                   order:(RCIMIWTimeOrder)order
                messages:(nullable NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onMessagesLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(sentTime) forKey:@"sentTime"];
  [arguments setObject:@(TimeOrderToNum(order)) forKey:@"order"];
  [arguments setObject:messages ? messages : @[] forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUnreadMentionedMessagesLoaded:(NSInteger)code
                                   type:(RCIMIWConversationType)type
                               targetId:(NSString *)targetId
                              channelId:(NSString *)channelId
                               messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onUnreadMentionedMessagesLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter
                             convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setObject:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onFirstUnreadMessageLoaded:(NSInteger)code
                              type:(RCIMIWConversationType)type
                          targetId:(NSString *)targetId
                         channelId:(NSString *)channelId
                           message:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onFirstUnreadMessageLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message]
               forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageInserted:(NSInteger)code message:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onMessageInserted";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message]
               forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessagesInserted:(NSInteger)code
                  messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onMessagesInserted";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter
                             convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setObject:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageCleared:(NSInteger)code
                    type:(RCIMIWConversationType)type
                targetId:(NSString *)targetId
               channelId:(NSString *)channelId
               timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onMessageCleared";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onLocalMessagesDeleted:(NSInteger)code
                      messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onLocalMessagesDeleted";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter
                             convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setObject:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessagesDeleted:(NSInteger)code
                     type:(RCIMIWConversationType)type
                 targetId:(NSString *)targetId
                channelId:(NSString *)channelId
                 messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onMessagesDeleted";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter
                             convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setObject:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageRecalled:(NSInteger)code message:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onMessageRecalled";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message]
               forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onPrivateReadReceiptMessageSent:(NSInteger)code
                               targetId:(NSString *)targetId
                              channelId:(NSString *)channelId
                              timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onPrivateReadReceiptMessageSent";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageExpansionUpdated:(NSInteger)code
                       messageUId:(NSString *)messageUId
                        expansion:
                            (NSDictionary<NSString *, NSString *> *)expansion {
  NSString *eventName = @"IRCIMIWListener:onMessageExpansionUpdated";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:messageUId ? messageUId : @"" forKey:@"messageUId"];
  [arguments setObject:expansion ? expansion : @{} forKey:@"expansion"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageExpansionForKeysRemoved:(NSInteger)code
                              messageUId:(NSString *)messageUId
                                    keys:(NSArray<NSString *> *)keys {
  NSString *eventName = @"IRCIMIWListener:onMessageExpansionForKeysRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:messageUId ? messageUId : @"" forKey:@"messageUId"];
  [arguments setObject:keys ? keys : @[] forKey:@"keys"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageReceiveStatusChanged:(NSInteger)code
                            messageId:(long)messageId {
  NSString *eventName = @"IRCIMIWListener:onMessageReceiveStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(messageId) forKey:@"messageId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageSentStatusChanged:(NSInteger)code messageId:(long)messageId {
  NSString *eventName = @"IRCIMIWListener:onMessageSentStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(messageId) forKey:@"messageId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomJoined:(NSInteger)code targetId:(NSString *)targetId {
  NSString *eventName = @"IRCIMIWListener:onChatRoomJoined";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomJoining:(NSString *)targetId {
  NSString *eventName = @"IRCIMIWListener:onChatRoomJoining";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomLeft:(NSInteger)code targetId:(NSString *)targetId {
  NSString *eventName = @"IRCIMIWListener:onChatRoomLeft";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomMessagesLoaded:(NSInteger)code
                        targetId:(NSString *)targetId
                        messages:(NSArray<RCIMIWMessage *> *)messages
                        syncTime:(long long)syncTime {
  NSString *eventName = @"IRCIMIWListener:onChatRoomMessagesLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter
                             convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setObject:_messages forKey:@"messages"];
  [arguments setObject:@(syncTime) forKey:@"syncTime"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomEntryAdded:(NSInteger)code
                    targetId:(NSString *)targetId
                         key:(NSString *)key {
  NSString *eventName = @"IRCIMIWListener:onChatRoomEntryAdded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:key ? key : @"" forKey:@"key"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomEntriesAdded:(NSInteger)code
                      targetId:(NSString *)targetId
                       entries:(NSDictionary<NSString *, NSString *> *)entries
                  errorEntries:
                      (NSDictionary<NSString *, NSNumber *> *)errorEntries {
  NSString *eventName = @"IRCIMIWListener:onChatRoomEntriesAdded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:entries ? entries : @{} forKey:@"entries"];
  [arguments setObject:errorEntries ? errorEntries : @{}
                forKey:@"errorEntries"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomEntryLoaded:(NSInteger)code
                     targetId:(NSString *)targetId
                        entry:(NSDictionary<NSString *, NSString *> *)entry {
  NSString *eventName = @"IRCIMIWListener:onChatRoomEntryLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:entry ? entry : @{} forKey:@"entry"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onAllChatRoomEntriesLoaded:(NSInteger)code
                          targetId:(NSString *)targetId
                           entries:
                               (NSDictionary<NSString *, NSString *> *)entries {
  NSString *eventName = @"IRCIMIWListener:onAllChatRoomEntriesLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:entries ? entries : @{} forKey:@"entries"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomEntryRemoved:(NSInteger)code
                      targetId:(NSString *)targetId
                           key:(NSString *)key {
  NSString *eventName = @"IRCIMIWListener:onChatRoomEntryRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:key ? key : @"" forKey:@"key"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomEntriesRemoved:(NSInteger)code
                        targetId:(NSString *)targetId
                            keys:(NSArray<NSString *> *)keys {
  NSString *eventName = @"IRCIMIWListener:onChatRoomEntriesRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:keys ? keys : @[] forKey:@"keys"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onBlacklistAdded:(NSInteger)code userId:(NSString *)userId {
  NSString *eventName = @"IRCIMIWListener:onBlacklistAdded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:userId ? userId : @"" forKey:@"userId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onBlacklistRemoved:(NSInteger)code userId:(NSString *)userId {
  NSString *eventName = @"IRCIMIWListener:onBlacklistRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:userId ? userId : @"" forKey:@"userId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onBlacklistStatusLoaded:(NSInteger)code
                         userId:(NSString *)userId
                         status:(RCIMIWBlacklistStatus)status {
  NSString *eventName = @"IRCIMIWListener:onBlacklistStatusLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:userId ? userId : @"" forKey:@"userId"];
  [arguments setObject:@(BlacklistStatusToNum(status)) forKey:@"status"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onBlacklistLoaded:(NSInteger)code
                  userIds:(NSArray<NSString *> *)userIds {
  NSString *eventName = @"IRCIMIWListener:onBlacklistLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:userIds ? userIds : @[] forKey:@"userIds"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessagesSearched:(NSInteger)code
                      type:(RCIMIWConversationType)type
                  targetId:(NSString *)targetId
                 channelId:(NSString *)channelId
                   keyword:(NSString *)keyword
                 startTime:(long long)startTime
                     count:(int)count
                  messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onMessagesSearched";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:keyword ? keyword : @"" forKey:@"keyword"];
  [arguments setObject:@(startTime) forKey:@"startTime"];
  [arguments setObject:@(count) forKey:@"count"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter
                             convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setObject:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessagesSearchedByTimeRange:(NSInteger)code
                                 type:(RCIMIWConversationType)type
                             targetId:(NSString *)targetId
                            channelId:(NSString *)channelId
                              keyword:(NSString *)keyword
                            startTime:(long long)startTime
                              endTime:(long long)endTime
                               offset:(int)offset
                                count:(int)count
                             messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onMessagesSearchedByTimeRange";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:keyword ? keyword : @"" forKey:@"keyword"];
  [arguments setObject:@(startTime) forKey:@"startTime"];
  [arguments setObject:@(endTime) forKey:@"endTime"];
  [arguments setObject:@(offset) forKey:@"offset"];
  [arguments setObject:@(count) forKey:@"count"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter
                             convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setObject:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessagesSearchedByUserId:(NSInteger)code
                            userId:(NSString *)userId
                              type:(RCIMIWConversationType)type
                          targetId:(NSString *)targetId
                         channelId:(NSString *)channelId
                         startTime:(long long)startTime
                             count:(int)count
                          messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onMessagesSearchedByUserId";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:userId ? userId : @"" forKey:@"userId"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(startTime) forKey:@"startTime"];
  [arguments setObject:@(count) forKey:@"count"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter
                             convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setObject:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationsSearched:(NSInteger)code
              conversationTypes:(NSArray<NSNumber *> *)conversationTypes
                      channelId:(NSString *)channelId
                   messageTypes:(NSArray<NSNumber *> *)messageTypes
                        keyword:(NSString *)keyword
                  conversations:(NSArray<RCIMIWSearchConversationResult *> *)
                                    conversations {
  NSString *eventName = @"IRCIMIWListener:onConversationsSearched";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  NSMutableArray<NSNumber *> *_conversationTypes = [NSMutableArray new];
  for (int i = 0; conversationTypes && i < conversationTypes.count; i++)
    [_conversationTypes
        addObject:@(ConversationTypeToNum(
                      [conversationTypes objectAtIndex:i].intValue))];
  [arguments setObject:_conversationTypes forKey:@"conversationTypes"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  NSMutableArray<NSNumber *> *_messageTypes = [NSMutableArray new];
  for (int i = 0; messageTypes && i < messageTypes.count; i++)
    [_messageTypes
        addObject:@(MessageTypeToNum([messageTypes objectAtIndex:i].intValue))];
  [arguments setObject:_messageTypes forKey:@"messageTypes"];
  [arguments setObject:keyword ? keyword : @"" forKey:@"keyword"];
  NSMutableArray<NSDictionary *> *_conversations = [NSMutableArray new];
  for (int i = 0; conversations && i < conversations.count; i++)
    [_conversations addObject:[RCIMIWPlatformConverter
                                  convertSearchConversationResultToDict:
                                      [conversations objectAtIndex:i]]];
  [arguments setObject:_conversations forKey:@"conversations"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onGroupReadReceiptRequestSent:(NSInteger)code
                              message:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onGroupReadReceiptRequestSent";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message]
               forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onGroupReadReceiptResponseSent:(NSInteger)code
                              targetId:(NSString *)targetId
                             channelId:(NSString *)channelId
                              messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onGroupReadReceiptResponseSent";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter
                             convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setObject:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onNotificationQuietHoursChanged:(NSInteger)code
                              startTime:(NSString *)startTime
                               spanMins:(int)spanMins
                                  level:(RCIMIWPushNotificationQuietHoursLevel)
                                            level {
  NSString *eventName = @"IRCIMIWListener:onNotificationQuietHoursChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:startTime ? startTime : @"" forKey:@"startTime"];
  [arguments setObject:@(spanMins) forKey:@"spanMins"];
  [arguments setObject:@(PushNotificationQuietHoursLevelToNum(level))
                forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onNotificationQuietHoursRemoved:(NSInteger)code {
  NSString *eventName = @"IRCIMIWListener:onNotificationQuietHoursRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onNotificationQuietHoursLoaded:(NSInteger)code
                             startTime:(NSString *)startTime
                              spanMins:(int)spanMins
                                 level:(RCIMIWPushNotificationQuietHoursLevel)
                                           level {
  NSString *eventName = @"IRCIMIWListener:onNotificationQuietHoursLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:startTime ? startTime : @"" forKey:@"startTime"];
  [arguments setObject:@(spanMins) forKey:@"spanMins"];
  [arguments setObject:@(PushNotificationQuietHoursLevelToNum(level))
                forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationNotificationLevelChanged:(NSInteger)code
                                          type:(RCIMIWConversationType)type
                                      targetId:(NSString *)targetId
                                     channelId:(NSString *)channelId
                                         level:(RCIMIWPushNotificationLevel)
                                                   level {
  NSString *eventName =
      @"IRCIMIWListener:onConversationNotificationLevelChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationNotificationLevelLoaded:(NSInteger)code
                                         type:(RCIMIWConversationType)type
                                     targetId:(NSString *)targetId
                                    channelId:(NSString *)channelId
                                        level:
                                            (RCIMIWPushNotificationLevel)level {
  NSString *eventName =
      @"IRCIMIWListener:onConversationNotificationLevelLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationTypeNotificationLevelChanged:(NSInteger)code
                                              type:(RCIMIWConversationType)type
                                             level:(RCIMIWPushNotificationLevel)
                                                       level {
  NSString *eventName =
      @"IRCIMIWListener:onConversationTypeNotificationLevelChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationTypeNotificationLevelLoaded:(NSInteger)code
                                             type:(RCIMIWConversationType)type
                                            level:(RCIMIWPushNotificationLevel)
                                                      level {
  NSString *eventName =
      @"IRCIMIWListener:onConversationTypeNotificationLevelLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupDefaultNotificationLevelChanged:(NSInteger)code
                                           targetId:(NSString *)targetId
                                              level:
                                                  (RCIMIWPushNotificationLevel)
                                                      level {
  NSString *eventName =
      @"IRCIMIWListener:onUltraGroupDefaultNotificationLevelChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupDefaultNotificationLevelLoaded:(NSInteger)code
                                          targetId:(NSString *)targetId
                                             level:(RCIMIWPushNotificationLevel)
                                                       level {
  NSString *eventName =
      @"IRCIMIWListener:onUltraGroupDefaultNotificationLevelLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)
    onUltraGroupChannelDefaultNotificationLevelChanged:(NSInteger)code
                                              targetId:(NSString *)targetId
                                             channelId:(NSString *)channelId
                                                 level:
                                                     (RCIMIWPushNotificationLevel)
                                                         level {
  NSString *eventName =
      @"IRCIMIWListener:onUltraGroupChannelDefaultNotificationLevelChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)
    onUltraGroupChannelDefaultNotificationLevelLoaded:(NSInteger)code
                                             targetId:(NSString *)targetId
                                            channelId:(NSString *)channelId
                                                level:
                                                    (RCIMIWPushNotificationLevel)
                                                        level {
  NSString *eventName =
      @"IRCIMIWListener:onUltraGroupChannelDefaultNotificationLevelLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onPushContentShowStatusChanged:(NSInteger)code
                           showContent:(BOOL)showContent {
  NSString *eventName = @"IRCIMIWListener:onPushContentShowStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(showContent) forKey:@"showContent"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onPushLanguageChanged:(NSInteger)code language:(NSString *)language {
  NSString *eventName = @"IRCIMIWListener:onPushLanguageChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:language ? language : @"" forKey:@"language"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onPushReceiveStatusChanged:(NSInteger)code receive:(BOOL)receive {
  NSString *eventName = @"IRCIMIWListener:onPushReceiveStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(receive) forKey:@"receive"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageCountLoaded:(NSInteger)code
                        type:(RCIMIWConversationType)type
                    targetId:(NSString *)targetId
                   channelId:(NSString *)channelId
                       count:(int)count {
  NSString *eventName = @"IRCIMIWListener:onMessageCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onTopConversationsLoaded:(NSInteger)code
               conversationTypes:(NSArray<NSNumber *> *)conversationTypes
                       channelId:(NSString *)channelId
                   conversations:
                       (nullable NSArray<RCIMIWConversation *> *)conversations {
  NSString *eventName = @"IRCIMIWListener:onTopConversationsLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  NSMutableArray<NSNumber *> *_conversationTypes = [NSMutableArray new];
  for (int i = 0; conversationTypes && i < conversationTypes.count; i++)
    [_conversationTypes
        addObject:@(ConversationTypeToNum(
                      [conversationTypes objectAtIndex:i].intValue))];
  [arguments setObject:_conversationTypes forKey:@"conversationTypes"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:conversations ? conversations : @[]
                forKey:@"conversations"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onGroupMessageToDesignatedUsersAttached:(RCIMIWMessage *)message {
  NSString *eventName =
      @"IRCIMIWListener:onGroupMessageToDesignatedUsersAttached";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message]
               forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onGroupMessageToDesignatedUsersSent:(NSInteger)code
                                    message:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onGroupMessageToDesignatedUsersSent";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message]
               forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupReadStatusSynced:(NSInteger)code
                            targetId:(NSString *)targetId
                           channelId:(NSString *)channelId
                           timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupReadStatusSynced";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationsLoadedForAllChannel:(NSInteger)code
                                      type:(RCIMIWConversationType)type
                                  targetId:(NSString *)targetId
                             conversations:(NSArray<RCIMIWConversation *> *)
                                               conversations {
  NSString *eventName = @"IRCIMIWListener:onConversationsLoadedForAllChannel";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  NSMutableArray<NSDictionary *> *_conversations = [NSMutableArray new];
  for (int i = 0; conversations && i < conversations.count; i++)
    [_conversations
        addObject:[RCIMIWPlatformConverter
                      convertConversationToDict:[conversations
                                                    objectAtIndex:i]]];
  [arguments setObject:_conversations forKey:@"conversations"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupUnreadMentionedCountLoaded:(NSInteger)code
                                      targetId:(NSString *)targetId
                                         count:(NSInteger)count {
  NSString *eventName =
      @"IRCIMIWListener:onUltraGroupUnreadMentionedCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupUnreadCountLoaded:(NSInteger)code
                             targetId:(NSString *)targetId
                                count:(NSInteger)count {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupUnreadCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupMessageModified:(NSInteger)code
                         messageUId:(NSString *)messageUId {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupMessageModified";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:messageUId ? messageUId : @"" forKey:@"messageUId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupMessageRecalled:(NSInteger)code
                            message:(RCIMIWMessage *)message
                       deleteRemote:(BOOL)deleteRemote {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupMessageRecalled";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message]
               forKey:@"message"];
  [arguments setObject:@(deleteRemote) forKey:@"deleteRemote"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupMessagesCleared:(NSInteger)code
                           targetId:(NSString *)targetId
                          channelId:(NSString *)channelId
                          timestamp:(long long)timestamp
                             policy:(RCIMIWMessageOperationPolicy)policy {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupMessagesCleared";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(timestamp) forKey:@"timestamp"];
  [arguments setObject:@(MessageOperationPolicyToNum(policy)) forKey:@"policy"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupMessagesClearedForAllChannel:(NSInteger)code
                                        targetId:(NSString *)targetId
                                       timestamp:(long long)timestamp {
  NSString *eventName =
      @"IRCIMIWListener:onUltraGroupMessagesClearedForAllChannel";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupTypingStatusSent:(NSInteger)code
                            targetId:(NSString *)targetId
                           channelId:(NSString *)channelId
                        typingStatus:
                            (RCIMIWUltraGroupTypingStatus)typingStatus {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupTypingStatusSent";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setObject:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setObject:@(UltraGroupTypingStatusToNum(typingStatus))
                forKey:@"typingStatus"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onBatchRemoteUltraGroupMessagesLoaded:(NSInteger)code
                              matchedMessages:
                                  (NSArray<RCIMIWMessage *> *)matchedMessages
                           notMatchedMessages:
                               (NSArray<RCIMIWMessage *> *)notMatchedMessages {
  NSString *eventName =
      @"IRCIMIWListener:onBatchRemoteUltraGroupMessagesLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  NSMutableArray<NSDictionary *> *_matchedMessages = [NSMutableArray new];
  for (int i = 0; matchedMessages && i < matchedMessages.count; i++)
    [_matchedMessages
        addObject:[RCIMIWPlatformConverter
                      convertMessageToDict:[matchedMessages objectAtIndex:i]]];
  [arguments setObject:_matchedMessages forKey:@"matchedMessages"];
  NSMutableArray<NSDictionary *> *_notMatchedMessages = [NSMutableArray new];
  for (int i = 0; notMatchedMessages && i < notMatchedMessages.count; i++)
    [_notMatchedMessages
        addObject:[RCIMIWPlatformConverter
                      convertMessageToDict:[notMatchedMessages
                                               objectAtIndex:i]]];
  [arguments setObject:_notMatchedMessages forKey:@"notMatchedMessages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupMessageExpansionUpdated:(NSInteger)code
                                  expansion:
                                      (NSDictionary<NSString *, NSString *> *)
                                          expansion
                                 messageUId:(NSString *)messageUId {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupMessageExpansionUpdated";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:expansion ? expansion : @{} forKey:@"expansion"];
  [arguments setObject:messageUId ? messageUId : @"" forKey:@"messageUId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupMessageExpansionRemoved:(NSInteger)code
                                 messageUId:(NSString *)messageUId
                                       keys:(NSArray<NSString *> *)keys {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupMessageExpansionRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setObject:@(code) forKey:@"code"];
  [arguments setObject:messageUId ? messageUId : @"" forKey:@"messageUId"];
  [arguments setObject:keys ? keys : @[] forKey:@"keys"];
  [self sendEventWithName:eventName body:arguments];
}
- (NSArray<NSString *> *)supportedEvents {
  return @[
    @"IRCIMIWListener:onMessageReceived",
    @"IRCIMIWListener:onConnectionStatusChanged",
    @"IRCIMIWListener:onConversationTopStatusSynced",
    @"IRCIMIWListener:onRemoteMessageRecalled",
    @"IRCIMIWListener:onPrivateReadReceiptReceived",
    @"IRCIMIWListener:onRemoteMessageExpansionUpdated",
    @"IRCIMIWListener:onRemoteMessageExpansionForKeyRemoved",
    @"IRCIMIWListener:onChatRoomMemberChanged",
    @"IRCIMIWListener:onTypingStatusChanged",
    @"IRCIMIWListener:onConversationReadStatusSyncMessageReceived",
    @"IRCIMIWListener:onChatRoomEntriesSynced",
    @"IRCIMIWListener:onChatRoomEntriesChanged",
    @"IRCIMIWListener:onRemoteUltraGroupMessageExpansionUpdated",
    @"IRCIMIWListener:onRemoteUltraGroupMessageModified",
    @"IRCIMIWListener:onRemoteUltraGroupMessageRecalled",
    @"IRCIMIWListener:onUltraGroupReadTimeReceived",
    @"IRCIMIWListener:onUltraGroupTypingStatusChanged",
    @"IRCIMIWListener:onMessageBlocked",
    @"IRCIMIWListener:onChatRoomStatusChanged",
    @"IRCIMIWListener:onGroupMessageReadReceiptRequestReceived",
    @"IRCIMIWListener:onGroupMessageReadReceiptResponseReceived",
    @"IRCIMIWListener:onConnected",
    @"IRCIMIWListener:onDatabaseOpened",
    @"IRCIMIWListener:onConversationLoaded",
    @"IRCIMIWListener:onConversationsLoaded",
    @"IRCIMIWListener:onConversationRemoved",
    @"IRCIMIWListener:onConversationsRemoved",
    @"IRCIMIWListener:onTotalUnreadCountLoaded",
    @"IRCIMIWListener:onUnreadCountLoaded",
    @"IRCIMIWListener:onUnreadCountByConversationTypesLoaded",
    @"IRCIMIWListener:onUnreadMentionedCountLoaded",
    @"IRCIMIWListener:onUltraGroupAllUnreadCountLoaded",
    @"IRCIMIWListener:onUltraGroupAllUnreadMentionedCountLoaded",
    @"IRCIMIWListener:onUnreadCountCleared",
    @"IRCIMIWListener:onDraftMessageSaved",
    @"IRCIMIWListener:onDraftMessageCleared",
    @"IRCIMIWListener:onDraftMessageLoaded",
    @"IRCIMIWListener:onBlockedConversationsLoaded",
    @"IRCIMIWListener:onConversationTopStatusChanged",
    @"IRCIMIWListener:onConversationTopStatusLoaded",
    @"IRCIMIWListener:onConversationReadStatusSynced",
    @"IRCIMIWListener:onMessageAttached",
    @"IRCIMIWListener:onMessageSent",
    @"IRCIMIWListener:onMediaMessageAttached",
    @"IRCIMIWListener:onMediaMessageSending",
    @"IRCIMIWListener:onSendingMediaMessageCanceled",
    @"IRCIMIWListener:onMediaMessageSent",
    @"IRCIMIWListener:onMediaMessageDownloading",
    @"IRCIMIWListener:onMediaMessageDownloaded",
    @"IRCIMIWListener:onDownloadingMediaMessageCanceled",
    @"IRCIMIWListener:onMessagesLoaded",
    @"IRCIMIWListener:onUnreadMentionedMessagesLoaded",
    @"IRCIMIWListener:onFirstUnreadMessageLoaded",
    @"IRCIMIWListener:onMessageInserted",
    @"IRCIMIWListener:onMessagesInserted",
    @"IRCIMIWListener:onMessageCleared",
    @"IRCIMIWListener:onLocalMessagesDeleted",
    @"IRCIMIWListener:onMessagesDeleted",
    @"IRCIMIWListener:onMessageRecalled",
    @"IRCIMIWListener:onPrivateReadReceiptMessageSent",
    @"IRCIMIWListener:onMessageExpansionUpdated",
    @"IRCIMIWListener:onMessageExpansionForKeysRemoved",
    @"IRCIMIWListener:onMessageReceiveStatusChanged",
    @"IRCIMIWListener:onMessageSentStatusChanged",
    @"IRCIMIWListener:onChatRoomJoined",
    @"IRCIMIWListener:onChatRoomJoining",
    @"IRCIMIWListener:onChatRoomLeft",
    @"IRCIMIWListener:onChatRoomMessagesLoaded",
    @"IRCIMIWListener:onChatRoomEntryAdded",
    @"IRCIMIWListener:onChatRoomEntriesAdded",
    @"IRCIMIWListener:onChatRoomEntryLoaded",
    @"IRCIMIWListener:onAllChatRoomEntriesLoaded",
    @"IRCIMIWListener:onChatRoomEntryRemoved",
    @"IRCIMIWListener:onChatRoomEntriesRemoved",
    @"IRCIMIWListener:onBlacklistAdded",
    @"IRCIMIWListener:onBlacklistRemoved",
    @"IRCIMIWListener:onBlacklistStatusLoaded",
    @"IRCIMIWListener:onBlacklistLoaded",
    @"IRCIMIWListener:onMessagesSearched",
    @"IRCIMIWListener:onMessagesSearchedByTimeRange",
    @"IRCIMIWListener:onMessagesSearchedByUserId",
    @"IRCIMIWListener:onConversationsSearched",
    @"IRCIMIWListener:onGroupReadReceiptRequestSent",
    @"IRCIMIWListener:onGroupReadReceiptResponseSent",
    @"IRCIMIWListener:onNotificationQuietHoursChanged",
    @"IRCIMIWListener:onNotificationQuietHoursRemoved",
    @"IRCIMIWListener:onNotificationQuietHoursLoaded",
    @"IRCIMIWListener:onConversationNotificationLevelChanged",
    @"IRCIMIWListener:onConversationNotificationLevelLoaded",
    @"IRCIMIWListener:onConversationTypeNotificationLevelChanged",
    @"IRCIMIWListener:onConversationTypeNotificationLevelLoaded",
    @"IRCIMIWListener:onUltraGroupDefaultNotificationLevelChanged",
    @"IRCIMIWListener:onUltraGroupDefaultNotificationLevelLoaded",
    @"IRCIMIWListener:onUltraGroupChannelDefaultNotificationLevelChanged",
    @"IRCIMIWListener:onUltraGroupChannelDefaultNotificationLevelLoaded",
    @"IRCIMIWListener:onPushContentShowStatusChanged",
    @"IRCIMIWListener:onPushLanguageChanged",
    @"IRCIMIWListener:onPushReceiveStatusChanged",
    @"IRCIMIWListener:onMessageCountLoaded",
    @"IRCIMIWListener:onTopConversationsLoaded",
    @"IRCIMIWListener:onGroupMessageToDesignatedUsersAttached",
    @"IRCIMIWListener:onGroupMessageToDesignatedUsersSent",
    @"IRCIMIWListener:onUltraGroupReadStatusSynced",
    @"IRCIMIWListener:onConversationsLoadedForAllChannel",
    @"IRCIMIWListener:onUltraGroupUnreadMentionedCountLoaded",
    @"IRCIMIWListener:onUltraGroupUnreadCountLoaded",
    @"IRCIMIWListener:onUltraGroupMessageModified",
    @"IRCIMIWListener:onUltraGroupMessageRecalled",
    @"IRCIMIWListener:onUltraGroupMessagesCleared",
    @"IRCIMIWListener:onUltraGroupMessagesClearedForAllChannel",
    @"IRCIMIWListener:onUltraGroupTypingStatusSent",
    @"IRCIMIWListener:onBatchRemoteUltraGroupMessagesLoaded",
    @"IRCIMIWListener:onUltraGroupMessageExpansionUpdated",
    @"IRCIMIWListener:onUltraGroupMessageExpansionRemoved"
  ];
}
@end
