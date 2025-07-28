document.addEventListener('DOMContentLoaded', function() {
  let extraColumns = document.querySelectorAll('.sub-item-with-parent');
  let extraColumnsOutput = document.getElementById('extra-columns-display');
  let output = "";

  extraColumns.forEach((element) => {
    output += element.outerHTML; // or use innerHTML if you only want inside content
  });

  console.log(output);
  // Now insert the combined HTML into the target container
  extraColumnsOutput.innerHTML = output;
});
