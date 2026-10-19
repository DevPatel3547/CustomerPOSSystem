// routes/handle.js -- wrap an async route so DB errors become JSON responses.
module.exports = (fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    const status = err.status || 500;
    if (status >= 500) console.error(err);
    res.status(status).json({ title: status === 400 ? 'Bad request' : 'Database error', error: err.message });
  }
};
