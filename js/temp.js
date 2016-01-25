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




quiz.results = [
  {
    combination: {
      '1' : ['B'], 
      '2' : ['B'], 
      '3' : ['A','B'], 
      '4' : ['C'], 
      '5' : ['A','B','C','D'], 
    },
    results: 'Trend Setter',
    segment: 'Expressive'
  },
  {
    combination: {
      '1' : ['B'], 
      '2' : ['A','B','C','D'], 
      '3' : ['A','B'], 
      '4' : ['A','B','D'], 
      '5' : ['A','B','C','D'], 
    },
    results: 'Seeker',
    segment: 'Connected'
  },
  {
    combination: {
      '1' : ['D'], 
      '2' : ['A'], 
      '3' : ['C'], 
      '4' : ['A','B'], 
      '5' : ['A','B','C','D'], 
    },
    results: 'Doer',
    segment: 'At Capacity'
  },
  {
    combination: {
      '1' : ['D'], 
      '2' : ['C','D'], 
      '3' : ['A'], 
      '4' : ['C'], 
      '5' : ['A','B','C','D'], 
    },
    results: 'Move and Shaker OR Visionary',
    segment: 'Drive'
  },
  {
    combination: {
      '1' : ['A'], 
      '2' : ['A','B','D'], 
      '3' : ['C','D'], 
      '4' : ['A','B'], 
      '5' : ['A','B','C','D'], 
    },
    results: 'Uniter',
    segment: 'Rock Steady'
  },
  {
    combination: {
      '1' : ['A'], 
      '2' : ['A','B','C','D'], 
      '3' : ['A','B'], 
      '4' : ['A','B','D'], 
      '5' : ['A','B','C','D'], 
    },
    results: 'Planner OR Advocate OR Achiever OR Partner',
    segment: 'Down To Earth'
  },
  {
    combination: {
      '1' : ['A'], 
      '2' : ['A','B','C','D'], 
      '3' : ['A','D'], 
      '4' : ['C'], 
      '5' : ['A','B','C','D'], 
    },
    results: 'Giver',
    segment: 'Sophisticated'
  },
  {
    combination: {
      '1' : ['C'], 
      '2' : ['A','B','C','D'], 
      '3' : ['A','D'], 
      '4' : ['A','B','C','D'], 
      '5' : ['A','B','C','D'], 
    },
    results: 'Thought Leader',
    segment: 'Measure Twice'
  },
  {
    combination: {
      '1' : ['C'], 
      '2' : ['A'], 
      '3' : ['C/D'], 
      '4' : ['A/B/C/D'], 
      '5' : ['A/B/C/D'], 
    },
    results: 'Advocate OR Partner',
    segment: 'Devoted'
  }

]











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
   * Load JSON
   * 
   * @param  {String}   file     
   * @param  {Function} callback 
   */
  quiz.loadJSON = function(file, callback) {

    var file = file || undefined;

    readFileContents(file, function (res) {
      if (!res) console.log('Error: could not get ' + file)
      callback(res)
    })

  }





  this.loadJSON('json/quiz.json', function (res) {
    
    var questions = res.questions,
        criteria  = res.criteria;

    // Print questions to screen from JSON
    quiz.printQuestions(questions)
    
    // Set to global var
    quiz.criteria = criteria;


  })




  quiz.questions = {

    '1' : {
      question: 'Identify the year you were born within the following ranges',
      answers: [
        {'A': '1982-2004 Millenial'},
        {'B': '1965-1981 Generation X'},
        {'C': '1946-1964 Baby Boomer'},
        {'D': '1924-1945 Maturists (Silent Generation)'}
      ]
    },

    // @todo new structure
    // answers: [
    //   {
    //     'A': {
    //       title: '1946-1964 Baby Boomer',
    //       image: 'http://i.imgur.com/m6tKDVO.jpg'
    //     }
    //   }
    // ] 
    

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




  this.renderQuiz({
    questions    : quiz.questions,
    custom_class : 'quiz-theme'
  }, function ($form) {

    quiz.customEvents.applyQuizContainerOverflowWidthPercent( $form )
    quiz.customEvents.radioOnClick( $form )
              
  })
  this.events.init()