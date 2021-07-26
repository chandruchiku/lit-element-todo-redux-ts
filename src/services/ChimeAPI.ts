/* eslint-disable import/extensions */
import axios, { AxiosResponse } from "axios"
import { AttendeeResponse } from "../models/AttendeeResponse";
import { MeetingResponse } from "../models/MeetingResponse";

axios.defaults.baseURL = 'https://localhost:5001/api';

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const chimeApi = {
    Meeting : {
        createMeeting: (meetingHostId: string, externalMeetingId: string) => requests.get<MeetingResponse>(`/Meeting/meeting?meetingHostId=${meetingHostId}&externalMeetingId=${externalMeetingId}`),
        createAttendee: (externalUserId: string, meetingId: string) => requests.get<AttendeeResponse>(`/Meeting/attendee?externalUserId=${externalUserId}&meetingId=${meetingId}`),
    }
}

export default chimeApi;