export enum HttpStatus {
  OK = 200,
  BadRequest = 400,
  NotFound = 404,
}

export function checkHttpStatus(status: HttpStatus) {
  switch (status) {
    case HttpStatus.OK:
      console.log('httpStatus = OK')
      return 'httpStatus = OK'
    case HttpStatus.BadRequest:
      console.log('httpStatus = Bad Request')
      return 'httpStatus = Bad Request'
    case HttpStatus.NotFound:
      console.log('httpStatus = Not Found')
      return 'httpStatus = Not Found'
  }
}
