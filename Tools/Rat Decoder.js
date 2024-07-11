const fs = require("fs");

(() => {
    const filename = process.argv[2];
    const data = fs.readFileSync(filename, "utf8");
    const decoded = convertEscapedHexToChar(data);
    fs.writeFileSync(filename, decoded, "utf8");
})();

function convertEscapedHexToChar(str) {
    return str.replace(/\\x([0-9A-Fa-f]{2})/g, function(_, p1) {
        const char = String.fromCharCode(parseInt(p1, 16));
        if (char === "\n") {
            return "\\n";
        } else if (char === "\r") {
            return "\\r";
        } else if (char === "\t") {
            return "\\t";
        } else if (char === "\\") {
            return "\\\\";
        } else {
            return char;
        }
    });
}
