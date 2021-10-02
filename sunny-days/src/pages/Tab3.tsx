import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  //temporalRes = "daily" or "hourly" or "monthly"
  //latitude = string from -90 to 90 with 4 decimal places
  //longitude = string from -180 to 180 with 4 decimal places
  //startDate = string format: YYYYMMDD
  //endDate = string format: YYYYMMDD
  let latitude;
  let longitude;

  // let solarArray = []; //NOTE: units of solar irradiance are kW-hr/m^2/day
  // let dateArray = [];
  // for val in obj.properties.parameter.ALLSKY_SFC_SW_DWN:
  //   dateArray.append(val)

  // for val in obj.properties.parameter.ALLSKY_SFC_SW_DWN.date:
  //   solarArray.append(val)

  // let locStatus; 
  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition();
  //   } else { 
  //     locStatus = "Geolocation is not supported.";
  //   }
  // }
  // function failedPosition(){
  //   console.error("Position Error")
  // }
  // function showPosition(position: { coords: { latitude: string; longitude: string; }; }) {
  //   latitude = position.coords.latitude;
  //   longitude = position.coords.longitude;
  //   locStatus = "Latitude: " + position.coords.latitude + 
  //   "<br>Longitude: " + position.coords.longitude;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>locStatus</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 3 page" />

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
