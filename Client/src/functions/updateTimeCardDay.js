const updateTimeCardDay=(newDayString,newDayNumber,currentJobList,CurrentDayString) =>{

    if(currentJobList === []){
        return "";
    }
    if(newDayString===""||newDayNumber===undefined||newDayNumber===NaN){
        return currentJobList.join(",");
    }else if(CurrentDayString===""){
        return newDayString+"-"+"REG"+newDayNumber.toString();
    
    }else{
        return currentJobList.join(",")+","+newDayString+"-"+"REG"+newDayNumber.toString();
    }
}

export default updateTimeCardDay;