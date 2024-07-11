const { WebhookClient } = require("discord.js");
const fs = require("node:fs");

let WebhookStatus = [];

(async () => {
    const WebHooks = JSON.parse(fs.readFileSync("Webhook.json", "utf-8"));
    for (const Link of WebHooks.Links) {
        WebhookStatus.push({
            Client: new WebhookClient({ url: Link }),
            Success: 0,
            Failed: 0
        });
    }

    new WebhookClient({ url: WebHooks.ReportLink }).send({
        username: "Rat Killer",
        content: "",
        embeds: [{
            title: "Rat Killer",
            color: 16711680,
            description: "Rat Killerが起動しました。"
        }]
    });
    
    while (true) {
        if (WebhookStatus.length === 0) {
            const dateStr = generateDateStr();
            console.log(`${dateStr} 記載されていたすべてのWebhookの消滅を確認しました。`);
            fs.appendFileSync("Kill.log", `${dateStr} 記載されていたすべてのWebhookの消滅を確認しました。\n`);
            new WebhookClient({ url: WebHooks.ReportLink }).send({
                username: "Rat Killer",
                content: "",
                embeds: [{
                    title: "Webhook全滅報告",
                    color: 16711680,
                    description: "記載されていたすべてのWebhookが消滅しました。"
                }]
            });
            break;
        }

        for (const webhook of WebhookStatus) {
            const message = messageBuilder();
            await webhook.Client.send({
                username: message.Username + " F4CKED N1GGA",
                content: "",
                embeds: [{
                    title: "NEW R4T TROLOLOLO",
                    color: 45088,
                    description: `**T0ken**: \`\`\`${message.SSID}\`\`\`\n**U0id**: \`\`\`${message.UUID}\`\`\`\n**N4me**: \`\`\`${message.Username}\`\`\`\n**N3tw0rth**:[Profile Tracker](https://youareanidiot.cc/)`,
                    fields: []
                }]
            }).then(() => {
                webhook.Success++;
            }).catch((error) => {
                if (error.message === "Unknown Webhook") {
                    webhook.Failed++;
                    if (webhook.Failed >= 5) {
                        const dateStr = generateDateStr();;
                        const logStr = `${dateStr} 無効化を確認しました。(リンク: ${webhook.Client.url} 送った回数: ${webhook.Success}回)\n`;
                        fs.appendFileSync("Kill.log", logStr);
                        console.log(logStr);
                        new WebhookClient({ url: WebHooks.ReportLink }).send({
                            username: "Rat Killer",
                            content: "",
                            embeds: [{
                                title: "Webhook無効化報告",
                                color: 16711680,
                                description: `無効化されたWebhookを検知しました。\n**リンク**: \`\`\`${webhook.Client.url}\`\`\`\n**送信回数**: \`\`\`${webhook.Success}回\`\`\`\n**無効化回数**: \`\`\`${webhook.Failed}回\`\`\``
                            }]
                        });
                        WebHooks.Links = WebHooks.Links.filter((x) => x !== webhook.Client.url);
                        fs.writeFileSync("Webhook.json", JSON.stringify(WebHooks, null, 4));
                        webhook.Client.destroy();
                        WebhookStatus = WebhookStatus.filter((x) => x.Client.url !== webhook.Client.url);
                    }
                }
            });
        }
    }
})();

function generateDateStr() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `[${year}/${month}/${day} ${hours}:${minutes}:${seconds}]`;
}

function messageBuilder() {
    return {
        Username: fakeUsername(),
        UUID: getUUID(),
        SSID: fakeSessionID()
    };
}

function fakeUsername() {
    const text = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 6; i++) {
        result += text.charAt(Math.floor(Math.random() * text.length));
    }
    return result;
}

function getUUID() {
    const text = "abcdef0123456789";
    let result = "";
    for (let i = 0; i < 32; i++) {
        result += text.charAt(Math.floor(Math.random() * text.length));
    }
    return result;
}

function fakeSessionID() {
    const SSID = "ey3hbGc101JIUzI1NiJ9.eyJ4dWlkIjoiMjUzNTQeNTMBNjU4MTcwMyIsImFnZyI6IkFkdwx@liwic3ViljoiZGZiZWVjVTktYjVwMyB0YmZmLWE3NzItYjQ10TMxYz1k0D131iwibmJmIjoxNjQ3NzU4NjIzLCJhdXRoIjoiWEJPWCIsInJvbGVzIjpbXSwiaXNzIjoiYXVBaGVudGljYXRpb24iLCJleHAiOjE2NDc4NDUwMjMsIm1hdC16MTYBNzc100YyMywicGxhdGZvcm@i0iJVTktOT1d0IiwieXVpZCI6ImN1OTE1MDAYYwVhYWMxMjhiYjliZWZkN2FmYzI4MRkIne. 980G1qhNVpPNpqkRpPSTOH2kaDoVxIRSLU3VZAJEDOR";
    let text = "";
    for (let i = 0; i < 397; i++) {
        text += SSIDcharAt(Math.floor(Math.random() * SSID.length));
    }
    return text;
}

