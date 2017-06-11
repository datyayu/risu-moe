import { store } from "../../store";
import { storage } from "firebase";
import { usersService, cloudFilesService } from "../../services";
import * as actions from "./actions";

export function init() {
  var audioElement = document.createElement("AUDIO") as HTMLAudioElement;

  function closeOverlay() {
    uploading = false;

    const action = actions.hideOverlay();
    store.dispatch(action);
  }

  document.body.addEventListener("dragover", function(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.dataTransfer.dropEffect = "copy";

    const action = actions.showOverlay();
    store.dispatch(action);
  });

  document.body.addEventListener("dragleave", function(evt: DragEvent) {
    closeOverlay();
  });

  let uploading = false;
  document.body.addEventListener("drop", function(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    // Get required info
    const files = evt.dataTransfer.files;
    const file = files[0];
    const user = usersService.getLocalUser();

    // Make sure the file it's correct and a user exists.
    if (uploading || !user || !file || !file.type.startsWith("audio")) {
      closeOverlay();
      return;
    }

    const filenameMatch = file.name.match(/(.*)\.[^.]+$/);
    if (!filenameMatch) return;

    const filename = filenameMatch[1];

    // Setup to get duration.
    var fileUrl = URL.createObjectURL(file);
    audioElement.src = fileUrl;
    audioElement.addEventListener("canplaythrough", uploadFile, false);

    function uploadFile(uploadEvent: Event) {
      audioElement.removeEventListener("canplaythrough", uploadFile, false);

      if (!user) return;

      const metadata = {
        id: undefined,
        name: filename,
        duration: (uploadEvent.currentTarget as HTMLAudioElement).duration.toString(),
        userId: user.id,
        userName: user.name
      };
      const uploadTask = cloudFilesService.uploadFile(file, metadata);

      uploading = true;
      uploadTask.on("state_changed", handleUpdate, closeOverlay, closeOverlay);

      function handleUpdate(snapshot: storage.UploadTaskSnapshot) {
        var progress = Math.floor(
          snapshot.bytesTransferred / snapshot.totalBytes * 100
        );

        const action = actions.updateProgress(progress);
        store.dispatch(action);
      }
    }
  });
}
