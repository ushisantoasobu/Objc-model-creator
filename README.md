Objc-model-creator
==================

create data-model in objective-C with Node.js

##How to use

 * Prepare hoge.txt like below, which contains (if needed) ['super', SuperClassName] and list of [Type, variableName].
```javascript
super, Human
NSInteger,age
NSString,nickname
Skill,skill
Skill,specialSkill
```

 * Execute objc-model-creator.js with Node.

```javascript
node objc-model-creator.js
```

 * 2 files like below, header file(.h) and implementation file(.m) , will be generated.

```Objective-C
#import <Foundation/Foundation.h>
#import "Shop.h"
#import "LargeArea.h"


@interface Test : LargeArea

@property (nonatomic) NSInteger count;
@property (nonatomic, strong) NSString* nickname;
@property (nonatomic, strong) Shop* shop;
@property (nonatomic, strong) Shop* testShop;

@end
```

```Objective-C
#import "Test.h"

@implementation Test

- (void)initWithDis:(NSDictionary *)dic {
 self.count = (int)[dic objectForKey:@"count"];
 self.nickname = [dic objectForKey:@"nickname"];
 self.shop = [dic objectForKey:@"shop"];
 self.testShop = [dic objectForKey:@"testShop"];
}

@end
```