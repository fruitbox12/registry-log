const ram = require("random-access-memory");
const assert = require("assert");
const { registryLog } = require("../lib/index");

module.exports = [
    (async () => {

        const feed = registryLog(filename => {
            return ram(Buffer.from(filename, "utf8"));
        });

        feed.ready(() => {
            const created = Date.now();
            const updated = created + (24 * 60 * 60);
            feed.append({
                key: Buffer.from("the public key"),
                sig: Buffer.from("fake sig"),
                created,
                updated,
                name: "google",
                content: "http://www.google.com"
            }, (err) => {
                if (err) return console.log(err);
                feed.get(0, (err, entry) => {
                    if (err) return console.log(err);
                    assert.deepEqual(entry.key, Buffer.from("the public key"));
                    assert.deepEqual(entry.sig, Buffer.from("fake sig"));
                    assert.equal(entry.created, created);
                    assert.equal(entry.updated, updated);
                    assert.equal(entry.name, "google");
                    assert.equal(entry.content, "http://www.google.com");
                });
            });
        });

    })()
];