export const filitersModels = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || Number.MAX_SAFE_INTEGER;
    const search = req.query.search;
    let sortby = parseInt(req.query.sort) || 1;
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
    if (req.query.price) {
      let price = parseInt(req.query.price);
      match.$or = [
        {
          price: { $gte: price },
        },
      ];
    }
    if (req.query.rating) {
      let rating = parseInt(req.query.rating);
      match.$or = [
        {
          rating: { $gte: rating },
        },
      ];
    }
    if (req.query.quantity) {
      let quantity = parseInt(req.query.quantity);
      match.$or = [
        {
          quantity: { $eq: quantity },
        },
      ];
    }
    try {
      let pipeline = [
        { $match: match },
        {
          $match: {
            $or: [
              { name: { $regex: search || "", $options: "i" } },
              { description: { $regex: search || "", $options: "i" } },
            ],
          },
        },
        { $sort: { createdAt: sortby } },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $set: {
            user: {
              $arrayElemAt: ["$user", 0],
            },
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },

        {
          $lookup: {
            from: "subcategories",
            localField: "subcategory",
            foreignField: "_id",
            as: "subcategory",
          },
        },

        {
          $project: {
            category: { $arrayElemAt: ["$category.name", 0] },
            subcategory: { $arrayElemAt: ["$subcategory.name", 0] },
            name: "$name",
            description: "$description",
            price: "$price",
            rating: "$rating",
            photos: "$photos",
            coverPhoto: "$coverPhoto",
            priceSymbol: "$priceSymbol",
          },
        },
        {
          $facet: {
            metadata: [
              { $count: "total" },
              {
                $addFields: {
                  total_Pages: results.totalPages,
                  per_page: limit,
                  page: page,
                },
              },
            ],
            data: [{ $skip: startIndex }, { $limit: limit }],
          },
        },
      ];
      const Modals = await model.aggregate(pipeline).exec();
      results.results = Modals;
      if (
        results.results.length === 0 ||
        results.results[0].data.length === 0
      ) {
        return res.status(404).json({
          success: false,
          statuscode: 404,
          data: null,
          message: "No items found",
        });
      } else {
        results.resultCount = results.results.length;
        res.paginatedResults = results;
      }
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
