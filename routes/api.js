/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = (app) => {

  const convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      const input = req.query.input;
      const initNum = Number(convertHandler.getNum(input));
      const initUnit = convertHandler.getUnit(input);
      let unitInvalid=initUnit.match(/invalid/);
      let noUnit=initUnit.match(/no/);
    
      if (typeof(initNum)!='number' || !initNum) {
        if (unitInvalid) return res.status(400).json({error: 'Invalid number and unit'});
        return res.status(400).json({error:'Invalid number'});
      } else if (unitInvalid) return res.status(400).json({error: 'Invalid unit'});
      else if (noUnit) return res.status(400).json({error: 'No unit'});

      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      return res.json({ initNum, initUnit, returnNum, returnUnit, string:toString });
    });

};
