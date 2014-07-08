///////////////////////////////
// variables, function
///////////////////////////////

//modules
var fs = require('fs');
var rl = require('readline');

/** プリミティブ型（※まだ足りていない） */
var PRIMITIVE_TYPE = [
	"NSString",
	"NSInteger",
	"int",
	"BOOL"
];

/**
 * explanation
 * 
 * @param explanation
 * @return explanation
 */
var contain = function(target, list){
	for(var i = 0; i < list.length; i++){
		if(target === list[i]){
			return true;
		}
	}
	return false
};

/**
 * explanation
 * 
 * @param explanation
 * @return explanation
 */
var deleteSpace = function(txt){
	return txt.replace(/\s+/g, "");
};

/**
 * explanation
 * 
 * @param explanation
 * @return explanation
 */
 var deleteDuplicateImport = function(text){
 	var list = text.split('\n'),
 		i = 0, j,
 		tempList = [],
 		flg = false,
 		str = "";

 	for(i; i < list.length; i++){
 		j = 0, flg = false;
 		for(j; j < tempList.length; j++){
 			if(tempList[j] === list[i]){
 				flg = true;
 				break;
 			}
 		}
 		if(!flg){
 			tempList.push(list[i]);
 		}
 	}

 	j = 0;
 	for(j; j < tempList.length; j++){
 		str += tempList[j] + '\n';
 	}

 	return str;
 };

/**
 * explanation
 * 
 * @param explanation
 * @return explanation
 */
var upperFirstChar = function(txt){
	return txt; //TODO
};

/**
 * ヘッダファイルを生成する
 * 
 * @param filename filename
 * @param dic dic
 * @param superClass superClass
 * @return str
 */
var createHeaderFile = function(filename, dic, superClass){
	var str = "",
		i = 0,
		len = dic.length;

	str += '#import <Foundation/Foundation.h>\n';

	for(i; i < len; i++){
		if(!contain(dic[i].typename, PRIMITIVE_TYPE)){
			str += '#import "' + dic[i].typename + '.h"\n';
		}
	}
	if(superClass){
		str += '#import "' + superClass + '.h"\n';
	}

	str = deleteDuplicateImport(str);

	str += "\n";

	if(!superClass){
		str += '@interface ' + filename + ' : NSObject\n';
	}else{
		str += '@interface ' + filename + ' : ' + superClass + '\n';
	}

	str += "\n";

	for(i = 0; i < len; i++){
		if(contain(dic[i].typename, ["NSInteger", "int", "BOOL"])){
			str += '@property (nonatomic) ' + dic[i].typename + ' ' + dic[i].variablename + ';\n';
		}else{
			str += '@property (nonatomic, strong) ' + dic[i].typename  + '* ' + dic[i].variablename + ';\n';
		}
	}

	str += "\n";

	str += "- (id)initWithDic:(NSDictionary *)dic;\n";

	str += "@end\n";

	return str;
};

/**
 * 実行ファイルを生成する
 * 
 * @param filename filename
 * @param dic dic
 * @return str
 */
var createImplementationFile = function(filename, dic, superClass){
	
	var str = "",
		i = 0,
		len = dic.length;

	str += '#import "' + filename + '.h"\n';

	str += "\n";

	str += '@implementation ' + filename + '\n';

	str += "\n";

	str += "- (id)initWithDic:(NSDictionary *)dic {\n";
	if(superClass){
		str += " self = [super initWithDic:dic];\n";
	}

	for(i; i < len; i++){
		if(contain(dic[i].typename, ["NSInteger", "int"])){
			str += ' self.' + dic[i].variablename + ' = [[dic objectForKey:@"' + dic[i].variablename + '"] intValue];\n'; //TODO:int限定？
		}else{
			str += ' self.' + dic[i].variablename + ' = [dic objectForKey:@"' + dic[i].variablename + '"];\n';
		}
	}

	str += " return self;\n";
	str += "}\n";

	str += "\n";

	str += "@end";

    return str;
};


///////////////////////////////
// 以下実行処理
///////////////////////////////

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("input .txt name (without '.txt')", function(input) {
	rl.close();

	fs.readFile('./' + input + '.txt', 'utf8', function (err, text) {
		if(err){
			console.log(err);
			return;
		}

		var list = text.split('\n');
		if(!list || list.length === 0){
			console.log("error1");
			return;
		}

		var dic = [];
		var superClass;

		for(var i = 0; i < list.length; i++){
			var objList = list[i].split(',');
			if(!objList || objList.length !== 2){
				break;
			}
			if(deleteSpace(objList[0]) === "super"){
				superClass = deleteSpace(objList[1]);
			}else{
				dic.push({
					'typename':deleteSpace(objList[0]),
					'variablename':deleteSpace(objList[1])
				});
			}
		}

		fs.writeFile(input + '.h', createHeaderFile(input, dic, superClass) , function (err) {
		 	if(err) console.log(err);
		});

		fs.writeFile(input + '.m', createImplementationFile(input, dic, superClass) , function (err) {
			if(err) console.log(err);
		});

	});

});

return;