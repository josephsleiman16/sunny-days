import { IonContent, IonGrid, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonDatetime, IonSelect, IonSelectOption } from '@ionic/react';
import { SetStateAction, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
const temporalOptions = ['hourly', 'daily', 'monthly'];


const Tab1: React.FC = () => {
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [startDate, setStartDate] =  useState<string>('02 10 2021');
  const [endDate, setEndDate] =  useState<string>('02 10 2021');
  const [temporalRes, setTemporalRes] = useState<string>('daily');
  const [displayFormat, setDisplayFormat] = useState<string>('MM DD YYYY');

  console.log("display format = ", displayFormat);
  const changeDisplay = (e: { detail: { value: SetStateAction<string>; }; })=> {
    setTemporalRes(e.detail.value)
    if(e.detail.value === "monthly") {
      setDisplayFormat("YYYY");
    } else {
      setDisplayFormat("MM DD YYYY");
    }

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
              onIonChange={e=>setLatitude(parseInt(e.detail.value!, 10))}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="fixed">Longitude</IonLabel>
            <IonInput 
              type="number"
              value={longitude}
              onIonChange={e=>setLongitude(parseInt(e.detail.value!, 10))}

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
        

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
