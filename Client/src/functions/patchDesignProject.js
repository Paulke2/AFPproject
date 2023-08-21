import { useState } from "react";

const patchDesignProject = async (event, job, field, newValue, setError,oldList,setter) => {
  console.log(event)
  event.preventDefault();

  let newList=(oldList.filter((item) => item.projectName !== job.projectName));
  const movedJob = field === "assignedTo" ? { ...job, assignedTo: newValue } : { ...job, currentContainer: newValue };
  console.log(movedJob);
  
  const response = await fetch("/designJobs/" + job._id, {
    method: "PATCH",
    body: JSON.stringify(movedJob),
    headers: { "Content-Type": "application/json" }, // Fix the typo in "application/json"
  });

  response.json().then((json) => {
    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      console.log("updated design", json);
      setter([...newList,json])
    }
   
  });
};

export default patchDesignProject;