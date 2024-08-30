public with sharing class WeatherCheck {
   

    @AuraEnabled
    public static string getWeatherDetails( String input){
        try {
            String url = 'https://api.openweathermap.org/data/2.5/weather?q=' + input + '&units=metric&appid='+getKey();
            String response = getResponse(url);
            return response;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static String getResponse(String strUrl){
        Http h = new Http();
        HttpRequest req =new HttpRequest();
        HttpResponse res = new HttpResponse();
        req.setMethod('GET');
        req.setEndpoint(strUrl);
        req.setTimeout(120000);
        res = h.send(req);
        String responseBody = res.getBody();
        return responseBody;
    }

    public static String getKey(){
        String key = System.Label.Weather_App_key ; //'cea520f68b18c97b5837ea2397f7e36c'
       
        return key;
       }
}