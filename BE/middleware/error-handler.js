const process = require('process');

module.exports = {
  notFound: (req, res) => {
    res.status(404).json({
      error: "Rota não encontrada",
      path: req.originalUrl,
      method: req.method,
    });
  },

  internalError: (err, req, res, next) => {
    console.error("Erro interno:", err);

    if (res.headersSent) {
      return next(err);
    }

    res.status(500).json({
      error: "Erro interno no servidor",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  },
};
