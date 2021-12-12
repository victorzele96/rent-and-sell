const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;

// With middleware
app.use('/', function(req, res, next){
    res.send({"name":"victor"});
    next();
 });

app.listen(PORT, () => {
  console.log(`Server running successfully on ${PORT}`);
});
