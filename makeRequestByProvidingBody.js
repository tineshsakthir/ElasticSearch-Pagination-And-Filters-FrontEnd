

const getResponseWithThisBody = async(requestData) => {
  try {
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
      const parsedData = responseData.data ; 
      console.log("Response Data:", parsedData);
      alert("Filters applied successfully. Check console for response.");
      return parsedData ;
    } else {
      console.error("Error:", response.statusText);
      alert("Failed to apply filters.");
      return null ; 
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error sending request.");
    return null ; 
  }
} 