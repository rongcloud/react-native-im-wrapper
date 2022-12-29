#import "ReactNativeIm.h"
#import "ArgumentAdapter.h"
#import <RongIMLibCore/RongIMLibCore.h>
#import <RongIMWrapper/RongIMWrapper.h>
@interface RCReactNativeIM () <RCIMIWEngineDelegate> {
  RCIMIWEngine *engine;
}

@end
@implementation RCReactNativeIMVersion
static NSString *const VER = @"5.2.5";
+ (void)load {
  [RCUtilities setModuleName:@"imwrapperrn" version:VER];
}
@end

@implementation RCReactNativeIM

#define ENGINEDESTROYED [NSString stringWithFormat:@"%ld", RCIMIWErrorCodeEngineDestroyed]

#define ENGINEASSERT \
  if (!engine) {\
    reject(ENGINEDESTROYED, @"engine is nil", nil);\
    return;\
  }

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(create : (NSString *)appKey options : (NSDictionary *)options resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  if (!engine) {
    RCIMIWEngineOptions *_options = [RCIMIWPlatformConverter convertEngineOptionsFromDict:options];
    engine = [RCIMIWEngine create:appKey options:_options];
    [engine setEngineDelegate:self];
  }
  resolve(nil);
}

RCT_EXPORT_METHOD(destroy : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  if (engine) {
    [engine destroy];
    engine = nil;
  }
  resolve(nil);
}

RCT_EXPORT_METHOD(setDeviceToken : (NSString *)deviceToken resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  if (!deviceToken) {
    resolve(@(-1));
    return;
  }
  [RCIMIWEngine setDeviceToken:[deviceToken dataUsingEncoding:NSUTF8StringEncoding]];
  resolve(@(0));
}

RCT_EXPORT_METHOD(connect : (NSString *)token timeout : (nonnull NSNumber *)timeout eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine connect:token
      timeout:timeout.intValue
      databaseOpened:^(NSInteger code) {
        NSString *eventName = @"Connect:onDatabaseOpened";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onDatabaseOpened" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }
      connected:^(NSInteger code, NSString *userId) {
        NSString *eventName = @"Connect:onConnected";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onConnected" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [arguments setValue:userId forKey:@"userId"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(disconnect : (BOOL)receivePush resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine disconnect:receivePush];
  resolve(@(r));
}

RCT_EXPORT_METHOD(createTextMessage : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId text : (NSString *)text resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWTextMessage *r = [engine createTextMessage:_type targetId:targetId channelId:channelId text:text];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(createImageMessage : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId path : (NSString *)path resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWImageMessage *r = [engine createImageMessage:_type targetId:targetId channelId:channelId path:path];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMediaMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(createFileMessage : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId path : (NSString *)path resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWFileMessage *r = [engine createFileMessage:_type targetId:targetId channelId:channelId path:path];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMediaMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(createSightMessage : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId path : (NSString *)path duration : (nonnull NSNumber *)duration resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWSightMessage *r = [engine createSightMessage:_type targetId:targetId channelId:channelId path:path duration:duration.intValue];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMediaMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(createVoiceMessage : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId path : (NSString *)path duration : (nonnull NSNumber *)duration resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWVoiceMessage *r = [engine createVoiceMessage:_type targetId:targetId channelId:channelId path:path duration:duration.intValue];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMediaMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(createReferenceMessage : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId referenceMessage : (NSDictionary *)referenceMessage text : (NSString *)text resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWMessage *_referenceMessage = [RCIMIWPlatformConverter convertMessageFromDict:referenceMessage];
  RCIMIWReferenceMessage *r = [engine createReferenceMessage:_type targetId:targetId channelId:channelId referenceMessage:_referenceMessage text:text];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(createGIFMessage : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId path : (NSString *)path resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWGIFMessage *r = [engine createGIFMessage:_type targetId:targetId channelId:channelId path:path];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMediaMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(createCustomMessage : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId policy : (int)policy messageIdentifier : (NSString *)messageIdentifier fields : (NSDictionary *)fields resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWCustomMessagePolicy _policy = toCustomMessagePolicy(policy);
  RCIMIWCustomMessage *r = [engine createCustomMessage:_type targetId:targetId channelId:channelId policy:_policy messageIdentifier:messageIdentifier fields:fields];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(createLocationMessage : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId longitude : (nonnull NSNumber *)longitude latitude : (nonnull NSNumber *)latitude poiName : (NSString *)poiName thumbnailPath : (NSString *)thumbnailPath resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWLocationMessage *r = [engine createLocationMessage:_type targetId:targetId channelId:channelId longitude:longitude.doubleValue latitude:latitude.doubleValue poiName:poiName thumbnailPath:thumbnailPath];
  NSDictionary *dict = [RCIMIWPlatformConverter convertMessageToDict:r];
  resolve(dict);
}

RCT_EXPORT_METHOD(sendMessage : (NSDictionary *)message eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessage *_message = [RCIMIWPlatformConverter convertMessageFromDict:message];
  NSInteger r = [engine sendMessage:_message
      messageSaved:^(RCIMIWMessage *message) {
        NSString *eventName = @"SendMessage:onMessageSaved";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onMessageSaved" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
        [self sendEventWithName:eventName body:arguments];
      }
      messageSent:^(NSInteger code, RCIMIWMessage *message) {
        NSString *eventName = @"SendMessage:onMessageSent";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onMessageSent" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(sendMediaMessage : (NSDictionary *)message eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMediaMessage *_message = [RCIMIWPlatformConverter convertMediaMessageFromDict:message];
  NSInteger r = [engine sendMediaMessage:_message
      messageSaved:^(RCIMIWMediaMessage *message) {
        NSString *eventName = @"SendMediaMessage:onMediaMessageSaved";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onMediaMessageSaved" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
        [self sendEventWithName:eventName body:arguments];
      }
      messageSending:^(RCIMIWMediaMessage *message, NSInteger progress) {
        NSString *eventName = @"SendMediaMessage:onMediaMessageSending";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onMediaMessageSending" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
        [arguments setValue:@(progress) forKey:@"progress"];
        [self sendEventWithName:eventName body:arguments];
      }
      sendingMediaMessageCanceled:^(RCIMIWMediaMessage *message) {
        NSString *eventName = @"SendMediaMessage:onSendingMediaMessageCanceled";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSendingMediaMessageCanceled" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
        [self sendEventWithName:eventName body:arguments];
      }
      messageSent:^(NSInteger code, RCIMIWMediaMessage *message) {
        NSString *eventName = @"SendMediaMessage:onMediaMessageSent";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onMediaMessageSent" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(cancelSendingMediaMessage : (NSDictionary *)message eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMediaMessage *_message = [RCIMIWPlatformConverter convertMediaMessageFromDict:message];
  NSInteger r = [engine cancelSendingMediaMessage:_message
                  cancelSendingMediaMessageCalled:^(NSInteger code, RCIMIWMediaMessage *message) {
                    NSString *eventName = @"CancelSendingMediaMessage:onCancelSendingMediaMessageCalled";
                    NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                    [arguments setValue:@"onCancelSendingMediaMessageCalled" forKey:@"type"];
                    [arguments setValue:eventId forKey:@"eventId"];
                    [arguments setValue:@(code) forKey:@"code"];
                    [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
                    [self sendEventWithName:eventName body:arguments];
                  }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(downloadMediaMessage : (NSDictionary *)message eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMediaMessage *_message = [RCIMIWPlatformConverter convertMediaMessageFromDict:message];
  NSInteger r = [engine downloadMediaMessage:_message
      mediaMessageDownloading:^(RCIMIWMediaMessage *message, NSInteger progress) {
        NSString *eventName = @"DownloadMediaMessage:onMediaMessageDownloading";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onMediaMessageDownloading" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
        [arguments setValue:@(progress) forKey:@"progress"];
        [self sendEventWithName:eventName body:arguments];
      }
      downloadingMediaMessageCanceled:^(RCIMIWMediaMessage *message) {
        NSString *eventName = @"DownloadMediaMessage:onDownloadingMediaMessageCanceled";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onDownloadingMediaMessageCanceled" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
        [self sendEventWithName:eventName body:arguments];
      }
      mediaMessageDownloaded:^(NSInteger code, RCIMIWMediaMessage *message) {
        NSString *eventName = @"DownloadMediaMessage:onMediaMessageDownloaded";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onMediaMessageDownloaded" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(cancelDownloadingMediaMessage : (NSDictionary *)message eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMediaMessage *_message = [RCIMIWPlatformConverter convertMediaMessageFromDict:message];
  NSInteger r = [engine cancelDownloadingMediaMessage:_message
                  cancelDownloadingMediaMessageCalled:^(NSInteger code, RCIMIWMediaMessage *message) {
                    NSString *eventName = @"CancelDownloadingMediaMessage:onCancelDownloadingMediaMessageCalled";
                    NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                    [arguments setValue:@"onCancelDownloadingMediaMessageCalled" forKey:@"type"];
                    [arguments setValue:eventId forKey:@"eventId"];
                    [arguments setValue:@(code) forKey:@"code"];
                    [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
                    [self sendEventWithName:eventName body:arguments];
                  }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadConversation : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadConversation:_type targetId:targetId channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getConversation : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine getConversation:_type
      targetId:targetId
      channelId:channelId
      success:^(RCIMIWConversation *t) {
        NSString *eventName = @"GetConversation:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:[RCIMIWPlatformConverter convertConversationToDict:t] forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetConversation:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadConversations : (NSArray<NSNumber *> *)conversationTypes channelId : (nullable NSString *)channelId startTime : (nonnull NSNumber *)startTime count : (nonnull NSNumber *)count resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadConversations:conversationTypes channelId:channelId startTime:startTime.longValue count:count.intValue];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getConversations : (NSArray<NSNumber *> *)conversationTypes channelId : (nullable NSString *)channelId startTime : (nonnull NSNumber *)startTime count : (nonnull NSNumber *)count eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine getConversations:conversationTypes
      channelId:channelId
      startTime:startTime.longValue
      count:count.intValue
      success:^(NSArray<RCIMIWConversation *> *t) {
        NSString *eventName = @"GetConversations:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        NSMutableArray<NSDictionary *> *tTemp = [NSMutableArray new];
        for (int i = 0; t && i < t.count; i++)
          [tTemp addObject:[RCIMIWPlatformConverter convertConversationToDict:[t objectAtIndex:i]]];
        [arguments setValue:tTemp forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetConversations:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeConversation : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine removeConversation:_type
                                  targetId:targetId
                                 channelId:channelId
                       conversationRemoved:^(NSInteger code) {
                         NSString *eventName = @"RemoveConversation:onConversationRemoved";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onConversationRemoved" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeConversations : (NSArray<NSNumber *> *)conversationTypes channelId : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine removeConversations:conversationTypes
                                  channelId:channelId
                       conversationsRemoved:^(NSInteger code) {
                         NSString *eventName = @"RemoveConversations:onConversationsRemoved";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onConversationsRemoved" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUnreadCount : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadUnreadCount:_type targetId:targetId channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getUnreadCount : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine getUnreadCount:_type
      targetId:targetId
      channelId:channelId
      success:^(NSInteger count) {
        NSString *eventName = @"GetUnreadCount:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(count) forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetUnreadCount:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadTotalUnreadCount : (nullable NSString *)channelId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadTotalUnreadCount:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getTotalUnreadCount : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine getTotalUnreadCount:channelId
      success:^(NSInteger count) {
        NSString *eventName = @"GetTotalUnreadCount:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(count) forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetTotalUnreadCount:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUnreadMentionedCount : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadUnreadMentionedCount:_type targetId:targetId channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getUnreadMentionedCount : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine getUnreadMentionedCount:_type
      targetId:targetId
      channelId:channelId
      success:^(NSInteger count) {
        NSString *eventName = @"GetUnreadMentionedCount:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(count) forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetUnreadMentionedCount:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUltraGroupAllUnreadCount : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadUltraGroupAllUnreadCount];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getUltraGroupAllUnreadCount : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine
      getUltraGroupAllUnreadCount:^(NSInteger count) {
        NSString *eventName = @"GetUltraGroupAllUnreadCount:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(count) forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetUltraGroupAllUnreadCount:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUltraGroupAllUnreadMentionedCount : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadUltraGroupAllUnreadMentionedCount];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getUltraGroupAllUnreadMentionedCount : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine
      getUltraGroupAllUnreadMentionedCount:^(NSInteger count) {
        NSString *eventName = @"GetUltraGroupAllUnreadMentionedCount:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(count) forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetUltraGroupAllUnreadMentionedCount:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUltraGroupUnreadCount : (NSString *)targetId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadUltraGroupUnreadCount:targetId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getUltraGroupUnreadCount : (NSString *)targetId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine getUltraGroupUnreadCount:targetId
      success:^(NSInteger count) {
        NSString *eventName = @"GetUltraGroupUnreadCount:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(count) forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetUltraGroupUnreadCount:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUltraGroupUnreadMentionedCount : (NSString *)targetId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadUltraGroupUnreadMentionedCount:targetId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getUltraGroupUnreadMentionedCount : (NSString *)targetId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine getUltraGroupUnreadMentionedCount:targetId
      success:^(NSInteger count) {
        NSString *eventName = @"GetUltraGroupUnreadMentionedCount:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(count) forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetUltraGroupUnreadMentionedCount:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUnreadCountByConversationTypes : (NSArray<NSNumber *> *)conversationTypes channelId : (nullable NSString *)channelId contain : (BOOL)contain resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadUnreadCountByConversationTypes:conversationTypes channelId:channelId contain:contain];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getUnreadCountByConversationTypes : (NSArray<NSNumber *> *)conversationTypes channelId : (nullable NSString *)channelId contain : (BOOL)contain eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine getUnreadCountByConversationTypes:conversationTypes
      channelId:channelId
      contain:contain
      success:^(NSInteger count) {
        NSString *eventName = @"GetUnreadCountByConversationTypes:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(count) forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetUnreadCountByConversationTypes:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(clearUnreadCount : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId timestamp : (nonnull NSNumber *)timestamp eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine clearUnreadCount:_type
                                targetId:targetId
                               channelId:channelId
                               timestamp:timestamp.longValue
                      unreadCountCleared:^(NSInteger code) {
                        NSString *eventName = @"ClearUnreadCount:onUnreadCountCleared";
                        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                        [arguments setValue:@"onUnreadCountCleared" forKey:@"type"];
                        [arguments setValue:eventId forKey:@"eventId"];
                        [arguments setValue:@(code) forKey:@"code"];
                        [self sendEventWithName:eventName body:arguments];
                      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(saveDraftMessage : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId draft : (NSString *)draft eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine saveDraftMessage:_type
                                targetId:targetId
                               channelId:channelId
                                   draft:draft
                       draftMessageSaved:^(NSInteger code) {
                         NSString *eventName = @"SaveDraftMessage:onDraftMessageSaved";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onDraftMessageSaved" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadDraftMessage : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadDraftMessage:_type targetId:targetId channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getDraftMessage : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine getDraftMessage:_type
      targetId:targetId
      channelId:channelId
      success:^(NSString *t) {
        NSString *eventName = @"GetDraftMessage:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:t forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetDraftMessage:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(clearDraftMessage : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine clearDraftMessage:_type
                                 targetId:targetId
                                channelId:channelId
                      draftMessageCleared:^(NSInteger code) {
                        NSString *eventName = @"ClearDraftMessage:onDraftMessageCleared";
                        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                        [arguments setValue:@"onDraftMessageCleared" forKey:@"type"];
                        [arguments setValue:eventId forKey:@"eventId"];
                        [arguments setValue:@(code) forKey:@"code"];
                        [self sendEventWithName:eventName body:arguments];
                      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadBlockedConversations : (NSArray<NSNumber *> *)conversationTypes channelId : (nullable NSString *)channelId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadBlockedConversations:conversationTypes channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getBlockedConversations : (NSArray<NSNumber *> *)conversationTypes channelId : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine getBlockedConversations:conversationTypes
      channelId:channelId
      success:^(NSArray<RCIMIWConversation *> *conversations) {
        NSString *eventName = @"GetBlockedConversations:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        NSMutableArray<NSDictionary *> *conversationsTemp = [NSMutableArray new];
        for (int i = 0; conversations && i < conversations.count; i++)
          [conversationsTemp addObject:[RCIMIWPlatformConverter convertConversationToDict:[conversations objectAtIndex:i]]];
        [arguments setValue:conversationsTemp forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetBlockedConversations:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeConversationTopStatus : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId top : (BOOL)top eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine changeConversationTopStatus:_type
                                           targetId:targetId
                                          channelId:channelId
                                                top:top
                       conversationTopStatusChanged:^(NSInteger code) {
                         NSString *eventName = @"ChangeConversationTopStatus:onConversationTopStatusChanged";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onConversationTopStatusChanged" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadConversationTopStatus : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadConversationTopStatus:_type targetId:targetId channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getConversationTopStatus : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine getConversationTopStatus:_type
      targetId:targetId
      channelId:channelId
      success:^(Boolean top) {
        NSString *eventName = @"GetConversationTopStatus:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(top) forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetConversationTopStatus:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(syncConversationReadStatus : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId timestamp : (nonnull NSNumber *)timestamp eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine syncConversationReadStatus:_type
                                          targetId:targetId
                                         channelId:channelId
                                         timestamp:timestamp.longValue
                      conversationReadStatusSynced:^(NSInteger code) {
                        NSString *eventName = @"SyncConversationReadStatus:onConversationReadStatusSynced";
                        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                        [arguments setValue:@"onConversationReadStatusSynced" forKey:@"type"];
                        [arguments setValue:eventId forKey:@"eventId"];
                        [arguments setValue:@(code) forKey:@"code"];
                        [self sendEventWithName:eventName body:arguments];
                      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(sendTypingStatus : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId currentType : (NSString *)currentType resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine sendTypingStatus:_type targetId:targetId channelId:channelId currentType:currentType];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadMessages : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId sentTime : (nonnull NSNumber *)sentTime order : (int)order policy : (int)policy count : (nonnull NSNumber *)count resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWTimeOrder _order = toTimeOrder(order);
  RCIMIWMessageOperationPolicy _policy = toMessageOperationPolicy(policy);
  NSInteger r = [engine loadMessages:_type targetId:targetId channelId:channelId sentTime:sentTime.longValue order:_order policy:_policy count:count.intValue];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getMessages : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId sentTime : (nonnull NSNumber *)sentTime order : (int)order policy : (int)policy count : (nonnull NSNumber *)count eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWTimeOrder _order = toTimeOrder(order);
  RCIMIWMessageOperationPolicy _policy = toMessageOperationPolicy(policy);
  NSInteger r = [engine getMessages:_type
      targetId:targetId
      channelId:channelId
      sentTime:sentTime.longValue
      order:_order
      policy:_policy
      count:count.intValue
      success:^(NSArray<RCIMIWMessage *> *t) {
        NSString *eventName = @"GetMessages:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        NSMutableArray<NSDictionary *> *tTemp = [NSMutableArray new];
        for (int i = 0; t && i < t.count; i++)
          [tTemp addObject:[RCIMIWPlatformConverter convertMessageToDict:[t objectAtIndex:i]]];
        [arguments setValue:tTemp forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetMessages:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getMessageById : (nonnull NSNumber *)messageId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine getMessageById:messageId.intValue
      success:^(RCIMIWMessage *message) {
        NSString *eventName = @"GetMessageById:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetMessageById:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getMessageByUId : (NSString *)messageUId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine getMessageByUId:messageUId
      success:^(RCIMIWMessage *message) {
        NSString *eventName = @"GetMessageByUId:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetMessageByUId:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadFirstUnreadMessage : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadFirstUnreadMessage:_type targetId:targetId channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getFirstUnreadMessage : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine getFirstUnreadMessage:_type
      targetId:targetId
      channelId:channelId
      success:^(RCIMIWMessage *t) {
        NSString *eventName = @"GetFirstUnreadMessage:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:t] forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetFirstUnreadMessage:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUnreadMentionedMessages : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadUnreadMentionedMessages:_type targetId:targetId channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getUnreadMentionedMessages : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine getUnreadMentionedMessages:_type
      targetId:targetId
      channelId:channelId
      success:^(NSArray<RCIMIWMessage *> *t) {
        NSString *eventName = @"GetUnreadMentionedMessages:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        NSMutableArray<NSDictionary *> *tTemp = [NSMutableArray new];
        for (int i = 0; t && i < t.count; i++)
          [tTemp addObject:[RCIMIWPlatformConverter convertMessageToDict:[t objectAtIndex:i]]];
        [arguments setValue:tTemp forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetUnreadMentionedMessages:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(insertMessage : (NSDictionary *)message eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessage *_message = [RCIMIWPlatformConverter convertMessageFromDict:message];
  NSInteger r = [engine insertMessage:_message
                      messageInserted:^(NSInteger code, RCIMIWMessage *message) {
                        NSString *eventName = @"InsertMessage:onMessageInserted";
                        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                        [arguments setValue:@"onMessageInserted" forKey:@"type"];
                        [arguments setValue:eventId forKey:@"eventId"];
                        [arguments setValue:@(code) forKey:@"code"];
                        [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
                        [self sendEventWithName:eventName body:arguments];
                      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(insertMessages : (NSArray<NSDictionary *> *)messages eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSArray<RCIMIWMessage *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [(NSMutableArray *)_messages addObject:[RCIMIWPlatformConverter convertMessageFromDict:[messages objectAtIndex:i]]];
  NSInteger r = [engine insertMessages:_messages
                      messagesInserted:^(NSInteger code, NSArray<RCIMIWMessage *> *messages) {
                        NSString *eventName = @"InsertMessages:onMessagesInserted";
                        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                        [arguments setValue:@"onMessagesInserted" forKey:@"type"];
                        [arguments setValue:eventId forKey:@"eventId"];
                        [arguments setValue:@(code) forKey:@"code"];
                        NSMutableArray<NSDictionary *> *messagesTemp = [NSMutableArray new];
                        for (int i = 0; messages && i < messages.count; i++)
                          [messagesTemp addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
                        [arguments setValue:messagesTemp forKey:@"messages"];
                        [self sendEventWithName:eventName body:arguments];
                      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(clearMessages : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId timestamp : (nonnull NSNumber *)timestamp policy : (int)policy eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWMessageOperationPolicy _policy = toMessageOperationPolicy(policy);
  NSInteger r = [engine clearMessages:_type
                             targetId:targetId
                            channelId:channelId
                            timestamp:timestamp.longValue
                               policy:_policy
                      messagesCleared:^(NSInteger code) {
                        NSString *eventName = @"ClearMessages:onMessagesCleared";
                        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                        [arguments setValue:@"onMessagesCleared" forKey:@"type"];
                        [arguments setValue:eventId forKey:@"eventId"];
                        [arguments setValue:@(code) forKey:@"code"];
                        [self sendEventWithName:eventName body:arguments];
                      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(deleteLocalMessages : (NSArray<NSDictionary *> *)messages eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSArray<RCIMIWMessage *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [(NSMutableArray *)_messages addObject:[RCIMIWPlatformConverter convertMessageFromDict:[messages objectAtIndex:i]]];
  NSInteger r = [engine deleteLocalMessages:_messages
                       localMessagesDeleted:^(NSInteger code, NSArray<RCIMIWMessage *> *messages) {
                         NSString *eventName = @"DeleteLocalMessages:onLocalMessagesDeleted";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onLocalMessagesDeleted" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         NSMutableArray<NSDictionary *> *messagesTemp = [NSMutableArray new];
                         for (int i = 0; messages && i < messages.count; i++)
                           [messagesTemp addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
                         [arguments setValue:messagesTemp forKey:@"messages"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(deleteMessages : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId messages : (NSArray<NSDictionary *> *)messages eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSArray<RCIMIWMessage *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [(NSMutableArray *)_messages addObject:[RCIMIWPlatformConverter convertMessageFromDict:[messages objectAtIndex:i]]];
  NSInteger r = [engine deleteMessages:_type
                              targetId:targetId
                             channelId:channelId
                              messages:_messages
                       messagesDeleted:^(NSInteger code, NSArray<RCIMIWMessage *> *messages) {
                         NSString *eventName = @"DeleteMessages:onMessagesDeleted";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onMessagesDeleted" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         NSMutableArray<NSDictionary *> *messagesTemp = [NSMutableArray new];
                         for (int i = 0; messages && i < messages.count; i++)
                           [messagesTemp addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
                         [arguments setValue:messagesTemp forKey:@"messages"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(recallMessage : (NSDictionary *)message eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessage *_message = [RCIMIWPlatformConverter convertMessageFromDict:message];
  NSInteger r = [engine recallMessage:_message
                      messageRecalled:^(NSInteger code, RCIMIWMessage *message) {
                        NSString *eventName = @"RecallMessage:onMessageRecalled";
                        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                        [arguments setValue:@"onMessageRecalled" forKey:@"type"];
                        [arguments setValue:eventId forKey:@"eventId"];
                        [arguments setValue:@(code) forKey:@"code"];
                        [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
                        [self sendEventWithName:eventName body:arguments];
                      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(sendPrivateReadReceiptMessage : (NSString *)targetId channelId : (nullable NSString *)channelId timestamp : (nonnull NSNumber *)timestamp eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine sendPrivateReadReceiptMessage:targetId
                                            channelId:channelId
                                            timestamp:timestamp.longValue
                        privateReadReceiptMessageSent:^(NSInteger code) {
                          NSString *eventName = @"SendPrivateReadReceiptMessage:onPrivateReadReceiptMessageSent";
                          NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                          [arguments setValue:@"onPrivateReadReceiptMessageSent" forKey:@"type"];
                          [arguments setValue:eventId forKey:@"eventId"];
                          [arguments setValue:@(code) forKey:@"code"];
                          [self sendEventWithName:eventName body:arguments];
                        }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(sendGroupReadReceiptRequest : (NSDictionary *)message eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessage *_message = [RCIMIWPlatformConverter convertMessageFromDict:message];
  NSInteger r = [engine sendGroupReadReceiptRequest:_message
                        groupReadReceiptRequestSent:^(NSInteger code, RCIMIWMessage *message) {
                          NSString *eventName = @"SendGroupReadReceiptRequest:onGroupReadReceiptRequestSent";
                          NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                          [arguments setValue:@"onGroupReadReceiptRequestSent" forKey:@"type"];
                          [arguments setValue:eventId forKey:@"eventId"];
                          [arguments setValue:@(code) forKey:@"code"];
                          [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
                          [self sendEventWithName:eventName body:arguments];
                        }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(sendGroupReadReceiptResponse : (NSString *)targetId channelId : (nullable NSString *)channelId messages : (NSArray<NSDictionary *> *)messages eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSArray<RCIMIWMessage *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [(NSMutableArray *)_messages addObject:[RCIMIWPlatformConverter convertMessageFromDict:[messages objectAtIndex:i]]];
  NSInteger r = [engine sendGroupReadReceiptResponse:targetId
                                           channelId:channelId
                                            messages:_messages
                        groupReadReceiptResponseSent:^(NSInteger code, NSArray<RCIMIWMessage *> *messages) {
                          NSString *eventName = @"SendGroupReadReceiptResponse:onGroupReadReceiptResponseSent";
                          NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                          [arguments setValue:@"onGroupReadReceiptResponseSent" forKey:@"type"];
                          [arguments setValue:eventId forKey:@"eventId"];
                          [arguments setValue:@(code) forKey:@"code"];
                          NSMutableArray<NSDictionary *> *messagesTemp = [NSMutableArray new];
                          for (int i = 0; messages && i < messages.count; i++)
                            [messagesTemp addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
                          [arguments setValue:messagesTemp forKey:@"message"];
                          [self sendEventWithName:eventName body:arguments];
                        }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(updateMessageExpansion : (NSString *)messageUId expansion : (NSDictionary *)expansion eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine updateMessageExpansion:messageUId
                                     expansion:expansion
                       messageExpansionUpdated:^(NSInteger code) {
                         NSString *eventName = @"UpdateMessageExpansion:onMessageExpansionUpdated";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onMessageExpansionUpdated" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeMessageExpansionForKeys : (NSString *)messageUId keys : (NSArray<NSString *> *)keys eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine removeMessageExpansionForKeys:messageUId
                                                 keys:keys
                       messageExpansionForKeysRemoved:^(NSInteger code) {
                         NSString *eventName = @"RemoveMessageExpansionForKeys:onMessageExpansionForKeysRemoved";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onMessageExpansionForKeysRemoved" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeMessageSentStatus : (nonnull NSNumber *)messageId sentStatus : (int)sentStatus eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWSentStatus _sentStatus = toSentStatus(sentStatus);
  NSInteger r = [engine changeMessageSentStatus:messageId.intValue
                                     sentStatus:_sentStatus
                       messageSentStatusChanged:^(NSInteger code) {
                         NSString *eventName = @"ChangeMessageSentStatus:onMessageSentStatusChanged";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onMessageSentStatusChanged" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeMessageReceiveStatus : (nonnull NSNumber *)messageId receivedStatus : (int)receivedStatus eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWReceivedStatus _receivedStatus = toReceivedStatus(receivedStatus);
  NSInteger r = [engine changeMessageReceiveStatus:messageId.intValue
                                    receivedStatus:_receivedStatus
                       messageReceiveStatusChanged:^(NSInteger code) {
                         NSString *eventName = @"ChangeMessageReceiveStatus:onMessageReceiveStatusChanged";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onMessageReceiveStatusChanged" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(joinChatRoom : (NSString *)targetId messageCount : (nonnull NSNumber *)messageCount autoCreate : (BOOL)autoCreate eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine joinChatRoom:targetId
                        messageCount:messageCount.intValue
                          autoCreate:autoCreate
                      chatRoomJoined:^(NSInteger code, NSString *targetId) {
                        NSString *eventName = @"JoinChatRoom:onChatRoomJoined";
                        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                        [arguments setValue:@"onChatRoomJoined" forKey:@"type"];
                        [arguments setValue:eventId forKey:@"eventId"];
                        [arguments setValue:@(code) forKey:@"code"];
                        [arguments setValue:targetId forKey:@"targetId"];
                        [self sendEventWithName:eventName body:arguments];
                      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(leaveChatRoom : (NSString *)targetId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine leaveChatRoom:targetId
                         chatRoomLeft:^(NSInteger code, NSString *targetId) {
                           NSString *eventName = @"LeaveChatRoom:onChatRoomLeft";
                           NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                           [arguments setValue:@"onChatRoomLeft" forKey:@"type"];
                           [arguments setValue:eventId forKey:@"eventId"];
                           [arguments setValue:@(code) forKey:@"code"];
                           [arguments setValue:targetId forKey:@"targetId"];
                           [self sendEventWithName:eventName body:arguments];
                         }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadChatRoomMessages : (NSString *)targetId timestamp : (nonnull NSNumber *)timestamp order : (int)order count : (nonnull NSNumber *)count resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWTimeOrder _order = toTimeOrder(order);
  NSInteger r = [engine loadChatRoomMessages:targetId timestamp:timestamp.longValue order:_order count:count.intValue];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getChatRoomMessages : (NSString *)targetId timestamp : (nonnull NSNumber *)timestamp order : (int)order count : (nonnull NSNumber *)count eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWTimeOrder _order = toTimeOrder(order);
  NSInteger r = [engine getChatRoomMessages:targetId
      timestamp:timestamp.longValue
      order:_order
      count:count.intValue
      success:^(NSArray<RCIMIWMessage *> *messages) {
        NSString *eventName = @"GetChatRoomMessages:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        NSMutableArray<NSDictionary *> *messagesTemp = [NSMutableArray new];
        for (int i = 0; messages && i < messages.count; i++)
          [messagesTemp addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
        [arguments setValue:messagesTemp forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetChatRoomMessages:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(addChatRoomEntry : (NSString *)targetId key : (NSString *)key value : (NSString *)value deleteWhenLeft : (BOOL)deleteWhenLeft overwrite : (BOOL)overwrite eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine addChatRoomEntry:targetId
                                     key:key
                                   value:value
                          deleteWhenLeft:deleteWhenLeft
                               overwrite:overwrite
                      chatRoomEntryAdded:^(NSInteger code) {
                        NSString *eventName = @"AddChatRoomEntry:onChatRoomEntryAdded";
                        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                        [arguments setValue:@"onChatRoomEntryAdded" forKey:@"type"];
                        [arguments setValue:eventId forKey:@"eventId"];
                        [arguments setValue:@(code) forKey:@"code"];
                        [self sendEventWithName:eventName body:arguments];
                      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(addChatRoomEntries : (NSString *)targetId entries : (NSDictionary *)entries deleteWhenLeft : (BOOL)deleteWhenLeft overwrite : (BOOL)overwrite eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine addChatRoomEntries:targetId
                                   entries:entries
                            deleteWhenLeft:deleteWhenLeft
                                 overwrite:overwrite
                      chatRoomEntriesAdded:^(NSInteger code, NSDictionary<NSString *, NSNumber *> *errors) {
                        NSString *eventName = @"AddChatRoomEntries:onChatRoomEntriesAdded";
                        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                        [arguments setValue:@"onChatRoomEntriesAdded" forKey:@"type"];
                        [arguments setValue:eventId forKey:@"eventId"];
                        [arguments setValue:@(code) forKey:@"code"];
                        [arguments setValue:errors forKey:@"errors"];
                        [self sendEventWithName:eventName body:arguments];
                      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadChatRoomEntry : (NSString *)targetId key : (NSString *)key resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadChatRoomEntry:targetId key:key];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getChatRoomEntry : (NSString *)targetId key : (NSString *)key eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine getChatRoomEntry:targetId
      key:key
      success:^(NSDictionary<NSString *, NSString *> *entry) {
        NSString *eventName = @"GetChatRoomEntry:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:entry forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetChatRoomEntry:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadChatRoomAllEntries : (NSString *)targetId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadChatRoomAllEntries:targetId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getChatRoomAllEntries : (NSString *)targetId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine getChatRoomAllEntries:targetId
      success:^(NSDictionary<NSString *, NSString *> *entries) {
        NSString *eventName = @"GetChatRoomAllEntries:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:entries forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetChatRoomAllEntries:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeChatRoomEntry : (NSString *)targetId key : (NSString *)key force : (BOOL)force eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine removeChatRoomEntry:targetId
                                        key:key
                                      force:force
                       chatRoomEntryRemoved:^(NSInteger code) {
                         NSString *eventName = @"RemoveChatRoomEntry:onChatRoomEntryRemoved";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onChatRoomEntryRemoved" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeChatRoomEntries : (NSString *)targetId keys : (NSArray<NSString *> *)keys force : (BOOL)force eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine removeChatRoomEntries:targetId
                                         keys:keys
                                        force:force
                       chatRoomEntriesRemoved:^(NSInteger code) {
                         NSString *eventName = @"RemoveChatRoomEntries:onChatRoomEntriesRemoved";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onChatRoomEntriesRemoved" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(addToBlacklist : (NSString *)userId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine addToBlacklist:userId
                        blacklistAdded:^(NSInteger code, NSString *userId) {
                          NSString *eventName = @"AddToBlacklist:onBlacklistAdded";
                          NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                          [arguments setValue:@"onBlacklistAdded" forKey:@"type"];
                          [arguments setValue:eventId forKey:@"eventId"];
                          [arguments setValue:@(code) forKey:@"code"];
                          [arguments setValue:userId forKey:@"userId"];
                          [self sendEventWithName:eventName body:arguments];
                        }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeFromBlacklist : (NSString *)userId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine removeFromBlacklist:userId
                           blacklistRemoved:^(NSInteger code, NSString *userId) {
                             NSString *eventName = @"RemoveFromBlacklist:onBlacklistRemoved";
                             NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                             [arguments setValue:@"onBlacklistRemoved" forKey:@"type"];
                             [arguments setValue:eventId forKey:@"eventId"];
                             [arguments setValue:@(code) forKey:@"code"];
                             [arguments setValue:userId forKey:@"userId"];
                             [self sendEventWithName:eventName body:arguments];
                           }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadBlacklistStatus : (NSString *)userId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadBlacklistStatus:userId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getBlacklistStatus : (NSString *)userId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine getBlacklistStatus:userId
      success:^(RCIMIWBlacklistStatus status) {
        NSString *eventName = @"GetBlacklistStatus:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(BlacklistStatusToNum(status)) forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetBlacklistStatus:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadBlacklist : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadBlacklist];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getBlacklist : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine
      getBlacklist:^(NSArray<NSString *> *userIds) {
        NSString *eventName = @"GetBlacklist:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:userIds forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetBlacklist:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(searchMessages : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId keyword : (NSString *)keyword startTime : (nonnull NSNumber *)startTime count : (nonnull NSNumber *)count eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine searchMessages:_type
      targetId:targetId
      channelId:channelId
      keyword:keyword
      startTime:startTime.longValue
      count:count.intValue
      success:^(NSArray<RCIMIWMessage *> *messages) {
        NSString *eventName = @"SearchMessages:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        NSMutableArray<NSDictionary *> *messagesTemp = [NSMutableArray new];
        for (int i = 0; messages && i < messages.count; i++)
          [messagesTemp addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
        [arguments setValue:messagesTemp forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"SearchMessages:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(searchMessagesByTimeRange : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId keyword : (NSString *)keyword startTime : (nonnull NSNumber *)startTime endTime : (nonnull NSNumber *)endTime offset : (nonnull NSNumber *)offset count : (nonnull NSNumber *)count eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine searchMessagesByTimeRange:_type
      targetId:targetId
      channelId:channelId
      keyword:keyword
      startTime:startTime.longValue
      endTime:endTime.longValue
      offset:offset.intValue
      count:count.intValue
      success:^(NSArray<RCIMIWMessage *> *messages) {
        NSString *eventName = @"SearchMessagesByTimeRange:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        NSMutableArray<NSDictionary *> *messagesTemp = [NSMutableArray new];
        for (int i = 0; messages && i < messages.count; i++)
          [messagesTemp addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
        [arguments setValue:messagesTemp forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"SearchMessagesByTimeRange:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(searchMessagesByUserId : (NSString *)userId type : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId startTime : (nonnull NSNumber *)startTime count : (nonnull NSNumber *)count eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine searchMessagesByUserId:userId
      type:_type
      targetId:targetId
      channelId:channelId
      startTime:startTime.longValue
      count:count.intValue
      success:^(NSArray<RCIMIWMessage *> *messages) {
        NSString *eventName = @"SearchMessagesByUserId:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        NSMutableArray<NSDictionary *> *messagesTemp = [NSMutableArray new];
        for (int i = 0; messages && i < messages.count; i++)
          [messagesTemp addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
        [arguments setValue:messagesTemp forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"SearchMessagesByUserId:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(searchConversations : (NSArray<NSNumber *> *)conversationTypes channelId : (nullable NSString *)channelId messageTypes : (NSArray<NSNumber *> *)messageTypes keyword : (NSString *)keyword eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine searchConversations:conversationTypes
      channelId:channelId
      messageTypes:messageTypes
      keyword:keyword
      success:^(NSArray<RCIMIWSearchConversationResult *> *results) {
        NSString *eventName = @"SearchConversations:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        NSMutableArray<NSDictionary *> *resultsTemp = [NSMutableArray new];
        for (int i = 0; results && i < results.count; i++)
          [resultsTemp addObject:[RCIMIWPlatformConverter convertSearchConversationResultToDict:[results objectAtIndex:i]]];
        [arguments setValue:resultsTemp forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"SearchConversations:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeNotificationQuietHours : (NSString *)startTime spanMinutes : (nonnull NSNumber *)spanMinutes level : (int)level eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWPushNotificationQuietHoursLevel _level = toPushNotificationQuietHoursLevel(level);
  NSInteger r = [engine changeNotificationQuietHours:startTime
                                         spanMinutes:spanMinutes.intValue
                                               level:_level
                       notificationQuietHoursChanged:^(NSInteger code) {
                         NSString *eventName = @"ChangeNotificationQuietHours:onNotificationQuietHoursChanged";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onNotificationQuietHoursChanged" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeNotificationQuietHours : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine removeNotificationQuietHours:^(NSInteger code) {
    NSString *eventName = @"RemoveNotificationQuietHours:onNotificationQuietHoursRemoved";
    NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
    [arguments setValue:@"onNotificationQuietHoursRemoved" forKey:@"type"];
    [arguments setValue:eventId forKey:@"eventId"];
    [arguments setValue:@(code) forKey:@"code"];
    [self sendEventWithName:eventName body:arguments];
  }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadNotificationQuietHours : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadNotificationQuietHours];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getNotificationQuietHours : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine
      getNotificationQuietHours:^(NSString *startTime, int spanMinutes, RCIMIWPushNotificationQuietHoursLevel level) {
        NSString *eventName = @"GetNotificationQuietHours:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:startTime forKey:@"startTime"];
        [arguments setValue:@(spanMinutes) forKey:@"spanMinutes"];
        [arguments setValue:@(PushNotificationQuietHoursLevelToNum(level)) forKey:@"level"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetNotificationQuietHours:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeConversationNotificationLevel : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId level : (int)level eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWPushNotificationLevel _level = toPushNotificationLevel(level);
  NSInteger r = [engine changeConversationNotificationLevel:_type
                                                   targetId:targetId
                                                  channelId:channelId
                                                      level:_level
                       conversationNotificationLevelChanged:^(NSInteger code) {
                         NSString *eventName = @"ChangeConversationNotificationLevel:onConversationNotificationLevelChanged";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onConversationNotificationLevelChanged" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadConversationNotificationLevel : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadConversationNotificationLevel:_type targetId:targetId channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getConversationNotificationLevel : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine getConversationNotificationLevel:_type
      targetId:targetId
      channelId:channelId
      success:^(RCIMIWPushNotificationLevel level) {
        NSString *eventName = @"GetConversationNotificationLevel:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(PushNotificationLevelToNum(level)) forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetConversationNotificationLevel:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeConversationTypeNotificationLevel : (int)type level : (int)level eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  RCIMIWPushNotificationLevel _level = toPushNotificationLevel(level);
  NSInteger r = [engine changeConversationTypeNotificationLevel:_type
                                                          level:_level
                       conversationTypeNotificationLevelChanged:^(NSInteger code) {
                         NSString *eventName = @"ChangeConversationTypeNotificationLevel:onConversationTypeNotificationLevelChanged";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onConversationTypeNotificationLevelChanged" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadConversationTypeNotificationLevel : (int)type resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadConversationTypeNotificationLevel:_type];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getConversationTypeNotificationLevel : (int)type eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine getConversationTypeNotificationLevel:_type
      success:^(RCIMIWPushNotificationLevel level) {
        NSString *eventName = @"GetConversationTypeNotificationLevel:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(PushNotificationLevelToNum(level)) forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetConversationTypeNotificationLevel:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeUltraGroupDefaultNotificationLevel : (NSString *)targetId level : (int)level eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWPushNotificationLevel _level = toPushNotificationLevel(level);
  NSInteger r = [engine changeUltraGroupDefaultNotificationLevel:targetId
                                                           level:_level
                       ultraGroupDefaultNotificationLevelChanged:^(NSInteger code) {
                         NSString *eventName = @"ChangeUltraGroupDefaultNotificationLevel:onUltraGroupDefaultNotificationLevelChanged";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onUltraGroupDefaultNotificationLevelChanged" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUltraGroupDefaultNotificationLevel : (NSString *)targetId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadUltraGroupDefaultNotificationLevel:targetId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getUltraGroupDefaultNotificationLevel : (NSString *)targetId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine getUltraGroupDefaultNotificationLevel:targetId
      success:^(RCIMIWPushNotificationLevel level) {
        NSString *eventName = @"GetUltraGroupDefaultNotificationLevel:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(PushNotificationLevelToNum(level)) forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetUltraGroupDefaultNotificationLevel:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeUltraGroupChannelDefaultNotificationLevel : (NSString *)targetId channelId : (nullable NSString *)channelId level : (int)level eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWPushNotificationLevel _level = toPushNotificationLevel(level);
  NSInteger r = [engine changeUltraGroupChannelDefaultNotificationLevel:targetId
                                                              channelId:channelId
                                                                  level:_level
                       ultraGroupChannelDefaultNotificationLevelChanged:^(NSInteger code) {
                         NSString *eventName = @"ChangeUltraGroupChannelDefaultNotificationLevel:onUltraGroupChannelDefaultNotificationLevelChanged";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onUltraGroupChannelDefaultNotificationLevelChanged" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadUltraGroupChannelDefaultNotificationLevel : (NSString *)targetId channelId : (nullable NSString *)channelId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadUltraGroupChannelDefaultNotificationLevel:targetId channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getUltraGroupChannelDefaultNotificationLevel : (NSString *)targetId channelId : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine getUltraGroupChannelDefaultNotificationLevel:targetId
      channelId:channelId
      success:^(RCIMIWPushNotificationLevel level) {
        NSString *eventName = @"GetUltraGroupChannelDefaultNotificationLevel:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(PushNotificationLevelToNum(level)) forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetUltraGroupChannelDefaultNotificationLevel:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changePushContentShowStatus : (BOOL)showContent eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine changePushContentShowStatus:showContent
                       pushContentShowStatusChanged:^(NSInteger code) {
                         NSString *eventName = @"ChangePushContentShowStatus:onPushContentShowStatusChanged";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onPushContentShowStatusChanged" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changePushLanguage : (NSString *)language eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine changePushLanguage:language
                       pushLanguageChanged:^(NSInteger code) {
                         NSString *eventName = @"ChangePushLanguage:onPushLanguageChanged";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onPushLanguageChanged" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changePushReceiveStatus : (BOOL)receive eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine changePushReceiveStatus:receive
                       pushReceiveStatusChanged:^(NSInteger code) {
                         NSString *eventName = @"ChangePushReceiveStatus:onPushReceiveStatusChanged";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onPushReceiveStatusChanged" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(sendGroupMessageToDesignatedUsers : (NSDictionary *)message userIds : (NSArray<NSString *> *)userIds eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessage *_message = [RCIMIWPlatformConverter convertMessageFromDict:message];
  NSInteger r = [engine sendGroupMessageToDesignatedUsers:_message
      userIds:userIds
      messageSaved:^(RCIMIWMessage *message) {
        NSString *eventName = @"SendGroupMessageToDesignatedUsers:onMessageSaved";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onMessageSaved" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
        [self sendEventWithName:eventName body:arguments];
      }
      messageSent:^(NSInteger code, RCIMIWMessage *message) {
        NSString *eventName = @"SendGroupMessageToDesignatedUsers:onMessageSent";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onMessageSent" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadMessageCount : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadMessageCount:_type targetId:targetId channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getMessageCount : (int)type targetId : (NSString *)targetId channelId : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine getMessageCount:_type
      targetId:targetId
      channelId:channelId
      success:^(NSInteger count) {
        NSString *eventName = @"GetMessageCount:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(count) forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetMessageCount:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadTopConversations : (NSArray<NSNumber *> *)conversationTypes channelId : (nullable NSString *)channelId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine loadTopConversations:conversationTypes channelId:channelId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getTopConversations : (NSArray<NSNumber *> *)conversationTypes channelId : (nullable NSString *)channelId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine getTopConversations:conversationTypes
      channelId:channelId
      success:^(NSArray<RCIMIWConversation *> *conversations) {
        NSString *eventName = @"GetTopConversations:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        NSMutableArray<NSDictionary *> *conversationsTemp = [NSMutableArray new];
        for (int i = 0; conversations && i < conversations.count; i++)
          [conversationsTemp addObject:[RCIMIWPlatformConverter convertConversationToDict:[conversations objectAtIndex:i]]];
        [arguments setValue:conversationsTemp forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetTopConversations:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(syncUltraGroupReadStatus : (NSString *)targetId channelId : (nullable NSString *)channelId timestamp : (nonnull NSNumber *)timestamp eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine syncUltraGroupReadStatus:targetId
                                       channelId:channelId
                                       timestamp:timestamp.longValue
                      ultraGroupReadStatusSynced:^(NSInteger code) {
                        NSString *eventName = @"SyncUltraGroupReadStatus:onUltraGroupReadStatusSynced";
                        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                        [arguments setValue:@"onUltraGroupReadStatusSynced" forKey:@"type"];
                        [arguments setValue:eventId forKey:@"eventId"];
                        [arguments setValue:@(code) forKey:@"code"];
                        [self sendEventWithName:eventName body:arguments];
                      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadConversationsForAllChannel : (int)type targetId : (NSString *)targetId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine loadConversationsForAllChannel:_type targetId:targetId];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getConversationsForAllChannel : (int)type targetId : (NSString *)targetId eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWConversationType _type = toConversationType(type);
  NSInteger r = [engine getConversationsForAllChannel:_type
      targetId:targetId
      success:^(NSArray<RCIMIWConversation *> *conversations) {
        NSString *eventName = @"GetConversationsForAllChannel:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        NSMutableArray<NSDictionary *> *conversationsTemp = [NSMutableArray new];
        for (int i = 0; conversations && i < conversations.count; i++)
          [conversationsTemp addObject:[RCIMIWPlatformConverter convertConversationToDict:[conversations objectAtIndex:i]]];
        [arguments setValue:conversationsTemp forKey:@"t"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetConversationsForAllChannel:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(modifyUltraGroupMessage : (NSString *)messageUId message : (NSDictionary *)message eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessage *_message = [RCIMIWPlatformConverter convertMessageFromDict:message];
  NSInteger r = [engine modifyUltraGroupMessage:messageUId
                                        message:_message
                      ultraGroupMessageModified:^(NSInteger code) {
                        NSString *eventName = @"ModifyUltraGroupMessage:onUltraGroupMessageModified";
                        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                        [arguments setValue:@"onUltraGroupMessageModified" forKey:@"type"];
                        [arguments setValue:eventId forKey:@"eventId"];
                        [arguments setValue:@(code) forKey:@"code"];
                        [self sendEventWithName:eventName body:arguments];
                      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(recallUltraGroupMessage : (NSDictionary *)message deleteRemote : (BOOL)deleteRemote eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessage *_message = [RCIMIWPlatformConverter convertMessageFromDict:message];
  NSInteger r = [engine recallUltraGroupMessage:_message
                                   deleteRemote:deleteRemote
                      ultraGroupMessageRecalled:^(NSInteger code) {
                        NSString *eventName = @"RecallUltraGroupMessage:onUltraGroupMessageRecalled";
                        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                        [arguments setValue:@"onUltraGroupMessageRecalled" forKey:@"type"];
                        [arguments setValue:eventId forKey:@"eventId"];
                        [arguments setValue:@(code) forKey:@"code"];
                        [self sendEventWithName:eventName body:arguments];
                      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(clearUltraGroupMessages : (NSString *)targetId channelId : (nullable NSString *)channelId timestamp : (nonnull NSNumber *)timestamp policy : (int)policy eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWMessageOperationPolicy _policy = toMessageOperationPolicy(policy);
  NSInteger r = [engine clearUltraGroupMessages:targetId
                                      channelId:channelId
                                      timestamp:timestamp.longValue
                                         policy:_policy
                      ultraGroupMessagesCleared:^(NSInteger code) {
                        NSString *eventName = @"ClearUltraGroupMessages:onUltraGroupMessagesCleared";
                        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                        [arguments setValue:@"onUltraGroupMessagesCleared" forKey:@"type"];
                        [arguments setValue:eventId forKey:@"eventId"];
                        [arguments setValue:@(code) forKey:@"code"];
                        [self sendEventWithName:eventName body:arguments];
                      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(sendUltraGroupTypingStatus : (NSString *)targetId channelId : (nullable NSString *)channelId typingStatus : (int)typingStatus eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWUltraGroupTypingStatus _typingStatus = toUltraGroupTypingStatus(typingStatus);
  NSInteger r = [engine sendUltraGroupTypingStatus:targetId
                                         channelId:channelId
                                      typingStatus:_typingStatus
                        ultraGroupTypingStatusSent:^(NSInteger code) {
                          NSString *eventName = @"SendUltraGroupTypingStatus:onUltraGroupTypingStatusSent";
                          NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                          [arguments setValue:@"onUltraGroupTypingStatusSent" forKey:@"type"];
                          [arguments setValue:eventId forKey:@"eventId"];
                          [arguments setValue:@(code) forKey:@"code"];
                          [self sendEventWithName:eventName body:arguments];
                        }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(clearUltraGroupMessagesForAllChannel : (NSString *)targetId timestamp : (nonnull NSNumber *)timestamp eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine clearUltraGroupMessagesForAllChannel:targetId
                                                   timestamp:timestamp.longValue
                      ultraGroupMessagesClearedForAllChannel:^(NSInteger code) {
                        NSString *eventName = @"ClearUltraGroupMessagesForAllChannel:onUltraGroupMessagesClearedForAllChannel";
                        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                        [arguments setValue:@"onUltraGroupMessagesClearedForAllChannel" forKey:@"type"];
                        [arguments setValue:eventId forKey:@"eventId"];
                        [arguments setValue:@(code) forKey:@"code"];
                        [self sendEventWithName:eventName body:arguments];
                      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(loadBatchRemoteUltraGroupMessages : (NSArray<NSDictionary *> *)messages resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSArray<RCIMIWMessage *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [(NSMutableArray *)_messages addObject:[RCIMIWPlatformConverter convertMessageFromDict:[messages objectAtIndex:i]]];
  NSInteger r = [engine loadBatchRemoteUltraGroupMessages:_messages];
  resolve(@(r));
}

RCT_EXPORT_METHOD(getBatchRemoteUltraGroupMessages : (NSArray<NSDictionary *> *)messages eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSArray<RCIMIWMessage *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [(NSMutableArray *)_messages addObject:[RCIMIWPlatformConverter convertMessageFromDict:[messages objectAtIndex:i]]];
  NSInteger r = [engine getBatchRemoteUltraGroupMessages:_messages
      success:^(NSArray<RCIMIWMessage *> *matchedMessages, NSArray<RCIMIWMessage *> *notMatchedMessages) {
        NSString *eventName = @"GetBatchRemoteUltraGroupMessages:onSuccess";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onSuccess" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        NSMutableArray<NSDictionary *> *matchedMessagesTemp = [NSMutableArray new];
        for (int i = 0; matchedMessages && i < matchedMessages.count; i++)
          [matchedMessagesTemp addObject:[RCIMIWPlatformConverter convertMessageToDict:[matchedMessages objectAtIndex:i]]];
        [arguments setValue:matchedMessagesTemp forKey:@"matchedMessages"];
        NSMutableArray<NSDictionary *> *notMatchedMessagesTemp = [NSMutableArray new];
        for (int i = 0; notMatchedMessages && i < notMatchedMessages.count; i++)
          [notMatchedMessagesTemp addObject:[RCIMIWPlatformConverter convertMessageToDict:[notMatchedMessages objectAtIndex:i]]];
        [arguments setValue:notMatchedMessagesTemp forKey:@"notMatchedMessages"];
        [self sendEventWithName:eventName body:arguments];
      }
      error:^(NSInteger code) {
        NSString *eventName = @"GetBatchRemoteUltraGroupMessages:onError";
        NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
        [arguments setValue:@"onError" forKey:@"type"];
        [arguments setValue:eventId forKey:@"eventId"];
        [arguments setValue:@(code) forKey:@"code"];
        [self sendEventWithName:eventName body:arguments];
      }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(updateUltraGroupMessageExpansion : (NSString *)messageUId expansion : (NSDictionary *)expansion eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine updateUltraGroupMessageExpansion:messageUId
                                               expansion:expansion
                       ultraGroupMessageExpansionUpdated:^(NSInteger code) {
                         NSString *eventName = @"UpdateUltraGroupMessageExpansion:onUltraGroupMessageExpansionUpdated";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onUltraGroupMessageExpansionUpdated" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(removeUltraGroupMessageExpansionForKeys : (NSString *)messageUId keys : (NSArray<NSString *> *)keys eventId : (NSString *)eventId resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  NSInteger r = [engine removeUltraGroupMessageExpansionForKeys:messageUId
                                                           keys:keys
                       ultraGroupMessageExpansionForKeysRemoved:^(NSInteger code) {
                         NSString *eventName = @"RemoveUltraGroupMessageExpansionForKeys:onUltraGroupMessageExpansionForKeysRemoved";
                         NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
                         [arguments setValue:@"onUltraGroupMessageExpansionForKeysRemoved" forKey:@"type"];
                         [arguments setValue:eventId forKey:@"eventId"];
                         [arguments setValue:@(code) forKey:@"code"];
                         [self sendEventWithName:eventName body:arguments];
                       }];
  resolve(@(r));
}

RCT_EXPORT_METHOD(changeLogLevel : (int)level resolve : (RCTPromiseResolveBlock)resolve reject : (RCTPromiseRejectBlock)reject) {
  ENGINEASSERT
  RCIMIWLogLevel _level = toLogLevel(level);
  NSInteger r = [engine changeLogLevel:_level];
  resolve(@(r));
}

- (void)onMessageReceived:(RCIMIWMessage *)message left:(NSInteger)left offline:(BOOL)offline hasPackage:(BOOL)hasPackage {
  NSString *eventName = @"IRCIMIWListener:onMessageReceived";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
  [arguments setValue:@(left) forKey:@"left"];
  [arguments setValue:@(offline) forKey:@"offline"];
  [arguments setValue:@(hasPackage) forKey:@"hasPackage"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConnectionStatusChanged:(RCIMIWConnectionStatus)status {
  NSString *eventName = @"IRCIMIWListener:onConnectionStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(ConnectionStatusToNum(status)) forKey:@"status"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationTopStatusSynced:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId top:(BOOL)top {
  NSString *eventName = @"IRCIMIWListener:onConversationTopStatusSynced";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(top) forKey:@"top"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onRemoteMessageRecalled:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onRemoteMessageRecalled";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onPrivateReadReceiptReceived:(NSString *)targetId channelId:(NSString *)channelId timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onPrivateReadReceiptReceived";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onRemoteMessageExpansionUpdated:(NSDictionary<NSString *, NSString *> *)expansion message:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onRemoteMessageExpansionUpdated";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:expansion ? expansion : @{} forKey:@"expansion"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onRemoteMessageExpansionForKeyRemoved:(RCIMIWMessage *)message keys:(NSArray<NSString *> *)keys {
  NSString *eventName = @"IRCIMIWListener:onRemoteMessageExpansionForKeyRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
  [arguments setValue:keys ? keys : @[] forKey:@"keys"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomMemberChanged:(NSString *)targetId actions:(NSArray<RCIMIWChatRoomMemberAction *> *)actions {
  NSString *eventName = @"IRCIMIWListener:onChatRoomMemberChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  NSMutableArray<NSDictionary *> *_actions = [NSMutableArray new];
  for (int i = 0; actions && i < actions.count; i++)
    [_actions addObject:[RCIMIWPlatformConverter convertChatRoomMemberActionToDict:[actions objectAtIndex:i]]];
  [arguments setValue:_actions forKey:@"actions"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onTypingStatusChanged:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId userTypingStatus:(NSArray<RCIMIWTypingStatus *> *)userTypingStatus {
  NSString *eventName = @"IRCIMIWListener:onTypingStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  NSMutableArray<NSDictionary *> *_userTypingStatus = [NSMutableArray new];
  for (int i = 0; userTypingStatus && i < userTypingStatus.count; i++)
    [_userTypingStatus addObject:[RCIMIWPlatformConverter convertTypingStatusToDict:[userTypingStatus objectAtIndex:i]]];
  [arguments setValue:_userTypingStatus forKey:@"userTypingStatus"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationReadStatusSyncMessageReceived:(RCIMIWConversationType)type targetId:(NSString *)targetId timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onConversationReadStatusSyncMessageReceived";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomEntriesSynced:(NSString *)roomId {
  NSString *eventName = @"IRCIMIWListener:onChatRoomEntriesSynced";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:roomId ? roomId : @"" forKey:@"roomId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomEntriesChanged:(RCIMIWChatRoomEntriesOperationType)operationType roomId:(NSString *)roomId entries:(NSDictionary<NSString *, NSString *> *)entries {
  NSString *eventName = @"IRCIMIWListener:onChatRoomEntriesChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(ChatRoomEntriesOperationTypeToNum(operationType)) forKey:@"operationType"];
  [arguments setValue:roomId ? roomId : @"" forKey:@"roomId"];
  [arguments setValue:entries ? entries : @{} forKey:@"entries"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onRemoteUltraGroupMessageExpansionUpdated:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onRemoteUltraGroupMessageExpansionUpdated";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setValue:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onRemoteUltraGroupMessageModified:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onRemoteUltraGroupMessageModified";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setValue:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onRemoteUltraGroupMessageRecalled:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onRemoteUltraGroupMessageRecalled";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setValue:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupReadTimeReceived:(NSString *)targetId channelId:(NSString *)channelId timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupReadTimeReceived";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupTypingStatusChanged:(NSArray<RCIMIWUltraGroupTypingStatusInfo *> *)info {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupTypingStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  NSMutableArray<NSDictionary *> *_info = [NSMutableArray new];
  for (int i = 0; info && i < info.count; i++)
    [_info addObject:[RCIMIWPlatformConverter convertUltraGroupTypingStatusInfoToDict:[info objectAtIndex:i]]];
  [arguments setValue:_info forKey:@"info"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageBlocked:(RCIMIWBlockedMessageInfo *)info {
  NSString *eventName = @"IRCIMIWListener:onMessageBlocked";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:[RCIMIWPlatformConverter convertBlockedMessageInfoToDict:info] forKey:@"info"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomStatusChanged:(NSString *)targetId status:(RCIMIWChatRoomStatus)status {
  NSString *eventName = @"IRCIMIWListener:onChatRoomStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:@(ChatRoomStatusToNum(status)) forKey:@"status"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onGroupMessageReadReceiptRequestReceived:(NSString *)targetId messageUId:(NSString *)messageUId {
  NSString *eventName = @"IRCIMIWListener:onGroupMessageReadReceiptRequestReceived";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:messageUId ? messageUId : @"" forKey:@"messageUId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onGroupMessageReadReceiptResponseReceived:(NSString *)targetId messageUId:(NSString *)messageUId respondUserIds:(NSDictionary<NSString *, NSNumber *> *)respondUserIds {
  NSString *eventName = @"IRCIMIWListener:onGroupMessageReadReceiptResponseReceived";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:messageUId ? messageUId : @"" forKey:@"messageUId"];
  [arguments setValue:respondUserIds ? respondUserIds : @{} forKey:@"respondUserIds"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConnected:(NSInteger)code userId:(nullable NSString *)userId {
  NSString *eventName = @"IRCIMIWListener:onConnected";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:userId ? userId : @"" forKey:@"userId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onDatabaseOpened:(NSInteger)code {
  NSString *eventName = @"IRCIMIWListener:onDatabaseOpened";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationLoaded:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId conversation:(nullable RCIMIWConversation *)conversation {
  NSString *eventName = @"IRCIMIWListener:onConversationLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:[RCIMIWPlatformConverter convertConversationToDict:conversation] forKey:@"conversation"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationsLoaded:(NSInteger)code conversationTypes:(NSArray<NSNumber *> *)conversationTypes channelId:(NSString *)channelId startTime:(long long)startTime count:(int)count conversations:(nullable NSArray<RCIMIWConversation *> *)conversations {
  NSString *eventName = @"IRCIMIWListener:onConversationsLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  NSMutableArray<NSNumber *> *_conversationTypes = [NSMutableArray new];
  for (int i = 0; conversationTypes && i < conversationTypes.count; i++)
    [_conversationTypes addObject:@(ConversationTypeToNum([conversationTypes objectAtIndex:i].intValue))];
  [arguments setValue:_conversationTypes forKey:@"conversationTypes"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(startTime) forKey:@"startTime"];
  [arguments setValue:@(count) forKey:@"count"];
  NSMutableArray<NSDictionary *> *_conversations = [NSMutableArray new];
  for (int i = 0; conversations && i < conversations.count; i++)
    [_conversations addObject:[RCIMIWPlatformConverter convertConversationToDict:[conversations objectAtIndex:i]]];
  [arguments setValue:_conversations forKey:@"conversations"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationRemoved:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId {
  NSString *eventName = @"IRCIMIWListener:onConversationRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationsRemoved:(NSInteger)code conversationTypes:(NSArray<NSNumber *> *)conversationTypes channelId:(NSString *)channelId {
  NSString *eventName = @"IRCIMIWListener:onConversationsRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  NSMutableArray<NSNumber *> *_conversationTypes = [NSMutableArray new];
  for (int i = 0; conversationTypes && i < conversationTypes.count; i++)
    [_conversationTypes addObject:@(ConversationTypeToNum([conversationTypes objectAtIndex:i].intValue))];
  [arguments setValue:_conversationTypes forKey:@"conversationTypes"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onTotalUnreadCountLoaded:(NSInteger)code channelId:(NSString *)channelId count:(NSInteger)count {
  NSString *eventName = @"IRCIMIWListener:onTotalUnreadCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUnreadCountLoaded:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId count:(NSInteger)count {
  NSString *eventName = @"IRCIMIWListener:onUnreadCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUnreadCountByConversationTypesLoaded:(NSInteger)code conversationTypes:(NSArray<NSNumber *> *)conversationTypes channelId:(NSString *)channelId contain:(BOOL)contain count:(NSInteger)count {
  NSString *eventName = @"IRCIMIWListener:onUnreadCountByConversationTypesLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  NSMutableArray<NSNumber *> *_conversationTypes = [NSMutableArray new];
  for (int i = 0; conversationTypes && i < conversationTypes.count; i++)
    [_conversationTypes addObject:@(ConversationTypeToNum([conversationTypes objectAtIndex:i].intValue))];
  [arguments setValue:_conversationTypes forKey:@"conversationTypes"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(contain) forKey:@"contain"];
  [arguments setValue:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUnreadMentionedCountLoaded:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId count:(NSInteger)count {
  NSString *eventName = @"IRCIMIWListener:onUnreadMentionedCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupAllUnreadCountLoaded:(NSInteger)code count:(NSInteger)count {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupAllUnreadCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupAllUnreadMentionedCountLoaded:(NSInteger)code count:(NSInteger)count {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupAllUnreadMentionedCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUnreadCountCleared:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onUnreadCountCleared";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onDraftMessageSaved:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId draft:(NSString *)draft {
  NSString *eventName = @"IRCIMIWListener:onDraftMessageSaved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:draft ? draft : @"" forKey:@"draft"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onDraftMessageCleared:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId {
  NSString *eventName = @"IRCIMIWListener:onDraftMessageCleared";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onDraftMessageLoaded:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId draft:(NSString *)draft {
  NSString *eventName = @"IRCIMIWListener:onDraftMessageLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:draft ? draft : @"" forKey:@"draft"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onBlockedConversationsLoaded:(NSInteger)code conversationTypes:(NSArray<NSNumber *> *)conversationTypes channelId:(NSString *)channelId conversations:(nullable NSArray<RCIMIWConversation *> *)conversations {
  NSString *eventName = @"IRCIMIWListener:onBlockedConversationsLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  NSMutableArray<NSNumber *> *_conversationTypes = [NSMutableArray new];
  for (int i = 0; conversationTypes && i < conversationTypes.count; i++)
    [_conversationTypes addObject:@(ConversationTypeToNum([conversationTypes objectAtIndex:i].intValue))];
  [arguments setValue:_conversationTypes forKey:@"conversationTypes"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  NSMutableArray<NSDictionary *> *_conversations = [NSMutableArray new];
  for (int i = 0; conversations && i < conversations.count; i++)
    [_conversations addObject:[RCIMIWPlatformConverter convertConversationToDict:[conversations objectAtIndex:i]]];
  [arguments setValue:_conversations forKey:@"conversations"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationTopStatusChanged:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId top:(BOOL)top {
  NSString *eventName = @"IRCIMIWListener:onConversationTopStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(top) forKey:@"top"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationTopStatusLoaded:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId top:(BOOL)top {
  NSString *eventName = @"IRCIMIWListener:onConversationTopStatusLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(top) forKey:@"top"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationReadStatusSynced:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onConversationReadStatusSynced";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageAttached:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onMessageAttached";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageSent:(NSInteger)code message:(nullable RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onMessageSent";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMediaMessageAttached:(RCIMIWMediaMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onMediaMessageAttached";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMediaMessageSending:(RCIMIWMediaMessage *)message progress:(int)progress {
  NSString *eventName = @"IRCIMIWListener:onMediaMessageSending";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
  [arguments setValue:@(progress) forKey:@"progress"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onSendingMediaMessageCanceled:(NSInteger)code message:(RCIMIWMediaMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onSendingMediaMessageCanceled";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMediaMessageSent:(NSInteger)code message:(RCIMIWMediaMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onMediaMessageSent";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMediaMessageDownloading:(RCIMIWMediaMessage *)message progress:(int)progress {
  NSString *eventName = @"IRCIMIWListener:onMediaMessageDownloading";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
  [arguments setValue:@(progress) forKey:@"progress"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMediaMessageDownloaded:(NSInteger)code message:(RCIMIWMediaMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onMediaMessageDownloaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onDownloadingMediaMessageCanceled:(NSInteger)code message:(RCIMIWMediaMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onDownloadingMediaMessageCanceled";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMediaMessageToDict:message] forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessagesLoaded:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId sentTime:(long long)sentTime order:(RCIMIWTimeOrder)order messages:(nullable NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onMessagesLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(sentTime) forKey:@"sentTime"];
  [arguments setValue:@(TimeOrderToNum(order)) forKey:@"order"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setValue:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUnreadMentionedMessagesLoaded:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onUnreadMentionedMessagesLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setValue:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onFirstUnreadMessageLoaded:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId message:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onFirstUnreadMessageLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageInserted:(NSInteger)code message:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onMessageInserted";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessagesInserted:(NSInteger)code messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onMessagesInserted";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setValue:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessagesCleared:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onMessagesCleared";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onLocalMessagesDeleted:(NSInteger)code messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onLocalMessagesDeleted";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setValue:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessagesDeleted:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onMessagesDeleted";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setValue:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageRecalled:(NSInteger)code message:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onMessageRecalled";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onPrivateReadReceiptMessageSent:(NSInteger)code targetId:(NSString *)targetId channelId:(NSString *)channelId timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onPrivateReadReceiptMessageSent";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageExpansionUpdated:(NSInteger)code messageUId:(NSString *)messageUId expansion:(NSDictionary<NSString *, NSString *> *)expansion {
  NSString *eventName = @"IRCIMIWListener:onMessageExpansionUpdated";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:messageUId ? messageUId : @"" forKey:@"messageUId"];
  [arguments setValue:expansion ? expansion : @{} forKey:@"expansion"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageExpansionForKeysRemoved:(NSInteger)code messageUId:(NSString *)messageUId keys:(NSArray<NSString *> *)keys {
  NSString *eventName = @"IRCIMIWListener:onMessageExpansionForKeysRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:messageUId ? messageUId : @"" forKey:@"messageUId"];
  [arguments setValue:keys ? keys : @[] forKey:@"keys"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageReceiveStatusChanged:(NSInteger)code messageId:(long)messageId {
  NSString *eventName = @"IRCIMIWListener:onMessageReceiveStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(messageId) forKey:@"messageId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageSentStatusChanged:(NSInteger)code messageId:(long)messageId {
  NSString *eventName = @"IRCIMIWListener:onMessageSentStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(messageId) forKey:@"messageId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomJoined:(NSInteger)code targetId:(NSString *)targetId {
  NSString *eventName = @"IRCIMIWListener:onChatRoomJoined";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomJoining:(NSString *)targetId {
  NSString *eventName = @"IRCIMIWListener:onChatRoomJoining";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomLeft:(NSInteger)code targetId:(NSString *)targetId {
  NSString *eventName = @"IRCIMIWListener:onChatRoomLeft";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomMessagesLoaded:(NSInteger)code targetId:(NSString *)targetId messages:(NSArray<RCIMIWMessage *> *)messages syncTime:(long long)syncTime {
  NSString *eventName = @"IRCIMIWListener:onChatRoomMessagesLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setValue:_messages forKey:@"messages"];
  [arguments setValue:@(syncTime) forKey:@"syncTime"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomEntryAdded:(NSInteger)code targetId:(NSString *)targetId key:(NSString *)key {
  NSString *eventName = @"IRCIMIWListener:onChatRoomEntryAdded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:key ? key : @"" forKey:@"key"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomEntriesAdded:(NSInteger)code targetId:(NSString *)targetId entries:(NSDictionary<NSString *, NSString *> *)entries errorEntries:(NSDictionary<NSString *, NSNumber *> *)errorEntries {
  NSString *eventName = @"IRCIMIWListener:onChatRoomEntriesAdded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:entries ? entries : @{} forKey:@"entries"];
  [arguments setValue:errorEntries ? errorEntries : @{} forKey:@"errorEntries"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomEntryLoaded:(NSInteger)code targetId:(NSString *)targetId entry:(NSDictionary<NSString *, NSString *> *)entry {
  NSString *eventName = @"IRCIMIWListener:onChatRoomEntryLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:entry ? entry : @{} forKey:@"entry"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomAllEntriesLoaded:(NSInteger)code targetId:(NSString *)targetId entries:(NSDictionary<NSString *, NSString *> *)entries {
  NSString *eventName = @"IRCIMIWListener:onChatRoomAllEntriesLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:entries ? entries : @{} forKey:@"entries"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomEntryRemoved:(NSInteger)code targetId:(NSString *)targetId key:(NSString *)key {
  NSString *eventName = @"IRCIMIWListener:onChatRoomEntryRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:key ? key : @"" forKey:@"key"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onChatRoomEntriesRemoved:(NSInteger)code targetId:(NSString *)targetId keys:(NSArray<NSString *> *)keys {
  NSString *eventName = @"IRCIMIWListener:onChatRoomEntriesRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:keys ? keys : @[] forKey:@"keys"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onBlacklistAdded:(NSInteger)code userId:(NSString *)userId {
  NSString *eventName = @"IRCIMIWListener:onBlacklistAdded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:userId ? userId : @"" forKey:@"userId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onBlacklistRemoved:(NSInteger)code userId:(NSString *)userId {
  NSString *eventName = @"IRCIMIWListener:onBlacklistRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:userId ? userId : @"" forKey:@"userId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onBlacklistStatusLoaded:(NSInteger)code userId:(NSString *)userId status:(RCIMIWBlacklistStatus)status {
  NSString *eventName = @"IRCIMIWListener:onBlacklistStatusLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:userId ? userId : @"" forKey:@"userId"];
  [arguments setValue:@(BlacklistStatusToNum(status)) forKey:@"status"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onBlacklistLoaded:(NSInteger)code userIds:(NSArray<NSString *> *)userIds {
  NSString *eventName = @"IRCIMIWListener:onBlacklistLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:userIds ? userIds : @[] forKey:@"userIds"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessagesSearched:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId keyword:(NSString *)keyword startTime:(long long)startTime count:(int)count messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onMessagesSearched";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:keyword ? keyword : @"" forKey:@"keyword"];
  [arguments setValue:@(startTime) forKey:@"startTime"];
  [arguments setValue:@(count) forKey:@"count"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setValue:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessagesSearchedByTimeRange:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId keyword:(NSString *)keyword startTime:(long long)startTime endTime:(long long)endTime offset:(int)offset count:(int)count messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onMessagesSearchedByTimeRange";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:keyword ? keyword : @"" forKey:@"keyword"];
  [arguments setValue:@(startTime) forKey:@"startTime"];
  [arguments setValue:@(endTime) forKey:@"endTime"];
  [arguments setValue:@(offset) forKey:@"offset"];
  [arguments setValue:@(count) forKey:@"count"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setValue:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessagesSearchedByUserId:(NSInteger)code userId:(NSString *)userId type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId startTime:(long long)startTime count:(int)count messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onMessagesSearchedByUserId";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:userId ? userId : @"" forKey:@"userId"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(startTime) forKey:@"startTime"];
  [arguments setValue:@(count) forKey:@"count"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setValue:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationsSearched:(NSInteger)code conversationTypes:(NSArray<NSNumber *> *)conversationTypes channelId:(NSString *)channelId messageTypes:(NSArray<NSNumber *> *)messageTypes keyword:(NSString *)keyword conversations:(NSArray<RCIMIWSearchConversationResult *> *)conversations {
  NSString *eventName = @"IRCIMIWListener:onConversationsSearched";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  NSMutableArray<NSNumber *> *_conversationTypes = [NSMutableArray new];
  for (int i = 0; conversationTypes && i < conversationTypes.count; i++)
    [_conversationTypes addObject:@(ConversationTypeToNum([conversationTypes objectAtIndex:i].intValue))];
  [arguments setValue:_conversationTypes forKey:@"conversationTypes"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  NSMutableArray<NSNumber *> *_messageTypes = [NSMutableArray new];
  for (int i = 0; messageTypes && i < messageTypes.count; i++)
    [_messageTypes addObject:@(MessageTypeToNum([messageTypes objectAtIndex:i].intValue))];
  [arguments setValue:_messageTypes forKey:@"messageTypes"];
  [arguments setValue:keyword ? keyword : @"" forKey:@"keyword"];
  NSMutableArray<NSDictionary *> *_conversations = [NSMutableArray new];
  for (int i = 0; conversations && i < conversations.count; i++)
    [_conversations addObject:[RCIMIWPlatformConverter convertSearchConversationResultToDict:[conversations objectAtIndex:i]]];
  [arguments setValue:_conversations forKey:@"conversations"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onGroupReadReceiptRequestSent:(NSInteger)code message:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onGroupReadReceiptRequestSent";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onGroupReadReceiptResponseSent:(NSInteger)code targetId:(NSString *)targetId channelId:(NSString *)channelId messages:(NSArray<RCIMIWMessage *> *)messages {
  NSString *eventName = @"IRCIMIWListener:onGroupReadReceiptResponseSent";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  NSMutableArray<NSDictionary *> *_messages = [NSMutableArray new];
  for (int i = 0; messages && i < messages.count; i++)
    [_messages addObject:[RCIMIWPlatformConverter convertMessageToDict:[messages objectAtIndex:i]]];
  [arguments setValue:_messages forKey:@"messages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onNotificationQuietHoursChanged:(NSInteger)code startTime:(NSString *)startTime spanMinutes:(int)spanMinutes level:(RCIMIWPushNotificationQuietHoursLevel)level {
  NSString *eventName = @"IRCIMIWListener:onNotificationQuietHoursChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:startTime ? startTime : @"" forKey:@"startTime"];
  [arguments setValue:@(spanMinutes) forKey:@"spanMinutes"];
  [arguments setValue:@(PushNotificationQuietHoursLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onNotificationQuietHoursRemoved:(NSInteger)code {
  NSString *eventName = @"IRCIMIWListener:onNotificationQuietHoursRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onNotificationQuietHoursLoaded:(NSInteger)code startTime:(NSString *)startTime spanMinutes:(int)spanMinutes level:(RCIMIWPushNotificationQuietHoursLevel)level {
  NSString *eventName = @"IRCIMIWListener:onNotificationQuietHoursLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:startTime ? startTime : @"" forKey:@"startTime"];
  [arguments setValue:@(spanMinutes) forKey:@"spanMinutes"];
  [arguments setValue:@(PushNotificationQuietHoursLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationNotificationLevelChanged:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId level:(RCIMIWPushNotificationLevel)level {
  NSString *eventName = @"IRCIMIWListener:onConversationNotificationLevelChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationNotificationLevelLoaded:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId level:(RCIMIWPushNotificationLevel)level {
  NSString *eventName = @"IRCIMIWListener:onConversationNotificationLevelLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationTypeNotificationLevelChanged:(NSInteger)code type:(RCIMIWConversationType)type level:(RCIMIWPushNotificationLevel)level {
  NSString *eventName = @"IRCIMIWListener:onConversationTypeNotificationLevelChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationTypeNotificationLevelLoaded:(NSInteger)code type:(RCIMIWConversationType)type level:(RCIMIWPushNotificationLevel)level {
  NSString *eventName = @"IRCIMIWListener:onConversationTypeNotificationLevelLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupDefaultNotificationLevelChanged:(NSInteger)code targetId:(NSString *)targetId level:(RCIMIWPushNotificationLevel)level {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupDefaultNotificationLevelChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupDefaultNotificationLevelLoaded:(NSInteger)code targetId:(NSString *)targetId level:(RCIMIWPushNotificationLevel)level {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupDefaultNotificationLevelLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupChannelDefaultNotificationLevelChanged:(NSInteger)code targetId:(NSString *)targetId channelId:(NSString *)channelId level:(RCIMIWPushNotificationLevel)level {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupChannelDefaultNotificationLevelChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupChannelDefaultNotificationLevelLoaded:(NSInteger)code targetId:(NSString *)targetId channelId:(NSString *)channelId level:(RCIMIWPushNotificationLevel)level {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupChannelDefaultNotificationLevelLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(PushNotificationLevelToNum(level)) forKey:@"level"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onPushContentShowStatusChanged:(NSInteger)code showContent:(BOOL)showContent {
  NSString *eventName = @"IRCIMIWListener:onPushContentShowStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(showContent) forKey:@"showContent"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onPushLanguageChanged:(NSInteger)code language:(NSString *)language {
  NSString *eventName = @"IRCIMIWListener:onPushLanguageChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:language ? language : @"" forKey:@"language"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onPushReceiveStatusChanged:(NSInteger)code receive:(BOOL)receive {
  NSString *eventName = @"IRCIMIWListener:onPushReceiveStatusChanged";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(receive) forKey:@"receive"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onMessageCountLoaded:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId channelId:(NSString *)channelId count:(int)count {
  NSString *eventName = @"IRCIMIWListener:onMessageCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onTopConversationsLoaded:(NSInteger)code conversationTypes:(NSArray<NSNumber *> *)conversationTypes channelId:(NSString *)channelId conversations:(nullable NSArray<RCIMIWConversation *> *)conversations {
  NSString *eventName = @"IRCIMIWListener:onTopConversationsLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  NSMutableArray<NSNumber *> *_conversationTypes = [NSMutableArray new];
  for (int i = 0; conversationTypes && i < conversationTypes.count; i++)
    [_conversationTypes addObject:@(ConversationTypeToNum([conversationTypes objectAtIndex:i].intValue))];
  [arguments setValue:_conversationTypes forKey:@"conversationTypes"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  NSMutableArray<NSDictionary *> *_conversations = [NSMutableArray new];
  for (int i = 0; conversations && i < conversations.count; i++)
    [_conversations addObject:[RCIMIWPlatformConverter convertConversationToDict:[conversations objectAtIndex:i]]];
  [arguments setValue:_conversations forKey:@"conversations"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onGroupMessageToDesignatedUsersAttached:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onGroupMessageToDesignatedUsersAttached";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onGroupMessageToDesignatedUsersSent:(NSInteger)code message:(RCIMIWMessage *)message {
  NSString *eventName = @"IRCIMIWListener:onGroupMessageToDesignatedUsersSent";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupReadStatusSynced:(NSInteger)code targetId:(NSString *)targetId channelId:(NSString *)channelId timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupReadStatusSynced";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onConversationsLoadedForAllChannel:(NSInteger)code type:(RCIMIWConversationType)type targetId:(NSString *)targetId conversations:(NSArray<RCIMIWConversation *> *)conversations {
  NSString *eventName = @"IRCIMIWListener:onConversationsLoadedForAllChannel";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:@(ConversationTypeToNum(type)) forKey:@"type"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  NSMutableArray<NSDictionary *> *_conversations = [NSMutableArray new];
  for (int i = 0; conversations && i < conversations.count; i++)
    [_conversations addObject:[RCIMIWPlatformConverter convertConversationToDict:[conversations objectAtIndex:i]]];
  [arguments setValue:_conversations forKey:@"conversations"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupUnreadMentionedCountLoaded:(NSInteger)code targetId:(NSString *)targetId count:(NSInteger)count {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupUnreadMentionedCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupUnreadCountLoaded:(NSInteger)code targetId:(NSString *)targetId count:(NSInteger)count {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupUnreadCountLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:@(count) forKey:@"count"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupMessageModified:(NSInteger)code messageUId:(NSString *)messageUId {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupMessageModified";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:messageUId ? messageUId : @"" forKey:@"messageUId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupMessageRecalled:(NSInteger)code message:(RCIMIWMessage *)message deleteRemote:(BOOL)deleteRemote {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupMessageRecalled";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:[RCIMIWPlatformConverter convertMessageToDict:message] forKey:@"message"];
  [arguments setValue:@(deleteRemote) forKey:@"deleteRemote"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupMessagesCleared:(NSInteger)code targetId:(NSString *)targetId channelId:(NSString *)channelId timestamp:(long long)timestamp policy:(RCIMIWMessageOperationPolicy)policy {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupMessagesCleared";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(timestamp) forKey:@"timestamp"];
  [arguments setValue:@(MessageOperationPolicyToNum(policy)) forKey:@"policy"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupMessagesClearedForAllChannel:(NSInteger)code targetId:(NSString *)targetId timestamp:(long long)timestamp {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupMessagesClearedForAllChannel";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:@(timestamp) forKey:@"timestamp"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupTypingStatusSent:(NSInteger)code targetId:(NSString *)targetId channelId:(NSString *)channelId typingStatus:(RCIMIWUltraGroupTypingStatus)typingStatus {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupTypingStatusSent";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:targetId ? targetId : @"" forKey:@"targetId"];
  [arguments setValue:channelId ? channelId : @"" forKey:@"channelId"];
  [arguments setValue:@(UltraGroupTypingStatusToNum(typingStatus)) forKey:@"typingStatus"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onBatchRemoteUltraGroupMessagesLoaded:(NSInteger)code matchedMessages:(NSArray<RCIMIWMessage *> *)matchedMessages notMatchedMessages:(NSArray<RCIMIWMessage *> *)notMatchedMessages {
  NSString *eventName = @"IRCIMIWListener:onBatchRemoteUltraGroupMessagesLoaded";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  NSMutableArray<NSDictionary *> *_matchedMessages = [NSMutableArray new];
  for (int i = 0; matchedMessages && i < matchedMessages.count; i++)
    [_matchedMessages addObject:[RCIMIWPlatformConverter convertMessageToDict:[matchedMessages objectAtIndex:i]]];
  [arguments setValue:_matchedMessages forKey:@"matchedMessages"];
  NSMutableArray<NSDictionary *> *_notMatchedMessages = [NSMutableArray new];
  for (int i = 0; notMatchedMessages && i < notMatchedMessages.count; i++)
    [_notMatchedMessages addObject:[RCIMIWPlatformConverter convertMessageToDict:[notMatchedMessages objectAtIndex:i]]];
  [arguments setValue:_notMatchedMessages forKey:@"notMatchedMessages"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupMessageExpansionUpdated:(NSInteger)code expansion:(NSDictionary<NSString *, NSString *> *)expansion messageUId:(NSString *)messageUId {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupMessageExpansionUpdated";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:expansion ? expansion : @{} forKey:@"expansion"];
  [arguments setValue:messageUId ? messageUId : @"" forKey:@"messageUId"];
  [self sendEventWithName:eventName body:arguments];
}

- (void)onUltraGroupMessageExpansionForKeysRemoved:(NSInteger)code messageUId:(NSString *)messageUId keys:(NSArray<NSString *> *)keys {
  NSString *eventName = @"IRCIMIWListener:onUltraGroupMessageExpansionForKeysRemoved";
  NSMutableDictionary *arguments = [NSMutableDictionary dictionary];
  [arguments setValue:@(code) forKey:@"code"];
  [arguments setValue:messageUId ? messageUId : @"" forKey:@"messageUId"];
  [arguments setValue:keys ? keys : @[] forKey:@"keys"];
  [self sendEventWithName:eventName body:arguments];
}

- (NSArray<NSString *> *)supportedEvents_listener {
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
    @"IRCIMIWListener:onMessagesCleared",
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
    @"IRCIMIWListener:onChatRoomAllEntriesLoaded",
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
    @"IRCIMIWListener:onUltraGroupMessageExpansionForKeysRemoved"

  ];
}

- (NSArray<NSString *> *)supportedEvents_callback {
  return @[
    @"Connect:onDatabaseOpened",
    @"Connect:onConnected",
    @"SendMessage:onMessageSaved",
    @"SendMessage:onMessageSent",
    @"SendMediaMessage:onMediaMessageSaved",
    @"SendMediaMessage:onMediaMessageSending",
    @"SendMediaMessage:onSendingMediaMessageCanceled",
    @"SendMediaMessage:onMediaMessageSent",
    @"CancelSendingMediaMessage:onCancelSendingMediaMessageCalled",
    @"DownloadMediaMessage:onMediaMessageDownloading",
    @"DownloadMediaMessage:onDownloadingMediaMessageCanceled",
    @"DownloadMediaMessage:onMediaMessageDownloaded",
    @"CancelDownloadingMediaMessage:onCancelDownloadingMediaMessageCalled",
    @"GetConversation:onSuccess",
    @"GetConversation:onError",
    @"GetConversations:onSuccess",
    @"GetConversations:onError",
    @"RemoveConversation:onConversationRemoved",
    @"RemoveConversations:onConversationsRemoved",
    @"GetUnreadCount:onSuccess",
    @"GetUnreadCount:onError",
    @"GetTotalUnreadCount:onSuccess",
    @"GetTotalUnreadCount:onError",
    @"GetUnreadMentionedCount:onSuccess",
    @"GetUnreadMentionedCount:onError",
    @"GetUltraGroupAllUnreadCount:onSuccess",
    @"GetUltraGroupAllUnreadCount:onError",
    @"GetUltraGroupAllUnreadMentionedCount:onSuccess",
    @"GetUltraGroupAllUnreadMentionedCount:onError",
    @"GetUltraGroupUnreadCount:onSuccess",
    @"GetUltraGroupUnreadCount:onError",
    @"GetUltraGroupUnreadMentionedCount:onSuccess",
    @"GetUltraGroupUnreadMentionedCount:onError",
    @"GetUnreadCountByConversationTypes:onSuccess",
    @"GetUnreadCountByConversationTypes:onError",
    @"ClearUnreadCount:onUnreadCountCleared",
    @"SaveDraftMessage:onDraftMessageSaved",
    @"GetDraftMessage:onSuccess",
    @"GetDraftMessage:onError",
    @"ClearDraftMessage:onDraftMessageCleared",
    @"GetBlockedConversations:onSuccess",
    @"GetBlockedConversations:onError",
    @"ChangeConversationTopStatus:onConversationTopStatusChanged",
    @"GetConversationTopStatus:onSuccess",
    @"GetConversationTopStatus:onError",
    @"SyncConversationReadStatus:onConversationReadStatusSynced",
    @"GetMessages:onSuccess",
    @"GetMessages:onError",
    @"GetMessageById:onSuccess",
    @"GetMessageById:onError",
    @"GetMessageByUId:onSuccess",
    @"GetMessageByUId:onError",
    @"GetFirstUnreadMessage:onSuccess",
    @"GetFirstUnreadMessage:onError",
    @"GetUnreadMentionedMessages:onSuccess",
    @"GetUnreadMentionedMessages:onError",
    @"InsertMessage:onMessageInserted",
    @"InsertMessages:onMessagesInserted",
    @"ClearMessages:onMessagesCleared",
    @"DeleteLocalMessages:onLocalMessagesDeleted",
    @"DeleteMessages:onMessagesDeleted",
    @"RecallMessage:onMessageRecalled",
    @"SendPrivateReadReceiptMessage:onPrivateReadReceiptMessageSent",
    @"SendGroupReadReceiptRequest:onGroupReadReceiptRequestSent",
    @"SendGroupReadReceiptResponse:onGroupReadReceiptResponseSent",
    @"UpdateMessageExpansion:onMessageExpansionUpdated",
    @"RemoveMessageExpansionForKeys:onMessageExpansionForKeysRemoved",
    @"ChangeMessageSentStatus:onMessageSentStatusChanged",
    @"ChangeMessageReceiveStatus:onMessageReceiveStatusChanged",
    @"JoinChatRoom:onChatRoomJoined",
    @"LeaveChatRoom:onChatRoomLeft",
    @"GetChatRoomMessages:onSuccess",
    @"GetChatRoomMessages:onError",
    @"AddChatRoomEntry:onChatRoomEntryAdded",
    @"AddChatRoomEntries:onChatRoomEntriesAdded",
    @"GetChatRoomEntry:onSuccess",
    @"GetChatRoomEntry:onError",
    @"GetChatRoomAllEntries:onSuccess",
    @"GetChatRoomAllEntries:onError",
    @"RemoveChatRoomEntry:onChatRoomEntryRemoved",
    @"RemoveChatRoomEntries:onChatRoomEntriesRemoved",
    @"AddToBlacklist:onBlacklistAdded",
    @"RemoveFromBlacklist:onBlacklistRemoved",
    @"GetBlacklistStatus:onSuccess",
    @"GetBlacklistStatus:onError",
    @"GetBlacklist:onSuccess",
    @"GetBlacklist:onError",
    @"SearchMessages:onSuccess",
    @"SearchMessages:onError",
    @"SearchMessagesByTimeRange:onSuccess",
    @"SearchMessagesByTimeRange:onError",
    @"SearchMessagesByUserId:onSuccess",
    @"SearchMessagesByUserId:onError",
    @"SearchConversations:onSuccess",
    @"SearchConversations:onError",
    @"ChangeNotificationQuietHours:onNotificationQuietHoursChanged",
    @"RemoveNotificationQuietHours:onNotificationQuietHoursRemoved",
    @"GetNotificationQuietHours:onSuccess",
    @"GetNotificationQuietHours:onError",
    @"ChangeConversationNotificationLevel:onConversationNotificationLevelChanged",
    @"GetConversationNotificationLevel:onSuccess",
    @"GetConversationNotificationLevel:onError",
    @"ChangeConversationTypeNotificationLevel:onConversationTypeNotificationLevelChanged",
    @"GetConversationTypeNotificationLevel:onSuccess",
    @"GetConversationTypeNotificationLevel:onError",
    @"ChangeUltraGroupDefaultNotificationLevel:onUltraGroupDefaultNotificationLevelChanged",
    @"GetUltraGroupDefaultNotificationLevel:onSuccess",
    @"GetUltraGroupDefaultNotificationLevel:onError",
    @"ChangeUltraGroupChannelDefaultNotificationLevel:onUltraGroupChannelDefaultNotificationLevelChanged",
    @"GetUltraGroupChannelDefaultNotificationLevel:onSuccess",
    @"GetUltraGroupChannelDefaultNotificationLevel:onError",
    @"ChangePushContentShowStatus:onPushContentShowStatusChanged",
    @"ChangePushLanguage:onPushLanguageChanged",
    @"ChangePushReceiveStatus:onPushReceiveStatusChanged",
    @"SendGroupMessageToDesignatedUsers:onMessageSaved",
    @"SendGroupMessageToDesignatedUsers:onMessageSent",
    @"GetMessageCount:onSuccess",
    @"GetMessageCount:onError",
    @"GetTopConversations:onSuccess",
    @"GetTopConversations:onError",
    @"SyncUltraGroupReadStatus:onUltraGroupReadStatusSynced",
    @"GetConversationsForAllChannel:onSuccess",
    @"GetConversationsForAllChannel:onError",
    @"ModifyUltraGroupMessage:onUltraGroupMessageModified",
    @"RecallUltraGroupMessage:onUltraGroupMessageRecalled",
    @"ClearUltraGroupMessages:onUltraGroupMessagesCleared",
    @"SendUltraGroupTypingStatus:onUltraGroupTypingStatusSent",
    @"ClearUltraGroupMessagesForAllChannel:onUltraGroupMessagesClearedForAllChannel",
    @"GetBatchRemoteUltraGroupMessages:onSuccess",
    @"GetBatchRemoteUltraGroupMessages:onError",
    @"UpdateUltraGroupMessageExpansion:onUltraGroupMessageExpansionUpdated",
    @"RemoveUltraGroupMessageExpansionForKeys:onUltraGroupMessageExpansionForKeysRemoved",
  ];
}

- (NSArray<NSString *> *)supportedEvents {
  NSMutableArray *array = [NSMutableArray array];
  [array addObjectsFromArray:[self supportedEvents_listener]];
  [array addObjectsFromArray:[self supportedEvents_callback]];
  return [NSArray arrayWithArray:array];
}

@end
