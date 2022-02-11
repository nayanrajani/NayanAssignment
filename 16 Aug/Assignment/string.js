var mainstring="India (Hindi: Bhārat), officially the Republic of India (Hindi: Bhārat Gaṇarājya) is a country in South Asia. It is 100 largest country in population and seventh largest country by land area. It is also the most populous democracy in the world, bounded by the Indian Ocean on the south, the Arabian Sea on the southwest, and the Bay of Bengal on the southeast. It has seven neighbors: Pakistan in north-west, China, Nepal and Bhutan in north, Bangladesh and Myanmar in east and Sri Lanka in south. The Andaman and Nicobar Islands, a union territory of India, is also near Thailand and Indonesia along with Myanmar. The capital of India is New Delhi. India is a peninsula, bound by the Indian Ocean in the south, the Arabian Sea on the west and Bay of Bengal in the east. The coastline of India is of about 7,517 km (4,671 mi) long. India has the third largest military force in the world and is also a nuclear weapon state.";

function changeCase(c){
    if(c=='L' || c=='l')
        return mainstring.toLowerCase();
    
    if(c=='U' || c=='u')
        return mainstring.toUpperCase();

    return mainstring; 
}

function getCharCount(c){
    var count=0
    for (var i=0;i<mainstring.length;i++){
        if(mainstring[i]==c.toLowerCase() || mainstring[i]==c.toUpperCase())
            count+=1;
    }
    return count; 
}

function getIndexofChar(c){
    var indices=[];
    for(var i =0;i<mainstring.length;i++){
        if(mainstring[i]==c.toLowerCase() || mainstring[i]==c.toUpperCase())
            indices.push(i);
    }
    return indices; 
}

function vowels(){
    var count=0;
    var v=['a','A','e','E','i','I','o','O','u','U'];
    for(var i =0;i<mainstring.length;i++){
        if(v.includes(mainstring[i]))
      //  for(var j=0;j<v.length;j++){
     //      if(mainstring[i]==v[j]){
              count+=1;
    //         continue;
    //}
    //}
    }
    return count;   
}

function getNoOfStatements(){
    var count=0;
    for(var i =0;i<mainstring.length;i++){
        if(mainstring[i]=='.')
            count++;
    }
    return count;   
}