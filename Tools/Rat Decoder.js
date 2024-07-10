const fs = require('fs');

(() => {
    const filename = process.argv[2];
    const data = fs.readFileSync(filename, 'utf8');
    const decoded = convertEscapedHexToChar(data);
    fs.writeFileSync(filename, decoded, 'utf8');
})();

function convertEscapedHexToChar(str) {
    return str.replace(/\\x([0-9A-Fa-f]{2})/g, function(_, p1) {
        return String.fromCharCode(parseInt(p1, 16));
    });
}
