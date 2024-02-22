import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Class } from '../models/Class';
import { Student } from '../models/Student';

declare var JitsiMeetExternalAPI:any;
@Component({
  selector: 'app-jitsi',
  templateUrl: './jitsi.component.html',
  styleUrls: ['./jitsi.component.css']
})
export class JitsiComponent implements OnInit, AfterViewInit {
  domain:string = 'meet.jit.si';
  room:any;
  user:any;
  api:any;
  options:any;

  isAudioMuted=false;
  isVideoMuted=false;

  class:Class;
  student:Student;

  constructor(private router:Router){

  }
  ngAfterViewInit(): void {
    this.options = {
      roomName: this.room,
      width: 900,
      height: 500,
      configOverWrite: {
        proJoinPageEnable: false
      },
      interfaceConfigOverWrite:{
        TIME_VIEW_MAX_COLUMNS:8
      },
      parentNode: document.querySelector('#jist-iframe'),
      userInfo:{
        displayName: this.user.name
      }
    }
    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleAudioMuteStatusChanged,
      videoMuteStatusChanged: this.handleVideoMuteStatusChanged
    })
  }

  handleClose=()=>{
    console.log("handleClose");
  }
  handleParticipantLeft= async (participant:any)=>{
    const data = await this.getParticipants();
  }
  handleParticipantJoined=async (participant:any)=>{
    const data = await this.getParticipants();
  }
  handleVideoConferenceJoined=async (participant:any)=>{
    const data = await this.getParticipants();
  }
  handleVideoConferenceLeft=()=>{
    this.router.navigate(['joinClass']);
  }
  handleAudioMuteStatusChanged=(audio:any)=>{
    console.log('handleAudioMuteStatus', audio);
  }
  handleVideoMuteStatusChanged=(video:any)=>{
    console.log('handleVideoMuteStatus', video);
  }
  getParticipants(){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(this.api.getParticipantsInfo())
      }, 500)
    });
  }

  ngOnInit(): void {
      let c = localStorage.getItem("class");
      if(c==null) return;
      let s = localStorage.getItem("student");
      if(s==null) return;
      this.class = JSON.parse(c);
      this.student = JSON.parse(s);
      if(this.class.groupClass) this.room = 'jitsiMeetingAPIExample'.concat(this.class.codeForGroupClass);
      else this.room = 'jitsiMeetingAPIExample'.concat(this.class.idclass.toString());
      this.user = {
        name: this.student.name + " " + this.student.surname
      }
  }

  executeCommand(command:string){
    this.api.executeCommand(command);
    if(command == 'hangup'){
      this.router.navigate(['joinClass']);
    }
    if(command=='toggleAudio'){
      this.isAudioMuted = !this.isAudioMuted;
    }
    if(command == 'toggleVideo'){
      this.isVideoMuted = !this.isVideoMuted;
    }
    if(command == 'toggleShareScreen'){

    }
  }
}
