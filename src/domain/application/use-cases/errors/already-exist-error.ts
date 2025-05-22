export class AlreadyExistError extends Error {
  constructor() {
    super('Already exists!')
  }
}