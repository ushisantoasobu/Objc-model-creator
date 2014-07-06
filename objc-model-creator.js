//modules
var fs = require('fs');
var rl = require('readline');

/** ファイル名 */
var filename = "Test";

/**  */
var dic = {};

/**  */
var PRIMITIVE_TYPE = [
	"NSString",
	"NSInteger",
	"int",
	"BOOL"
];


var readData = function(){

};

var contain = function(target, list){
	for(var i = 0; i < list.length; i++){
		if(target === list[i]){
			return true;
		}
	}
	return false
}

var createHeaderFile = function(dic){
	var str = "",
		i = 0,
		len = dic.length;

	str += '#import <Foundation/Foundation.h>\n';

	for(i; i < len; i++){
		if(!contain(dic[i].typename, PRIMITIVE_TYPE)){
			str += '#import "' + dic[i].typename + '.h"\n';
		}
	}

	str += "\n";

	str += '@interface ' + filename + ' : NSObject\n';

	str += "\n";

	for(i = 0; i < len; i++){
		if(contain(dic[i].typename, ["NSInteger", "int", "BOOL"])){
			str += '@property (nonatomic) ' + dic[i].typename + ' ' + dic[i].variableName + ';\n';
		}else{
			str += '@property (nonatomic, strong) ' + dic[i].typename  + '* ' + dic[i].variableName + ';\n';
		}
	}

	str += "\n";

	str += "@end";

	return str;
};

var createImplementationFile = function(){
	
	var str = "",
		i = 0,
		len = dic.length;

	str += '#import "' + filename + '.h"\n';

	str += "\n";

	str += '@implementation ' + filename + '\n';

	str += "\n";

	str += "- (void)initWithDis:(NSDictionary *)dic {\n";

	for(i; i < len; i++){
		if(contain(dic[i].typename, ["NSInteger", "int"])){
			str += ' self.' + dic[i].variableName + ' = (int)[dic objectForKey:@"' + dic[i].variableName + '"]\n';
		}else{
			str += ' self.' + dic[i].variableName + ' = [dic objectForKey:@"' + dic[i].variableName + '"]\n';
		}
	}

	str += "}\n";

	str += "\n";

	str += "@end";

    return str;
};



var dic = [
	{
		'typename':'int',
		'variableName':'count'
	},
	{
		'typename':'NSString',
		'variableName':'nickname'
	}
];



var i = rl.createInterface(process.sdtin, process.stdout, null);
i.question("input ClassName", function(input) {
	var filename = input;
	i.close();
	process.stdin.destroy();


	fs.writeFile(filename + '.h', createHeaderFile(dic) , function (err) {
	 	console.log(err);
	});

	fs.writeFile(filename + '.m', createImplementationFile(dic) , function (err) {
		console.log(err);
	});
});

return;






