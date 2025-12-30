import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    movieId: { type: Number, required: true },
    movieTitle: { type: String, default: '' },
    rating: { type: Number, min: 0, max: 10, required: true },
    review: { type: String, default: '' }
  },
  { timestamps: true }
);

reviewSchema.index({ userName: 1, movieId: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
