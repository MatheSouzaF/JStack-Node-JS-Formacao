const http = require("http");

const { URL } = require("url");

const routes = require("./routes");

const server = http.createServer((req, res) => {
  const parseUrl = new URL(`http://localhost:3000${req.url}`);

  console.log(`Request method: ${req.method} | Endpoint: ${parseUrl.pathname}`);

  let { pathname } = parseUrl;
  let id = null;
  const splitEndpoint = pathname.split("/").filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find(
    (routeObj) =>
      routeObj.endpoint === pathname && routeObj.method === req.method
  );
  if (route) {
    req.query = Object.fromEntries(parseUrl.searchParams);
    req.params = { id };
    route.handler(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`Cannot ${req.method} ${req.url}`);
  }

  // if (req.url === "/users" && req.method === "GET") {
  //  UserController.listUser(req, res);
  // } else {
  //     res.writeHead(404, { "Content-Type": "text/html" });
  //     res.end(`Cannot ${req.method} ${req.url}`);
  // }
});

server.listen(3000, () =>
  console.log("Server Started at http://localhost:3000")
);
