import { storage } from "firebase";
import { firebaseService } from "./firebase";

class CloudFilesService {
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

  async fetchFile(url: string): Promise<ArrayBuffer> {
    const metadataResponse = await fetch(url);
    const metadata = await metadataResponse.json();
    const mediaUrl = metadata.mediaLink;
    const mediaResponse = await fetch(mediaUrl);
    const arrayBuffer = await mediaResponse.arrayBuffer();

    return arrayBuffer;
  }
}

export const cloudFilesService = new CloudFilesService();
