import { IonButton, IonContent, IonRow, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonDatetime, IonSelect, IonSelectOption, IonIcon } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'

import { locateOutline, pinOutline } from 'ionicons/icons';

import './Tab1.css';


const Tab1 = ({data,setData, status, setStatus,parameter, setParameter}) => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [startDate, setStartDate] =  useState(null);
  const [endDate, setEndDate] =  useState(null);
  const [temporalRes, setTemporalRes] = useState('daily');
  const [displayFormat, setDisplayFormat] = useState('YYYY MM DD');
	const history = useHistory()
  const [buttonState, setButtonState] =  useState("true");
  const [hourlyDisable, setHourlyDisable] = useState(false);
  const [clearSkyDisable, setClearSkyDisable] = useState(false);
  let today = new Date();
  let dd = today.getDate();
  if(dd <10){dd= '0'+dd;};

  const todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+dd;

  const [maxYear, setMaxYear] = useState(todayDate);

  //Error Logic
  if(startDate && endDate && parameter.length > 0 && latitude && longitude && (startDate < endDate) && buttonState==="true" && (latitude < 90) && (latitude > -90) && (longitude > -180) && (longitude < 180)){
    setButtonState("false");
  }
  if(buttonState==="false" && !(startDate && endDate && parameter.length > 0 && latitude && longitude && (startDate < endDate) && (latitude < 90) && (latitude > -90) && (longitude > -180) && (longitude < 180))){
    setButtonState("true");
  }
 
  function showPosition() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var positionInfo = "Your current position is (Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude + ")";
            console.log(positionInfo);
            setLongitude(position.coords.longitude);
            setLatitude(position.coords.latitude);
        });
    } else {
        alert("Sorry, GPS inaccessible. Enable geolocation via settings.");
    }
}

  const changeDisplay = (e)=> {
    setTemporalRes(e.detail.value)
    if(e.detail.value === "monthly" || e.detail.value ==="annually") {
      setDisplayFormat("YYYY");
      setMaxYear("2020");
      if (endDate && endDate.includes("2021")) {setEndDate("2020");};
    } else {
      setDisplayFormat("YYYY MM DD");
      setMaxYear("2021");
    }
    setStatus(e.detail.value);

    if(e.detail.value==="hourly"){
      setClearSkyDisable(true);
    }
    else{
      setClearSkyDisable(false);
    }

  } 


  const fetchJSON= async function(tempRes,lon, lat, start, end,displayFormat,status, parameter) {
 
    if(displayFormat.length >4) {
      start = start.replace(/-/g,'').slice(0,8);
      end = end.replace(/-/g,'').slice(0,8);
    }
    else{
      start = start.replace(/-/g,'').slice(0,4);
      end = end.replace(/-/g,'').slice(0,4);
    }

    let res;
    if (status==="weekly"){res="daily";}
    else if (status==="annually"){res = "monthly";}
    else{res=tempRes;};

    /*
      give an array
      unless its empty
      join them per element with a comma
    */
    let combineParameter = parameter.join();

    let apiUrl = 'https://power.larc.nasa.gov/api/temporal/' + res + '/point?parameters='+ combineParameter +'&community=RE&longitude=' + lon + '&latitude=' + lat + '&start=' + start + '&end=' + end + '&format=JSON';

    
    console.log(apiUrl)
    const response = fetch(apiUrl);
    const data = (await response).json();
    const info = await data;
    setData(info);
    
    localStorage.setItem( 'data', JSON.stringify(info));
  
   history.push('/tab2') //whats this do again?

  }

  const checkClearSky= (e) =>{
    console.log("parameter selection : ", e.detail.value);
    setParameter(e.detail.value);
    if(e.detail.value==="CLRSKY_DAYS"){setHourlyDisable(true)}
    else{
      setHourlyDisable(false);
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sunny Days</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonList>

          <IonItem>
            <IonLabel>Select Temporal Resolution</IonLabel>
            <IonSelect value={temporalRes} okText="Okay" cancelText="Dismiss" 
            onIonChange={e => changeDisplay(e)}>
              
              <IonSelectOption value="hourly" disabled={hourlyDisable} >Hourly</IonSelectOption>
              <IonSelectOption value="daily" >Daily</IonSelectOption>
              <IonSelectOption value="weekly" >Weekly</IonSelectOption>
              <IonSelectOption value="monthly">Monthly</IonSelectOption>
              <IonSelectOption value="annually">Annually</IonSelectOption>

            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Select Parameter</IonLabel>
            <IonSelect value={parameter} multiple={true} okText="Okay" cancelText="Dismiss" 
            onIonChange={e => checkClearSky(e)}>
              
             
              <IonSelectOption value="ALLSKY_SFC_SW_DWN">Solar Radiance</IonSelectOption>
              <IonSelectOption value="TS" >Surface Temperature</IonSelectOption> 

              <IonSelectOption value="CLOUD_AMT_DAY">Cloud Amount (Day Time)</IonSelectOption> 
              <IonSelectOption value="CLRSKY_DAYS" disabled={clearSkyDisable}>Clear Days</IonSelectOption> 

              <IonSelectOption value="WS2M">Wind Speed (Surface)</IonSelectOption> 
              <IonSelectOption value="WS50M">Wind Speed (50 metres)</IonSelectOption> 

              <IonSelectOption value="PRECTOTCORR">Precipitation (Rain)</IonSelectOption> 
              <IonSelectOption value="PRECSNOLAND">Precipitation (Snow on Land)</IonSelectOption> 
              <IonSelectOption value="RH2M">Humidity</IonSelectOption>

            
            </IonSelect>
          </IonItem>


          <IonItem>
            <IonLabel position="fixed">Latitude</IonLabel>
            <IonInput 
              type="number" 
              placeholder= "Value between -90 and 90"
              value = {latitude}
              onIonChange={e=>setLatitude(parseFloat(e.detail.value))}
            ></IonInput>

            <IonButton color="danger">
              <IonIcon icon={pinOutline} />
            </IonButton>

            <IonButton color="secondary" onClick={() => showPosition()}>
              <IonIcon icon={locateOutline} />
            </IonButton>
          </IonItem>

          <IonItem>
            <IonLabel position="fixed">Longitude</IonLabel>
            <IonInput 
              type="number"
              placeholder= "Value between -180 and 180"
              value = {longitude}
              onIonChange={e=>setLongitude(parseFloat(e.detail.value))}

            ></IonInput>
          </IonItem>

          <IonItem>
          <IonLabel>Start Date ({displayFormat})</IonLabel>
          <IonDatetime displayFormat={displayFormat} placeholder="Select Date"  min="1981" max={maxYear} value={startDate} onIonChange={e => setStartDate(e.detail.value)}></IonDatetime>
        </IonItem>
        
        <IonItem>
          <IonLabel>End Date ({displayFormat})</IonLabel>
          <IonDatetime displayFormat={displayFormat} placeholder="Select Date" min="1981"max={maxYear} value={endDate} onIonChange={e => setEndDate(e.detail.value)}></IonDatetime>
        </IonItem>
        </IonList>
        

          <IonRow className="ion-justify-content-center">
            <IonButton disabled={buttonState} color="primary" onClick={() => fetchJSON(temporalRes,longitude,latitude,startDate,endDate, displayFormat, status,parameter)}>View Results</IonButton>    
          </IonRow>


      </IonContent>
    </IonPage>
  );
};

export default Tab1;
