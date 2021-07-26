/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { AudioVideoObserver, ConsoleLogger, DefaultDeviceController, DefaultMeetingSession, LogLevel, MeetingSessionConfiguration } from "amazon-chime-sdk-js";
import { AttendeeResponse } from "../models/AttendeeResponse";
import { MeetingResponse } from "../models/MeetingResponse";
import chimeApi from "./ChimeAPI";

export class ChimeService {
    logger = new ConsoleLogger('MyLogger', LogLevel.INFO);

    deviceController = new DefaultDeviceController(this.logger);

    configuration: MeetingSessionConfiguration | undefined | null;

    meetingSession: DefaultMeetingSession | null;

    /**
     *
     */
    constructor(meetingResponse: unknown, attendeeResponse: unknown) {
        this.configuration = new MeetingSessionConfiguration(meetingResponse, attendeeResponse);

        this.meetingSession = new DefaultMeetingSession(
            this.configuration,
            this.logger,
            this.deviceController
        );
    }

    static async createMeeting(meetingHostId: string, externalMeetingId: string) {
        console.log("Initializing the meeting session");
        const response = await chimeApi.Meeting.createMeeting(meetingHostId, externalMeetingId);

        return response;
    }

    static async createAttendee(externalUserId: string, meetingId: string) {
        console.log("Initializing the meeting session");
        const response = await chimeApi.Meeting.createAttendee(externalUserId, meetingId);

        return response;
    }


    async startMeeting(meetingResponse: MeetingResponse, attendeeResponse: AttendeeResponse) {

        try {
            console.log(meetingResponse);
            this.configuration = new MeetingSessionConfiguration(meetingResponse, attendeeResponse);

            // this.videoElement = videoElement;
            this.meetingSession = new DefaultMeetingSession(
                this.configuration,
                this.logger,
                this.deviceController
            );


            const videoInputDevices = await this.meetingSession.audioVideo.listVideoInputDevices();
            try {
                await this.meetingSession.audioVideo.chooseVideoInputDevice(videoInputDevices[0].deviceId);
            }
            catch (err) {
                this.logger.error(err);
            }

            const audioInputDevices = await this.meetingSession.audioVideo.listAudioInputDevices();
            const audioOutputDevices = await this.meetingSession.audioVideo.listAudioOutputDevices();

            // An array of MediaDeviceInfo objects
            audioInputDevices.forEach(mediaDeviceInfo => {
                console.log(`Device ID: ${mediaDeviceInfo.deviceId} Label: ${mediaDeviceInfo.label}`);
            });

            try {

                await this.meetingSession.audioVideo.chooseAudioInputDevice(audioInputDevices[0].deviceId);

                await this.meetingSession.audioVideo.chooseAudioOutputDevice(audioOutputDevices[0].deviceId);
            }
            catch (err) {
                this.logger.error(err);
            }
        }
        catch (err) {
            this.logger.error(err);
        }
    }

    addObserver(observer: AudioVideoObserver, audioElement: { nativeElement: HTMLAudioElement }) {
        this.meetingSession!.audioVideo.addObserver(observer);
        this.meetingSession!.audioVideo.bindAudioElement(audioElement.nativeElement);
    }

    removeObserver(observer: AudioVideoObserver) {
        this.meetingSession!.audioVideo.removeObserver(observer);

        this.configuration = null;
        this.meetingSession = null;
    }

    async startLocalTile() {
        // await this.meetingSession!.audioVideo.chooseVideoInputDevice(await this.selectedVideoInputBroadcast.getValue());
        this.meetingSession!.audioVideo.startLocalVideoTile();
    }

    startAudioVideo() {
        try {
            this.meetingSession!.audioVideo.startLocalVideoTile();
            this.meetingSession!.audioVideo.start();
        }
        catch (error) {
            this.logger.error(error);
        }
    }

    stopAudioVideo() {
        try {
            this.meetingSession!.audioVideo.stopLocalVideoTile();
            this.meetingSession!.audioVideo.removeLocalVideoTile();
            this.meetingSession!.audioVideo.stop();

        }
        catch (error) {
            this.logger.error(error);
        }
    }

}