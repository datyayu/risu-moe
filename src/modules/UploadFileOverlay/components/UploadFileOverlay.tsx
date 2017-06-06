import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../store";
import * as Selectors from "../selectors";
import { UploadFileOverlayProgress } from "./UploadFileOverlayProgress";
import { UploadFileOverlayText } from "./UploadFileOverlayText";

interface UploadFileOverlayProps {
  isUploading: boolean;
  isActive: boolean;
  progress: number;
}

const UploadFileOverlayComponent = ({
  isUploading,
  isActive,
  progress
}: UploadFileOverlayProps) =>
  isActive
    ? isUploading
      ? <UploadFileOverlayProgress progress={progress} />
      : <UploadFileOverlayText />
    : <div />;

function mapStateToProps(state: AppState): UploadFileOverlayProps {
  return {
    isUploading: Selectors.isUploading(state),
    isActive: Selectors.isUploadingFileOverlayActive(state),
    progress: Selectors.getCurrentUploadProgress(state)
  };
}

export const UploadFileOverlay: React.ComponentClass<{}> = connect(
  mapStateToProps
)(UploadFileOverlayComponent);
