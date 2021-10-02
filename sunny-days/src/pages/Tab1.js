import { IonButton, IonContent, IonFab, IonFabButton, IonGrid, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonDatetime, IonSelect, IonSelectOption, IonIcon } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'

import { locateOutline, pinOutline } from 'ionicons/icons';

import './Tab1.css';


const Tab1 = ({data,setData}) => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [startDate, setStartDate] =  useState(null);
  const [endDate, setEndDate] =  useState(null);
  const [temporalRes, setTemporalRes] = useState('daily');
  const [displayFormat, setDisplayFormat] = useState('YYYY MM DD');
	const history = useHistory()
  const [buttonState, setButtonState] =  useState("true");


  let today = new Date();
  let dd = today.getDate();
  if(dd <10){dd= '0'+dd;};

  const todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+dd;

  console.log(todayDate);
  const [maxYear, setMaxYear] = useState(todayDate);

  if(startDate && endDate && latitude && longitude && (startDate < endDate) && buttonState=="true" && (latitude < 90) && (latitude > -90) && (longitude > -180) && (longitude < 180)){
    setButtonState("false");
  }
  if(buttonState=="false" && !(startDate && endDate && latitude && longitude && (startDate < endDate) && (latitude < 90) && (latitude > -90) && (longitude > -180) && (longitude < 180))){
    setButtonState("true");
  }
  console.log("display format = ", displayFormat);
  console.log("Start: ", startDate);
  console.log("End: ", endDate);
  function showPosition() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
            console.log(positionInfo);
            setLongitude(position.coords.longitude);
            setLatitude(position.coords.latitude);
        });
    } else {
        alert("Sorry, geolocation inaccessible.");
    }
}

  const changeDisplay = (e)=> {
    setTemporalRes(e.detail.value)
    if(e.detail.value === "monthly") {
      setDisplayFormat("YYYY");
      setMaxYear("2020");
    } else {
      setDisplayFormat("YYYY MM DD");
      setMaxYear("2021");
    }
    console.log('longitude = ',longitude, 'start :',startDate);

  } 
  

  const fetchJSON= async function(tempRes,lon, lat, start, end,displayFormat,) {
 

    if(displayFormat.length >4) {
      start = start.replace(/-/g,'').slice(0,8);
      end = end.replace(/-/g,'').slice(0,8);
    }
    else{
      start = start.replace(/-/g,'').slice(0,4);
      end = end.replace(/-/g,'').slice(0,4);
    }

    console.log('date before edit: ',start);
    console.log('date after edit ',start);
    let apiUrl = 'https://power.larc.nasa.gov/api/temporal/' + tempRes + '/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=' + lon + '&latitude=' + lat + '&start=' + start + '&end=' + end + '&format=JSON';
    console.log(apiUrl)
    const response = fetch(apiUrl);
    const data = (await response).json();
    const info = await data;
    setData(info);
    
    localStorage.setItem( 'data', JSON.stringify(info));
    let retData = localStorage.getItem('data');
   // let test = JSON.parse(retData);
   // console.log('test data',test);
   history.push('/tab2')


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
              
              <IonSelectOption value="hourly">Hourly</IonSelectOption>
              <IonSelectOption value="daily" >Daily</IonSelectOption>
              <IonSelectOption value="monthly">Monthly & Annual</IonSelectOption>
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
            <IonButton disabled={buttonState} color="primary" onClick={() => fetchJSON(temporalRes,longitude,latitude,startDate,endDate, displayFormat)}>View Results</IonButton>    
          </IonRow>


        {/* <IonButton color="primary" onClick={() => fetchJSON(temporalRes,longitude,latitude,startDate,endDate, displayFormat)}>Press me</IonButton> */}
        {/* <IonButton color="secondary" onClick={() => showPosition()}>Use my location</IonButton> */}

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
