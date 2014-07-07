#import <Foundation/Foundation.h>
#import "Shop.h"
#import "LargeArea.h"

@interface Test : LargeArea

@property (nonatomic) NSInteger count;
@property (nonatomic, strong) NSString* nickname;
@property (nonatomic, strong) Shop* shop;

@end