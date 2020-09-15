import { Client } from "../../components/Square/SquareClient";

const ACCESS_TOKEN =
  "EAAAEKWMsagfxuR6l6ImNcBq0e0xtaGOTOcbrmYvY0520DvzEk3YuJ2js0Zov7a4";

const client = new Client({ access_token: ACCESS_TOKEN });

export default (req, res) => {
  return client
    .products()
    .then((result) => {
      res.statusCode = 200;
      res.json({ data: result });
      return res;
    })
    .catch((err) => {
      console.log("error", err);
      res.statusCode = 400;
      res.json({ message: JSON.stringify(err.message) });
      return res;
    });
};
