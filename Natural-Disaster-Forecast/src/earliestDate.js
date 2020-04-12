const earliestDate = (dates) => {
    let dateList = []; 
    for (i=0; i<dates.length; i++){
        dateList.push(new Date(dates[i]))
    }
    let minimumDate=new Date(Math.min.apply(null, dateList)); 
    return minimumDate
}
