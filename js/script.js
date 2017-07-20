// $("#album-search").on('submit', function(){
//   var name = $('#artist-name').val().replace(' '+'+');
//   var site = 'https://itunes.apple.com/search?entity=album&limit=6&term=' + name;
  
//   $.ajax({
//     method: 'GET',
//     dataType: 'jsonp',
//     url: site
//     }) 
  
//   .done(function(data) {
//     $.each(data.results, function( key, value ){
//       $('.album-list').append('<li><img src=' + value.artworkUrl60 + '/>' + value.collectionName + "</li>");
//     });
//   });
// });



$( "select" ).change(function() {
  $( "select option:selected" ).each(function() {
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
    
    .done(function(result) {
      console.log(result);
    })
    
    .fail(function(err) {
      throw err;
    });
  });
});




