$fh.ready(function () {
  init();
});

function init () {  
  // Register a gloabl with our required languages and inject the strings into the DOM
  initLanguages();
	
	
  // Show the default tab
  $('.default').show();

  // Bind a click event for each tab
  $('.nav_item').each(function () {
    $(this).bind('click', function (e) {
      var mainTitle = $('.pageTitle').text();
      e.preventDefault();
      var targetId = $(this).find('a').attr('href');

      var title = $(this).find('h2').text();

      $('div').removeClass('button_active');
      $(this).addClass('button_active');
      $('.pageTitle').text(title);

      $('.main_view').hide();
      $(targetId).show();            
    });
  });
  

}

 




function setContentPane() {
  // Can function in util.js to get the viewport information
  var viewport = getViewport();

  // Work out the space occupied by the header and footer;
  var headerHeight = $('#header').outerHeight();
  var footerHeight = $('#footer').outerHeight();

  // Calculate the content height
  var contentHeight = viewport.height - (headerHeight + footerHeight);

  var hfc = headerHeight + footerHeight + contentHeight;
  //console.log('v=' + viewport.height + '; h=' + headerHeight + '; f=' + footerHeight + '; c=' + contentHeight + '; h+f+c = ' + hfc);
  
  // Allow for the padding on the content div
  contentHeight = contentHeight - 20;
  $('#content').height(contentHeight);

}



