const updateTimeCardDay=(newDayString,newDayNumber,currentJobList,CurrentDayString) =>{
    console.log(newDayString)
    console.log(newDayNumber)
    if(currentJobList === []){
        return "";
    }
    if(newDayString===""||newDayNumber===undefined||isNaN(newDayNumber)){
        console.log("returning")
        return currentJobList.join(",");
    }else if(CurrentDayString===""){
        return newDayString+"-"+"REG"+newDayNumber.toString();
    
    }else{
        return currentJobList.join(",")+","+newDayString+"-"+"REG"+newDayNumber.toString();
    }
}

export default updateTimeCardDay;