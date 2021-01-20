const Rest = require('../models/restModel');

/**************************************************
 *************** GET ALL RESTAURANTS **************
 **************************************************/
exports.getAllRests = async (req, res) => {
  const rests = await Rest.find({ active: true });

  if (!rests) return res.status(404).send('לא נמצאו מסעדות');

  res.status(200).json({
    results: rests.length,
    data: rests
  });
};

/**************************************************
 *************** GET RESTAURANT BY ID *************
 **************************************************/
exports.getRestById = async (req, res) => {
  const restId = req.params.id;
  const rest = await Rest.findOne({ _id: restId, active: true });

  if (!rest) return res.status(404).send('המסעדה המבוקשת לא נמצאה');

  res.status(200).send(rest);
};

/**************************************************
 **************** CREATE RESTAURANT ***************
 **************************************************/
exports.createRest = async (req, res) => {
  // Validate!!!!!!!!!
  try {
    const newDoc = await Rest.create(req.body);

    res.status(200).send(newDoc);
  } catch (err) {
    res.status(401).send(err);
  }
};

/**************************************************
 **************** UPDATE RESTAURANT ***************
 **************************************************/

/**************************************************
 **************** DELETE RESTAURANT ***************
 **************************************************/

/**************************************************
 ************** GET TOP 5 RESTAURANTS *************
 **************************************************/
