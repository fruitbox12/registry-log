const { Entry } = require("./lib/pbf/Entry");
// const { registryLog } = require("./lib");
const ram = require("random-access-memory");
const { registryLog } = require("./lib/index");

const feed = registryLog((filename, ...args) => {
    console.log(filename, ...args);
    return ram(Buffer.from(filename, "utf8"));
});

feed.ready(() => {
    feed.append({
        key: Buffer.from("hello, world!"),
        sig: Buffer.from("fake sig"),
        time: Date.now(),
        name: "google",
        target: "http://www.google.com"
    }, (err) => {
        if (err) return console.log(err);
        feed.get(0, (err, entry) => {
            if (err) return console.log(err);
            console.log(entry);
        })
    });
});
