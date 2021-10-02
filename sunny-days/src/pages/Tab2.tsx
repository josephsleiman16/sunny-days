import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import React from 'react';

import { Line } from 'react-chartjs-2';

const data =  {"type":"Feature","geometry":{"type":"Point","coordinates":[-3,55,182.34]},"properties":{"parameter":{"ALLSKY_SFC_SW_DWN":{"201501":0.62,"201502":1.33,"201503":2.26,"201504":4.44,"201505":4.64,"201506":4.75,"201507":4.26,"201508":3.98,"201509":3.08,"201510":1.58,"201511":0.62,"201512":0.37,"201513":2.67,"201601":0.46,"201602":1.3,"201603":2.34,"201604":3.64,"201605":4.85,"201606":4.62,"201607":4.05,"201608":3.79,"201609":2.66,"201610":1.52,"201611":0.83,"201612":0.4,"201613":2.54,"201701":0.64,"201702":1.06,"201703":2.36,"201704":3.84,"201705":5.08,"201706":4.26,"201707":4.28,"201708":3.79,"201709":2.44,"201710":1.32,"201711":0.82,"201712":0.46,"201713":2.54,"201801":0.58,"201802":1.37,"201803":2.01,"201804":3.35,"201805":5.31,"201806":5.6,"201807":5.06,"201808":3.63,"201809":2.66,"201810":1.58,"201811":0.73,"201812":0.46,"201813":2.7,"201901":0.7,"201902":1.38,"201903":2.37,"201904":3.94,"201905":4.68,"201906":4.82,"201907":4.4,"201908":3.84,"201909":2.84,"201910":1.62,"201911":0.69,"201912":0.42,"201913":2.65,"202001":0.56,"202002":1.28,"202003":2.5,"202004":4.41,"202005":5.42,"202006":4.47,"202007":4.27,"202008":3.6,"202009":2.75,"202010":1.41,"202011":0.72,"202012":0.4,"202013":2.65}}},"header":{"title":"NASA/POWER CERES/MERRA2 Native Resolution Monthly and Annual","api":{"version":"v2.2.6","name":"POWER Monthly and Annual API"},"fill_value":-999,"start":"20150101","end":"20201231"},"messages":[],"parameters":{"ALLSKY_SFC_SW_DWN":{"units":"kW-hr/m^2/day","longname":"All Sky Surface Shortwave Downward Irradiance"}},"times":{"data":0.72,"process":0.02}};


const Tab2: React.FC  = () => {

  const timeLineData = data?.properties?.parameter?.ALLSKY_SFC_SW_DWN;

  const labels = Object.keys(timeLineData);
  const values = Object.values(timeLineData);

  console.log(Object.values(timeLineData))

  const state = {
    // labels: ['January', 'February', 'March',
    //          'April', 'May'],
    labels: labels,
    datasets: [
      {
        label: 'Sunshine',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: values
        // data: [65, 59, 80, 81, 56]
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
