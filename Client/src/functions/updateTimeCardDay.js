const updateTimeCardDay=(newDayString,newDayNumber,currentJobList,CurrentDayString) =>{
    if(currentJobList === []){
        return "";
    }
    if(newDayString===""||newDayNumber===undefined||newDayNumber===NaN){
        return currentJobList.join(",");
    }else if(CurrentDayString===""){
        return newDayString+"-"+newDayNumber.toString();
    
    }else{
        return currentJobList.join(",")+","+newDayString+"-"+newDayNumber.toString();
    }
}

export default updateTimeCardDay;