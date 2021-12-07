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


## License
- [Mozilla Public License Version 2.0](https://www.mozilla.org/en-US/MPL/2.0/)



### We ❤️ Open Source.
