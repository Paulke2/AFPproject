import { useState } from "react";

const patchDesignProject = async (event, job, field, newValue, setError,oldList,setter,index) => {
  console.log(index)
  event.preventDefault();

 
  const movedJob = field === "assignedTo" ? { ...job, assignedTo: newValue } : { ...job, currentContainer: newValue };
  let newList = [];
let count = 0;
// const isJobInOldList = oldList.some((item) => item.projectName === movedJob.projectName);


for (let i = 0; i < oldList.length; i++) {
  if (count === index) {

    
    newList.push(movedJob);
    
  }
  if(field === "assignedTo" && count === index){
  count++
  
  }else{
    newList.push(oldList[i]);
    count++;
  }
  
}

// If index is greater than or equal to the length of the oldList, append movedJob to the end
if (count <= index) {
  newList.push(movedJob);
}

 
  const response = await fetch("https://afpserver.onrender.com/designJobs/" + job._id, {
    method: "PATCH",
    body: JSON.stringify(movedJob),
    headers: { "Content-Type": "application/json" }, 
  });
  console.log("ourList")
console.log(newList)
  response.json().then((json) => {
    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      console.log("updated design", json);
      
      setter(newList)
    }
   
  });
};

export default patchDesignProject;