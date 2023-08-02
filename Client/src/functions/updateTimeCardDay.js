const updateTimeCardDay=(newDayString,newDayNumber,CurrentDayString) =>{

    if(newDayString===""||newDayNumber===undefined){
        return CurrentDayString;
    }else{
        return CurrentDayString+newDayString+newDayNumber.toString();
   
    }
}

export default updateTimeCardDay;