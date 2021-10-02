import { IonContent, IonIcon, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';

import { Line } from 'react-chartjs-2';

const Graph  = ({data, status, parameter}) => {

    if(!data){return (<IonPage></IonPage>)};
    const timeLineData = data?.properties?.parameter[parameter]


    console.log('time line data',timeLineData);
    const labels = Object.keys(timeLineData);
    let values = Object.values(timeLineData);

    //HOURLY YYYYMMDDHH = 10
    //DAILY YYYYMMDD = 8
    //WEEKLY YYYYMMDD = 8
    //Monthly YYYYMM = 6
    //Annually YYYYMM = 6

    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    let theLabels= '';
    console.log('labesl: ',labels);

    const years = labels.map(x => x.substring(0,4));
    const months = labels.map(x => parseInt(x.substring(4,6)));
    const theseMonths = months.map(x => monthNames[x-1]);
    
    if(status=="annually"){
        //annually
        let filterLabels = months.filter(x => x==13);
        let filterYears = years.filter((x,i) => months[i]==13);
        theLabels = filterYears.map((x,i) =>  x);
        values = values.filter((x,i) => months[i]==13);

    }
    else if (status=="weekly"){
      //weekly (YYYYMMDD)
      let weekvals;
      const days = labels.map(x => parseInt(x.substring(6,8)));
      weekvals = 
      startDate = labels[0];
      endDate = labels[-1];

      theLabels = theseMonths.map((x, i) => days[i]+' '+x + ' ' + years[i]);
  }
    else if (labels[0].length===8){
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
        theLabels = filterLabels.map((x,i) => monthNames[x-1] +' '+filterYears[i]);
        values = values.filter((x,i) => months[i]<13);
    }

    console.log(theLabels);
    console.log(values);
    let graphLabel;
    switch(parameter){
        case "ALLSKY_SFC_SW_DWN":
            graphLabel="Solar Radiance";
            break;
        case "TS":
            graphLabel="Surface Temperature";
            break;
        case "CLRSKY_DAYS":
            graphLabel="Clear Days"
            break;
        default:
            graphLabel="Cloud Amount";
            break;

    }
    const state = {
    labels: theLabels,
    datasets: [ 
        {
        label: graphLabel, 
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
