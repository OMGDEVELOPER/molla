if (!theme.csrfToken) {
  $.ajax({
    type: "GET",
    url: "/admin/themes/"+Shopify.theme.id,
    success: function (data){
      theme.csrfToken = data.split('name="csrf-token"')[1].split(" />")[0].split('"')[1];
    }
  });
}
KT.loadScript('isotope', function(e,l) {});
$(document).on('shown.bs.modal', '#importSectionModal', function (event) {
  if ($('.section-it').length <= 0) {
    $.ajax({
      url:  $('.selector-it').attr('data-include'),
      type: 'GET',
      dataType: 'html',
    })
    .done(function(data) {
      $('.selector-it').append(data).trigger('lazyincludloaded');
    });
  }
});

$(document).on('lazyincludloaded', '.selector-it', function(event) {
  $('.selector-it').isotope({
    // options
    itemSelector: '.section-it',
    layoutMode: 'packery',
    packery: {
      horizontalOrder: true,
      percentPosition: true
    },
    transitionDuration: '.4s',
    filter: '.demo-homep'
  });
})

$(document).on('click', '.sb-filters [data-filter]', function(event) {
  event.preventDefault();
  $('.selector-it').isotope({ filter: $(this).data('filter') });
})
$(document).on('change', '#demo-selector', function(event) {
  event.preventDefault();
  $('.selector-it').isotope({ filter: $(this).val() });
})
var count = 0;
$(document).on('click', '.t4-import-dm-i .t4-import-btn', function (event) {
  event.preventDefault();
  var $this = $(this);
  $('.t4-import-btn').addClass('loading');
  var indexJson = '';
  var settingsJson = '';
  count = 0;
  $.ajax({
    type: "GET",
    url: $this.attr('data-js'),
    success: function (data){
      indexJson = JSON.stringify(data);
      putData('templates/index.json', indexJson);
    }
  });
  $.ajax({
    type: "GET",
    url: $this.attr('data-js').replace('index', 'settings'),
    success: function (data){
      settingsJson = JSON.stringify(data);
      putData('config/settings_data.json', settingsJson);
    }
  });
});
function putData(key, value) {
  $.ajax({
    url: '/admin/api/2022-04/themes/'+Shopify.theme.id+'/assets.json',
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-csrf-token": theme.csrfToken
    },
    type: 'PUT',
    data: {asset: { 'key': key, 'value': value}}
  })
  .done(function() {
    count++;
    if (count == 2) {
      $('.t4-import-btn').removeClass('loading');
      window.top.location.reload();
    }
  });
}

$(document).on('click', '.t4-import-st .t4-import-sc-btn', function (event) {
  event.preventDefault();
  var $this = $(this);
  $('.t4-import-sc-btn').addClass('loading');
  var linkdata = $('.t4-import-dm-i.' + $(this).data('js') + ' .t4-import-btn').data('js');
  var newSection = {};
  var currentJson = {};
  var file = $('#kt_toolkit').attr('data-index');
  $.ajax({
    url: '/admin/api/2022-04/themes/' + Shopify.theme.id + '/assets.json?asset[key]=' + file,
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-csrf-token": theme.csrfToken
    },
    type: 'GET',
    success: function (data){
      currentJson = JSON.parse(data.asset.value);
      console.log(linkdata)
      $.ajax({
        type: "GET",
        url: linkdata,
        success: function (data){
          newSection = data.sections[$this.data('section')];
          var id_new_st = newSection.type + Date.now().toString();
          currentJson.sections[id_new_st] = newSection;
          currentJson.order.push(id_new_st);
          var newdata = JSON.stringify(currentJson);
          putNewSection(file, newdata)
        }
      });
    }
  })
});

function putNewSection(key, value) {
  $.ajax({
    url: '/admin/api/2022-04/themes/'+Shopify.theme.id+'/assets.json',
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-csrf-token": theme.csrfToken
    },
    type: 'PUT',
    data: {asset: { 'key': key, 'value': value}}
  })
  .done(function() {
    $('.t4-import-sc-btn').removeClass('loading');
    window.top.location.reload();
  });
}

function favourites() {
  var stringFavo = localStorage.getItem("t4-favourites");
  if(stringFavo !== null){
    var arrayFavo = stringFavo.split(',');
    var arrayFavo = arrayFavo.reverse();
    $('.count-fv').html(arrayFavo.length)
    $(document).on('lazyincludloaded', '.selector-it', function(event) {
      $.each(arrayFavo, function(index, val) {
        if(val !== ''){
          $('#'+val).addClass('favo');
        }
      });
    });
  }
  $(document).on('click', '.t4-favourites', function (event) {
    event.preventDefault();
    var $this = $(this).parents('.section-it');
    var stringFavo = localStorage.getItem("t4-favourites");
    var arrayFavo = stringFavo !== null ? stringFavo.split(',') : new Array;
    if(!arrayFavo.includes($this.attr('id'))){
      arrayFavo[arrayFavo.length] = ($this.attr('id'));
      localStorage.setItem("t4-favourites", arrayFavo.toString());
      $(this).addClass('favo');
    } else {
      if(stringFavo !== null){ 
        var arrayFavo = stringFavo.split(',');
      }
      arrayFavo = $.grep(arrayFavo, function(value) {
        return value != $this.attr('id');
      });
      arrayFavo = $.trim(arrayFavo);
      if (arrayFavo.length == 0) {
        localStorage.removeItem("t4-favourites");
      } else {
        localStorage.setItem("t4-favourites", arrayFavo.toString());
      }
      $(this).removeClass('favo');
    }
  });
};
favourites();


// ----- APP -----

// var count = 0;
// $(document).on('click', '.t4-import-dm-i .t4-import-btn', function (event) {
//   event.preventDefault();
//   var $this = $(this);
//   $('.t4-import-btn').addClass('loading');
//   var indexJson = '';
//   var settingsJson = '';
//   count = 0;
//   $.ajax({
//     type: "GET",
//     url: $this.attr('data-js'),
//     success: function (data){
//       indexJson = JSON.stringify(data);
//       putData('templates/index.json', indexJson);
//     }
//   });
//   $.ajax({
//     type: "GET",
//     url: $this.attr('data-js').replace('index', 'settings'),
//     success: function (data){
//       settingsJson = JSON.stringify(data);
//       putData('config/settings_data.json', settingsJson);
//     }
//   });
// });
// function putData(key, value) {
//   $.ajax({
//     url: '/admin/api/2022-04/themes/'+Shopify.theme.id+'/assets.json',
//     dataType: 'json',
//     headers: {
//       'X-Shopify-Access-Token': theme.accessToken
//     },
//     contentType: 'application/json',
//     beforeSend: function(request) {
//       request.setRequestHeader('X-Requested-With', {toString: function(){ return ''; }});
//     },
//     type: 'PUT',
//     data: JSON.stringify({asset: { 'key': key, 'value': value}}),
//   })
//   .done(function() {
//     count++;
//     if (count == 2) {
//       $('.t4-import-btn').removeClass('loading');
//       window.top.location.reload();
//     }
//   });
// }