const Campground = require('../models/campground');

module.exports.isAuthor = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'Sorry, you do not have the permission to perform that action!');
        return res.redirect(`/campgrounds/${req.params.id}`);
    }
    next();
}