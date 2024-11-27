let pageNumber = 1 ; 
let totalPages = 0 ; 
let totalHits = 0 ;

let search_after = [] ; 
let search_after_id_array = [] ; 

const setTotalPages = (totalPages) => {
  totalPages = totalPages ; 
} 

const setTotalHits = (totalHits) => {
  totalHits = totalHits ; 
  document.getElementById("total-hits").textContent = totalHits ;
  document.getElementById("hits-div").style.display = "block"  ;
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
  search_after_id_array = [] ;
  handleViewOfButtons() ;
}


const addLastRowSortColumnValueToSearchAfterArray = (lastRowSortColumnValue) => {
  if(search_after.length < pageNumber){
    search_after.push(lastRowSortColumnValue) ; 
  }
}

const addLastRowIdToSearchAfterIdArray = (lastElementId) => { 
  if(search_after_id_array.length < pageNumber){
    search_after_id_array.push(lastElementId) ;
  }
}


nextPageBtn.addEventListener("click", async () => {
  disableButtons() ;
  incrementPageNumber() ; 
  const filters = getFiltersAsArray() ; 
  const index_name = getIndexName() ; 
  const relations = getRelationsBetweenFilters() ; 
  console.log("search After Value : " ,  search_after[pageNumber-2] ) ; 
  const requestData = {size : getSizePerPage(), index_name : index_name, filters : filters, relations : relations, indexToColumnTypeMap : getIndexToColumnMap(), search_after : search_after[pageNumber-2], search_after_id: search_after_id_array[pageNumber-2], pageNumber : pageNumber} ; 
  const flagToResetPagination = false ;
  const parsedData = await getResponseWithThisBody(requestData, flagToResetPagination) ; 
  if(parsedData.length){
    nextPageBtn.style.display = "block" ;
  } else {
    nextPageBtn.style.display = "none" ;
  }

  if(parsedData){
    console.log(`parsed Data : ${parsedData}`) ; 
    let shouldDemolishCurrentFilterAndCreateNewFitler = false ; // While filtering i don't need to re create the filter tab.
    createTable(parsedData, shouldDemolishCurrentFilterAndCreateNewFitler) ; 
  }
  else {
    alert("Table not created : From paginationHandler.js") ; 
    return ; 
  }

  currentPaginationStatePrinter() ;
  enableButtons() ;
})

prevPageBtn.addEventListener("click", async () => {
  disableButtons() ;
  decrementPageNumber() ; 
  const filters = getFiltersAsArray() ; 
  const index_name = getIndexName() ; 
  const relations = getRelationsBetweenFilters() ; 
  const requestData = { size: getSizePerPage(), index_name: index_name , filters: filters, relations : relations, indexToColumnTypeMap : getIndexToColumnMap(), pageNumber : pageNumber} ;
  if(pageNumber !== 1){
    requestData.search_after = search_after[pageNumber-2] ;
    requestData.search_after_id = search_after_id_array[pageNumber-2] ;
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
  currentPaginationStatePrinter() ;
  enableButtons() ;
})

const disableButtons = () => {
  nextPageBtn.style.disabled = true ;
  prevPageBtn.style.disabled = true ;
}

const enableButtons = () => {
  nextPageBtn.style.disabled = false ;
  prevPageBtn.style.disabled = false ;
}


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



const currentPaginationStatePrinter = () => {
  console.log("*************************************************") ;
  console.log("Page Number : ", pageNumber) ; 
  console.log("Total Pages : ", totalPages) ; 
  console.log("Total Hits : ", totalHits) ; 
  console.log("Search After : ", search_after) ; 
  console.log("Search After Id Array : ", search_after_id_array) ; 
  console.log("*************************************************") ;
}