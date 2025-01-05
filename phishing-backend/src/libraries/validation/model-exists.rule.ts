import { In, Repository, SelectQueryBuilder } from 'typeorm';

export default <T>(
  field: string,
  repository: Repository<T>,
  callback?: (
    query: SelectQueryBuilder<T>,
    alias: string,
  ) => SelectQueryBuilder<T>,
) => {
  return async (input) => {
    // Create alias for a table.
    const alias = crypto.randomUUID();
    const count = Array.isArray(input) ? input.length : 1;

    let query = repository.createQueryBuilder(alias).where({
      [field]: Array.isArray(input) ? In(input) : input,
    });

    // Apply callback modifications if provided
    query = callback ? callback(query, alias) : query;

    return count === (await query.getCount());
  };
};
