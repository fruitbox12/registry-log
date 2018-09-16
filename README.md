# registry-log
The registry log is a secure distributed append-only log for domains.

```
npm install @netrunner/registry-log
```

registry-log requires the [hypercore](https://www.npmjs.com/package/hypercore) library and changes
the encoding/decoding methods. The API is exactly the same as the hypercore API.

```typescript
const { registryLog } = require("@netrunner/registry-log");
const ram = require("random-access-memory");

const feed = registryLog(filename => {
    return ram(Buffer.from(filename, "utf8"));
});

feed.ready(() => {
    feed.append({
        key: Buffer.from("the public key"),
        sig: Buffer.from("fake sig"),
        time: Date.now(),
        name: "google",
        target: "http://www.google.com"
    }, (err) => {
        if (err) return console.log(err);
        feed.get(0, (err, entry) => {
            if (err) return console.log(err);
            console.log(entry);
            // => {key: ..., sig: ..., time: ..., name: ..., target: ...}
        });
    });
});
```
