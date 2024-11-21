// Start : Table Creation

/*
The Table Creation section is in the below, this code is copied to the handler.js. If change occurs there, copy it to here and vice versa....
*/

const createTable = (data, shouldDemolishCurrentFilterAndCreateNewFitler) => {

  const tableHeaders = document.getElementById("tableHeaders");
  const tableBody = document.querySelector("#dataTable tbody");

  // To clear the table everytime during the createTable
  // Clear the table headers
  tableHeaders.innerHTML = "";
  // Clear the table body
  tableBody.innerHTML = "";

  if(data.length === 0){
    console.log("No data : No Table") ; 
    return ; 
  }

  // Returns a custom header for the mail_trace index
  const headers = getHeaders(data);


  if(data.length === 0){
    console.log("No Headers : No Table") ; 
    return ; 
  }

  if(shouldDemolishCurrentFilterAndCreateNewFitler){
    // Create a filter and then create the table
    createFilter(headers);
  }  

  console.log("Reaced Create Table" ) ;
  console.log(data) ; 
  console.log(headers) ; 

  //Create the header first and then create the rows
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header; // Set header text
    tableHeaders.appendChild(th);
  });

  // Populate the table rows dynamically
  data.forEach((item) => {
    const row = document.createElement("tr");
    const source = item.sourceAsMap;
    // Populate each cell based on headers

    headers.forEach((header) => {
      const cell = document.createElement("td");
      cell.textContent = source[header] || "N/A"; // Add value or "N/A" for missing
      row.appendChild(cell);
    });

    // Append the row to the table body
    tableBody.appendChild(row);
  });
};




const getHeaders = (data) => {
  // The keys are in the different order in the response, so i am difining in a particular order

  if (data.length > 0) {
    const firstSourceAsMap = data[0].sourceAsMap;
    // Elastic search sorts the columns based on the header in alphabetical
    // I need to sort the columns according to the instructor request, so
    // if the index int mail_trace, i provide the custom sorted array.
    const indexName = data[0].index;
    if (indexName === MAILTRACE_INDEX_NAME_ES) {
      return KEY_ORDER_FOR_MAILTRACE_INDEX;
    }

    // Taking out the headers(for other than mail_trace) from the response
    let headers = Object.keys(firstSourceAsMap); // Get keys from the first object
    return headers;
  }

  return [] ; 
};

// End : Table Creation