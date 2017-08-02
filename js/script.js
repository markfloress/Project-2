import $ from 'jquery';
import 'jquery-selectric';
import '../sass/style.scss';



$(document).ready(() => {

  $(function() {
  $('select').selectric();
});

  $( 'select' ).change(() => {
    $( 'select option:selected' ).each((key, options) => {
      if(options.value !== 'blank'){
        $('.container').addClass('load');
        $('.logo').addClass('nyt');5
        $('.top').addClass('header11');
        $('.footext').addClass('footer2').removeClass('footext');
        const api = `.json?api-key=b8f61cd26d6e4984b772baf23c335f26`;
        const url = `https://api.nytimes.com/svc/topstories/v2/`+ options.value + api;

        $.ajax({
          url: url,
          method: 'GET',
        })
  
        .done((data) => {
          $('.container').removeClass('load');
          $('.list').remove();
          let newstory = ``;
          let count = 0;
          $.each(data.results, function(key, value){
            if(value.multimedia.length>0){
              if(count < 12){
                newstory += `<li class='list'>`;
                newstory += `<a href='` +value.url+ `' target='_blank'>`;
                newstory += `<div class='story' style='background-image:url(`+value.multimedia[4].url+`)'>`;
                newstory += `</div>`;
                newstory += `</a>`;
                newstory += `<p class='description'>` +value.abstract+ `</p>`;
                newstory += `</li>`;
                count++;
              }
            }
          });
            $('.articles').append(newstory);
        });
      }else{
        $('.logo').removeClass('nyt');
        $('.top').removeClass('header11');
        $('.footer2').addClass('footext').removeClass('footer2');
        $('.container').removeClass('load');
        $('.list').remove();
      }
  });
});
});
