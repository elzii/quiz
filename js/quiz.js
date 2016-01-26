var QUIZ = (function () {

  var quiz = {}


  /**
   * Module Properties
   *
   * config
   * data
   * $el
   * 
   */
  quiz = {

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
      
      quiz_container : $('#quiz-container'),
      
      output : $('#output'),
      
      form : $('form'),

      debug : $('#debug'),
    },


  };




  quiz.questions = {}
  quiz.criteria  = []


  quiz.sampleImages = [
    'http://i.imgur.com/K77sVjz.png',
    'http://i.imgur.com/cQ3cS7P.png',
    'http://i.imgur.com/RHiuxk3.png',
    'http://i.imgur.com/a7jrcKt.png',
  ]




  /**
   * Init
   */
  quiz.init = function () {
    
    
    quiz.loadQuizFile('json/quiz.json', function (res, err) {
      var questions = res.questions,
          criteria  = res.criteria;

      // set questions & criteria to global
      quiz.questions = questions;
      quiz.criteria = criteria;


      // render quiz
      quiz.renderQuiz({
        questions    : questions,
        custom_class : 'quiz-theme'
      }, function ($form) {
      
        // bind events
        quiz.events.init()

        // bind custom events
        quiz.customEvents.applyQuizContainerOverflowWidthPercent( $form )
        quiz.customEvents.radioOnClick( $form )
                  
      })


    })


    // Override hooks here, templates below
    this.hooks.afterSubmit = function(event, answers) {
      console.log('%c HOOK - afterSubmit ', 'background: #029C00; color: #FFFFFF', event, answers);
    } 
    this.hooks.formComplete = function(answers) {
      console.log('%c HOOK - formComplete ', 'background: #029C00; color: #FFFFFF', answers);
    }

  }

















  /**
   * Custom Events
   * @type {Object}
   */
  quiz.customEvents = {

    radioOnClick: function ($form) {
      var $radio = $form.find('.quiz-question__fieldset :radio');

      $radio.on('click', function (event) {
        var $this         = $(this),
            parent        = $this.parent().parent(),
            current_slide = parent.parent().parent().index()

        // Clear selected and set active
        quiz.customEvents.clearSelectedRadio($form)
        parent.addClass('active')

        // Slide to next question set
        quiz.customEvents.slideToNextQuestionSet($form, current_slide)

        // if form is complete, fire listener
        if ( quiz.customEvents.isCurrentSlideLast(current_slide) ) {
          var answers = getFormData($form)
          quiz.hooks.formComplete( quiz.getQuizAnswersAsArray(answers) )
        }

      })

      // can change to fieldset.onChange
    },

    clearSelectedRadio: function($form) {
      $form.find('.quiz-question__outer.active').removeClass('active')
    },
    
    applyClassToRadioParentOnClick: function() {
      $(document).delegate('click', '.quiz-question__label', function (event) {
        console.log( 'radio click', event )
      })
    },

    getTotalQuestionCount: function(questions) {
      var questions = questions || quiz.questions;
      return Object.keys(questions).length;
    },

    applyQuizContainerOverflowWidthPercent: function(form) {
      var $form = form,
          count = $form.find('.quiz-question').length;

          count = count * 100;

      $form.attr('width', count+'%');

    },

    isCurrentSlideLast: function(current) {
      var normalized_index = current + 1;

      if ( normalized_index === quiz.customEvents.getTotalQuestionCount() ) {
        return true;
      }
    },

    slideToNextQuestionSet: function(form, current) {
      var $form         = form,
          $questions    = $form.find('.quiz-questions'),
          total_slides  = quiz.customEvents.getTotalQuestionCount(),
          current_slide = current,
          next_slide    = current_slide + 1;

      // Normalize index
      var normalized_index = current_slide + 1;

      // log
      console.table([{
        'current_slide': current_slide,
        'next_slide': next_slide,
        'normalized_index': normalized_index,
        'total_slides': total_slides
      }])

      // Back out if last slide
      if ( next_slide == total_slides ) return;


      // Animate
      $questions.animate({
        'margin-left': '-'+(normalized_index*100)+'%'
      }, 0)
    }

  }










  /**
   * Render Quiz Questions
   * 
   * @param  {Array} questions 
   */
  quiz.renderQuiz = function(options, callback) {

    var options     = options ? options : {},
        questions   = options.questions || quiz.questions,
        custom_class = options.class ? options.class : 'quiz-theme';

    var $html = '';

    // HTML - form
    $html += '<form class="quiz '+custom_class+'">';
    // $html += '  <header class="quiz-header"></header>';
    
    $html +=   '<div class="quiz-questions clearfix">';

    $.each( questions, function (number, pair) {
      
      var question = pair.question,
          answers  = pair.answers;


      $html += '<div class="quiz-question">';
      $html += '<h4 class="quiz-question__title">'+question+'</h4>';
      $html +=   '<div id="fieldset-'+number+'" class="quiz-question__fieldset quiz-question__answers">';


      $.each( answers, function (key, answer) {
        
        // var key     = getAlphaIndex(i),
            // answer  = a[key],
            
        var pair_id = number +'-'+ key;


        // var title   = answer.title,
        //     image   = answer.image;

        $html += '<div class="quiz-question__outer" style="background-image:url('+answer.image+')"> \
                    <div class="quiz-question__overlay"></div> \
                      <label class="quiz-question__label"> \
                        <input class="quiz-question__input quiz-question__input--radio" type="radio" name="'+number+'" value="'+key+'" required> \
                          <span>'+answer.title+'</span> \
                      </label> \
                  </div>';

      })


      // $html +=       '</div>';
      $html +=     '</div>';
      $html +=   '</div>';
      
    })

    $html += '</div>'; // Close .quiz-questions wrapper

    // HTML - quiz form footer
    $html += '<footer class="quiz-footer">';
    $html +=   '<button id="quiz-submit" class="quiz-submit btn btn-primary" type="submit">Submit</button>';
    $html += '</footer>';

    $html += '</form>';

    // append HTML
    quiz.$el.quiz_container.append($html)

    // callback
    if ( callback ) callback( $(quiz.$el.form.selector) )
    return $html;
  }

  

  quiz.events = {

    init: function() {
      var _this = quiz.events;

      _this.submitForm()
      

      // if ( quiz.config.preselect ) quiz.preselectRadioInputs( $(quiz.$el.form.selector) )
    },


    submitForm: function() {

      var $form = $(quiz.$el.form.selector);

      $(document).delegate($form.selector, 'submit', function (event) {
        event.preventDefault();

        // scroll to top only on production
        if ( quiz.config.environment === 'production' ) {
          scrollToElement({target: 'body'})
        }

        // get form data
        var answers = getFormData( $(quiz.$el.form.selector) )

        // get combination results
        var answers_array = quiz.getQuizAnswersAsArray(answers),
            result        = quiz.compareCombinationToCriteria(answers_array)


        // HOOKS
        quiz.hooks.afterSubmit( event, answers_array )

        // clear output & debug divs
        quiz.$el.output.empty()
        quiz.$el.debug.empty()

        // @temp - structure into separate func
        if ( result ) {
          quiz.$el.output.append('\
            <h1>'+result.type+'</h1> \
            <h3>'+result.segment+'</h3> \
            <p>'+result.description+'</p> \
          ')
        } else {

          quiz.$el.output.append('<h1>No combination found</h1>')

          // if ( quiz.config.debug ) quiz.debugInvalidCombations(answers_array)
        }

        // reselect new answers
        if ( quiz.config.preselect ) quiz.preselectRadioInputs( $(quiz.$el.form.selector) )

      })

    },

  }


  /**
   * Get Combination Results
   * 
   * @param  {Array} answers 
   * @return {Object} 
   */
  quiz.getQuizAnswersAsArray = function(answers) {

    var answers  = answers;

    // simplify results array
    var results = [];
    $.each( answers, function (i, answer) {
      var question = answer.name,
          val      = answer.value;

      results.push(val)
    })

    return results;

  }





  /**
   * Compare Combination To Criteria
   * 
   * @param  {Array} answers  
   * @param  {Array} criteria 
   * @return {Array}
   */
  quiz.compareCombinationToCriteria = function(answers, criteria) {

    var answers  = answers,
        criteria = criteria || quiz.criteria;

    // Loop answers to compare to critiera multidimensional array
    for ( var z = 0; z < criteria.length; z++) {

      var cr = criteria[z];
      var matches = true;

      for ( var k = 0; k < answers.length; k++ ) {

        var combination_items = cr.combination[k].split("/"),
            item              = answers[k],
            item_matches      = false;

        for( var i = 0; i < combination_items.length; i++ ) {
          if ( combination_items[i] == item ) {
            item_matches = true;
            break;
          }
        }

        if ( !item_matches ) {
          matches = false;
          break;
        }
      }

      if ( matches ) return cr;
    }
    
  }





  quiz.loadQuizFile = function(file, callback) {

    $.ajax({
      url: file,
      type: 'GET',
      // dataType: 'json',
    })
    .done(function (res, err) {
      callback(res, err)
    })
    .fail(function (res, err) {
      console.log("error", res, err);
      callback(false)
    })
      
    
  }














  /**
   * Hooks
   * @type {Object}
   */
  quiz.hooks = {

    formComplete: function(answers) {
      return answers;
    },

    afterSubmit: function(event, data) {
      return [event, data];
    }

  }













  /**
   * Preselect Radio Inputs
   * 
   * @param  {Element} form 
   */
  quiz.preselectRadioInputs = function(form) {

    var $form = form;

    // preselect random values
    var radios = getRadioGroupNames($form);

    $.each( radios, function (i, radio) {
      var $radio_group = $form.find('#fieldset-'+radio),
          $radio       = $radio_group.find('input:radio')

      // random int between 0-3
      var rand = getRandomIntInRange(0, 3);
      $radio.eq(rand).click()
    })

    if ( quiz.config.debug ) console.log('preselectRadioInputs')

  }




  /**
   * Debug Invalid Combinations
   * 
   * @param  {Array} answers_array 
   */
  quiz.debugInvalidCombations = function(answers_array) {

    var answers_string = answers_array.toString().replace(/(,)/g,'');

    quiz.$el.debug.append('\
      <div class="alert alert-danger" role="alert"> \
        <strong>'+answers_string+'</strong> logged to invalid-combinations.txt \
      </div> \
    ')

    // read file and sort/dedupe
    readFileContents('invalid-combinations', function (res) {
      var data = (res + "\n" + answers_string),
          arr  = data.split("\n")

      // sort
      arr = arr.sort()
      // dedupe
      arr = arr.filter(function (v, i, a) { return a.indexOf (v) == i });

      // convert back to string
      var data = arr.join('\n')

      // write invalid combos back to file
      writeToFile({
        data: data,
        append: false,
        filename: 'invalid-combinations.txt'
      }, function (res) {
        console.log('%c INVALID COMBINATIONS ', 'background: #f2dede; color: #a94442');
        console.log('writeToFile -->', answers_string)
      })
      
    })

  }


  /**
   * DOCUMENT READY
   * -------------------------------------------------------------------
   *
   */
  document.addEventListener('DOMContentLoaded', function (event) {

    quiz.init()

  })





  /**
   * --------------------
   * Private Methods
   * --------------------
   */  
  

  /**
   * Get Form Data As Object
   * 
   * @param  {Element} target 
   * @return {Object} 
   */
  var getFormDataAsObject = function(target) {
    var $target  = $(target),
        paramObj = {};

    $.each ($target.serializeArray(), function (_, kv) {
      if (paramObj.hasOwnProperty(kv.name)) {
        paramObj[kv.name] = $.makeArray(paramObj[kv.name]);
        paramObj[kv.name].push(kv.value);
      }
      else {
        paramObj[kv.name] = kv.value;
      }
    });
    return paramObj;
  }



  /**
   * Get Form Data
   * 
   * @param  {Element} form 
   * @return {Array}  
   */
  var getFormData = function(form) {
    var $form = form,
        arr   = [];

    var $inputs      = $form.find('input, textarea'),
        radio_groups = getRadioGroupNames($form);

    var data = $inputs.serializeArray()

    if ( quiz.config.debug ) console.log('GetFormData', data)

    // temporarily just return the serialized array
    return data;

  }


  /**
   * Get Alpha Index
   * 
   * @param  {Number} index 
   * @return {String}
   */
  var getAlphaIndex = function(index) {
    var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    return alphabet[index];
  }


  /**
   * Get Radio Group Names
   * @param  {Element} form 
   * @return {Array}
   */
  var getRadioGroupNames = function(form) {
    var $form  = form,
        radios = $form.find('input').filter(':radio');

    var rgroups = [];
    $(radios).each(function(index, el){
            var i;
            for(i = 0; i < rgroups.length; i++)
                if(rgroups[i] == $(el).attr('name'))
                    return true;
            rgroups.push($(el).attr('name'));
        }
    );
    return rgroups;
  }


  /**
   * Get Random Int In Range
   * Using Math.round() gives a non-uniform distribution
   * 
   * @param  {Number} min 
   * @param  {Number} max 
   * @return {Number} 
   */
  var getRandomIntInRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
   * Write To File
   * 
   * @param  {Object}   options  
   * @param  {Function} callback 
   */
  writeToFile = function(options, callback){
    $.ajax({
      url: 'ajax.php',
      type: 'POST',
      data: {
        data: options.data,
        append: options.append,
        filename: options.filename
      },
    })
    .done(function (res) {
      callback(res)
    })
    .fail(function (res) {
      callback(res)
    })
  }


  /**
   * Read File Contents
   * 
   * @param  {String}   filename 
   * @param  {Function} callback 
   */
  readFileContents = function(filename, callback) {
    $.ajax({
      url: filename,
      type: 'GET'
    })
    .done(function (res) {
      callback(res)
    })
    .fail(function (res) {
      callback(false)
    })
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


  return quiz;
}());