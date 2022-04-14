module.exports = [
  {
    method: "GET",
    path: "/invalidate",
    handler: "invalidateController.index",
    config: {
      policies: [],
    //   auth: false,
    },
  },
];
