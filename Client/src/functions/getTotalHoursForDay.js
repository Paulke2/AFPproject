import React, { useEffect, useState } from 'react';

const getTotalHoursForDay = (props, day) => {
 
    if (props?.currentTimeCard?.[day]) {
      console.log("in if")
      const elements = props.currentTimeCard[day].split(',');
      let sum = 0;
      elements.forEach((element) => {
        sum += parseInt(element.slice(-1));
      });
      console.log("sum"+sum);
      return sum;
    }


    return 0;
};

export default getTotalHoursForDay;