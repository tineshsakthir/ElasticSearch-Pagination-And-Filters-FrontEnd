

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
  valueInput.name = "value";

  if(FIRST_HEADER_TYPE === TEXT || FIRST_HEADER_TYPE === KEYWORD){
    valueInput.type = "text";
  }else if(FIRST_HEADER_TYPE === LONG){
    valueInput.type = "number" ; 
  }else if(FIRST_HEADER_TYPE === DATE){
    valueInput.type = "date";
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




