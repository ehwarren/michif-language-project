module.exports = {
  async afterCreate(event) {
    const { result, params } = event;
    await strapi.plugins["email"].services.email.send({
      to: "austin@bluegrove.io",
      subject: "New Form Submission - " + params.data.Form,
      text: params.data.Data,
    });
  },
};
