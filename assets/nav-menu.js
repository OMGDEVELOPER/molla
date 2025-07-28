document.addEventListener('DOMContentLoaded',function(){
  let extraColumns = document.querySelectorAll('.sub-item-with-parent');
  let extraColumnsOutput = document.getElementById('extra-columns-display');
  console.log(extraColumns)
extraColumnsOutput.innerHTML = extraColumns
})