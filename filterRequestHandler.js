document.getElementById("submit-filter").addEventListener("click", async () => {
  // Gather filter data
  const filters = getFiltersAsArray() ; 
  const relations = getRelationsBetweenFilters() ;
  const index_name = getIndexName();

  // Convert data to JSON
  const requestData = { size : getSizePerPage(), filters : filters, index_name : index_name, relations : relations, indexToColumnTypeMap : getIndexToColumnMap() };
  console.log("Requested Data : ", requestData) ;
  const flagToResetPagination = true ;
  const parsedData = await getResponseWithThisBody(requestData, flagToResetPagination) ; 
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

    if(condition === "BETWEEN" || condition === "NOT BETWEEN"){
      const from = filter.querySelector("input[name='from']").value;
      const to = filter.querySelector("input[name='to']").value;
      if (column && condition && from && to) {
        filters.push({ column, condition, from, to });
      }
    }

    else{
      const value = filter.querySelector("input[name='value']").value ?? "";
      if (column && condition && value) {
        filters.push({ column, condition, value });
      }else if(column && condition && condition === "IS EMPTY" || condition === "IS NOT EMPTY"){  
        filters.push({ column, condition, value });
      }
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

