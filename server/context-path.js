// Most similar to our raw express middleware and our entry-server preMiddleware
export default function (req, res, next) {
    res.locals.contextPath = req.headers['x-urbn-context-path'];
    next();
}
