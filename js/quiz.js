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
    })
    this.events.init()
    

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
      answers: [
        {'A': '1946-1964 Baby Boomer'},
        {'B': '1982-2004 Millenial'},
        {'C': '1924-1945 Maturists (Silent Generation)'},
        {'D': '1965-1981 Generation X'}
      ],
      // @todo new structure
      // answers: [
      //   {
      //     'A': {
      //       title: '1946-1964 Baby Boomer',
      //       image: 'http://i.imgur.com/m6tKDVO.jpg'
      //     }
      //   }
      // ]
    },

    '2' : {
      question: 'How do you spend your free moments?',
      answers: [
        {'A': 'With family'},
        {'B': 'With friends'},
        {'C': 'On my own'},
        {'D': 'Being active'}
      ]
    },

    '3' : {
      question: 'What comes to mind when you think about work?',
      answers: [
        {'A': 'It’s my passion'},
        {'B': 'Have to, but don’t love it'},
        {'C': 'Provide for my family'},
        {'D': 'Retirement'}
      ]
    },

    '4' : {
      question: 'How do you invest in others?',
      answers: [
        {'A': 'Acts of Service'},
        {'B': 'Quality Time'},
        {'C': 'Giving Gifts'},
        {'D': 'Words of Encouragement'}
      ]
    },

    '5' : {
      question: 'What brings you joy?',
      answers: [
        {'A': 'Seeing Someone Graduate'},
        {'B': 'Happy Children'},
        {'C': 'Clean Bill of Health'},
        {'D': 'Financial Stability'}
      ]
    }

  }


  /**
   * Segments
   * @template
   {
     combination: ['B', 'B', 'A/B', 'C', 'A/B/C/D'],
     type: 'Trend Setter',
     segment: 'Expressive',
     description: 'Lorem ipsum dolor sit amet'
   },
   */
  quiz.criteria = [
    {
      combination: ['B', 'B', 'A/B', 'C', 'A/B/C/D'],
      type: 'Trend Setter',
      segment: 'Expressive',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta ipsam perspiciatis adipisci architecto aperiam fugit possimus voluptatibus iste cupiditate dolores'
    },
    {
      combination: ['B', 'A/B/C/D', 'A/B', 'A/B/D', 'A/B/C/D'],
      type: 'Seeker',
      segment: 'Connected',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates necessitatibus fugiat eveniet culpa adipisci debitis! Asperiores aspernatur illo,'
    },
    {
      combination: ['D', 'A', 'C', 'A/B', 'A/B/C/D'],
      type: 'Doer',
      segment: 'At Capacity',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat cum, culpa quisquam odio perspiciatis commodi eos voluptatum nobis hic'
    },
    {
      combination: ['D', 'C/D', 'A', 'C', 'A/B/C/D'],
      type: 'Move and Shaker // Visionary',
      segment: 'Drive',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat perferendis nihil ullam exercitationem neque, quod perspiciatis laboriosam repellendus recusandae'
    },
    {
      combination: ['A', 'A/B/D', 'C/D', 'A/B', 'A/B/C/D'],
      type: 'Uniter',
      segment: 'Rock Steady',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum impedit tenetur tempore, iste officiis sunt odio, aspernatur culpa'
    },
    {
      combination: ['A', 'A/B/C/D', 'A/B', 'A/B/D', 'A/B/C/D'],
      type: 'Planner // Advocate // Achiever // Partner',
      segment: 'Down To Earth',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, illum praesentium tempore temporibus et officia. Magnam vel,'
    },
    {
      combination: ['A', 'A/B/C/D', 'A/D', 'C', 'A/B/C/D'],
      type: 'Giver',
      segment: 'Sophisticated',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus aliquam, temporibus, aspernatur, enim totam quae consectetur veniam'
    },
    {
      combination: ['C', 'A/B/C/D', 'A/D', 'A/B/C/D', 'A/B/C/D'],
      type: 'Thought Leader',
      segment: 'Measure Twice',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit reiciendis ratione, alias velit unde expedita iusto veniam sapiente inventore'
    },
    {
      combination: ['C', 'A', 'C/D', 'A/B/C/D', 'A/B/C/D'],
      type: 'Advocate // Partner',
      segment: 'Devoted',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dolor exercitationem dicta vitae enim voluptatem, quaerat illo, ipsa'
    }

  ]





  /**
   * Render Quiz Questions
   * 
   * @param  {Array} questions 
   */
  quiz.renderQuiz = function(options) {

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

      // HTML - wrap questions
      $html += '<div class="quiz-question">';
      // $html += '  <div class="quiz-question__inner">';
      
      // HTML - title
      $html += '<h4 class="quiz-question__title">'+question+'</h4>';

        // HTML - wrap answers in fieldset
        $html += '<div id="fieldset-'+number+'" class="quiz-question__fieldset quiz-question__answers">';

        // HTML - hidden input for defaults on unselected radios
        $.each( answers, function (i, a) {
          // normalize key
          var key     = getAlphaIndex(i),
              answer  = a[key],
              pair_id = number +'-'+ i;

          $html += '<div class="quiz-question__inner"> \
                      <label class="quiz-question__label"> \
                        <input class="quiz-question__input quiz-question__input--radio" type="radio" name="'+number+'" value="'+key+'" required> \
                          <span>'+answer+'</span> \
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
    quiz.$el.content.append($html)

    return $html;
  }

  

  quiz.events = {

    init: function() {
      var _this = quiz.events;
      _this.submitForm()

      if ( quiz.config.debug ) quiz.preselectRadioInputs( $(quiz.$el.form.selector) )
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
        quiz.preselectRadioInputs( $(quiz.$el.form.selector) )

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




  /**
   * Debug Form
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