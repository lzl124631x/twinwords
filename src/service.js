var P = require('bluebird')

export default {
  getQuizzes() {
    return P.resolve([{
        q: '狗',
        options: [
          'dog',
          'fog'
        ],
        key: 'dog'
      },
      {
        q: '猪',
        options: [
          'pig',
          'jig'
        ],
        key: 'pig'
      },
      {
        q: '猫',
        options: [
          'cat',
          'kite'
        ],
        key: 'cat'
      },
      {
        q: '兔',
        options: [
          'rabbit',
          'reddit'
        ],
        key: 'rabbit'
      },
      {
        q: '狗',
        options: [
          'dog',
          'fog'
        ],
        key: 'dog'
      },
      {
        q: '猪',
        options: [
          'pig',
          'jig'
        ],
        key: 'pig'
      },
      {
        q: '猫',
        options: [
          'cat',
          'kite'
        ],
        key: 'cat'
      },
      {
        q: '兔',
        options: [
          'rabbit',
          'reddit'
        ],
        key: 'rabbit'
      },
      {
        q: '狗',
        options: [
          'dog',
          'fog'
        ],
        key: 'dog'
      },
      {
        q: '猪',
        options: [
          'pig',
          'jig'
        ],
        key: 'pig'
      },
      {
        q: '猫',
        options: [
          'cat',
          'kite'
        ],
        key: 'cat'
      },
      {
        q: '兔',
        options: [
          'rabbit',
          'reddit'
        ],
        key: 'rabbit'
      },
      {
        q: '狗',
        options: [
          'dog',
          'fog'
        ],
        key: 'dog'
      },
      {
        q: '猪',
        options: [
          'pig',
          'jig'
        ],
        key: 'pig'
      },
      {
        q: '猫',
        options: [
          'cat',
          'kite'
        ],
        key: 'cat'
      },
      {
        q: '兔',
        options: [
          'rabbit',
          'reddit'
        ],
        key: 'rabbit'
      }
    ]).delay(500)
  }
}
