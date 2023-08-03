
const getTotalHoursForDay = (jobList) => {
 
  let sum=0;
  (jobList?.length >0 ? jobList.map((job) => {
    sum += parseInt(job.split("-")[1]);
  }):sum=0);

   return sum;
};


export default getTotalHoursForDay;