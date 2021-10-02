import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3 = () => {
  //temporalRes = "daily" or "hourly" or "monthly"
  //latitude = string from -90 to 90 with 4 decimal places
  //longitude = string from -180 to 180 with 4 decimal places
  //startDate = string format: YYYYMMDD
  //endDate = string format: YYYYMMDD

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
