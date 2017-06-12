const functions = require("firebase-functions");
const admin = require("firebase-admin");

/**
 * Removes a file from cloud storage.
 *
 * @param {String} refName Path to the file.
 */
function removeSongFile(refName) {
  admin.storage().child(refName).delete();
}

/**
 * Whenever a file is uploaded, add an entry
 * to the playlist in database for that uploaded
 * file.
 */
module.exports = functions.storage.object().onChange(function(event) {
  const song = event.data;

  // Exit if this is a move or deletion event.
  if (song.resourceState === "not_exists") {
    return;
  }

  // Create entry with custom metadata
  const metadata = song.metadata;
  const userHash = metadata.userId.slice(-5, metadata.userId.length);
  const entry = admin.database().ref("/playlist").push();

  entry.set({
    id: entry.key,
    ref: song.name,
    name: metadata.name,
    duration: metadata.duration.toString(),
    user: `${metadata.userName}#${userHash}`,
    url: song.selfLink
  });
});
