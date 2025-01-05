import { EntityManager, In, Repository, UpdateResult } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';
import { Injectable } from '@nestjs/common';
import Paginator from '../../../libraries/pagination/paginator';
import PaginationDto from '../../../libraries/pagination/pagination.dto';
import cryptoRandomString from '../../../libraries/randomize';

@Injectable()
export class BaseRepository<Model> extends Repository<Model> {
  /**
   * Paginate current model with given parameters.
   *
   * @param page
   * @param limit
   * @param findManyOptions
   */
  public async paginate(
    { page = 1, limit = 10 }: PaginationDto,
    findManyOptions?: FindManyOptions<Model> & FindOptionsOrder<Model>,
  ): Promise<Paginator<Model>> {
    const query = {
      ...findManyOptions,
      relations: { ...findManyOptions?.relations },
      where:
        Array.isArray(findManyOptions?.where) && findManyOptions?.where?.length
          ? [...findManyOptions?.where]
          : { ...findManyOptions?.where },
      order: { ...findManyOptions?.order },
    };

    return this.createQueryBuilder()
      .setFindOptions(query)
      .paginate(this.normalizePage(page), this.normalizePerPage(limit));
  }

  /**
   * Normalize given page
   *
   * @param page
   * @private
   */
  public normalizePage(page?: number) {
    return page && page >= 1 ? page : 1;
  }

  /**
   * Normalize given per page.
   *
   * @param limit
   * @private
   */
  public normalizePerPage(limit?: number) {
    let perPage = limit ? limit : 10;

    if (perPage > 100) {
      perPage = 100;
    }

    return perPage;
  }

  /**
   * Create sub query build for a repository target.
   *
   * @param alias
   */
  public createSubQueryBuilder(alias?: string) {
    return this.createQueryBuilder(alias).subQuery().from(this.target, alias);
  }

  /**
   * Update entity partially.
   *
   * @param IDs
   * @param data
   * @param manager
   */
  public updatePartially(
    IDs: string | string[],
    data: Partial<Model>,
    manager?: EntityManager,
  ): Promise<UpdateResult> {
    manager = manager || this.manager;

    return manager.update(
      this.target,
      {
        id: Array.isArray(IDs) ? In(IDs) : IDs,
      },
      data as any,
    );
  }
}
