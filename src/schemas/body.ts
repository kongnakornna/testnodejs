export default {
  body: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        minLength: 4,
        maxLength: 10
      },
      password: {
        type: 'string',
        minLength: 8,
        maxLength: 15
      },
    },
    required: [
      'username',
      'password',
    ]
  }
}