document.addEventListener('DOMContentLoaded', function () {
  const extraColumns = document.querySelectorAll('.sub-item-with-parent');
  const extraColumnsOutput = document.getElementById('extra-columns-display-container'); // Outer container to inject into

  const groupedOutput = {};

  // Group items by parent-menu-id
  extraColumns.forEach((element) => {
    const parentId = element.getAttribute('parent-menu-id');
    if (parentId) {
      if (!groupedOutput[parentId]) {
        groupedOutput[parentId] = [];
      }
      groupedOutput[parentId].push(element.outerHTML);
    }
  });

  // Build and inject full HTML structure for each group
  let output = "";

  for (let parentId in groupedOutput) {
    output += `
      <div class="extra-columns" menu-id="${parentId}" style="display:none;">
        <div class="item__1__group">
          <div class="submenu__heading">
            <h3 class="heading__1">Group: ${parentId}</h3>
          </div>
          <ul class="lvl-1 extra-columns">
            ${groupedOutput[parentId].join('')}
          </ul>
        </div>
      </div>
    `;
  }

  extraColumnsOutput.innerHTML = output;
  const triggerExtraItems = document.querySelectorAll(`.extra-columns > li`);
    triggerExtraItems.forEach((element)=>{
      element.addEventListener('click',function(){
        console.log('clicked')
      })
    })
});
