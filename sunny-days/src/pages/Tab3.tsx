import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  //temporalRes = "daily" or "hourly" or "monthly"
  //latitude = string from -90 to 90 with 4 decimal places
  //longitude = string from -180 to 180 with 4 decimal places
  //startDate = string format: YYYYMMDD
  //endDate = string format: YYYYMMDD
  let apiUrl = 'https://power.larc.nasa.gov/api/temporal/' + temporalRes + '/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=' + longitude + '&latitude=' + latitude + '&start=' + startDate + '&end=' + endDate + '&format=JSON';
  let json = fetch(apiUrl);
  let obj = JSON.parse(json);

  let solarArray = []; //NOTE: units of solar irradiance are kW-hr/m^2/day
  let dateArray = [];
  for val in obj.properties.parameter.ALLSKY_SFC_SW_DWN:
    dateArray.append(val)

  for val in obj.properties.parameter.ALLSKY_SFC_SW_DWN.date:
    solarArray.append(val)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
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