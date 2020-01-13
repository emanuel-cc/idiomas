
$(document).ready(function(){
    var selector = '#translate';
    var selector2 = '#translate2';
    var selector3 = '#translate3';
    var selector4 = '#translate4';

    var valueDatos;
    var valueTituloSitio;
    var valueBienvenido;
    var valueHola;

    var language;

    var getBienvenido;
    var getTitulo;
    var getSaludo;
    var getidioma;

    var tituloLocale = localStorage;
    var bienvenidoLocale = localStorage;
    var saludoLocale = localStorage;
    var idioma = localStorage;

    

    $(selector).on('click', function(e){
      e.preventDefault();
      startLang( $(this) );
    });
    $(selector2).on('click', function(e){
      e.preventDefault();
      startLang( $(this) );
    });
    $(selector3).on('click', function(e){
      e.preventDefault();
      startLang( $(this) );
    });
    $(selector4).on('click', function(e){
      e.preventDefault();
      startLang( $(this) );
    });

    function inicializar(){
      selector.addEventListener("load",function(e){
        e.preventDefault();
        startLang( $(this) );
      });

      selector2.removeEventListener("load",function(e){
        e.preventDefault();
        startLang( $(this) );
      });
      selector3.removeEventListener("load",function(e){
        e.preventDefault();
        startLang( $(this) );
      });

      selector4.removeEventListener("load",function(e){
        e.preventDefault();
        startLang( $(this) );
      });

     /* if(idioma === undefined){
        loadLang(idioma1);
      }else{
        loadLang(idioma);
      }
      */
    }

    var startLang = function(el){
      var el = $(el);
      var text = el.attr('data-text');
      var file = el.attr('data-file');
      file = file.split(',');
      text = text.split(',');
      var index = el.attr('data-index');
      if(index >= file.length){
        index = 0;
      }
      changeName(el, text[index]);

      changeIndex(el, index);
      loadLang(file[index]);
      $('html').attr('lang', file[index]);
    };
  
    var changeName = function(el, name){
      $(el).html( name );
    };
  
    var changeIndex = function(el, index){
      $(el).attr('data-index', ++index);
    };
  
    var loadLang = function(lang){
     // language = lang;
      //document.cookie = lang;
      document.cookie ="idioma="+lang + ";" + "expires=Thu, 01 Dec 2024 00:00:00 UTC;";
      //document.cookie ="idioma="+ "" + ";" + "expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      console.log("micookie: "+document.cookie);
      console.log("cookie: "+document.cookie.split(';')[0].split('=')[1]);
     
     // idioma = localStorage.setItem("lang",language);
     // getidioma = localStorage.getItem("lang");
     // console.log("Idioma: "+getidioma);
      var processLang = function(data){
        
        var arr = data.split('\n');
        //valueDatos = arr;
        
        for(var i in arr){

          
          
          //valueTituloSitio = arr[0];
          
          
          //valueBienvenido = arr[1];
          
         // valueHola = arr[2];
          
          if( lineValid(arr[i]) ){
            var obj = arr[i].split('=>');
            assignText(obj[0], obj[1]);
          }
        }

        

        /*if (typeof(Storage) !== "undefined") {
          // LocalStorage disponible
          console.log("Disponible");
        } else {
            // LocalStorage no soportado en este navegador
            console.log("No Disponible");
        }*/
      
        
        //tituloLocale.setItem("titulo",valueTituloSitio.split('=>')[1]);
        //getTitulo = localStorage.getItem("titulo");

        //bienvenidoLocale.setItem("bienvenido",valueBienvenido.split('=>')[1]);
        //getBienvenido = localStorage.getItem("bienvenido");

        //saludoLocale.setItem("saludo",valueHola.split('=>')[1]);
        //getSaludo = localStorage.getItem("saludo");
       // $("#bienvenidos").html(getBienvenido);
        
        //console.log("bienvenidoLocale: "+getBienvenido);
        //console.log("ValueDatos: "+valueDatos);
        //console.log("ValueTituloSitio: "+valueTituloSitio.split('=>')[1]);
        //console.log("ValueBienvenido: "+valueBienvenido.split('=>')[1]);
        //console.log("ValueHola: "+valueHola.split('=>')[1]);
      };
      
      var assignText = function(key, value){
        
        $('[data-lang="'+key+'"]').each(function(){
          var attr = $(this).attr('data-destine');
          if(typeof attr !== 'undefined'){
            $(this).attr(attr, value);
          }else{
            $(this).html(value);
            
          }
          
        });
      };
      var lineValid = function(line){
        return (line.trim().length > 0);
      };
      //$('loading-lang').addClass('show');
      $.ajax({
        url: 'lang/'+lang+'.txt',
        dataType: "text",
        error:function(){
          alert('No se cargó traducción');
        },
        success: function(data){
          //$('loading-lang').removeClass('show');
          processLang(data);
          
        }
      });
    };
   /* if (navigator.geolocation) { //check if geolocation is available
      navigator.geolocation.getCurrentPosition(function(position){
        console.log("Ubicación: "+position);
      });   
    }*/

    var idioma1 = navigator.language.split('-')[0] || navigator.userLanguage;
    //idioma = localStorage.getItem("lang");
    idioma = document.cookie.split(';')[0].split('=')[1];
    //idioma = document.cookie.split('=')[0];
    console.log(idioma1);
    
    
    console.log("Language: "+idioma);

    if(idioma === undefined){
      loadLang(idioma1);
    }else{
      loadLang(idioma);
    }

    

    
  });