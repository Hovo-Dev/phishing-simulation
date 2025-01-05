
export default (
  field: string,
  repository: any,
) => {
  return async (input) => {
    const existedRecordsCount = await repository.countDocuments({
      [field]: input,
    });

    return existedRecordsCount === 0;
  };
};
