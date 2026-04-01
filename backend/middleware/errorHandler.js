const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // MongoDB validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'Validation error', 
      details: Object.values(err.errors).map(e => e.message) 
    });
  }

  // MongoDB duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({ 
      error: `${field} already exists` 
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' });
  }

  // Default error
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error' 
  });
};

module.exports = errorHandler;