import {FilterQuery} from "mongoose";

export default <T>(
  field: string,
  repository: any,
  callback?: (query: FilterQuery<T>) => FilterQuery<T>,
) => {
  return async (input) => {
    const count = Array.isArray(input) ? input.length : 1;

    // Create base query to find records
    let query = {
      [field]: Array.isArray(input) ? { $in: input } : input,
    } as FilterQuery<T>

    // Apply callback modifications if provided
    query = callback ? callback(query) : query;

    // Count matching records
    const matchedCount = await repository.countDocuments(query);

    // Check if the count matches the input length
    return count === matchedCount;
  };
};
