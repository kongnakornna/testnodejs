export default {
  body: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        minLength: 4,
        maxLength: 15
      },
      password: {
        type: 'string',
        minLength: 4,
        maxLength: 25
      }
    },
    required: [
      'username',
      'password'
    ]
  }
}