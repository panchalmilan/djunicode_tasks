const mongoose = require('mongoose');
const slugify = require('slugify');

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'add your first name'],
    trim: true,
    maxlength: [15, 'first name cannot be more than 15 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'add your last name'],
    trim: true,
    maxlength: [15, 'last name cannot be more than 15 characters'],
  },
  english: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  maths: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  average: Number,
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: String,
    default: new Date().toString().split(' ').splice(0, 5).join(' '),
  },
  modifiedAt: {
    type: String,
    default: new Date().toString().split(' ').splice(0, 5).join(' '),
  },
});

StudentSchema.pre('validate', function (next) {
  // this.average = (this.maths + this.english) / 2

  const _slug = `${this.firstName} ${this.lastName} ${
    Math.floor(Math.random() * 1000) + 1
  }`;
  this.slug = slugify(_slug, { lower: true });

  next();
});

// ('Name of Model', variable used here)
module.exports = mongoose.model('Student', StudentSchema);
