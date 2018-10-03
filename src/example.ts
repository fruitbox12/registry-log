import { registryLog } from "./index";
const ram = require("random-access-memory");

const feed = registryLog((filename: string) => ram(filename));

feed.ready(() => {
    feed.append({
        key: Buffer.from("the public key"),
        sig: Buffer.from("fake sig"),
        created: Date.now(),
        name: "google",
        target: "http://www.google.com"
    }, (err) => {
        if (err) return console.log(err);
        feed.get(0, (err, entry) => {
            if (err) return console.log(err);
            console.log(entry);
        });
    });
});
