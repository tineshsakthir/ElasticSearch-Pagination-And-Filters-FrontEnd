const makeTopOrBottomFieldValueCountRequest = async(requestData) => {
  try {

    console.log("Request Data:", requestData);
    
    // Send JSON to backend
    const response = await fetch("http://localhost:8080/getTopOrBottomFieldValueCounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    // Parse JSON response
    if (response.ok) {
      const responseData = await response.json();
      // const totalHits = responseData.totalHits;
      // console.log("Total Hits:", totalHits);
      // setTotalHits(totalHits);
      // const totalPages = responseData.totalPages;
      // console.log("Total Pages:", totalPages);
      // setTotalPages(totalPages);
      const parsedData = responseData.data ; 

      console.log("Response Data:", parsedData);
      // alert("Graph Data Got successfully. Check console for response.");
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