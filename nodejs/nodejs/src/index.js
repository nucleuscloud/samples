const http = require('http');
const url = require('url');
const axios = require('axios');

const port = process.env.PORT || 3000;

http.createServer(async function (req, res) {
    const queryObject = url.parse(req.url, true).query;
    let name = process.env.DEFAULT_NAME ?? 'Anonymous';
    if (queryObject.name) {
      name = queryObject.name;
    }

    const dependentData = {};
    const depUrl = process.env.SERVICE_B_URL
    if (depUrl) {
      try {
        const output = await axios({
          url: depUrl,
        });
        console.log('Dependent output:', output.data);
        dependentData.status = output.status;
        dependentData.statusText = output.statusText;
        dependentData.data = output.data;
      } catch (err) {
        if (err instanceof axios.AxiosError) {
          if (err.response) {
            dependentData.status = err.response.status;
            dependentData.statusText = err.response.statusText;
            dependentData.data = err.response.data;
          }
        }
        console.error(err);
      }
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end({
      data: `hello ${name}`,
      dependentData,
    });
}).listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
