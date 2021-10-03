import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';


import './Tab3.css';

const Tab3 = () => {
  //NOTES:
  // If data < 0 getting rid of datapoint or not plotting it
  // "Location" - use gps, pinpoint on map - failed
  // Delete Tab3 or use for parameter definitions

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
