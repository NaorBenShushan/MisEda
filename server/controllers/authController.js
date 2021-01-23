const User = require('../models/userModel');
const { validateUserOnRegister, validateUserOnLogin } = require('./userController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**************************************************
 ******************** REGISTER ********************
 **************************************************/
exports.register = async (req, res) => {
  try {
    // Validate body
    let body = await validateUserOnRegister(req.body);

    // check if there is a user with the email sent
    const user = await User.findOne({ email: body.email });
    if (user) return res.status(400).send('אימייל קיים במערכת');

    // clean body from sensitive values
    delete body._id;
    delete body.favorites;
    delete body.createdAt;

    // Hash password
    const salt = await bcrypt.genSalt(12);
    body.password = await bcrypt.hash(body.password, salt);

    // create document
    await User.create(body);

    // send response
    res.status(201).send(body);
  } catch (err) {
    res.status(400).send(err.errors);
  }
};

/**************************************************
 ********************* LOGIN **********************
 **************************************************/
exports.login = async (req, res) => {
  try {
    // Validate body
    await validateUserOnLogin(req.body);

    const { email, password } = req.body;

    // 1) check if email && password exists
    if (!email || !password) {
      res.status(400).send('ציין אימייל וסיסמא');
    }

    // 2) check if user exist && password is correct
    const user = await User.findOne({ email: email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(400).send('אימייל או סיסמא לא נכונים');
    }

    // 3) if everything is ok, send token to client
    res.json({
      token: user.generateAuthToken(),
      // favorites: user.getFavorites()
    });
  } catch (err) {
    res.status(400).send(err.errors);
  }
};

/**************************************************
 ****************** PROTECT - MW ******************
 **************************************************/
exports.protectMW = async (req, res, next) => {
  try {
    // 1) Getting token && check if it's exists
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return res.status(401).send('אנא התחבר כדי לקבל גישה לעמוד זה');

    // 2) Verification token
    const decoded = jwt.verify(token, process.env.JWTKEY);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded._id);

    if (!currentUser) return res.status(401).send('אנא התחבר שנית');

    // 4) GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;

    next();
  } catch (err) {
    res.status(401).send('אנא התחבר');
  }
};
