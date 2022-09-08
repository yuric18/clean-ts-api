export class EmailAlreadyExists extends Error {
  constructor() {
    super('E-mail already exists');
    this.name = 'EmailAlreadyExists';
  }
}
