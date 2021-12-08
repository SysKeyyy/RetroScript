// '^".*"$'

// Required Libs
const { readFile } = require("fs")
const { exit } = require("process")

// Data Types
const str = "String"
const int = "integer"
const dict = "Dictionary"
const float = "Floating Numbers"    
const func = "Function"
const Class = "Class"
const array = "Array | List"

// Operations
const operations = [":", "(", ")", "{", "}"]
const ignore = ["\n", "\r", "\t"]
const d_types = ["func ", "Class ", "str ", "int ", "float ", "dict ", "array "]

// ErrorHandler
function ErrorHandler(type, argv=[]) {
    if (type === "value-err") {
        console.log(`Error : No Value Provided for Variable '${argv[0]}', Variable Type : ${argv[1]}`)
        exit()
    }
}

// Tokenizer
function Tokenizer(code) {
    // let operator = []
    let string_vars = []
    let integer_vars = []
    let array_vars = []
    let float_vars = []
    let dict_vars = []
    // let functions = []
    // let classes = []
    var __render__ = code
    
    for (let i = 0;i < __render__.length;i++) {
        
        // Check for DataTypes presence and Store it
        for (let j = 0;j < d_types.length;j++) {
            if (__render__[i].includes(d_types[j])) {
                
                if (d_types[j] == "str ") {
                    _var = __render__[i].replace(d_types[j], "").split(" = ")
                    if (_var.length < 2) { ErrorHandler("value-err", [_var[0], d_types[j]]) }
                    else if (_var[1] === "") { ErrorHandler("value-err", [_var[0], d_types[j]]) }
                    else { string_vars.push( { "var_name" : _var[0], "var_value" : _var[1] } ) }    
                }
                
                else if (d_types[j] == "int ") {
                    _var = __render__[i].replace(d_types[j], "").split(" = ")
                    if (_var.length < 2) { ErrorHandler("value-err", [_var[0], d_types[j]]) }
                    else if (_var[1] === "") { ErrorHandler("value-err", [_var[0], d_types[j]]) }
                    else { integer_vars.push( { "var_name" : _var[0], "var_value" : _var[1] } ) }    
                }
                
                else if (d_types[j] == "array ") {
                    _var = __render__[i].replace(d_types[j], "").split(" = ")
                    if (_var.length < 2) { ErrorHandler("value-err", [_var[0], d_types[j]]) }
                    else if (_var[1] === "") { ErrorHandler("value-err", [_var[0], d_types[j]]) }
                    else { array_vars.push( { "var_name" : _var[0], "var_value" : _var[1] } ) }    
                }
                
                else if (d_types[j] == "dict ") {
                    _var = __render__[i].replace(d_types[j], "").split(" = ")
                    if (_var.length < 2) { ErrorHandler("value-err", [_var[0], d_types[j]]) }
                    else if (_var[1] === "") { ErrorHandler("value-err", [_var[0], d_types[j]]) }
                    else { dict_vars.push( { "var_name" : _var[0], "var_value" : _var[1] } ) }    
                }
                
                else if (d_types[j] == "float ") {
                    _var = __render__[i].replace(d_types[j], "").split(" = ")
                    if (_var.length < 2) { ErrorHandler("value-err", [_var[0], d_types[j]]) }
                    else if (_var[1] === "") { ErrorHandler("value-err", [_var[0], d_types[j]]) }
                    else { float_vars.push( { "var_name" : _var[0], "var_value" : _var[1] } ) }    
                }

            }
        }
    }

    // Executes the 'print()' statement
    for (let i = 0;i < __render__.length;i++) {
        if (__render__[i].includes("print(")) {
            var _value = __render__[i].replace("print", "").substring(1 , __render__[i].length - 6)
            if (_value.split("")[0] == '"') {
                console.log(_value.substring(1, _value.length - 1))
            } else {
                console.log(`'${_value.substring(0, _value.length)}' is a Variable.`)
            }
        }
    }

    return {"string_vars" : string_vars, "integer_vars" : integer_vars, "array_vars" : array_vars, "float_vars" : float_vars, "dict_vars" : dict_vars}
}

// Arguments
var argv = process.argv

if (argv[2].toLowerCase() === "-e") {
    if (argv.length > 3) {
        readFile(argv[3], {encoding : "utf-8"}, (err, fc) => {
            if (err) { console.log(err) }
            else {
                var tokens = Tokenizer(fc.toString().split("\r\n"))
                console.log(tokens)    
            }
        })
    }
}
