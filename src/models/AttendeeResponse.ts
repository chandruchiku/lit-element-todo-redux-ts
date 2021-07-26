interface Metadata {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
}

interface ResponseMetadata {
    requestId: string;
    metadata: Metadata;
}

export interface Attendee {
    attendeeId: string;
    externalUserId: string;
    joinToken: string;
}

export interface AttendeeResponse {
    responseMetadata: ResponseMetadata;
    contentLength: number;
    httpStatusCode: number;
    attendee: Attendee;
}