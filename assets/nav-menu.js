document.addEventListener('DOMContentLoaded',function(){
  let extraColumns = document.querySelectorAll('.sub-item-with-parent');
  let extraColumnsOutput = document.getElementById('extra-columns-display');
  let output = ""
 
  extraColumns.forEach((element)=>{
    output += element
  })
   console.log(output)
// extraColumnsOutput.innerHTML = extraColumns
})