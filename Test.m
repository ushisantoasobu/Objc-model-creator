#import "Test.h"

@implementation Test

- (void)initWithDis:(NSDictionary *)dic {
 self.count = (int)[dic objectForKey:@"count"];
 self.nickname = [dic objectForKey:@"nickname"];
 self.shop = [dic objectForKey:@"shop"];
}

@end