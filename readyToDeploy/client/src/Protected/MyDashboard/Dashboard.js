import * as React from 'react';
import DasScreen from './DasScreen';
import CommonDash from "./CommonDash"


export default function MiniDrawer() {


  return (
  <>
  <CommonDash compo = {<DasScreen/>} />
  </>
  );
}