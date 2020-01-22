const http = require('http');
const EasyPost = require('@easypost/api');
const api = new EasyPost('EZAK1ed12069664442f2a6985c190148af0aYZ0DxnsAvRUApZtR4nstVQ');

const server = http.createServer((req, res) => {
 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'application/json');
 
  var tracking_code = req.url.split('/tracking?code=');

  if(req.url.includes('/tracking?code=') && tracking_code.length > 0)
  {

    res.statusCode = 200;

    const tracker = new api.Tracker({
      tracking_code: tracking_code[1],
      carrier: "USPS"
    });
  
    tracker.save().then((data)=>{
        res.end(JSON.stringify(data));
    });
  }
  else{
    res.statusCode = 400;
    res.end('Not a valid tracking number');
  }

}).listen(process.env.PORT);
