document.getElementById("submit-filter").addEventListener("click", async () => {
  // Gather filter data
  const filters = getFiltersAsArray() ; 
  const relations = getRelationsBetweenFilters() ;
  const index_name = getIndexName();

  // Convert data to JSON
  const requestData = { size : 100, filters : filters, index_name : index_name, relations : relations };
  const parsedData = await getResponseWithThisBody(requestData) ; 
  if(parsedData){
    console.log(`parsed Data : ${parsedData}`) ; 
    let shouldDemolishCurrentFilterAndCreateNewFitler = false ; // While filtering i don't need to re create the filter tab.
  createTable(parsedData, shouldDemolishCurrentFilterAndCreateNewFitler) ; 
  }
  else {
    alert("Table not created : From filterRequestHandler.js") ; 
    return ; 
  }
});

const getFiltersAsArray = () => {
  const filters = [];
  document.querySelectorAll("#filter-tab .filter").forEach((filter) => {
    const column = filter.querySelector("select[name='column']").value;
    const condition = filter.querySelector("select[name='condition']").value;
    const value = filter.querySelector("input[name='value']").value;

    if (column && condition && value) {
      filters.push({ column, condition, value });
    }
  });

  return filters ; 
}

const getIndexName = () => {
  const selectBox = document.querySelector(
    '#indexChoosingForm select[id="index"]'
  );
  return selectBox.value ; 
}


const getRelationsBetweenFilters = () => {
  let relations = [] ; 
  document.querySelectorAll('#filter-tab .relation-box').forEach((relationBox) => {
    const relation = relationBox.querySelector("select[name='relation']").value ; 

    if(relation) relations.push(relation) ;
  })

  return relations ; 
}


