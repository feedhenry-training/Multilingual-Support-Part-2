var lang;

function initLanguages(){
  renderPicker();
  
  // Try 1. Get from cloud
  $fh.act({
    act: 'buildLanguages'
  }, function (result) {
    lang = result;
    $fh.data( {act:'save', key:'lang', val:JSON.stringify(lang)} );
    updateLanguage(def);
  }, function (code, errorprops, params) {
    // Try 2. Failed to get lang from server. Probably offline - grab from our local datastore.
    $fh.data({
      key: 'lang'
    }, function (res) {
      // Check if we got back stored data
      if( null === res.val ) {
        // Doesn't exist in local datastore. 
        // Try 3: Build it locally.
        lang = buildAllLanguages(); // Set the global variable to our built languages
        updateLanguage(def); // Update the language for the first time to our default
        $fh.data( {act:'save', key:'lang', val:JSON.stringify(lang)} );
      }
      else {
        // Successfully retrieved from local storage, let's use this.
        lang = JSON.parse(res.val);
        updateLanguage(def);
        // Store this in local keystore
      }
    }, function (error) {
      // An error with the datastore.
      // Try 3: Build it locally. 
      lang = buildAllLanguages(); // Set the global variable to our built languages
      updateLanguage(def); // Update the language for the first time to our default
      $fh.data( {act:'save', key:'lang', val:JSON.stringify(lang)} );
    })
  });
}  

function changeLanguage(form){
  var lCode = form.options[form.selectedIndex].value;
  updateLanguage(lCode);
}
function updateLanguage(l){
  var newLanguage = lang[l]; // Look up the required language in our global	
  for (id in newLanguage){ // Iterate over key and value pairs
    if (newLanguage.hasOwnProperty(id)){
      $("#" + id).html(newLanguage[id]); // A jquery alternative to the above
    }
  }
}

function renderPicker(){
  var picker = $("#fh_lang_picker");
  if (picker){ 
    for (l in languages){
      if (languages.hasOwnProperty(l)){
        var option = document.createElement("option");
        option.value = languages[l];
        option.innerHTML = languages[l];
        $(picker).append(option);
      }
    }

  }
}
