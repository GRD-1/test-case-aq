const globalTimeout = (timeoutMs) => {
  return (req, res, next) => {
    let isTimeout = false;
    const timeout = setTimeout(() => {
      if (!res.headersSent) {
        isTimeout = true;
        res.status(408).json({
          success: false,
          error: `Request timed out after ${timeoutMs} ms`,
        });
      }
      res.end();
    }, timeoutMs);

    res.on('finish', () => clearTimeout(timeout));
    res.on('close', () => clearTimeout(timeout));

    const originalJson = res.json.bind(res);
    res.json = (body) => {
      if (isTimeout) return;

      return originalJson(body);
    };

    next();
  };
};

export default globalTimeout;
