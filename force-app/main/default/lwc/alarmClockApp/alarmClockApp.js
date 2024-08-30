import { LightningElement } from 'lwc';
import alarm_clock_assets from '@salesforce/resourceUrl/alarm_clock_assets';

export default class AlarmClockApp extends LightningElement {

    currentTime='';
    clockImage = alarm_clock_assets+'/AlarmClockAssets/clock.png';
    ringtone =new Audio(alarm_clock_assets+'/AlarmClockAssets/Clocksound.mp3');
    hour = []
    min = []
    meridian =[]
    hourSelected=''
    minuteSeleceted=''
    meridianSelected=''
    alarmTime=''
    isalarmSet=false
    isAlarmTriggered=false

    get isFieldNotSelected(){
        return !(this.hourSelected && this.minuteSeleceted && this.meridianSelected);
    
    }
    get shakeImage(){
        return this.isAlarmTriggered ? 'shake' : ''
    }

    connectedCallback() {
        this.currentTimeHandler();
        this.createHourOptions();
        this.createMinOptions();
        this.createMeridianOptions();
    }

    currentTimeHandler(){
        setInterval(()=>{
            let dateTime = new Date();
            let hours = dateTime.getHours();
            let minutes = dateTime.getMinutes();
            let seconds = dateTime.getSeconds();
           
            let ampm = "AM";
    
            if(hours == 0){
                 hours = 12;
                 ampm="AM"
            }
            else if(hours === 12){
                ampm="PM"
            }
    
            else if(hours >=12){
                hours = hours - 12;
                ampm = "PM";
            }
    
            if(hours < 10){
                hours = '0'+hours;
            }
            if(minutes < 10){
                minutes = '0'+minutes;
            }
            if(seconds < 10){
                seconds = '0'+seconds;
            }
    
                this.currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;

                if(this.alarmTime === `${hours}:${minutes} ${ampm}`){
                    console.log("Alarm Triggered !!");
                    this.isAlarmTriggered=true;
                    this.ringtone.play();
                    this.ringtone.loop = true;
                }
    
        },1000);
        }

        createHourOptions(){
            for(let i=1;i<=12;i++){
            let val ='';
            if(i<10){
             i="0"+i;
            }
                this.hour.push(i);
            }
        }
        createMinOptions(){
            for(let i=0;i<=59;i++){
                let val ='';
                if(i<10){
                 i="0"+i;
                }
                this.min.push(i);
            }
        }

    createMeridianOptions(){
        this.meridian.push("AM");
        this.meridian.push("PM");
    }



    optionhandler(Event){
        const {label, value} = Event.detail;
       if(label==="Hour(s)"){
           this.hourSelected = value ;
       }
       else if(label==="Minute(s)"){
           this.minuteSeleceted=value;
       }
       else if(label==="AM/PM"){
           this.meridianSelected=value;
        }
        else{
            console.log("Error: Invalid label");
        }
        


       console.log("this.hourSelected: "+this.hourSelected);
       console.log("this.minuteSeleceted:"+this.minuteSeleceted);
        console.log("this.meridianSelected:"+this.meridianSelected);
    }
    
    setAlarmHandler(){
        this.alarmTime = `${this.hourSelected}:${this.minuteSeleceted} ${this.meridianSelected}`;
        this.isalarmSet=true;
        console.log("alarm set to: "+this.alarmTime );
    }
    clearAlarmHandler(){

        this.isalarmSet = false;
        this.alarmTime='';
        this.isAlarmTriggered = false;
        this.ringtone.pause();
        const elements = this.template.querySelectorAll('c-clock-dropdown')
        Array.from(elements).forEach(elements=>{
            elements.reset("");
        })

    }
    


   
        
    
}
        
