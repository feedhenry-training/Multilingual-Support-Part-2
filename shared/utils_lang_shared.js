function buildAllLanguages(){ // Takes the language files & builds them into an object
  var ret = {};
  for (var i=0; i<languages.length; i++){
    var clIndex = languages[i]; // Current language index: Language identifier string, e.g. "en_gb"
    var clValue = this[clIndex]; // Current language value. Look for a global by the name clIndex, e.g. this["en_gb"]
    ret[clIndex] = clValue; // Append this to our return object with the clIndex as the array key, e.g. ret[en_gb] = clValue;
  }
  return ret;
}