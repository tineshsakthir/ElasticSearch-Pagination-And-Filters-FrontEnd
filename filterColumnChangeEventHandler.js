const columnTypeToConditionsMap = {
  "keyword" : ["CONTAINS", "NOT CONTAINS", "EQUALS", "NOT EQUALS", "IS EMPTY", "IS NOT EMPTY", "STARTS WITH", "ENDS WITH", "LIKE", "NOT LIKE", "IN", "NOT IN" ] , 
  "text" : ["CONTAINS", "NOT CONTAINS", "EQUALS", "NOT EQUALS", "IS EMPTY", "IS NOT EMPTY", "STARTS WITH", "ENDS WITH", "LIKE", "NOT LIKE", "IN", "NOT IN" ]  , 
  "long" : ["EQUALS", "NOT EQUALS", "IS EMPTY", "IS NOT EMPTY", "GREATER THAN", "GREATER THAN OR EQUALS", "LESS THAN", "LESS THAN OR EQUALS"] ,
  "date" : ["IS" , "IS NOT", "BETWEEN", "NOT BETWEEN", "AFTER", "BEFORE"] 
}


const getColumnTypeToConditionMap = () => {
  return columnTypeToConditionsMap ; 
}


// In the morning need to do, 

/* 

  "CONTAINS", "NOT CONTAINS", "EQUALS", "NOT EQUALS", "STARTS WITH", "ENDS WITH", "LIKE", "NOT LIKE", "IN", "NOT IN" 
    For the above, i need to provide a input box with.

  "IS EMPTY", "IS NOT EMPTY"
    For the above, i need to provide a input box with writing = disabled

  "IS" , "IS NOT", "AFTER", "BEFORE"
    For the above, i need to provide a single date picker.

  "BETWEEN", "NOT BETWEEN",
    For the above, i need to provide a two date picker.

  Only thing to manage is, when ever i change from betwee/not between , i need to delete two elements and i neeed to change the things
    ,similary, when ever i chagne from date[between/ not between], i need to delete 3 elemnts and i need to create accordingly new settigns

*/