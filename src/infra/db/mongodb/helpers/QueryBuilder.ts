export class QueryBuilder {
  private readonly query = [];

  match(data: object): this {
    this.query.push({
      $match: data,
    });
    return this;
  }

  group(data: object): this {
    this.query.push({
      $group: data,
    });
    return this;
  }

  unwind(data: object): this {
    this.query.push({
      $unwind: data,
    });
    return this;
  }

  lookup(data: object): this {
    this.query.push({
      $lookup: data,
    });
    return this;
  }

  addFields(data: object): this {
    this.query.push({
      $addFields: data,
    });
    return this;
  }

  project(data: object): this {
    this.query.push({
      $project: data,
    });
    return this;
  }

  build(): object[] {
    return this.query;
  }

}