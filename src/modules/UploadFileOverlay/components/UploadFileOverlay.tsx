import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../../types";
import * as Selectors from "../selectors";
import { UploadFileOverlayProgress } from "./UploadFileOverlayProgress";
import { UploadFileOverlayText } from "./UploadFileOverlayText";

/*******************
 *      PROPS      *
 *******************/

interface UploadFileOverlayProps {
  isUploading: boolean;
  isActive: boolean;
  progress: number;
}

/*******************
 *    COMPONENT    *
 *******************/

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

/*******************
 *    MAPPINGS     *
 *******************/

function mapStateToProps(state: AppState): UploadFileOverlayProps {
  const isCurrentlyUploading = Selectors.isUploading(state);
  const isOverlayActive = Selectors.isUploadingFileOverlayActive(state);
  const currentProgress = Selectors.getCurrentUploadProgress(state);

  return {
    isUploading: isCurrentlyUploading,
    isActive: isOverlayActive,
    progress: currentProgress
  };
}

/********************
 * CONNECTED EXPORT *
 ********************/

export const UploadFileOverlay: React.ComponentClass<{}> = connect(
  mapStateToProps
)(UploadFileOverlayComponent);
