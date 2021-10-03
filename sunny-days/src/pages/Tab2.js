import { IonContent, IonHeader, IonLabel, IonPage, IonTitle, IonToolbar, IonRow } from '@ionic/react';
import './Tab2.css';
import { useState } from 'react';
import Graph from "../components/graph"

const Tab2 =({data,setData, status, parameter}) => {
  const dataString = localStorage.getItem('data');
  if (!dataString) {return (<IonPage></IonPage>)};
  //const data = JSON.parse(dataString);

  /*
  given am array of n parameters = []
  build n graphs 

  */
 console.log("list of parameters: ",parameter);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Results</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <div className="multiple-graphs">
        {parameter.map((singleParameter) =>{
          return (
            <><Graph
              data={data}
              status={status}
              parameter={singleParameter} />
              <p></p>
              </>
          )
        })
        }
        </div>

        {/* <Graph
          data={data}
          status={status}
          parameter={parameter}
          
        /> */}
        {/* <ExploreContainer name="Tab 2 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
