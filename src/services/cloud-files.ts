import { storage } from "firebase";
import { firebaseService } from "./_firebase";
import { Subject } from "rxjs/Subject";
import { SongMetadata, UploadSnapshot } from "../types";

/*******************
 *      TYPES      *
 *******************/

export type FileUploadUpdate = {
  done: boolean;
  progress?: number;
  error?: Error;
};

/*******************
 *     SERVICE     *
 *******************/

class CloudFilesService {
  storage: storage.Storage;
  fileUploadTask$: Subject<FileUploadUpdate>;

  constructor() {
    this.storage = firebaseService.storage();
    this.fileUploadTask$ = new Subject();

    this.handleFileUploadUpdate = this.handleFileUploadUpdate.bind(this);
    this.handleFileUploadError = this.handleFileUploadError.bind(this);
    this.handleFileUploadComplete = this.handleFileUploadComplete.bind(this);
  }

  /*******************
   *  UPLOAD TASKS   *
   *******************/

  /**
   * Upload a file to cloud storage.
   *
   * @param file File to upload.
   * @param metadata Custom metadata to upload.
   */
  uploadFile(file: File, metadata: SongMetadata) {
    const refName = Date.now() + "-" + file.name;

    const task = this.storage
      .ref("files")
      .child(refName)
      .put(file, { customMetadata: metadata as any });

    task.on(
      "state_changed",
      this.handleFileUploadUpdate,
      this.handleFileUploadError,
      this.handleFileUploadComplete
    );
  }

  /**
   * Whenever the file upload progress is updated, push that
   * new value to the `fileUploadTask$` Subject stream.
   *
   * @param snapshot Updated upload task snapshot.
   */
  handleFileUploadUpdate(snapshot: UploadSnapshot): void {
    var progress = Math.floor(
      snapshot.bytesTransferred / snapshot.totalBytes * 100
    );

    this.fileUploadTask$.next({
      done: false,
      error: undefined,
      progress
    });
  }

  /**
   * On error while uploading, push that notification to the
   * `fileUploadTask$` Subject stream.
   *
   * @param error Error ocurred.
   */
  handleFileUploadError(error: Error): void {
    this.fileUploadTask$.next({
      done: false,
      error: error,
      progress: undefined
    });
  }

  /**
   * On file upload completed, push that notification to
   * the `fileUploadTask$` Subject stream.
   */
  handleFileUploadComplete(): void {
    this.fileUploadTask$.next({
      done: true,
      error: undefined,
      progress: 100
    });
  }

  /*******************
   * DOWNLOAD TASKS  *
   *******************/

  /**
   * Fetch an audio file and return it as an ArrayBuffer.
   *
   * @param url Url to request the file.
   */
  async fetchFile(url: string): Promise<ArrayBuffer> {
    const metadataResponse = await fetch(url);
    const metadata = await metadataResponse.json();
    const mediaUrl = metadata.mediaLink;
    const mediaResponse = await fetch(mediaUrl);
    const arrayBuffer = await mediaResponse.arrayBuffer();

    return arrayBuffer;
  }
}

// Export it as a singleton.
export const cloudFilesService = new CloudFilesService();
