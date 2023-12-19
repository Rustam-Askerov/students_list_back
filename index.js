const express = require('express')
const studentRouter = require('./routes/students.routes')
const supervisorRouter = require('./routes/supervisor.router')
const worksRouter = require('./routes/works.routes')
const departmentsRouter = require('./routes/departments.router')
const cors = require('cors')
const PORT = process.env.PORT || 8080
const app = express()

app.use(cors({
    origin: true,
    optionsSuccessStatus: 200
}))
app.use(express.json())
app.use('/api', studentRouter,)
app.use('/api', supervisorRouter,)
app.use('/api', worksRouter,)
app.use('/api', departmentsRouter)

app.listen(PORT, () => console.log('server started on port ' + PORT))