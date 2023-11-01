const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'Sorry, you do not have the permission to perform that action!');
        return res.redirect(`/campgrounds/${req.params.id}`);
    }
    next();
}