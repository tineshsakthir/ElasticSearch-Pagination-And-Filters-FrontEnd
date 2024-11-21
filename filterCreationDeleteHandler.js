

let filterCount = 0; // To keep track of the number of filters

// Start : The creation method that is called only once....
const createFilter = (headers) => {
  const filterTab = document.getElementById("filter-tab");
  // When i click the generate for index button for a particular index, this method is called, so i need to clear the
  //previous filters
  filterTab.innerHTML = "";

  const filterDiv = createFilterDiv(headers);

  // Append the new filter to the filter tab
  filterTab.appendChild(filterDiv);

  // Update the filter count and manage the display of remove buttons
  filterCount++;
  updateRemoveButtonsVisibility();

  // Make the filter-form visible
  document.getElementById("filter-form").style.display = "block";
};

// End : The creation method that is called only once....

// Start : Filter Div creating function, used by addFilter

const createFilterDiv = (headers) => {
  const filterDiv = document.createElement("div");
  filterDiv.classList.add("filter");

  // Create the column select element
  const columnSelect = document.createElement("select");
  // attaching the handler for change value of column
  columnSelect.onchange = () => updateConditionAndInputHandlerByColumn(columnSelect) ; 
  columnSelect.name = "column";
  headers.forEach((header) => {
    const option = document.createElement("option");
    option.value = header;
    option.textContent = header;
    columnSelect.appendChild(option);
  });

  // Can use this in both creation of condition and input box
  const FIRST_HEADER_NAME = headers[0] ;
  const FIRST_HEADER_TYPE = getIndexToColumnMap()[FIRST_HEADER_NAME] ; 

  // Create the condition select element using the headerrs first element for initial loading
  const conditionSelect = document.createElement("select");
    // attaching the handler for change value of condition select
  conditionSelect.onchange = () => updateInputHandlerByCondition(conditionSelect) ;

  conditionSelect.name = "condition";
  const conditions = getColumnTypeToConditionMap()[FIRST_HEADER_TYPE];

  conditions.forEach((condition) => {
    const option = document.createElement("option");
    option.value = condition;
    option.textContent = condition;
    conditionSelect.appendChild(option);
  });


// Create the input field using the condiitions first elemnt for initial loading

  const TEXT = "text" ; 
  const LONG = "long" ;
  const KEYWORD = "keyword" ;
  const DATE = "date" ; 

  // Initial element creating, but fixing the type dynamically....
  const valueInput = document.createElement("input");
  valueInput.required = true;
  valueInput.name = "value";

  if(FIRST_HEADER_TYPE === TEXT || FIRST_HEADER_TYPE === KEYWORD){
    valueInput.type = "text";
  }else if(FIRST_HEADER_TYPE === LONG){
    valueInput.type = "number" ; 
  }else if(FIRST_HEADER_TYPE === DATE){
    valueInput.type = "datetime-local";
  }

  
  // Create the add filter button
  const addSpan = document.createElement("span");
  addSpan.textContent = "+";
  addSpan.onclick = () => addFilter(filterDiv);

  // Create the remove filter button
  const removeSpan = document.createElement("span");
  removeSpan.textContent = "X";
  removeSpan.style.display = filterCount > 0 ? "inline" : "none"; // Hide for the first filter
  removeSpan.onclick = () => removeFilter(filterDiv);

  // Append all elements to the filterDiv
  filterDiv.appendChild(columnSelect);
  filterDiv.appendChild(conditionSelect);
  filterDiv.appendChild(valueInput);
  filterDiv.appendChild(addSpan);
  filterDiv.appendChild(removeSpan);

  return filterDiv;
};

const addFilter = (currentFilter) => {
  const filterTab = document.getElementById("filter-tab");

  // Create the relation box (AND/OR dropdown)
  const relationDiv = document.createElement("div");
  relationDiv.classList.add("relation-box");

  const relationSelect = document.createElement("select");
  relationSelect.name = "relation";
  ["AND", "OR"].forEach((relation) => {
    const option = document.createElement("option");
    option.value = relation;
    option.textContent = relation;
    relationSelect.appendChild(option);
  });

  relationDiv.appendChild(relationSelect);

  // Create a new filter div
  const newFilterDiv = createFilterDiv(
    Array.from(
      currentFilter.querySelectorAll("select[name='column'] option")
    ).map((option) => option.value)
  );

  // Insert the relation box and the new filter right after the current filter
  currentFilter.insertAdjacentElement("afterend", newFilterDiv);
  currentFilter.insertAdjacentElement("afterend", relationDiv);

  // Update the filter count and visibility of remove buttons
  filterCount++;
  updateRemoveButtonsVisibility();
};

const removeFilter = (filterToRemove) => {
  const filters = Array.from(document.querySelectorAll("#filter-tab .filter"));

  const filterIndex = filters.indexOf(filterToRemove);

  // Handle removal of the appropriate relation-box
  if (filters.length > 1) {
    if (filterIndex === 0) {
      // First filter case
      const relationBelow = filterToRemove.nextElementSibling;
      if (relationBelow && relationBelow.classList.contains("relation-box")) {
        relationBelow.remove();
      }
    } else {
      // Middle or last filter
      const relationAbove = filterToRemove.previousElementSibling;
      if (relationAbove && relationAbove.classList.contains("relation-box")) {
        relationAbove.remove();
      }
    }
  }

  // Remove the selected filter
  filterToRemove.remove();

  // Update the filter count and visibility of remove buttons
  filterCount--;
  updateRemoveButtonsVisibility();
};

const updateRemoveButtonsVisibility = () => {
  const filters = document.querySelectorAll("#filter-tab .filter");
  filters.forEach((filter) => {
    const removeButton = filter.querySelector("span:last-child"); // Get the last span element for the remove button

    if (removeButton) {
      // Only show the remove button if there are multiple filters
      removeButton.style.display = filters.length > 1 ? "inline" : "none";
    }
  });
};

// End : Filter "Creation, Deletion, Updation of removal button" code section


const TEXT = "text" ; 
const LONG = "long" ;
const KEYWORD = "keyword" ;
const DATE = "date" ; 


// handler that handles the change of column in the filter tab
// This is the handler that is called when ever the column is changed in the filter tab
const addConditionAndInputToThisColumnSelect = (columnSelect) => {
  const COLUMN_HEADER_NAME = columnSelect.value ;
  const COLUMN_HEADER_TYPE = getIndexToColumnMap()[COLUMN_HEADER_NAME] ; 


    // Create the condition select element using the headerrs first element for initial loading
    const conditionSelect = document.createElement("select");
    conditionSelect.onchange = () => updateInputHandlerByCondition(conditionSelect) ;
    conditionSelect.name = "condition";
    const conditions = getColumnTypeToConditionMap()[COLUMN_HEADER_TYPE];
  
    conditions.forEach((condition) => {
      const option = document.createElement("option");
      option.value = condition;
      option.textContent = condition;
      conditionSelect.appendChild(option);
    });
  
  
  // Create the input field using the condiitions first elemnt for initial loading
  
    
  
    // Initial element creating, but fixing the type dynamically....
    const valueInput = document.createElement("input");
    valueInput.required = true;
    valueInput.name = "value";
  
    if(COLUMN_HEADER_TYPE === TEXT || COLUMN_HEADER_TYPE === KEYWORD){
      valueInput.type = "text";
    }else if(COLUMN_HEADER_TYPE === LONG){
      valueInput.type = "number" ; 
    }else if(COLUMN_HEADER_TYPE === DATE){
      valueInput.type = "datetime-local";
    }

    columnSelect.insertAdjacentElement("afterend", valueInput) ;
    columnSelect.insertAdjacentElement("afterend", conditionSelect) ; 

    console.log("Added Condition Select : " , conditionSelect) ;
    console.log("Added Value Input : " , valueInput) ;
}


const updateConditionAndInputHandlerByColumn = (columnSelect) => {

  console.log("Into column select handler") ;
  // removing phase. Select your two siblings and kill them

  const conditionSelect = columnSelect.nextElementSibling; 
  const valueInput = conditionSelect.nextElementSibling; 

  console.log(" conditionSelect Sibling That is going to be removed : " , conditionSelect) ;
  console.log(" valueInput Sibling That is going to be removed : " , valueInput) ;


  conditionSelect.remove() ; 
  valueInput.remove() ; 

  // Adding new elements phase
  // Now need to get the type of column value that is curretly in the columnSelect

  addConditionAndInputToThisColumnSelect(columnSelect) ;

}



const addInputToThisConditionSelect = (conditionSelect) => {
  const COLUMN_HEADER_NAME = conditionSelect.previousElementSibling.value ;
  const COLUMN_HEADER_TYPE = getIndexToColumnMap()[COLUMN_HEADER_NAME] ; 
  const CONDITION_NAME = conditionSelect.value ;

  if(CONDITION_NAME === "BETWEEN" || CONDITION_NAME === "NOT BETWEEN"){
    const span = document.createElement("span") ;
    span.name = "value";

    const from = document.createElement("input") ;
    from.required = true;
    from.name = "from" ;
    const to = document.createElement("input") ;
    to.required = true;
    to.name = "to" ;

    if(COLUMN_HEADER_TYPE === DATE){
      from.type = "datetime-local" ;
      to.type = "datetime-local" ;
    }
    else if(COLUMN_HEADER_TYPE === LONG){
      from.type = "number" ;
      to.type = "number" ;
    }
    span.appendChild(from) ;
    span.appendChild(to) ;
    conditionSelect.insertAdjacentElement("afterend", span) ;
    console.log("Added span : " , span) ;
  }else{
    const valueInput = document.createElement("input");
    valueInput.required = true;
    valueInput.name = "value";
    
    if(COLUMN_HEADER_TYPE === TEXT || COLUMN_HEADER_TYPE === KEYWORD){
      valueInput.type = "text";
    }
    else if(COLUMN_HEADER_TYPE === LONG){
      valueInput.type = "number" ; 
    }
    else if(COLUMN_HEADER_TYPE === DATE){
      valueInput.type = "datetime-local";
    }
    if(CONDITION_NAME === "IS EMPTY" || CONDITION_NAME === "IS NOT EMPTY"){
      valueInput.disabled = true ; 
    }
    conditionSelect.insertAdjacentElement("afterend", valueInput) ;
    console.log("Added Value Input : " , valueInput) ;
  }
}

const updateInputHandlerByCondition = (conditionSelect) => {  
  // removing phase. Select your next one sibling and remove it
  // You next sibling may be a input box or a span[which is from BETWEEN AND NOT BETWEEN case, that is applicable for date and long]

  console.log("Into condition select handler") ;

  const valueInput = conditionSelect.nextElementSibling ;
  console.log("Sibling That is going to be removed : " , valueInput) ; 
  valueInput.remove() ;

  // Adding new elements phase

  // Now need to get the type of column value that is curretly in the columnSelect
  addInputToThisConditionSelect(conditionSelect) ;

}