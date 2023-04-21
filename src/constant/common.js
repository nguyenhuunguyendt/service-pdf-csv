const message = Object.freeze({
  fields_cannot_blank: 'trans.fields_cannot_blank',
  fields_invalid: 'trans.fields_invalid',
  server_error: 'trans.server_error',
  account_locked: 'trans.account_locked',
})

const code = Object.freeze({
  SUCCESS: 200,
  ERROR: 500,
  INVALID: 402,
  VALIDATOR: 422,
  AUTHORIZATION: 401,
  NOT_FOUND: 404,
})

const flag = Object.freeze({
  TRUE: 1,
  FALSE: 0,
})

module.exports = {
  code,
  message,
  flag,
}
