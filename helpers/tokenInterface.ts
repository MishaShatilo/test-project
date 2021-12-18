export class TokenDto {
  id;
  username;
  constructor(model) {
    (this.id = model.id), (this.username = model.username);
  }
}
