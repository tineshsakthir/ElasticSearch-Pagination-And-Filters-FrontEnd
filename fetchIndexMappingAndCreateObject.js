let indexToColumnTypeMap = {}

const fetchIndexMappingsAndKeepThere = async (index_name) => {
  try {

    const requestData = {index_name : index_name} ; 
    const response = await fetch("http://localhost:8080/index-mappings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Error fetching index mappings: ${response.statusText}`);
    }

    const data = await response.json();

    // Create a map of property names to their types
    indexToColumnTypeMap = createMappingsObject(index_name, data);
    console.log(indexToColumnTypeMap);

  } catch (error) {
    console.error("Error loading index mappings:", error);
  }
}

const createMappingsObject = (index_name, data) => {
  const properties = data.mappings[index_name].mappings._doc.properties;
  const mappings = {};
  Object.keys(properties).forEach((key) => {
    mappings[key] = properties[key].type;


    // Add options to the sorting div
    const option = document.createElement("option");
    option.value = key;
    option.textContent = key;
    // select id  = select-sort-column
    document.getElementById("select-sort-column").appendChild(option);
  });

  // make  <div name="sort-by-column" style="display: none;"> visible now
  document.querySelector("div[name='sort-by-column']").style.display = "block";

  return mappings;
}


const getIndexToColumnMap = () => {
  return indexToColumnTypeMap ; 
}
