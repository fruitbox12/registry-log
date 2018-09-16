const ram = require("random-access-memory");
const assert = require("assert");
const { registryLog } = require("../lib/index");

module.exports = [
    (async () => {

        const feed = registryLog(filename => {
            return ram(Buffer.from(filename, "utf8"));
        });

        feed.ready(() => {
            const now = Date.now();
            feed.append({
                key: Buffer.from("the public key"),
                sig: Buffer.from("fake sig"),
                time: now,
                name: "google",
                target: "http://www.google.com"
            }, (err) => {
                if (err) return console.log(err);
                feed.get(0, (err, entry) => {
                    if (err) return console.log(err);
                    
                    assert.deepEqual(entry.key, Buffer.from("the public key"));
                    assert.deepEqual(entry.sig, Buffer.from("fake sig"));
                    assert.equal(entry.time, now);
                    assert.equal(entry.name, "google");
                    assert.equal(entry.target, "http://www.google.com");

                });
            });
        });

    })()
];