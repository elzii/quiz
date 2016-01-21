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






  /**
   * Init
   */
  quiz.init = function () {
    
    this.renderQuiz({
      questions    : quiz.questions,
      custom_class : 'quiz-theme'
    }, function ($form) {
    
      quiz.customEvents.applyQuizContainerOverflowWidthPercent( $form )
      quiz.customEvents.radioOnClick( $form )
                
    })

    this.events.init()

    
    this.loadQuizFile('json/quiz.json', function (res, err) {
      var questions = res.questions,
          criteria  = res.criteria;




    })


    // Override hooks here, templates below
    this.hooks.afterSubmit = function(event, data) {
      console.log('%c HOOK - afterSubmit ', 'background: #029C00; color: #FFFFFF', event, data);
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

      })

      // can change to fieldset.onChange
    },

    clearSelectedRadio: function($form) {
      $form.find('.quiz-question__inner.active').removeClass('active')
    },
    
    applyClassToRadioParentOnClick: function() {
      $(document).delegate('click', '.quiz-question__label', function (event) {
        console.log( 'radio click', event )
      })
    },

    getTotalQuestionCount: function(questions) {
      var questions = questions || quiz.questions;
      return Object.keys(quiz.questions).length;
    },

    applyQuizContainerOverflowWidthPercent: function(form) {
      var $form = form,
          count = $form.find('.quiz-question').length;

          count = count * 100;

      $form.attr('width', count+'%');

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











  quiz.tempImages = {
    '1' : 'http://i.imgur.com/K77sVjz.png',
    '2' : 'http://i.imgur.com/cQ3cS7P.png',
    '3' : 'http://i.imgur.com/RHiuxk3.png',
    '4' : 'http://i.imgur.com/a7jrcKt.png',
  }

  /**
   * Quiz
   * -------------
   * @template
  '#' : {
    question: '',
    answers: [
      {'a': ''},
      {'b': ''},
      {'c': ''},
      {'d': ''}
    ]
  }
   */
  quiz.questions = {

    '1' : {
      question: 'Identify the year you were born within the following ranges',
      answers: {
        'A': {
          title: '1982-2004 Millenial',
          image: 'http://i.imgur.com/K77sVjz.png' 
        },
        'B': {
          title: '1965-1981 Generation X',
          image: 'http://i.imgur.com/cQ3cS7P.png' 
        },
        'C': {
          title: '1946-1964 Baby Boomer',
          image: 'http://i.imgur.com/RHiuxk3.png' 
        },
        'D': {
          title: '1924-1945 Maturists (Silent Generation)',
          image: 'http://i.imgur.com/a7jrcKt.png' 
        }
      }
    },


    '2' : {
      question: 'How do you spend your free moments?',
      answers: {
        'A': {
          title: 'With family',
          image: 'http://i.imgur.com/K77sVjz.png',
        },
        'B': {
          title: 'With friends',
          image: 'http://i.imgur.com/cQ3cS7P.png',
        },
        'C': {
          title: 'On my own',
          image: 'http://i.imgur.com/RHiuxk3.png',
        },
        'D': {
          title: 'Being active',
          image: 'http://i.imgur.com/a7jrcKt.png',
        },
      }
    },


    '3' : {
      question: 'What comes to mind when you think about work?',
      answers: {
        'A': {
          title: 'It’s my passion',
          image: 'http://i.imgur.com/K77sVjz.png',
        },
        'B': {
          title: 'Have to, but don’t love it',
          image: 'http://i.imgur.com/cQ3cS7P.png',
        },
        'C': {
          title: 'Provide for my family',
          image: 'http://i.imgur.com/RHiuxk3.png',
        },
        'D': {
          title: 'Retirement',
          image: 'http://i.imgur.com/a7jrcKt.png',
        },
      }
    },

    '4' : {
      question: 'How do you invest in others?',
      answers: {
        'A': {
          title: 'Acts of Service',
          image: 'http://i.imgur.com/K77sVjz.png',
        },
        'B': {
          title: 'Quality Time',
          image: 'http://i.imgur.com/cQ3cS7P.png',
        },
        'C': {
          title: 'Giving Gifts',
          image: 'http://i.imgur.com/RHiuxk3.png',
        },
        'D': {
          title: 'Words of Encouragement',
          image: 'http://i.imgur.com/a7jrcKt.png',
        },
      }
    },

    '5' : {
      question: 'What brings you joy?',
      answers: {
        'A': {
          title: 'Seeing Someone Graduate',
          image: 'http://i.imgur.com/K77sVjz.png',
        },
        'B': {
          title: 'Happy Children',
          image: 'http://i.imgur.com/cQ3cS7P.png',
        },
        'C': {
          title: 'Clean Bill of Health',
          image: 'http://i.imgur.com/RHiuxk3.png',
        },
        'D': {
          title: 'Financial Stability',
          image: 'http://i.imgur.com/a7jrcKt.png',
        },
      }
    }

  }


  /**
   * Segments
   */
  quiz.criteria = [
    {
      combination: ['A', 'A', 'A/B/C/D', 'A/B/C/D', 'A/B/C/D'],
      type: 'Connector',
      segment: 'Connected',
      description: 'As a Connector, you like learning about the world around you and love when family and friends join you for the ride. You’re interested in experiencing your community in a close-up and personal way, and finding ways to improve it and yourself. You’re open-minded about new directions and balanced when it comes to priorities.'
    },
    {
      combination: ['A', 'C/D', 'B/C/D', 'A/B/C/D', 'A/B/C/D'],
      type: 'Connector',
      segment: 'Connected',
      description: 'As a Connector, you like learning about the world around you and love when family and friends join you for the ride. You’re interested in experiencing your community in a close-up and personal way, and finding ways to improve it and yourself. You’re open-minded about new directions and balanced when it comes to priorities.'
    },
    {
      combination: ['A', 'B', 'A/B/C/D', 'A/B/C/D', 'A/B/C/D'],
      type: 'Trend Setter',
      segment: 'Expressive',
      description: 'As a Trend Setter, you\'re unique and not afraid to forge your own path, knowing that others may follow your lead. By marching to the beat of your own drum, you naturally inspire others to take risks and challenge the status quo. You\'re confident, independent, and capable.'
    },
    {
      combination: ['A', 'C/D', 'A', 'A/B/C/D', 'A/B/C/D'],
      type: 'Trend Setter',
      segment: 'Expressive',
      description: 'As a Trend Setter, you\'re unique and not afraid to forge your own path, knowing that others may follow your lead. By marching to the beat of your own drum, you naturally inspire others to take risks and challenge the status quo. You\'re confident, independent, and capable.'
    },
    {
      combination: ['B', 'A', 'A/B/C/D', 'A/B/C/D', 'A/B/C/D'],
      type: 'Doer',
      segment: 'At Capacity',
      description: 'A full plate never stopped a Doer from doing more. You\'re always on the move, going the extra mile, and lending a hand. You\'re hardworking, prudent, and diligent, and even if you don’t always find the perfect balance, you know what’s most important - quality time with those you love.'
    },
    {
      combination: ['B', 'C/D', 'B/C/D', 'A/B/C/D', 'A/B/C/D'],
      type: 'Doer',
      segment: 'At Capacity',
      description: 'A full plate never stopped a Doer from doing more. You\'re always on the move, going the extra mile, and lending a hand. You\'re hardworking, prudent, and diligent, and even if you don’t always find the perfect balance, you know what’s most important - quality time with those you love.'
    },
        {
      combination: ['B', 'B', 'A/B/C/D', 'A/B/C/D', 'A/B/C/D'],
      type: 'Achiever',
      segment: 'Driven',
      description: 'Achievers set the bar high. You’re hard working and won’t stop until you reach your goals. You\'re ambitious, motivated, resourceful, and often find yourself a mentor to others. You’re optimistic about the future, but can be restless if you’re not moving forward on the right path.'
    },
    {
      combination: ['B', 'C/D', 'A', 'A/B/C/D', 'A/B/C/D'],
      type: 'Achiever',
      segment: 'Driven',
      description: 'Achievers set the bar high. You’re hard working and won’t stop until you reach your goals. You\'re ambitious, motivated, resourceful, and often find yourself a mentor to others. You’re optimistic about the future, but can be restless if you’re not moving forward on the right path.'
    },
    {
      combination: ['C', 'A/B/C/D', 'A', 'A/B/C/D', 'A/B/C/D'],
      type: 'Curator',
      segment: 'Sophisticated',
      description: 'Curators have high standards. You know what you’re doing because you\'ve spent your life making smart choices for you and your family. Now, you’re ready and confident enough to step up to the plate and help others tackle challenges and achieve their goals. You’re reliable, ambitious, and always looking for new growth opportunities.'
    },
    {
      combination: ['C', 'B/C', 'D', 'A/B/C/D', 'A/B/C/D'],
      type: 'Curator',
      segment: 'Sophisticated',
      description: 'Curators have high standards. You know what you’re doing because you\'ve spent your life making smart choices for you and your family. Now, you’re ready and confident enough to step up to the plate and help others tackle challenges and achieve their goals. You’re reliable, ambitious, and always looking for new growth opportunities.'
    },
    {
      combination: ['C', 'A/B/C/D', 'B', 'A/B/C/D', 'A/B/C/D'],
      type: 'Advocate',
      segment: 'Down to Earth',
      description: 'Advocates speak frankly and with diplomacy, balancing all sides. You can look beyond yourself and see things for what they really are. That means living life to the fullest, and finding ways to give back to your community whenever you have the chance. You\'re practical, caring, and open to change.'
    },
    {
      combination: ['C', 'A/B/C/D', 'C', 'A/B/C/D', 'A/B/C/D'],
      type: 'Uniter',
      segment: 'Rock Steady',
      description: 'Keep calm and carry on - that\'s the motto of a Uniter. You\'re responsible, grounded, and can always be counted on to get the job done. Uniters are driven by a sense of purpose and discipline – it\'s the fundamentals that matter most to you.'
    },
    {
      combination: ['C', 'A/D', 'D', 'A/B/C/D', 'A/B/C/D'],
      type: 'Uniter',
      segment: 'Rock Steady',
      description: 'Keep calm and carry on - that\'s the motto of a Uniter. You\'re responsible, grounded, and can always be counted on to get the job done. Uniters are driven by a sense of purpose and discipline – it\'s the fundamentals that matter most to you.'
    },
    {
      combination: ['D', 'A/B/C', 'A', 'A/B/C/D', 'A/B/C/D'],
      type: 'Planners',
      segment: 'Measure Twice',
      description: 'Planners are natural role models and leaders. Life is an adventure and you take advantage of every opportunity it hands you, but you do it responsibly. You’ve accumulated a wealth of experience - and you enjoy mentoring others. You\'re open, diligent, and innovative.'
    },
    {
      combination: ['D', 'B/C', 'D', 'A/B/C/D', 'A/B/C/D'],
      type: 'Planners',
      segment: 'Measure Twice',
      description: 'Planners are natural role models and leaders. Life is an adventure and you take advantage of every opportunity it hands you, but you do it responsibly. You’ve accumulated a wealth of experience - and you enjoy mentoring others. You\'re open, diligent, and innovative.'
    },
    {
      combination: ['D', 'A/B/C', 'B/C', 'A/B/C/D', 'A/B/C/D'],
      type: 'Partner',
      segment: 'Devoted',
      description: 'As a Partner, you\'re someone who puts the best of themselves into everything you do. You are a role model - in your personal life, in your work life, and in your community. You\'re committed, reliable, and values-driven.'
    },
    {
      combination: ['D', 'A', 'D', 'A/B/C/D', 'A/B/C/D'],
      type: 'Partner',
      segment: 'Devoted',
      description: 'As a Partner, you\'re someone who puts the best of themselves into everything you do. You are a role model - in your personal life, in your work life, and in your community. You\'re committed, reliable, and values-driven.'
    },
    {
      combination: ['D', 'D', 'A/D', 'A/B/C/D', 'A/B/C/D'],
      type: 'Achiever',
      segment: 'Driven',
      description: 'Achievers set the bar high. You’re hard working and won’t stop until you reach your goals. You\'re ambitious, motivated, resourceful, and often find yourself a mentor to others. You’re optimistic about the future, but can be restless if you’re not moving forward on the right path.'
    },
    {
      combination: ['D', 'D', 'B/C', 'A/B/C/D', 'A/B/C/D'],
      type: 'Doer',
      segment: 'At Capacity',
      description: 'A full plate never stopped a Doer from doing more. You\'re always on the move, going the extra mile, and lending a hand. You\'re hardworking, prudent, and diligent, and even if you don’t always find the perfect balance, you know what’s most important - quality time with those you love.'
    }

  ]






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

    $.each( quiz.questions, function (number, pair) {
      
      var question = pair.question,
          answers  = pair.answers;


      $html += '<div class="quiz-question">';
      // $html += '  <div class="quiz-question__inner">';
      $html += '<h4 class="quiz-question__title">'+question+'</h4>';
      $html +=   '<div id="fieldset-'+number+'" class="quiz-question__fieldset quiz-question__answers">';


      $.each( answers, function (key, answer) {
        
        // var key     = getAlphaIndex(i),
            // answer  = a[key],
            
        var pair_id = number +'-'+ key;


        // var title   = answer.title,
        //     image   = answer.image;

        $html += '<div class="quiz-question__inner" style="background-image:url('+answer.image+')"> \
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

      if ( quiz.config.preselect ) quiz.preselectRadioInputs( $(quiz.$el.form.selector) )
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
        var answers = getFormData($form)

        // get combination results
        var answers_array = quiz.getQuizAnswersAsArray(answers),
            result        = quiz.compareCombinationToCriteria(answers_array)

        console.log('answers_array',answers_array)

        // HOOKS
        quiz.hooks.afterSubmit( event, answers )

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

          if ( quiz.config.debug ) quiz.debugInvalidCombations(answers_array)
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


    afterSubmit: function(event, data) {
      return [event, data];
      // console.log('%c HOOK - afterSubmit ', 'background: #029C00; color: #FFFFFF', event, data);
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