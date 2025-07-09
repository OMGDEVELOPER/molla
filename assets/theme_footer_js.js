theme.psjson_lib = new Array;
theme.gadget = {
  cookies_infor: false,
  newsletter_popup: false
}; 
theme.extensions = { 
  ktjs_product_sg: '//cdn.shopify.com/s/files/1/0731/0003/4384/t/4/assets/ktjs_product_sg.min.js?v=103641290052267416971682038074',
  ktjs_flts_or: false,
  workerktlz: '//cdn.shopify.com/s/files/1/0731/0003/4384/t/4/assets/workerktlz.min.js?v=98787341156294384461682038076'
};

theme.embedResponPlayer = ['.product-desc-content iframe[src*="youtube.com"]', '.product-desc-content iframe[src*="vimeo.com"]', '.blog-content iframe[src*="youtube.com"]', '.blog-content iframe[src*="vimeo.com"]', '.page-content iframe[src*="youtube.com"]', '.page-content iframe[src*="vimeo.com"]', '.imgs__banner_flexible iframe[src*="youtube.com"]', '.imgs__banner_flexible iframe[src*="vimeo.com"]'];

const headDocument = document.head;
const bodyDocument = document.body;
const custom_css = document.getElementById("custom-css");
const firstLink = document.getElementsByTagName("link")[0];

if (theme.crr_library.length == 0) {
  localStorage.setItem('library','[]');
}

window._handleize = function(str){
  str = (str+'').toLowerCase();
  var str_ = str.replace(/'|"|\(|\)|\[|\]/g,"").replace(/[\s\x21-\x2f\x3a-\x40\x7b-\x7f^`\\[\]]+/g,"-").replace(/\W+/g,"-").replace(/^-+|-+$/g,"");
  return str_ == '' ? str : str_;
};
window._snakeCase = function(str){
  str = (str+'').toLowerCase();
  var str_ = str.replace(/'|"|\(|\)|\[|\]/g,"").replace(/[\s\x21-\x2f\x3a-\x40\x7b-\x7f^`\\[\]]+/g,"_").replace(/\W+/g,"_").replace(/^-+|-+$/g,"");  
  return str_ == '' ? str : str_;
};
$.getScriptCached = function(url, callback) {return $.ajax({url: url,dataType: "script",cache: true}).done(callback).fail(function(){console.log("Error loading js " + url);return true;})};
"undefined" == typeof KT && (KT = {});
KT.checkVersion = function(name_item){
  name_item = name_item.split('/')[name_item.split('/').length - 1];
  var version = false;
  if(!localStorage.getItem(name_item)){
    version = true; 
  }
  var libs_ver = JSON.parse(theme.crr_library);
  if (libs_ver.length && libs_ver.findIndex(function(obj){ return obj.name == name_item}) !== -1) { 
    var objIndex = libs_ver.findIndex(function(obj){ return obj.name == name_item});
    if (parseFloat(libs_ver[objIndex].ver) !== theme.library) {
      libs_ver[objIndex].ver = theme.library;
      localStorage.setItem('library',JSON.stringify(libs_ver));
      version = true;
    }
  } else if(libs_ver.findIndex(function(obj){ return obj.name == name_item}) === -1){
    version = true;
  }
  return version; 
};
KT.pushVersion = function(name_item){
  var libs_ver = JSON.parse(theme.crr_library);
  if (libs_ver.length && libs_ver.findIndex(function(obj){ return obj.name == name_item}) !== -1) { 
    var objIndex = libs_ver.findIndex(function(obj){ return obj.name == name_item});
    if (parseFloat(libs_ver[objIndex].ver) !== theme.library) {
      libs_ver[objIndex].ver = theme.library;
      localStorage.setItem('library',JSON.stringify(libs_ver));
    }
  }
  else {
    var obj = {
      name : name_item,
      ver : theme.library
    };
    libs_ver.push(obj);
    localStorage.setItem('library',JSON.stringify(libs_ver));
  }
  theme.crr_library = localStorage.getItem('library') || '[]';
};
KT.themeScripts = [];
KT.loadScript = function(id, callback) {
  let css_url = "";
  let js_url = "";
  let done = false;
  let pos = 0;
  if(KT.themeScripts.includes(id)){
    checkExists(id, js_url)
  }
  else {
    KT.themeScripts.push(id);
    if(id == 'magnific-popup'){
      css_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/magnific-popup.min.css?v=57525974320827922071682038075";
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/jquery.magnific-popup.min.js?v=184369421263510081681682038074";
    }
    else if(id == 'threesixty'){
      css_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/threesixty.min.css?v=87491138002852594671682038076";
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/threesixty.min.js?v=128470061555666291351682038076";
    }
    else if(id == 'photo-swipe'){
      css_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/photoswipe-ui.min.css?v=50182594455179234001682038075";
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/photoswipe-ui.min.js?v=89145670203526742621682038075";
    }
    else if(id == 'YTPlayer'){
      css_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/jquery.mb.YTPlayer.min.css?v=146281773175456831481682038074";
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/jquery.mb.YTPlayer.min.js?v=126032928401590294681682038074";
    }
    else if(id == 'swiper'){ 
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/swiper.min.js?v=119301780810473861691682038075";
    }
    else if(id == 'pjax'){
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/jquery.pjax.min.js?v=96510263879411166301682038074";
    }
    else if(id == 'imagesloaded'){
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/imagesloaded.pkgd.min.js?v=147859183389955144291682038074";
    }
    else if(id == 'isotope'){
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/isotope-plus.pkgd.min.js?v=139088845446234680461682038074";
    }
    else if(id == 'countdown'){
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/jquery.countdown.min.js?v=116994322243221080931682038074";
    }
    else if(id == 'countto'){
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/jquery.countTo.min.js?v=148382760188409556611682038074";
    }
    else if(id == 'moment'){
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/moment.min.js?v=87295841450213414131682038075";
    }
    else if(id == 'moment-zone'){
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/moment-timezone-with-data.min.js?v=28936048893783064501682038075";
    }
    else if(id == 'momentlocale'){
      if (shopLocale === 'en') {handleLoad();return}
      js_url = "//cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/"+shopLocale+".js";
    }
    else if(id == 'zoom'){
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/jquery.zoom.min.js?v=127655014540499679121682038074";
    }
    else if(id == 'parallax'){
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/jquery.parallax_mousemove.js?v=79184343061227765141682038074";
    }
    else if(id == 'tippy'){
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/tippy-bundle.umd.min.js?v=138375119365593622911682038076";
    }
    else if(id == 'color_sw'){
      css_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/swatch-color.css?v=87112208204652398511682038075";
    }
    else if(id == 'animate'){
      css_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/animate.min.css?v=20349278028107590831682038073";
    }
    else if(id == 'molla_icon'){
      css_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/molla-icon.css?v=176179438066325234261682038075";
    }
    else if(id == 'molla_font'){
      css_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/theme.font.css?v=20145708613727956691682038115";
    }
    else if(id == 'google_f'){
      css_url = theme.link_google_f;
    }
    else if(id == 'plyr'){
      css_url = "//cdn.shopify.com/shopifycloud/shopify-plyr/v1.1/shopify-plyr.css";
      js_url = "//cdn.shopify.com/shopifycloud/shopify-plyr/v1.0/shopify-plyr.en.js";
    }
    else if(id == 'shopify-xr'){
      js_url = "//cdn.shopify.com/shopifycloud/shopify-xr-js/v1.0/shopify-xr.en.js";
    }
    else if(id == 'model-viewer-ui'){
      css_url = "//cdn.shopify.com/shopifycloud/model-viewer-ui/assets/v1.0/model-viewer-ui.css";
      js_url = "//cdn.shopify.com/shopifycloud/model-viewer-ui/v1.0/model-viewer-ui.en.js";
    }
    else if(id == 'theme-alert'){
      js_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/theme-alert.js?v=28077311757223122841682038115";
    }
    else if(id == 'qs-css'){
      css_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/kt_quick-shop.min.css?v=104322324690846594621682038074";
      pos = 1;
    }    
    else if(id == 'edit-opts-css'){
      css_url = "\/\/cdn.shopify.com\/s\/files\/1\/0731\/0003\/4384\/t\/4\/assets\/kt-c_edit-opts.min.css?v=172916895456413623071682038074";
      pos = 1;
    }
    done = false;
    ajaxLoad(id, css_url, js_url, pos);
  }
  function ajaxLoad(name, css_url, js_url, pos){
    if(css_url !== ''){
      var scr_css = document.createElement('link');
      scr_css.type = 'text/css';
      scr_css.rel = "stylesheet";
      scr_css.cache = true;
      scr_css.id = name+'-css';
      scr_css.href = css_url;
      scr_css.onerror = function() {
        console.log("Error loading css " + this.href);
      };
      if (pos == 1) {
        headDocument.insertBefore(scr_css, custom_css);
      } else {
        headDocument.insertBefore(scr_css, firstLink);
      }
    }
    if(js_url !== ''){
      $.getScriptCached(js_url, function() {
        handleLoad();
      })
      // var scr_js = document.createElement('script');
      // scr_js.type = 'text/javascript';
      // scr_js.cache = true;
      // scr_js.async = true;
      // scr_js.src = js_url;
      // scr_js.id = name;
      // scr_js.onload = checkExists(name, js_url);
      // scr_js.onerror = function() {
      //   console.log("Error loading js " + this.src);
      // };
      // bodyDocument.appendChild(scr_js);
    }
  }
  function checkExists(id, js_url){
    var callbackTimer = setInterval(function() {
      if (id == 'swiper' && typeof Swiper === 'function'){
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if (id == 'owl-carousel' && typeof $.fn.owlCarousel === 'function'){
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if (id == 'slick-slide' && typeof $.fn.slick === 'function'){
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if (id == 'moment' && typeof moment === 'function'){
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if (id == 'moment-zone' && typeof moment.tz === 'function'){
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if (id == 'momentlocale' && moment.locale() == shopLocale){
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }     
      if (id == 'magnific-popup' && typeof $.fn.magnificPopup === 'function'){
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if (id == 'imagesloaded' && typeof $.fn.imagesLoaded === 'function'){
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if (id == 'isotope' && typeof $.fn.isotope === 'function'){
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if (id == 'YTPlayer' && typeof jQuery.fn.YTPlayer === 'function'){
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if (id == 'parallax' && typeof $.fn.mouseMove === 'function'){
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if (id == 'countdown' && typeof $.fn.countdown === 'function'){
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if (id == 'countto' && typeof $.fn.countTo === 'function'){
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if (id == 'magnific-popup' && typeof $.fn.magnificPopup == 'function'){
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if (id == 'zoom' && typeof $.fn.zoom == 'function'){
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if(id === 'pjax' && typeof $.fn.pjax == 'function') {
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if(id === 'photo-swipe' && typeof PhotoSwipe == 'function') {
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if(id === 'threesixty' && typeof $.fn.ThreeSixty == 'function') {
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if(id === 'tippy' && typeof tippy == 'function') {
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if(id === 'plyr' && typeof Shopify.Plyr == 'function') {
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if(id === 'shopify-xr' && typeof ShopifyXR !== 'undefined') {
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if(id === 'model-viewer-ui' && typeof Shopify.ModelViewerUI == 'function' ) {
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
      if(id === 'theme-alert' && typeof KT_Alert !== "undefined" ) {
        handleLoad();
        clearInterval(callbackTimer);
        return true;
      }
    }, 100);
  }
  function handleLoad() {
    if (!done) {
      done = true;
      callback(js_url, "ok");
    }
  }
}