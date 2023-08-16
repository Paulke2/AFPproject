
const getTotalHoursForDay = (jobList) => {
 
  let sum=0;
  (jobList?.length >0 ? jobList.map((job) => {
    let index=job.lastIndexOf("-");
    sum += parseInt(job[index+4]);
  }):sum=0);

   return sum;
};


export default getTotalHoursForDay;