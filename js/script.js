import $ from 'jquery';
import 'jquery-selectric';
import '../sass/style.scss';


  $(function() {
    $('select').selectric();
     });

  $( 'select' ).change(() => {
    $( 'select option:selected' ).each((key, options) => {
      if(options.value !== 'blank'){
        $('.container').addClass('load');
        $('.nyt_logo').addClass('nyt_2nd-position');
        $('.header_class').addClass('header_2nd-position');
        $('.footer_text').addClass('footer_2nd-position').removeClass('footer_text');
        const api = `.json?api-key=b8f61cd26d6e4984b772baf23c335f26`;
        const url = `https://api.nytimes.com/svc/topstories/v2/`+ options.value + api;

        $.ajax({
          url: url,
          method: 'GET',
        })
  
        .done((data) => {
          $('.news_list').remove();
          let newstory = ``;
          let count = 0;
          $.each(data.results, function(key, value){
            if(value.multimedia.length>0){
              if(count < 12){
                newstory += `<li class='news_list'>`;
                newstory += `<a href='` +value.url+ `' target='_blank'>`;
                newstory += `<div class='story' style='background-image:url(`+value.multimedia[4].url+`)'>`;
                newstory += `</div>`;
                newstory += `</a>`;
                newstory += `<p class='news_description'>` +value.abstract+ `</p>`;
                newstory += `</li>`;
                count++;
              }
            }
          });
            $('.articles').append(newstory);
        }).fail(function(err){
          console.log(err);
        }).always(function(){
          $('.container').removeClass('load');
        });
      }else{
        $('.nyt_logo').removeClass('nyt_2nd-position');
        $('.header_class').removeClass('header_2nd-position');
        $('.footer_2nd-position').addClass('footer_text').removeClass('footer_2nd-position');
        $('.container').removeClass('load');
        $('.news_list').remove();
      }
  });
});
