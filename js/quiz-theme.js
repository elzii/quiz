var QUIZ_THEME = (function () {

  var qt = {}


  /**
   * Module Properties
   *
   * config
   * data
   * $el
   * 
   */
  qt = {

    // Config
    config : {
      environment : window.location.href.match(/(localhost|dev)/g) ? 'development' : 'production',
      debug : window.location.href.match(/(localhost|dev|github)/g) ? true : false,
      github : window.location.href.match(/(github)/g) ? true : false
    },


    // Elements
    $el : {
      
      body : $('body'),
      
      content : $('#content'),
      
      output : $('#output'),
      
      form : $('form'),

      debug : $('#debug'),
    },


  };






  /**
   * Init
   */
  qt.init = function () {
    
    this.events.init()
    
  }







  
  /**
   * Events
   * @type {Object}
   */
  qt.events = {

    init: function() {
      var _this = qt.events;
      
      _this.clickRadioOnContainerClickEvent()

    },


    clickRadioOnContainerClickEvent: function() {
      // $(document).delegate('click', '.quiz-question', function (event) {

      //   console.log('clicked')

      //   var $this  = $(this),
      //       $radio = $this.find('input[type="radio"]')

      //       $radio.click()
      // })
    },
    
    applyClassToRadioParentOnClick: function() {
      $(document).delegate('click', '.quiz-question__label', function (event) {
        console.log( 'radio click', event )
      })
    },

    applyQuizContainerOverflowWidthPercent: function(form) {
      var $form = form,
          count = $form.find('.quiz-question').length;

          count = count * 100;

      $form.attr('width', count+'%');

    }



  }






  /**
   * DOCUMENT READY
   * -------------------------------------------------------------------
   *
   */
  document.addEventListener('DOMContentLoaded', function (event) {

    qt.init()

  })





  /**
   * Scroll To Element
   * 
   * @param  {Object} options 
   */
  function scrollToElement(options){

    var duration  = options.duration || 250,
        easing    = options.easing || 'swing',
        offset    = options.offset || 0;

    var target    = options.target || false;

    if ( target ) {
      if ( /(iPhone|iPod)\sOS\s6/.test(navigator.userAgent) ) {
        $('html, body').animate({
          scrollTop: $(target).offset().top
        }, duration, easing);
      } else {
        $('html, body').animate({
          scrollTop: $(target).offset().top - (offset)
        }, duration, easing);
      }
    }
  }





  /**
   * -------------------
   * Prototypes
   * -------------------
   */
  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };






  /**
   * --------------------
   * jQuery Functions
   * --------------------
   */


  return qt;
}());