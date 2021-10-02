import { IonContent, IonIcon, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { useState } from 'react';

import { Line } from 'react-chartjs-2';

const Tab2  = () => {
  const dataString = localStorage.getItem('data');
  if (!dataString) {return (<IonPage></IonPage>)};
  const data = JSON.parse(dataString);
  const timeLineData = data?.properties?.parameter?.ALLSKY_SFC_SW_DWN;

  const labels = Object.keys(timeLineData);

  const years = labels.map(x => x.substring(0,4));
  const months = labels.map(x => parseInt(x.substring(5,6)));

  var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

  const theseMonths = months.map(x => monthNames[x]);

  let theLabels = theseMonths.map((x, i) => x + ' ' + years[i]);

  const values = Object.values(timeLineData);

  console.log(theLabels);
  console.log(values);

  const state = {
    labels: theLabels,
    datasets: [
      {
        label: 'Sunshine',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        pointRadius: 1,
        data: values
      }
    ]
  }


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
        <Line
          data={state}
          options={{
            // title:{
            //   display:true,
            //   text:'Average Rainfall per month',
            //   fontSize:20
            // },
            // legend:{
            //   display:true,
            //   position:'right'
            // }
          }}
        />
        {/* <ExploreContainer name="Tab 2 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
