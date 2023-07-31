import React, { useState } from "react";

const findProjectInfo = (infoMatrix) => {
    //takes in a matrix, sets state for new project
    infoMatrix.map((rows, index) => {
        return rows.map((column) => {
          console.log( column[index]);
        })
      })

}

export default findProjectInfo;