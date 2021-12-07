## Basic Syntax

```js

import "webbrowser, syshost"

<main
    res=(
        <h1>Hello World</h1>
    )
    target = syshost.run("127.0.0.1", 5000, res)
    webbrowser.open(target.url)
/>

if ("__main__" == __name__) : exec(<main/>) 
```

### Function
```js
<name print("Hello World")/>

if ("__main__" == __name__) : exec(<name/>) 
```
### If else Statement
```js
if () : print() 
elif () : print() 
else : print() 
```

## License
- [Mozilla Public License Version 2.0](https://www.mozilla.org/en-US/MPL/2.0/)

### We ❤️ Open Source.
