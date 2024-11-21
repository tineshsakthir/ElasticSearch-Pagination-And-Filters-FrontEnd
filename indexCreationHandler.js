const PLACE_HOLDER_OPTION_VALUE = "Select an index";
const KEY_ORDER_FOR_MAILTRACE_INDEX = [
  "SENDER",
  "RECIPIENT",
  "MESSAGE_TRACE_ID",
  "SUBJECT",
  "FROM_IP",
  "TO_IP",
  "SIZE",
  "RECEIVED",
];
const MAILTRACE_INDEX_NAME_ES = "mailtrace_index";

// Start : Indices loading and indeces selection and initial table population


const loadIndices = async () => {
  try {
    // Fetch the indices from the endpoint
    const response = await fetch("http://localhost:8080/list-indices");

    if (!response.ok) {
      throw new Error(`Error fetching indices: ${response.statusText}`);
    }

    const data = await response.json();
    const indices = data.indices;

    // Get the select element
    const selectBox = document.querySelector(
      '#indexChoosingForm select[id="index"]'
    );

    // Clear existing options (if any)
    selectBox.innerHTML = "";

    // Add a placeholder option
    const placeholderOption = document.createElement("option");
    placeholderOption.textContent = PLACE_HOLDER_OPTION_VALUE;
    placeholderOption.value = PLACE_HOLDER_OPTION_VALUE;
    selectBox.appendChild(placeholderOption);

    // Populate the select box with indices
    indices.forEach((index) => {
      const option = document.createElement("option");
      option.value = index.index; // Use the index name as the value
      option.textContent = index.index; // Display the index name
      selectBox.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading indices:", error);
    alert("Failed to load indices. Check the console for details.");
  }
}

// Attach the onload event
window.onload = loadIndices;

// When the generate buttton for any index is clicked....

document.getElementById("submit-index").addEventListener("click", async () => {
  //For preventing two are three clicks...

  // document.getElementById("submit-index").disabled = true;

  // Get the select element
  const selectBox = document.querySelector(
    '#indexChoosingForm select[id="index"]'
  );
  const index_name = selectBox.value;

  if (index_name === PLACE_HOLDER_OPTION_VALUE) {
    alert("Please select any Index :)");
    return;
  }

  await fetchIndexMappingsAndKeepThere(index_name) ; 
  

  // Convert data to JSON
  const requestData = { size: getSizePerPage(), index_name: index_name };
  const flagToResetPagination = true ;
  const parsedData = await getResponseWithThisBody(requestData, flagToResetPagination) ; 

  if(parsedData){
    console.log( "parsed Data : ", parsedData) ;
    let shouldDemolishCurrentFilterAndCreateNewFitler = true ; // While filtering i don't need to re create the filter tab.
  createTable(parsedData, shouldDemolishCurrentFilterAndCreateNewFitler) ; 
  } else {
    alert("Table not created : From filterRequestHandler.js") ; 
    return ; 
  }

  // document.getElementById("submit-index").disabled = false;
});

// End : Indices loading and indeces selection and initial table population



