

window.onload = function(){

    let btnSubmit = document.getElementById('submit');
    btnSubmit.addEventListener('click',()=>{
        let fromDate = new Date(document.getElementById('fromDate').value);
        let toDate = new Date(document.getElementById('toDate').value);

        console.log('fromDate:- ', fromDate);
        console.log('toDate:- ', toDate);

        let fromDateSec = fromDate.getTime();
        let toDateSec = toDate.getTime();

        console.log('fromDateSec:- ', fromDateSec);
        console.log('toDateSec:- ', toDateSec);

        let dateDifSec = toDate - fromDateSec;  
        console.log('dateDifSec:- ',dateDifSec);

        let yearDiff = 0;
        let monthDiff = 0;

        let daysDiff = Math.floor(dateDifSec / (1000 * 60 * 60 * 24));

        let hrDiff = Math.floor((dateDifSec - daysDiff*(1000 * 60 * 60 * 24))/(1000*60*60));

        let minDiff = Math.floor((dateDifSec - daysDiff*(1000 * 60 * 60 * 24) - hrDiff*1000*60*60)/(1000*60));

        let secDiff = Math.floor((dateDifSec - daysDiff*(1000 * 60 * 60 * 24) - hrDiff*(1000 * 60 * 60) -minDiff*1000*60)/(1000));
        let resHTML = ``;
        console.log('daysDiff:- ',daysDiff);

        if(daysDiff>365){
            yearDiff = Math.floor(daysDiff/365);
            daysDiff = daysDiff - yearDiff*365;
            console.log("Years Diff:- ", yearDiff); 
            console.log("Days remain after year:- ", daysDiff);
            resHTML+= `${yearDiff} Years, `;
        }

        if(daysDiff > 30)
        {
            monthDiff = Math.floor(daysDiff / 30);
            daysDiff-= monthDiff*30;
            console.log("Month Diff:- ",monthDiff);
            resHTML+= `${monthDiff} Month, `;
        }
        
        if(daysDiff > 0)
        {
            console.log('Days difference:- ', daysDiff);
        }

        console.log("Hour Diff:-",hrDiff);
        console.log("Number of minutes remaining:- " , minDiff);
        console.log("Number of Seconds remaining:- " , secDiff);

        resHTML += `${daysDiff} Days, ${hrDiff} Hours, ${minDiff} Minutes `;
        // ${secDiff} Seconds
        document.getElementById('res').innerHTML = resHTML;
    },
    false)
}