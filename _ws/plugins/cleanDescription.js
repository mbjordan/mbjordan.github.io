function needsTrimmed(string) {
    return string.length > 150;
}

function trimmer(string) {
    return needsTrimmed(string) ? string.substring(0, 150) + '...' : string;
}

function removeNewlines(string) {
    return string.replace(/\n/g, '');
}

module.exports = function cleanDescription(md) {
    return trimmer(removeNewlines(md));
};
