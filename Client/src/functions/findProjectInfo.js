import React, { useState } from "react";
const findProjectInfo = (infoMatrix, setScope, setProjectID, setTurnoverDate, setLocation, setContractWith, setAmount,setProjectName) => {
  console.log("in function");
  setScope(infoMatrix[18][1]);
  setProjectID(infoMatrix[6][1]);
  setTurnoverDate(infoMatrix[5][10]);
  setLocation(infoMatrix[10][2]);
  setContractWith(infoMatrix[9][7]);
  setAmount(infoMatrix[5][7]+infoMatrix[5][8]);
  setProjectName(infoMatrix[6][2]);
}

export default findProjectInfo;