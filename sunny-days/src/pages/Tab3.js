import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

import { navigateCircleOutline } from 'ionicons/icons';

import './Tab3.css';

const Tab3 = () => {
  //NOTES:
  //temporalRes = "daily" or "hourly" or "monthly"
  //latitude = string from -90 to 90 with 4 decimal places
  //longitude = string from -180 to 180 with 4 decimal places
  //startDate = string format: YYYYMMDD
  //endDate = string format: YYYYMMDD
  //Maybe if solar radiance < 0 getting rid of datapoint or not plotting it
  //Disable search button unless all fields correctly selected -- valid date selected, valid long/lat
  // "Location" - use location, 

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
        <IonIcon icon={navigateCircleOutline}/>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
