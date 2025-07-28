document.addEventListener('DOMContentLoaded', function () {
  const extraColumns = document.querySelectorAll('.sub-item-with-parent');
  const extraColumnsOutput = document.getElementById('extra-columns-display-container');

  const groupedOutput = {};

  // Group items by parent-menu-id and target-id
  extraColumns.forEach((element) => {
    const parentId = element.getAttribute('parent-menu-id');
    const targetId = element.getAttribute('target-id');
    const html = element.outerHTML;

    if (parentId) {
      if (!groupedOutput[parentId]) groupedOutput[parentId] = [];
      groupedOutput[parentId].push(html);
    }

    if (targetId) {
      if (!groupedOutput[targetId]) groupedOutput[targetId] = [];
      groupedOutput[targetId].push(html);
    }
  });

  // Build the output
  let output = "";

  for (let groupId in groupedOutput) {
    output += `
      <div class="extra-columns" menu-id="${groupId}" style="display:none;">
        <div class="item__1__group">
          <div class="submenu__heading">
            <h3 class="heading__1">Group: ${groupId}</h3>
          </div>
          <ul class="lvl-1 extra-columns">
            ${groupedOutput[groupId].join('')}
          </ul>
        </div>
      </div>
    `;
  }

  // Inject into container
  if (extraColumnsOutput) {
    extraColumnsOutput.innerHTML = output;
  }

  // Add click listeners
  const triggerExtraItems = document.querySelectorAll(`#extra-columns-display-container .lvl-1.extra-columns > .sub-item-with-parent`);
  const SubmenuParentItem = document.querySelectorAll(`#render-submenus-parent > div.level-2`);

  triggerExtraItems.forEach((element) => {
    element.addEventListener('click', function (e) {
      const target = e.currentTarget; // safer than e.target
      const targetId = target.getAttribute('target-id');
      const blockId = target.getAttribute('block-id');

      if (!targetId || !blockId) return;

      resetSubActiveClass();
      target.classList.add('activeMenuItem');

      const submenu = document.querySelector(`.lvl-2[menu-name="${targetId}-${blockId}"]`);
      if (submenu) submenu.style.display = "block";
    });
  });

  function resetSubActiveClass() {
    SubmenuParentItem.forEach((element) => {
      element.classList.remove('activeMenuItem');
      element.style.display = "none";
    });
  }
});
