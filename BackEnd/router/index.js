const userRouter = require('./user')
const adminRouter = require('./admin')
const goodRouter = require('./good')
const invoiceRouter = require('./invoice')
const gustRouter = require('./gust')

function router(app) {
    app.use('/api/user', userRouter);
    app.use('/api/admin', adminRouter);
    app.use('/api/good', goodRouter)
    app.use('/api/invoice', invoiceRouter)
    app.use('/api/gust', gustRouter)

}

module.exports = router