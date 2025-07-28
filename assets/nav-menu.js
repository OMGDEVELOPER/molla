document.addEventListener('DOMContentLoaded', function() {
  let extraColumns = document.querySelectorAll('.sub-item-with-parent');
  let extraColumnsOutput = document.getElementById('extra-columns-display');
  let groupedOutput = {};

  // Group items by their parent-menu-id
  extraColumns.forEach((element) => {
    const parentId = element.getAttribute('parent-menu-id');
    if (parentId) {
      if (!groupedOutput[parentId]) {
        groupedOutput[parentId] = [];
      }
      groupedOutput[parentId].push(element.outerHTML); // Store the HTML string
    }
  });

  // Build final output HTML string
  let output = "";
  for (let parentId in groupedOutput) {
    output += `<div class="grouped-submenu" data-parent-id="${parentId}">`;
    output += `<h3>Parent ID: ${parentId}</h3>`;
    output += `<ul class="submenu-group">`;
    groupedOutput[parentId].forEach(itemHtml => {
      output += itemHtml;
    });
    output += `</ul>`;
    output += `</div>`;
  }

  // Inject the HTML
  extraColumnsOutput.innerHTML = output;
});
