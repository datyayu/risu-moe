const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


/**
 * Reads the msg inside the given event and
 * updates the vote count based on the command.
 *
 * @param {Object} event Firebase event.
 */
function handleCommands (event) {
    const msg = event.data.val();
    const cmd = msg.text.toLowerCase();

    const baseMsg = {
        type_: 'system',
        text: '',
        time: admin.database.ServerValue.TIMESTAMP,
        user: {
            id: "",
            color: "",
            name: ""
        }
    };


    // Add a vote on !skip command.
    if (cmd === '!skip') {
        admin.database().ref('/votes').once('value')
            .then(function (snapshot) {
                const votes = snapshot.val();
                const voters = Object.keys(votes || []).map(key => votes[key]);

                const userId = msg.user.id;
                const userHasVoted = voters.some(voter => voter === userId);

                if (userHasVoted) return;

                event.data.ref.parent.parent.child('votes')
                    .push(msg.user.id)
                    .then(function() {
                        const userName = msg.user.name;
                        const userHash = userId.slice(-5, userId.length);

                        const systemMsg = Object.assign({}, baseMsg, {
                            text: `${userName}#${userHash} voted to skip the current song. (${voters.length + 1}/3)`
                        });

                        event.data.ref.parent.push(systemMsg);
                    });
            });
    }

    // Reset vote count on !reset command
    if (cmd === '!reset') {
        event.data.ref.parent.parent.child('votes').set(false)
            .then(function() {
                const systemMsg = Object.assign({}, baseMsg, {
                    text: `Votes were reset`
                });

                event.data.ref.parent.push(systemMsg);
            });
    }
}


/**
 * Removes a file from cloud storage.
 *
 * @param {String} refName Path to the file.
 */
function removeSongFile (refName) {
    admin.storage().child(refName).delete();
}


exports.onNewMessage = functions.database.ref('/messages/{msgId}')
    .onWrite(function(event) {
        const msg = event.data.val();

        if (!event.data.exists()) {
            const oldMsg = event.data.previous.val();
            removeSongFile(oldMsg.ref);
        }

        if (msg.updated) return;

        // Update message time
        const updatedMsg = Object.assign({}, msg, {
            time: admin.database.ServerValue.TIMESTAMP,
            updated: true
        });

        // Post update
        admin.database().ref(`/messages/${event.params.msgId}`).set(updatedMsg)
            .then(_ => {
                if (msg.type_ !== 'command') return;

                handleCommands(event);
            });
    });


exports.updatePlaylistOnNewSong = functions.storage.object()
    .onChange(function (event) {
        const song = event.data;

        // Exit if this is a move or deletion event.
        if (song.resourceState === 'not_exists') {
            return;
        }

        // Create entry with custom metadata
        const metadata = song.metadata;
        const userHash = metadata.userId.slice(-5, metadata.userId.length);
        const entry = admin.database().ref('/playlist').push();

        entry.set({
            id: entry.key,
            ref: song.name,
            name: metadata.name,
            duration: metadata.duration.toString(),
            user: `${metadata.userName}#${userHash}`,
            url: song.selfLink
        });
    });
