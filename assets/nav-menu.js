document.addEventListener('DOMContentLoaded', function () {
  const extraColumns = document.querySelectorAll('.sub-item-with-parent');
  const extraColumnsOutput = document.getElementById('extra-columns-display-container'); 

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
    document.querySelector(`.submenu__items li[menu-id="${parentId}"]`).classList.add('submenu-with-children')
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
  let currentMenuActive = 0;
  
  extraColumnsOutput.innerHTML = output;
  const triggerExtraItems = document.querySelectorAll(`.extra-columns > li`);
  const extraColumnsContainer = document.querySelector(`.extra-columns-container`);
  const SubmenuParentItem = document.querySelectorAll(`#render-submenus-parent > div.level-2`);
    triggerExtraItems.forEach((element)=>{
      element.addEventListener('click',function(e){
        if(e.target.classList.contains('submenu-items-name')){
          resetSubActiveClass();
          // e.target.classList.add('activeMenuItem')
        }
        let parentItem = e.target.closest('.item__1__group');
        console.log('parent item triggered');
        
        if(parentItem.classList.contains('hidden')){
          parentItem.classList.remove('hidden')
        }else{
          if(window.innerWidth < 768){
            parentItem.classList.add('hidden')
          }
        }
        
       let targetId =  e.target.getAttribute('target-id')
       let blockId = e.target.getAttribute('block-id')
       currentMenuActive = e.target.getAttribute('submenu-order');
       console.log(currentMenuActive)
        if(currentMenuActive == 3){
          // document.querySelector('.item__1 ').style.display = 'none'
          document.querySelector('.item__1 ').classList.add('hidden')
        }else{
          // document.querySelector('.item__1 ').style.display = 'block'
          document.querySelector('.item__1 ').classList.remove('hidden')
        }
      if(targetId){
       document.querySelector(`.lvl-2[menu-name="${targetId}-${blockId}"]`).style.display = "block"
      }
      })
    })
  function resetSubActiveClass() {
    SubmenuParentItem.forEach((element)=>{
      element.classList.remove('activeMenuItem')
      element.style.display = "none"
    })
  }
});
