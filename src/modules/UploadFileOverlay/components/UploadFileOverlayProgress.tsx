import * as React from "react";

interface UploadFileOverlayProgressProps {
  progress: number;
}

export const UploadFileOverlayProgress = ({
  progress
}: UploadFileOverlayProgressProps) =>
  <div className="modal-overlay">
    <h2 className="modal-text"> Uploading </h2>
    <h2 className="modal-text"> {progress}% </h2>
  </div>;
