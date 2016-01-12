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
      debug : window.location.href.match(/(localhost|dev)/g) ? true : false,
      debug_plugins : window.location.href.match(/(localhost|dev)/g) ? true : false,
      debug_console: false
    },


    // Elements
    $el : {
      
      body : $('body'),
      
      content : $('#content'),

      form : $('form'),

    },


  };






  /**
   * Init
   */
  quiz.init = function () {
    
    this.printQuestions()
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
      ]
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
   */
  quiz.results = [
    {
      combination: ['B', 'B', 'A/B', 'C', 'A/B/C/D'],
      results: 'Trend Setter',
      segment: 'Expressive'
    },
    {
      combination: ['B', 'A/B/C/D', 'A/B', 'A/B/D', 'A/B/C/D'],
      results: 'Seeker',
      segment: 'Connected'
    },
    {
      combination: ['D', 'A', 'C', 'A/B', 'A/B/C/D'],
      results: 'Doer',
      segment: 'At Capacity'
    },
    {
      combination: ['D', 'C/D', 'A', 'C', 'A/B/C/D'],
      results: 'Move and Shaker // Visionary',
      segment: 'Drive'
    },
    {
      combination: ['A', 'A/B/D', 'C/D', 'A/B', 'A/B/C/D'],
      results: 'Uniter',
      segment: 'Rock Steady'
    },
    {
      combination: ['A', 'A/B/C/D', 'A/B', 'A/B/D', 'A/B/C/D'],
      results: 'Planner // Advocate // Achiever // Partner',
      segment: 'Down To Earth'
    },
    {
      combination: ['A', 'A/B/C/D', 'A/D', 'C', 'A/B/C/D'],
      results: 'Giver',
      segment: 'Sophisticated'
    },
    {
      combination: ['C', 'A/B/C/D', 'A/D', 'A/B/C/D', 'A/B/C/D'],
      results: 'Thought Leader',
      segment: 'Measure Twice'
    },
    {
      combination: ['C', 'A', 'C/D', 'A/B/C/D', 'A/B/C/D'],
      results: 'Advocate // Partner',
      segment: 'Devoted'
    }

  ]






  quiz.printQuestions = function(questions) {

    var questions = questions || quiz.questions;

    var $html = '<form>';

    $.each( quiz.questions, function (number, pair) {
      
      var question = pair.question,
          answers  = pair.answers;

      // HTML - wrap questions
      $html += '<h4 class="question-title">'+question+'</h4>';

        // HTML - wrap answers in fieldset
        $html += '<fieldset id="fieldset-'+number+'" class="answers">';

        // HTML - hidden input for defaults on unselected radios
        // UNUSED - duplicate issue
        // $html += '<input type="hidden" name="'+number+'" value="false" />';
          
        $.each( answers, function (i, a) {
          // normalize key
          var key     = getAlphaIndex(i),
              answer  = a[key],
              pair_id = number +'-'+ i;

          $html += '<div class="radio"> \
                      <label><input type="radio" name="'+number+'" value="'+key+'" required>'+answer+'</label> \
                    </div>';

          // $html += '<div><input type="radio" name="'+number+'" id="answer-'+pair_id+'"><label for="answer-'+pair_id+'">'+answer+'</label></div>';

        })

        $html += '</fieldset><hr>'
    })


    // submit button
    $html +='<button type="submit">Submit</button>';
    $html += '</form>';

    quiz.$el.content.append($html)
    return $html;

  }

  

  quiz.events = {

    init: function() {
      var _this = quiz.events;
      _this.submitForm()


      quiz.debugForm( $(quiz.$el.form.selector) )
    },


    submitForm: function() {

      var $form = $(quiz.$el.form.selector);

      $(document).delegate($form.selector, 'submit', function (event) {
        event.preventDefault();

        // console.log( event, event.currentTarget )
        // console.log( $(event.currentTarget).serializeArray() )

        console.log( getFormData($form) )
      

      })

    },

  }


  /**
   * Parse Quiz Answers
   * 
   * @param  {Array} answers 
   * @return {Object} 
   */
  quiz.getCombinationResults = function(answers, questions) {

    var answers   = answers,
        questions = questions || quiz.questions;

    

  }




  /**
   * Debug Form
   */
  quiz.debugForm = function(form) {

    var $form = form;

    // Preselect Random Radio Inputs
    function preselectRadioInputs($form) {
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

    preselectRadioInputs($form)

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


    // temporarily just return the serialized array
    return $inputs.serializeArray()

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