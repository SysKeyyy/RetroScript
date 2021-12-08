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

// Characters
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

// ErrorHandler
function ErrorHandler(type, argv=[]) {
    if (type === "NoValueErr") {
        console.log(`Error : No Value Provided for Variable '${argv[0]}', Variable Type : ${argv[1]}`)
        exit()
    }
}

// Read Variable Value
function ReadVariableValue(dta, name, return_) {
    JSON.parse(dta,
        function(key, value) {
            if (key === name[0]) {
                return_(value)
                // for (let i = 0;i < value;i++) {
                //     JSON.parse(value[i],
                //         function(key, value) {
                //             if (key === name[1]) {
                //                 return_(value)
                //             }
                //         }
                //     )
                // }
            }

            else {
                return_(`No Variable Found!, With name '${name[0]}'`)
            }
        }
    )
}

// Tokenizer
function __main__(code) {
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
                
                if (__render__[i].substring(0, 4) === "str ") {
                    _var = __render__[i].replace(d_types[j], "").split(" = ")
                    if (_var.length < 2) { ErrorHandler("NoValueErr", [_var[0], d_types[j]]) }
                    else if (_var[1] === "") { ErrorHandler("NoValueErr", [_var[0], d_types[j]]) }
                    else { string_vars.push( { "var_name" : _var[0], "var_value" : _var[1] } ) }    
                }
                
                else if (__render__[i].substring(0, 4) === "int ") {
                    _var = __render__[i].replace(d_types[j], "").split(" = ")
                    if (_var.length < 2) { ErrorHandler("NoValueErr", [_var[0], d_types[j]]) }
                    else if (_var[1] === "") { ErrorHandler("NoValueErr", [_var[0], d_types[j]]) }
                    else { integer_vars.push( { "var_name" : _var[0], "var_value" : _var[1] } ) }    
                }
                
                else if (__render__[i].substring(0, 6) === "array ") {
                    _var = __render__[i].replace(d_types[j], "").split(" = ")
                    if (_var.length < 2) { ErrorHandler("NoValueErr", [_var[0], d_types[j]]) }
                    else if (_var[1] === "") { ErrorHandler("NoValueErr", [_var[0], d_types[j]]) }
                    else { array_vars.push( { "var_name" : _var[0], "var_value" : _var[1] } ) }    
                }
                
                else if (__render__[i].substring(0, 5) === "dict ") {
                    _var = __render__[i].replace(d_types[j], "").split(" = ")
                    if (_var.length < 2) { ErrorHandler("NoValueErr", [_var[0], d_types[j]]) }
                    else if (_var[1] === "") { ErrorHandler("NoValueErr", [_var[0], d_types[j]]) }
                    else { dict_vars.push( { "var_name" : _var[0], "var_value" : _var[1] } ) }    
                }
                
                else if (__render__[i].substring(0, 6) === "float ") {
                    _var = __render__[i].replace(d_types[j], "").split(" = ")
                    if (_var.length < 2) { ErrorHandler("NoValueErr", [_var[0], d_types[j]]) }
                    else if (_var[1] === "") { ErrorHandler("NoValueErr", [_var[0], d_types[j]]) }
                    else { float_vars.push( { "var_name" : _var[0], "var_value" : _var[1] } ) }    
                }

            }
        }
    }
    
    // 'print()' statement
    for (let i = 0;i < __render__.length;i++) {
        if (__render__[i].substring(0, 6) === "print(") {
            var _value = __render__[i].replace("print", "").substring(1 , __render__[i].length - 6)
            if (_value.substring(0, 4) === "var(") {
                _value = _value.replace("var", "").substring(1 , _value.length - 4)
                console.log(_value)
                ReadVariableValue(JSON.stringify({"string_vars" : string_vars, "integer_vars" : integer_vars, "array_vars" : array_vars, "float_vars" : float_vars, "dict_vars" : dict_vars}), ["string_vars", _value], (data) => {
                    console.log(data)
                })
            } else {
                if (_value.includes("//")) {
                    console.log(_value.replace("//", "\n"))
                } else {
                    console.log(_value)
                }
            }
        }
    }

    return {"string_vars" : string_vars, "integer_vars" : integer_vars, "array_vars" : array_vars, "float_vars" : float_vars, "dict_vars" : dict_vars}
}



// Arguments
var argv = process.argv

if (argv.length < 3) {
    console.log("No Arguments Provided!, Use --help or -h to get Help.")
}

else if (argv[2].toLowerCase() === "-e") {
    if (argv.length > 3) {
        readFile(argv[3], {encoding : "utf-8"}, (err, fc) => {
            if (err) { console.log(err) }
            else {
                console.log(__main__(fc.toString().split("\r\n")))
            }
        })
    }
}

else if (argv[2].toLowerCase() === "-v" || argv[2].toLowerCase() === "--version") {
    console.log("0.1a0")
}

else {
    console.log(`Invalid Argument '${argv[2]}', Use --help or -h to get Help.`)
}
