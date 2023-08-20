const patchDesignProject = async (event,job,destination) => {
    event.preventDefault();
  
    const movedJob = job;
    movedJob.currentContainer = destination;
    const response = await fetch("/parks/"+job._id, {
      method: "PATCH",
      body: JSON.stringify(movedJob),
      headers: { "Content-Type": "applocation/json" },
    });
    const json = await response.json();
    if(!response.ok){
        setError(json.error);
    }
    else{
      setError(null);
      console.log("updated design",json);
    }

  };

  export default patchDesignProject;