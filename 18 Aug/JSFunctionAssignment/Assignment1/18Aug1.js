
function headingHTML(header)
{
    var temp = "<tr>";
    for(var headerName in header)
    {
        temp+= "<th>" +header[headerName]+ "</th>";
    }
    temp+="</tr>";
    return temp;
}
function bodyHTML(PersonDetail , header)
{

    var final = "";
    for(var i = 0; i < PersonDetail.length;i++)
    {
        var temp = "<tr>";
        for(var j = 0; j < header.length;j++)
        {
            temp+= "<td>"+PersonDetail[i][header[j]]+"</td>"
        }
        temp+= "</tr>"
        final+=temp;
    }
    return final;
}

// content is over here.



// CRUD Operation on Persons Details
var pDetail = function(PersonDetail)
{
    return{
        addUser : function(PersonId = 0,PersonName='',City='',Age=0,Gender='')
        {
            var temp = {
                PersonId : PersonId,
                PersonName : PersonName,
                City : City,
                Age:Age,
                Gender : Gender
            }
            PersonDetail.push(temp);
        }
    }
}