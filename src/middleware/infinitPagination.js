// http://localhost:4000/api/properties?page=1&limit=12&search=kkdjkadd&sort=-1
export const m = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 2;
    const limit = 2;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let match = {};
    const results = {};

    results.totalCount = await model.countDocuments().exec();
    results.totalPages = Math.ceil(results.totalCount / limit);
    if (req.query.page) {
      if (endIndex < (await model.countDocuments().exec())) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }
    }

    try {
      const Modals = await model.find().exec();
      results.limit = limit;
      (results.per_page = limit),
        (results.page = page),
        (results.results = Modals);
      results.next = results.next;
      // results.resultCount = results.results.length;
      res.paginatedResults = results;
      next();
    } catch (error) {
      let response = {
        statuscode: 400,
        errors: error,
        error: [error],
        message: "something failed",
      };
      return res.status(response.statuscode).json(response);
    }
  };
};
