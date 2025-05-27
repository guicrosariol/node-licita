export class ActionAlreadyPerformedError extends Error {
  constructor() {
    super('Action already perfomed!')
  }
}