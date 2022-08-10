const { Pool, Client } = require("pg");

const _express = require("express");
const _server = _express();

const _port = 4000;

_server.get(
  "/retoibm/sumar/:sumando01/:sumando02",
  function (request, response) {
    try {
      var _sumando01 = new Number(request.params.sumando01);
      var _sumando02 = new Number(request.params.sumando02);
      var _resultado = _sumando01 + _sumando02;
      console.log(_resultado);

      insertdata(_sumando01, _sumando02);

      if (
        typeof _resultado !== "undefined" &&
        _resultado !== null &&
        !isNaN(_resultado)
      ) {
        return response.status(200).json({ resultado: _resultado });
      } else {
        return response.status(400).json({ resultado: "Bad Request" });
      }
    } catch (e) {
      return response.status(500).json({ resultado: e });
    }
  }
);

_server.listen(_port, () => {
  console.log(`Server listening at ${_port}`);
});

const insertdata = async (val1, val2) => {
  console.log("adasd");

  try {
    const pool = new Pool({
      user: "root",
      host: "localhost",
      database: "test_db",
      password: "root",
      port: "5432",
    });
    pool.query(
      `INSERT INTO sumas(val1,val2)VALUES(${val1},${val2})`,
      (err, res) => {
        console.log("asd");
        console.log(err, res);
        pool.end();
      }
    );
  } catch (error) {
    console.log(error);
  }
};