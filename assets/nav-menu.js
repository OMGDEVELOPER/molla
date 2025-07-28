document.addEventListener('DOMContentLoaded',function(){
  let extraColumns = document.querySelectorAll('.extra-columns');
  let extraColumnsOutput = document.getElementById('extra-columns-display');
  console.log(extraColumns)
extraColumnsOutput.innerHTML = extraColumns
})