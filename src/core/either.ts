// Error
export class Left<L> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isRight() {
    return false
  }

  isLeft() {
    return true
  }
}

// Success
export class Right<R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isRight() {
    return true
  }

  isLeft() {
    return false
  }
};

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L>(value: L): Either<L, never> => {
  return new Left(value);
};

export const right = <R>(value: R): Either<never, R> => {
  return new Right(value);
};