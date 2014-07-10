# objc-model-creator

create "dataModel" file(.h, .m) in objective-C with Node.js


##Usage

Prepare hoge.txt like below, which contains (if needed) ['super', SuperClassName] and list of [Type, variableName].
```javascript
super, Human
NSInteger,age
NSString,nickname
Skill,skill
Skill,specialSkill
```


Execute objc-model-creator.js with Node.

```javascript
node objc-model-creator.js
```


2 files like below, header file(.h) and implementation file(.m) , will be generated.

```Objective-C
#import <Foundation/Foundation.h>
#import "Skill.h"
#import "Human.h"


@interface test : Human

@property (nonatomic) NSInteger age;
@property (nonatomic, strong) NSString* nickname;
@property (nonatomic, strong) Skill* skill;
@property (nonatomic, strong) Skill* specialSkill;

- (id)initWithDic:(NSDictionary *)dic;
@end
```


```Objective-C
#import "test.h"

@implementation test

- (id)initWithDic:(NSDictionary *)dic {
 self = [super initWithDic:dic];
 self.age = [[dic objectForKey:@"age"] intValue];
 self.nickname = [dic objectForKey:@"nickname"];
 self.skill = [dic objectForKey:@"skill"];
 self.specialSkill = [dic objectForKey:@"specialSkill"];
 return self;
}

@end
```