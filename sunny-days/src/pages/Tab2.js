import { IonContent, IonIcon, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { useState } from 'react';
import Graph from "../components/graph"
import { Line } from 'react-chartjs-2';

const Tab2 =({data,setData, status, parameter}) => {
  const dataString = localStorage.getItem('data');
  if (!dataString) {return (<IonPage></IonPage>)};
  //const data = JSON.parse(dataString);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Graph
          data={data}
          status={status}
          parameter={parameter}
          
        />
        {/* <ExploreContainer name="Tab 2 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
