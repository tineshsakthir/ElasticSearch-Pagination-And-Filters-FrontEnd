let pageNumber = 1 ; 
let totalPages = 0 ; 
let totalHits = 0 ;

let search_after = [] ; 

const setTotalPages = (totalPages) => {
  totalPages = totalPages ; 
} 

const setTotalHits = (totalHits) => {
  totalHits = totalHits ; 
}

const incrementPageNumber = () => {
  pageNumber++ ; 
  handleViewOfButtons() ;
}

const decrementPageNumber = () => {
  pageNumber-- ; 
  handleViewOfButtons() ;
}

const nextPageBtn = document.getElementById("next-page") ;
const prevPageBtn = document.getElementById("prev-page") ;

const handleViewOfButtons = () => {
  if(pageNumber === 1){
    prevPageBtn.style.display = "none" ;
  }
  else {
    prevPageBtn.style.display = "block" ; 
  }

  if(pageNumber === totalPages){
    nextPageBtn.style
  }
  else {
    nextPageBtn.style.display = "block" ;
  }
}


// if getResponseWithThisBody is called filter request handler, then i need to reset the pagination
// if getResponseWithThisBody is called from indexCreationHandler, then i need to reset the pagination



const resetPagination = (parsedData) => {
  pageNumber = 1 ; 
  search_after = [] ;
  handleViewOfButtons() ;
}


const addLastRowSortColumnValueToSearchAfterArray = (lastRowSortColumnValue) => {
  if(search_after.length < pageNumber){
    search_after.push(lastRowSortColumnValue) ; 
  }
}


nextPageBtn.addEventListener("click", async () => {
  incrementPageNumber() ; 
  const filters = getFiltersAsArray() ; 
  const index_name = getIndexName() ; 
  const relations = getRelationsBetweenFilters() ; 
  const requestData = {size : getSizePerPage(), index_name : index_name, filters : filters, relations : relations, indexToColumnTypeMap : getIndexToColumnMap(), search_after : search_after[pageNumber-2] } ; 
  const flagToResetPagination = false ;
  const parsedData = await getResponseWithThisBody(requestData, flagToResetPagination) ; 
  if(parsedData){
    console.log(`parsed Data : ${parsedData}`) ; 
    let shouldDemolishCurrentFilterAndCreateNewFitler = false ; // While filtering i don't need to re create the filter tab.
    createTable(parsedData, shouldDemolishCurrentFilterAndCreateNewFitler) ; 
  }
  else {
    alert("Table not created : From paginationHandler.js") ; 
    return ; 
  }

  console.log("Search After : ", search_after) ;
})

prevPageBtn.addEventListener("click", async () => {
  decrementPageNumber() ; 
  const filters = getFiltersAsArray() ; 
  const index_name = getIndexName() ; 
  const relations = getRelationsBetweenFilters() ; 
  const requestData = { size: getSizePerPage(), index_name, filters, relations , indexToColumnTypeMap : getIndexToColumnMap()} ;
  if(pageNumber !== 1){
    requestData.search_after = search_after[pageNumber-1] ;
  }
  const flagToResetPagination = false ;
  const parsedData = await getResponseWithThisBody(requestData, flagToResetPagination) ; 
  if(parsedData){
    console.log(`parsed Data : ${parsedData}`) ; 
    let shouldDemolishCurrentFilterAndCreateNewFitler = false ; // While filtering i don't need to re create the filter tab.
    createTable(parsedData, shouldDemolishCurrentFilterAndCreateNewFitler) ; 
  }
  else {
    alert("Table not created : From paginationHandler.js") ; 
    return ; 
  }

  console.log("Search After : ", search_after) ;
})


{/* <label>Select Size</label>
<select id="sizePerPage">
  <option value="100">100</option>
  <option value="200">200</option>
  <option value="300">300</option>
  <option value="400">400</option>
  <option value="500">500</option>
  <option value="1000">1000</option>
  <option value="2000">2000</option>
  <option value="3000">3000</option>
  <option value="4000">4000</option>
  <option value="5000">5000</option>
</select> */}
const getSizePerPage = () => {
  const selectBox = document.querySelector('#sizePerPage') ; 
  return parseInt(selectBox.value) ; 
}