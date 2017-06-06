import { storage } from "firebase";
import { firebaseService } from "./firebase";

class FileUploadService {
  storage: storage.Storage;

  constructor() {
    this.storage = firebaseService.storage();
  }

  uploadFile(file: File, metadata: any): storage.UploadTask {
    const refName = Date.now() + "-" + file.name;

    return this.storage
      .ref("files")
      .child(refName)
      .put(file, { customMetadata: metadata });
  }
}

export const fileUploadService = new FileUploadService();
