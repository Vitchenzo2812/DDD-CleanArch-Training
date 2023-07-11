export default class ApplicationError extends Error {
  constructor(
    readonly message: string,
    readonly code: number
  ) {
    super()
  }
}