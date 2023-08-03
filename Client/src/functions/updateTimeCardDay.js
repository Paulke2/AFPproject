const updateTimeCardDay=(newDayString,newDayNumber,CurrentDayString) =>{

    if(newDayString===""||newDayNumber===undefined){
        return CurrentDayString;
    }else if(CurrentDayString==""){
        return newDayString+"-"+newDayNumber.toString();
    
    }else{
        return CurrentDayString+","+newDayString+"-"+newDayNumber.toString();
    }
}

export default updateTimeCardDay;