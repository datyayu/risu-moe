const functions = require("firebase-functions");
const admin = require("firebase-admin");

const deleteSong = require("./delete-song");
const handleNewMessage = require("./new-message");

admin.initializeApp(functions.config().firebase);

exports.deleteSong = deleteSong;
exports.handleNewMessage = handleNewMessage;
