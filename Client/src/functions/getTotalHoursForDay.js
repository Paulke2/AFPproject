
const getTotalHoursForDay = (jobList) => {

  let sum=0;
  (jobList?.length > 0 ? jobList.map((job) => {
    let index=job.lastIndexOf("-");
    sum += job!==""?parseInt(job[index+4]):0;
  }):sum=0);

   return sum;
};


export default getTotalHoursForDay;