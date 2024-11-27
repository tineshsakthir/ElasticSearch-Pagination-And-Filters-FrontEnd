const createTopFieldValueCountGraph = (headers) => {
  const select  = document.getElementById("select-field-for-graph") ; 
  headers.forEach((header) => {
    const option = document.createElement("option") ;
    option.value = header ; 
    option.textContent = header ; 
    select.appendChild(option) ; 
  }) ;

  // make the div visible
  document.querySelector("div[id='chart_div']").style.display = "block" ;

  createGraph() ;
}




const createGraph = async () => {
  // let data = [] ; 
  // let labels = [] ; 

  const fieldNameForGraph = document.getElementById("select-field-for-graph") ;
  const fieldsCountForGraph = document.getElementById("select-fields-count-for-graph") ;
  const topOrBottomFields = document.getElementById("select-top-or-bottom-fields") ; 

  const fieldName = fieldNameForGraph.value ;
  const fieldsCount = fieldsCountForGraph.value ;
  const topOrBottom = topOrBottomFields.value ;
  const sortOrder = topOrBottom.toLowerCase() === "top" ? "desc" : "asc" ;

  console.log(fieldName) ;
  console.log(fieldsCount) ;

  // make an api request to the endpoint"localhost:8080//getTopOrBottomFieldValueCounts" with the body as 
  /* 
  {
    "index_name" : "mailtrace_index",
    "field_name" : "RECEIVED" , 
    "top_results_count" : 10 ,
    "sort_order"  : "desc"
}
  */

const requestData = {
  "index_name" : getIndexName(), 
  "field_name" : fieldName ,
  "top_results_count" : fieldsCount ,
  "sort_order" : sortOrder,
  "indexToColumnTypeMap" : getIndexToColumnMap() 
}

const parsedGraphData = await makeTopOrBottomFieldValueCountRequest(requestData) ; 
console.log("Graph Date : ", parsedGraphData) ;

const bucket = parsedGraphData.aggregations.value_counts.buckets;
console.log("Buckets : ", bucket) ;

let dataFromBackend = [] ; 
let labelsFromBackend = [] ;

bucket.forEach((element) => {
  labelsFromBackend.push(element.key) ;
  dataFromBackend.push(element.doc_count) ;
}) ; 


console.log("Labels : ", labelsFromBackend) ;
console.log("Data : ", dataFromBackend) ;

  setTimeout(() => {
    const divForCanvas = document.getElementById("div-for-canvas") ;
    divForCanvas.innerHTML = "" ; // destroy the previous canvas if any
    const canvas = document.createElement("canvas") ;
    canvas.id = "myChart" ;
    divForCanvas.appendChild(canvas) ;

    const ctx = document.getElementById('myChart');


    // version 1 : 


    // new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: labelsFromBackend,
    //     datasets: [{
    //       label: `${fieldName == "SENDER" || fieldName == "RECIPIENT" ? "No. of Mails" : "Count"}`,
    //       data: dataFromBackend,
    //       backgroundColor: [ 'rgba(54, 162, 235, 0.2)'],
    //       borderColor: ['rgba(54, 162, 235, 1)'],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: true,
    //     aspectRatio: 2.5,
    //     plugins: {
    //       title: {
    //         display: true,
    //         text: `${topOrBottom.toUpperCase()} ${fieldsCount} ${fieldName} values`
    //       },
    //       legend: {
    //         position: 'top'
    //       }
    //     },
    //     scales: {
    //       x: {
    //         barPercentage: 0.5,
    //         categoryPercentage: 0.8,
    //         title: {
    //           display: true,
    //           text: `${fieldName}`
    //         }
    //       },
    //       y: {
    //         beginAtZero: true,
    //         title: {
    //           display: true,
    //           text: `${fieldName == "SENDER" || fieldName == "RECIPIENT" ? "No. of Mails" : "Count"}`
    //         }
    //       }
    //     },
    //     layout: {
    //       padding: {
    //         left: 10,
    //         right: 10,
    //         top: 20,
    //         bottom: 10
    //       }
    //     },
    //     animation: {
    //       duration: 1500,
    //       easing: 'easeInOutBounce'
    //     }
    //   }
    // });

    // version 2 :

    // new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: labelsFromBackend,
    //     datasets: [{
    //       label: (fieldName == "SENDER" || fieldName == "RECIPIENT") ? "No. of Mails" : "Count",
    //       data: dataFromBackend,
    //       backgroundColor: ['rgba(54, 162, 235, 0.2)'],
    //       borderColor: ['rgba(54, 162, 235, 1)'],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: true,
    //     aspectRatio: 2.5,
    //     plugins: {
    //       title: {
    //         display: true,
    //         text: `${topOrBottom.toUpperCase()} ${fieldsCount} ${fieldName}`
    //       },
    //       legend: {
    //         position: 'top'
    //       },
    //       tooltip: {
    //         callbacks: {
    //           title: function(tooltipItems) {
    //             // Show full label in tooltip
    //             return labelsFromBackend[tooltipItems[0].dataIndex];
    //           }
    //         }
    //       }
    //     },
    //     scales: {
    //       x: {
    //         barPercentage: 0.5,
    //         categoryPercentage: 0.8,
    //         title: {
    //           display: true,
    //           text: `${fieldName}`
    //         },
    //         ticks: {
    //           callback: function (value, index, values) {
    //             const label = labelsFromBackend[index];
    
    //             // Dynamically calculate maxLabelLength based on the chart's rendering width
    //             const chartWidth = this.chart.width; // Access the chart's width dynamically
    //             const maxLabelLength = Math.floor(chartWidth / (labelsFromBackend.length * 8));
    
    //             return label.length > maxLabelLength
    //               ? `${label.slice(0, maxLabelLength-1)}...`    // only if I do maxLabelLength-1 or -2 or -3,..... the lable is displayed properly for particularly  "RECIPIENT" field
    //               : label;
    //             // return `${label.slice(0, 8)}...` ;
    //           },
    //           maxRotation: 0, // Prevent label rotation
    //           minRotation: 0  // Ensure horizontal alignment
    //         }
    //       },
    //       y: {
    //         beginAtZero: true,
    //         title: {
    //           display: true,
    //           text: (fieldName == "SENDER" || fieldName == "RECIPIENT") ? "No. of Mails" : "Count"
    //         }
    //       }
    //     },
    //     layout: {
    //       padding: {
    //         left: 10,
    //         right: 10,
    //         top: 20,
    //         bottom: 10
    //       }
    //     },
    //     animation: {
    //       duration: 1500,
    //       easing: 'easeInOutBounce'
    //     }
    //   }
    // });



    // version 3 :


    new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labelsFromBackend,
    datasets: [{
      label: (fieldName == "SENDER" || fieldName == "RECIPIENT") ? "No. of Mails" : "Count",
      data: dataFromBackend,
      backgroundColor: ['rgba(54, 162, 235, 0.2)'],
      borderColor: ['rgba(54, 162, 235, 1)'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    plugins: {
      title: {
        display: true,
        text: `${topOrBottom.toUpperCase()} ${fieldsCount} ${fieldName}`,
        font: {
          weight: 'bold', // Makes the title bold
          size: 16 // Font size for the title
        }
      },
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          title: function(tooltipItems) {
            // Show full label in tooltip
            return labelsFromBackend[tooltipItems[0].dataIndex];
          }
        }
      }
    },
    scales: {
      x: {
        barPercentage: 0.5,
        categoryPercentage: 0.8,
        title: {
          display: true,
          text: `${fieldName}`,
          font: {
            weight: 'bold', // Makes axis title bold
            size: 14 // Font size for the x-axis title
          }
        },
        ticks: {
          callback: function (value, index, values) {
            const label = labelsFromBackend[index];
            const chartWidth = this.chart.width; // Access the chart's width dynamically
            const maxLabelLength = Math.floor(chartWidth / (labelsFromBackend.length * 8));
            return label.length > maxLabelLength
              ? `${label.slice(0, maxLabelLength - 1)}...`
              : label;
          },
          maxRotation: 0,
          minRotation: 0,
          // font: {
          //   weight: 'bold', // Bold font for tick labels
          //   size: 12 // Font size for tick labels
          // }
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: (fieldName == "SENDER" || fieldName == "RECIPIENT") ? "No. of Mails" : "Count",
          font: {
            weight: 'bold', // Makes axis title bold
            size: 14 // Font size for the y-axis title
          }
        },
        ticks: {
          // font: {
          //   weight: 'bold', // Bold font for tick labels
          //   size: 12 // Font size for tick labels
          // }
        }
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 20,
        bottom: 10
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutBounce'
    }
  }
});



    
  }, 0);

}


document.getElementById("submit-graph-info-to-regenerate").addEventListener("click", async () => {
  console.log("Submit Button Clicked") ;
  await createGraph() ;
}) ; 