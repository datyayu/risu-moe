const functions = require("firebase-functions");
const admin = require("firebase-admin");
const gcs = require("@google-cloud/storage")();

module.exports = functions.https.onRequest((req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.json({ status: "error", message: `Missing id` });
  }

  const ref = admin.database().ref("playlist").child(id);

  // Get file ref.
  ref.once("value", function(snapshot) {
    const song = snapshot.val();

    if (!song) {
      return res.json({ status: "error", message: `Id ${id} wasn't found` });
    }

    // Remove the ref at the database.
    ref.remove(function() {
      const bucket = gcs.bucket("risu-moe.appspot.com");
      const file = bucket.file(song.ref);

      // Remove the file at cloud storage.
      file
        .delete()
        .then(result => {
          res.json({ status: "deleted" });
        })
        .catch(error => {
          res.json({ status: "error", message: error.toString() });
        });
    });
  });
});
