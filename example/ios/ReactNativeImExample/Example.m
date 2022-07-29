//
//  Beauty.m
//  ReactNativeRtcExample
//
//  Created by 廖坤 on 2022/2/28.
//

#import "Example.h"
#import <React/RCTBridge.h>
#import <Foundation/Foundation.h>


@interface ExampleIM () <RCTBridgeModule>
@end

@implementation ExampleIM


RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(showToast:(NSString*)message resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {

  dispatch_async(dispatch_get_main_queue(), ^{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"提示！" message:message delegate:nil cancelButtonTitle:@"取消" otherButtonTitles:@"确定", nil];
    [alertView show];
  });

  resolve(@(0));
}


@end
