import * as React from "react";

/*******************
 *      PROPS      *
 *******************/

interface UploadFileOverlayProgressProps {
  progress: number;
}

/*******************
 *    COMPONENT    *
 *******************/

export const UploadFileOverlayProgress = ({
  progress
}: UploadFileOverlayProgressProps) =>
  <div className="modal-overlay">
    <h2 className="modal-text"> Uploading </h2>
    <h2 className="modal-text"> {progress}% </h2>
  </div>;
