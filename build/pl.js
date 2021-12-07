// Required Libs
const { readFile } = require("fs")
const tokenizing = require("./tokenizer")

// Arguments
var argv = process.argv

if (argv[2].toLowerCase() === "-e") {
    if (argv.length > 3) {
        readFile(argv[3], {encoding : "utf-8"}, (err, fc) => {
            if (err) { console.log(err) }
            else {
                var tokens = tokenizing(fc.toString())
                console.log(tokens)    
            }
        })
    }
}

// External Reference Links
// https://www.freecodecamp.org/news/the-programming-language-pipeline-91d3f449c919/

// '^".*"$'