import http, { IncomingMessage } from 'http';
import url from 'url';
import axios, { AxiosError } from 'axios';

async function handleRequest(req: IncomingMessage, res: http.ServerResponse): Promise<void> {
  const queryObject = url.parse(req.url ?? '', true).query;
  let name = process.env.DEFAULT_NAME ?? 'Anonymous';
  if (queryObject.name) {
    name = Array.isArray(queryObject.name) ? queryObject.name[0] : queryObject.name;
  }

  const dependentData: Record<string, any> = {};
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
      if (err instanceof AxiosError) {
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
  res.end(JSON.stringify({
    data: `hello ${name}`,
    dependentData,
  }));
}

function onListen(): void {
  console.log(`Server running at http://0.0.0.0:${port}/`);
}


const port = parseInt(process.env.PORT ?? '3000', 10) || 3000;
http.createServer(handleRequest).listen(port, "0.0.0.0", undefined, onListen);
