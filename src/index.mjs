import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const { json } = bodyParser;
import './config/db/mongoose.mjs';
import dashboardRouter from './routers/dashboard.router.mjs'
import vendorRouter from "./routers/vendor.router.mjs";

const port = process.env.PORT || 8080

const app = express();

app.use(cors())
app.use(json());
app.use(dashboardRouter);
app.use(vendorRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
