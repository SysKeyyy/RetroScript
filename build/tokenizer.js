// Required Libs

// Data Types
var STR = "String"
var INT = "Intiger"
var DICT = "Dictionary"
var FLOAT = "Floating Numbers"
var VARIABLE = "Variable"
var FUNCTION = "Function"

// Operations
const operations = [":", "<", ">", "(", ")", "/"]
const ignore = ["\n", "\r"]

// Tokenizer
module.exports = (code) => {
    let operator = []
    let string = []
    let fn_name = []
    var __render__ = code.split("\n")
    for (let i = 0;i < __render__.length;i++) {
        for (let j = 0;j < operations.length;j++) {
            if (__render__[i] === ' ') {}
            else if (__render__[i] === "\n") {}
            else {
                if (__render__[i] === operations[j]) { operator.push(__render__[i]) }
                else { string.push(__render__[i]) }
                // if (__render__[i] === operations[j]) { 
                //     // if (__render__[i] === "<") {
                //     //     fn_name.push()
                //     // }
                //  }
            }
        }
    }
    return {"operator" : operator} // , "string" : string, "totalChars" : __render__.length
}

