
  function LoadMenuJs() {
    let menuItems = document.querySelectorAll('.header-group .menu-items-main li');

    menuItems.forEach((item) => {
      if (item.classList.contains('has-sub') && !item.hasAttribute('data-bound')) {
        let menuClass = item.getAttribute('child-menu-id');
        let mainHeader = item.closest('.header-group');
        let submenuElement = mainHeader?.querySelector('.' + menuClass);

        if (menuClass && submenuElement) {
          item.addEventListener('click', function () {
            console.log('clicked');
            submenuElement.classList.toggle('active');
            item.classList.toggle('active');
          });

          item.setAttribute('data-bound', 'true'); // mark as bound
        }
      }
    });
  }
  let stickyAdded = false;
  let ActiveClass = false;
  let ElementClonedDetected = false
  function LoadStickyMenuJs() {
     if (document.querySelector('#header-ontop.cloned')) {
      ElementClonedDetected = true;
      let menuItems = document.querySelectorAll('.cloned .header-group .menu-items-main li');
       menuItems.forEach((item) => {
          if (item.classList.contains('has-sub')) {
            let menuClass = item.getAttribute('child-menu-id');
            let mainHeader = document.querySelector('.cloned .header-group');
            let submenuElement = mainHeader?.querySelector('.' + menuClass);
            item.addEventListener('click', function () {
              console.log('clicked cloned')
              if(ActiveClass){
                submenuElement.classList.remove('active');
                item.classList.remove('active');
                ActiveClass = false
              }else{
                submenuElement.classList.add('active');
                item.classList.add('active');
                ActiveClass = true
              }
            });
         }
       })
     }
  }
 
  const stickyInterval = setInterval(() => {
    if (ElementClonedDetected == true) {
      clearInterval(stickyInterval);
      console.log('Sticky menu initialized and interval cleared.');
    }else{
       LoadStickyMenuJs();
    }
  }, 900);

  LoadMenuJs();
