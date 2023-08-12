import React, { useState } from "react";
const moment = require('moment');
function convertExcelSerialToDate(serialNumber) {
  const baseDate = moment('1900-01-01'); // Excel's base date is January 1, 1900
  const date = baseDate.add(serialNumber - 1, 'days');
  return date.format('MM/DD/YYYY');
}




const findProjectInfo = (infoMatrix,setCompanyContact, setScope, setProjectID, setTurnoverDate, setLocation, setContractWith, setAmount,setProjectName) => {
  setScope(infoMatrix[18][1]);
  setProjectID(infoMatrix[6][1]);
  setTurnoverDate(convertExcelSerialToDate(infoMatrix[5][9]));
  setLocation(infoMatrix[10][2]+infoMatrix[12][2]);
  setContractWith(infoMatrix[9][7]);
  setAmount(infoMatrix[5][7]);
  setProjectName(infoMatrix[6][2]);
  setCompanyContact(infoMatrix[13][7]+", Phone: "+infoMatrix[14][7]+", Email:"+infoMatrix[14][8]);

}

export default findProjectInfo;