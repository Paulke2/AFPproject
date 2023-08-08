const updateTimeCardDay=(newDayString,newDayNumber,CurrentDayString) =>{
    if(CurrentDayString === null){
        return "";
    }
    if(newDayString===""||newDayNumber===undefined||newDayNumber===NaN){
        return CurrentDayString;
    }else if(CurrentDayString==""){
        return newDayString+"-"+newDayNumber.toString();
    
    }else{
        return CurrentDayString+","+newDayString+"-"+newDayNumber.toString();
    }
}

export default updateTimeCardDay;