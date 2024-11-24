

const getResponseWithThisBody = async(requestData, flagToResetPagination) => {
  try {

    requestData["sortColumn"] = getSortingColumn() ;
    requestData["sortOrder"] = getSortingOrder() ;  

    console.log("Request Data:", requestData);
    
    // Send JSON to backend
    const response = await fetch("http://localhost:8080/filterPagination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    // Parse JSON response
    if (response.ok) {
      const responseData = await response.json();
      const totalHits = responseData.totalHits;
      console.log("Total Hits:", totalHits);
      setTotalHits(totalHits);
      const totalPages = responseData.totalPages;
      console.log("Total Pages:", totalPages);
      setTotalPages(totalPages);
      const parsedData = responseData.data ; 

      // This works for filter request handler and index creation handler
      if(flagToResetPagination){
        resetPagination(parsedData) ; 
      }

      console.log("Response Data:", parsedData);
      // alert("Filters applied successfully. Check console for response.");
      return parsedData ;
    } else {
      const errorResponse = await response.json();
      console.error("Error:", errorResponse);
      alert("Failed to apply filters.");
      return null ; 
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error sending request.");
    return null ; 
  }
} 

{/* <select id="select-sort-column">
      <!-- Column options will be dynamically added here -->
    </select>

    <label >Sort Type</label>
    <select id="select-sort-order">
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select> */}




const getSortingColumn = () => {
  return document.getElementById("select-sort-column").value ; 
}

const getSortingOrder = () => {
  return document.getElementById("select-sort-order").value ; 
}

