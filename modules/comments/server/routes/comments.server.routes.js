'use strict';

/**
 * Module dependencies
 */
var commentsPolicy = require('../policies/comments.server.policy'),
  comments = require('../controllers/comments.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/comments').all(commentsPolicy.isAllowed)
    .get(comments.list)
    .post(comments.create);

  // Single article routes
  app.route('/api/comments/:commentId').all(commentsPolicy.isAllowed)
    .get(comments.read)
    .put(comments.update)
    .delete(comments.delete);

  // Finish by binding the article middleware
  app.param('commentId', comments.commentByID);
};
