import { IonButton , IonContent, IonGrid, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonDatetime, IonSelect, IonSelectOption } from '@ionic/react';
import { SetStateAction, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
const temporalOptions = ['hourly', 'daily', 'monthly'];


const Tab1: React.FC = () => {
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [startDate, setStartDate] =  useState<string>('YYYY MM DD');
  const [endDate, setEndDate] =  useState<string>('YYYY MM DD');
  const [temporalRes, setTemporalRes] = useState<string>('daily');
  const [displayFormat, setDisplayFormat] = useState<string>('YYYY MM DD');

  console.log("display format = ", displayFormat);
  const changeDisplay = (e: { detail: { value: SetStateAction<string>; }; })=> {
    setTemporalRes(e.detail.value)
    if(e.detail.value === "monthly") {
      setDisplayFormat("YYYY");
    } else {
      setDisplayFormat("YYYY MM DD");
    }
    console.log('longitude = ',longitude, 'start :',startDate);

  } 

  const fetchJSON= async function(tempRes: string,lon: number, lat: number, start: string, end: string,displayFormat: string,) {
 

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

    console.log(info)
    console.log(info.type)


  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sunny day input</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonList>

        <IonItem>
            <IonLabel>Select temopral resolution</IonLabel>
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
              value={latitude}
              onIonChange={e=>setLatitude(parseFloat(e.detail.value!))}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="fixed">Longitude</IonLabel>
            <IonInput 
              type="number"
              value={longitude}
              onIonChange={e=>setLongitude(parseFloat(e.detail.value!))}

            ></IonInput>
          </IonItem>

          <IonItem>
          <IonLabel>Start Date ({displayFormat})</IonLabel>
          <IonDatetime displayFormat={displayFormat} placeholder="Select Date" value={startDate} onIonChange={e => setStartDate(e.detail.value!)}></IonDatetime>
        </IonItem>

        
        <IonItem>
          <IonLabel>End Date ({displayFormat})</IonLabel>
          <IonDatetime displayFormat={displayFormat} placeholder="Select Date" value={endDate} onIonChange={e => setEndDate(e.detail.value!)}></IonDatetime>
        </IonItem>
        </IonList>
        
        <IonButton color="primary" onClick={() => fetchJSON(temporalRes,longitude,latitude,startDate,endDate, displayFormat)}>Press me</IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
