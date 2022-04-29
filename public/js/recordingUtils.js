import { download } from "express/lib/response";

let mediaRecorder;

const vp9Codec = "video/webm; codecs=vp=9";
const vp9Options = { mimeType: vp9Codec };
const recordedChucks = [];

export const startRecording = () => {
  const remoteStream = store.getState().remoteStream;
  if (MediaRecorder.isTypeSupported(vp9Codec)) {
    mediaRecorder = new MediaRecorder(remoteStream, vp9Options);
  } else {
    mediaRecorder = new MediaRecorder(remoteStream);
  }

  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
};

export const pauseRecording = () => {
    mediaRecorder.pause();
}

export const resumeRecording = () => {
    mediaRecorder.resume();
}

export const stopRecording = () => {
    mediaRecorder.stop();
}

const downloadRecordedVideo = () => {
    
}

const handleDataAvailable = (event) => {
  if (event.data.size > 0) {
    recordedChucks.push(event.data);
    downloadRecordedVideo();
  }
};