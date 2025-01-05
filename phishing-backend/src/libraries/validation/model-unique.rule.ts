import { Repository, SelectQueryBuilder } from 'typeorm';
import { Callback } from '@attract/smart-resources/contracts';

export default (
  field: string,
  repository: Repository<any>,
  callback: Callback<SelectQueryBuilder<any>> = null,
) => {
  return async (input) => {
    // Create alias for a table.
    const alias = crypto.randomUUID();

    // Create default query.
    let query = repository
      .createQueryBuilder(alias)
      .select('1', 'is_exists')
      .where(`${alias}.${field} = :input`, { input });

    // Normalize query if required.
    query = callback ? callback(query, alias) : query;

    // Execute sub query.
    const existedRecordsCount = await repository
      .createQueryBuilder()
      .select('1')
      .whereExists(query)
      .withDeleted()
      .getCount();

    return existedRecordsCount === 0;
  };
};
