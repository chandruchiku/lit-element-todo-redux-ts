export interface MediaPlacement {
    audioFallbackUrl: string;
    audioHostUrl: string;
    screenDataUrl: string;
    screenSharingUrl: string; 
    screenViewingUrl: string;
    signalingUrl: string;
    turnControlUrl: string;
}

export interface Meeting {
    externalMeetingId: string;
    mediaPlacement: MediaPlacement;
    mediaRegion: string;
    meetingId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Metadata {
}

export interface ResponseMetadata {
    requestId: string;
    metadata: Metadata;
}

 export interface MeetingResponse {
    meeting: Meeting;
    responseMetadata: ResponseMetadata;
    contentLength: number;
    httpStatusCode: number;
}