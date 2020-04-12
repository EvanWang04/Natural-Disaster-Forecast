const date = (dates) => {
    let dateList = []; 

    for (i=0; i<dates.length; i++){
        dateList.push(new Date(dates[i]))
    }

    let maximumDate=new Date(Math.max.apply(null, dateList)); 
    let minimumDate=new Date(Math.min.apply(null, dateList)); 
    

    let difference = maximumDate.getTime() - minimumDate.getTime();
    let differenceInDays = difference / (1000 * 3600 * 24)

    //Days before the next disaster
    nextD=Math.round(differenceInDays/dates.length, 0)


    
    return(addDays(maximumDate, nextD))
}

function addDays(date, days) {
    result=date
    result.setDate(result.getDate() + days);
    return result;
  }