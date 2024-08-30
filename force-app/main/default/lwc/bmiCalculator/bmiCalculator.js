import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {

    height='';
    weight='';
    bmiValue='';
    result='';
  

    inputHandler(event){
        const {name, value} =event.target;
        if(name==='height' && value!=''){
            this.height=value;
        }
        if(name==='weight' && value!=''){
            this.weight=value;
        }
    }
    //this[name] = value

    submitHandler(event){
        event.preventDefault();
        console.log("Height", this.height);
        console.log("Weight", this.weight);
      
       this.calculateBMI();
      
    }

    calculateBMI(){
   
    let height= Number(this.height/100);
        
    let bmi=Number( this.weight)/(height*height);
        console.log("BMI: ", bmi);
        
    this.bmiValue = Number(bmi.toFixed(2));
    console.log("BMI value : ", this.bmiValue);

    if(this.bmiValue<18.5){
        this.result='Underweight';
    }   
    else if(this.bmiValue >=18.5 && this.bmiValue<=24.9){
        this.result='Healthy';
    }else if(this.bmiValue>24.9 && this.bmiValue<=29.9){
        this.result='Overweight';
    }else if(this.bmiValue>29.9){
        this.result='Obese';
    }
    else{
        this.result='Please enter valid height and weight';
    }
    console.log("Result: ", this.result);
}


 recalculate() {
        this.height='';
        this.weight='';
        this.bmiValue='';
        this.result='';
    }


    

}