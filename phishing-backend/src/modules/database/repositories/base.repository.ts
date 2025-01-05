import { Injectable } from '@nestjs/common';
import {Model, SortOrder} from 'mongoose';

@Injectable()
export class BaseRepository<T> extends Model<T> {
  /**
   * Paginate current model with given parameters.
   *
   * @param model
   * @param options
   */
  public async paginate(model: Model<T>, {
    filter = {},
    page = 1,
    limit = 10,
    sort = { createdAt: -1 } as { [key: string]: SortOrder },
    populate = '',
  }) {
    const skip = (page - 1) * limit;

    // 1. Use `Promise.all` to fetch paginated results and count in parallel
    const [items, totalCount] = await Promise.all([
      model
          .find(filter)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .populate(populate), // Handle population
      model.countDocuments(filter),
    ]);

    // 1.2 Count total pages based on document count and limit
    const totalPages = Math.ceil(totalCount / limit);

    return {
      items,
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
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
}
