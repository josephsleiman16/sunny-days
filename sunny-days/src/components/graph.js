import { IonContent, IonIcon, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';

import { Line } from 'react-chartjs-2';

const Graph  = ({data}) => {

    if(!data){return (<IonPage></IonPage>)};
    const timeLineData = data?.properties?.parameter?.ALLSKY_SFC_SW_DWN;

    const labels = Object.keys(timeLineData);
    //daily YYYYMMDD = 8
    //HOURLY YYYYMMDDHH = 10
    //Monthly YYYYmm = 6

    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    let theLabels= '';
    console.log('labesl: ',labels);

    const years = labels.map(x => x.substring(0,4));
    const months = labels.map(x => parseInt(x.substring(4,6)));
    const theseMonths = months.map(x => monthNames[x-1]);
    if (labels[0].length===8){
        //daily
        const days = labels.map(x => parseInt(x.substring(6,8)));
        // date month year 
        theLabels = theseMonths.map((x, i) => days[i]+' '+x + ' ' + years[i]);

    } else if(labels[0].length===10){
        //Hourly
        const days = labels.map(x => parseInt(x.substring(6,8)));
        const hours = labels.map( x=> parseInt(x.substring(8,10)))         
        const hoursTrue = hours.map( x=> x>=12 ? (x==12? x+'pm': (x-12)+'pm') : (x==0 ? x+12+'am': x+'am'));    
        theLabels = theseMonths.map((x, i) =>  hoursTrue[i]+' '+ days[i]+' '+x + ' ' + years[i]);
     
    }else{
        //monthly
        let filterLabels = months.filter(x => x<13);
        let filterYears = years.filter((x,i) => months[i]<13);
        console.log('test ',filterLabels);
        theLabels = filterLabels.map((x,i) => monthNames[x-1] +' '+filterYears[i]);

        // [11,12,13,01,02]  [19,19,19,20,20]
        //[11,12,01,02]  [19,19,19,20]
   //     theLabels = theseMonths.map((x, i) =>  x + ' ' + years[i]);

    }


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
            <IonTitle size="large">Results</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Line
          data={state}
          options={{
            responsive: true,
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            scales: {
                y: {
                    display:true,
                    title:{
                        display:true,
                        text:"y axis",
                        color: "black"
                    }
                },
                x: {
                    display:true,
                    title:{
                        display:true,
                        text:"x axis",
                        color: "black"
                    }
                }
            }
          }}
        />
        {/* <ExploreContainer name="Tab 2 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Graph;
