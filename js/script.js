$(document).ready(function(){
$( "select" ).change(function() {
  $( "select option:selected" ).each(function(){
    $('.container').addClass("load");
    $('.logo').addClass('nyt');
    $('.top').addClass('header11');
    $('.footext').addClass('footer2').removeClass('footext');
    
    var url = "https://api.nytimes.com/svc/topstories/v2/";
    url += $(this).val();
    url += '.json';
    url += '?' + $.param({
      'api-key': "b8f61cd26d6e4984b772baf23c335f26"
    });

    $.ajax({
      url: url,
      method: 'GET',
    })
 
    .done(function(data) {
      $('.container').removeClass("load");
      $('.list').remove();
      var newstory = '';
      var count = 0;
      $.each(data.results, function(key, value){
        if(value.multimedia.length>0){
          if(count < 12){
          newstory += '<li class="list">';
          newstory += '<a href="' +value.url+ '" target="_blank">';
          newstory += '<div class="story" style="background-image:url('+value.multimedia[4].url+')">';
          newstory += '</div>';
          newstory += '</a>';
          newstory += '<p class="description">' +value.abstract+ '</p>';
          newstory += '</li>';
          count++;
        }
        }
      });
      
        $('.articles').append(newstory);
      })

  });
});

// filter, make an array, use slice
// take selectric raw min and make new file
})  


// if(('select option:selected').contains('Sections ...')){
//         $('.logo').removeClass('nyt');
//         $('.top').removeClass('header11');
//         $('.footer2').addClass('footext').removeClass('footer2');
//         $('.container').removeClass("load")
//       }