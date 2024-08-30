import { LightningElement } from 'lwc';
import {countryCodeList} from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets'

export default class CurrencyConverterApp extends LightningElement {

    currencyImage = currencyConverterAssets +'/currencyConverterAssets/currency.svg'

    countryList = countryCodeList;
    countryFrom = "CAD"
    countryTo = "INR"
    amountValue =''
    totalAmount =''
    error=''

    handleChange(event){
        const{name,value} = event.target
        this[name]=value
        this.totalAmount=''
        this.error=''
    }

    submitHandler(event){
        event.preventDefault()
        this.convert()

    }
    async convert(){
     
    const API_URL =`https://api.exchangerate.host/convert?access_key=af8c3d70cf581d4ae5f0f369670d8984&from=${this.countryFrom}&to=${this.countryTo}&amount=${this.amountValue}`  

    try {
        const data = await fetch(API_URL)
        const jsonData = await data.json()
        this.totalAmount= jsonData.result.toFixed(2)
        console.log(this.totalAmount)
      }
      catch(error){
        console.log(error)
        this.error="An error occurred. Please try again..."
      }

}
}