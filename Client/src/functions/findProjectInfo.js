import React, { useState } from "react";

const findProjectInfo = (props) => {
    //takes in a matrix, sets state for new project
    // props.infoMatrix.map((rows, index) => {
    //     return rows.map((column) => {
          
    //     })
    //   })
  props.setProjectNumber(props.infoMatrix[6][1]);
  //console.log(props.infoMatrix[6]);
}

export default findProjectInfo;