let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

let generateLocationMessage = (from, latidute, longtuide) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latidute},${longtuide}`,
        createdAt: new Date().getTime()
    };
};

module.exports = { generateMessage, generateLocationMessage };