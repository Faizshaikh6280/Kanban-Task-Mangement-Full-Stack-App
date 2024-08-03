import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

const createSendToken = (user, res, statusCode) => {
  try {
    const token = signToken(user._id);

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_EXPIRE_IN * 24 * 60 * 60 * 1000
      ),
      //  secure: true, // make sure only create if protocol is 'https'.
      httpOnly: true, // browser will have no way to access the cookie.
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    // This cookie is used to prevent cross side scripting attacks.
    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
      status: 'success',
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({
      error: `Error💥 ${error.message}`,
    });
    console.log(error);
  }
};

export const signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    createSendToken(newUser, res, 201);
  } catch (error) {
    res.status(400).json({
      error: `Error💥 ${error.message}`,
    });
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie('jwt', '');
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      error: `Error💥 ${error.message}`,
    });
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //1. Check whether email and password provided.
    if (!username || !password)
      throw new Error('Please provide both username and password.');
    //2. Check whether user exists
    const user = await User.findOne({ username }).select('+password ');

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error('Username or password is incorrect!');
    }

    user.password = undefined;
    //3. Send valid token
    createSendToken(user, res, 200);
  } catch (error) {
    res.status(400).json({
      error: `Error💥 ${error.message}`,
    });
    console.log(error);
  }
};

export const protect = async (req, res, next) => {
  let token;

  //1. Check is token provided.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token || token === 'null') {
    return next('You are not logged in! Please log in to get access.');
  }
  //2. Verfifying token
  const decode = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  //3. Check if user still exits.
  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next('User does not exits,Sign up to get access.');
  }

  req.user = currentUser;
  req.locals.user = currentUser;
  next();
};

// exports.isLoggedIn = catchAsync(async (req, res, next) => {
//   let token;

//   //1. Check is token provided.
//   if (req.cookies.jwt) {
//     token = req.cookies.jwt;
//     //2. Verfifying token
//     const decode = await util.promisify(jwt.verify)(
//       token,
//       process.env.JWT_SECRET
//     );
//     //3. Check if user still exits.
//     const currentUser = await User.findById(decode.id);
//     if (!currentUser) {
//       return next();
//     }

//     //4. Check if user changed password after the token was issued.
//     if (currentUser.changedPasswordAfter(decode.iat)) {
//       return next();
//     }

//     req.user = currentUser;
//     req.locals.user = currentUser;
//     return next();
//   }
//   next();
// });

// exports.restrictTo = function (...roles) {
//   return (req, _, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError(
//           "You don't have permission to perform this operation.",
//           403
//         )
//       );
//     }
//     next();
//   };
// };

// exports.forgetPassword = catchAsync(async (req, res, next) => {
//   //1. Get post email from user and checks whether user exists or not.
//   const user = await User.findOne({ email: req.body.email });
//   if (!user)
//     return next(new AppError('User does not exists with given email.'));

//   //2. Generate random reset token
//   const resetToken = user.createPasswordResetToken();
//   await user.save({
//     validateBeforeSave: false,
//   });

//   //3. Send reset token via email to user.
//   const resetUrl = `${req.protocol}://${req.get(
//     'host'
//   )}/api/v1/users/reset-password/${resetToken}`;
//   const message = `Forget your password? Submit a PATCH request with your new password and passwordConfirm to:${resetUrl}.\nIf you did't forget your password,please ignore this email`;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: 'Your password reset token (valid for 10 min)',
//       message,
//     });
//   } catch (error) {
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     return next(
//       new AppError('There is an error sending email,Try again later.')
//     );
//   }

//   res.status(200).json({
//     status: 'success',
//     message: 'Token sent to email',
//   });
// });

// exports.resetPassword = catchAsync(async (req, res, next) => {
//   //1. Get user based on token.
//   const hasedToken = crypto
//     .createHash('sha256')
//     .update(req.params.token)
//     .digest('hex');

//   const user = await User.findOne({
//     passwordResetToken: hasedToken,
//     passwordResetExpires: { $gt: Date.now() },
//   });

//   //2. If token has not been expired and there is a user, set the new password.
//   if (!user) return next(new AppError('Token is invalid or has expired', 400));

//   //3. Update changePassword at property.
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();
//   createSendToken(user, res, 200);
// });

// exports.updatePassword = catchAsync(async (req, res, next) => {
//   console.log(req.body);
//   //1. Get user from collection.
//   const user = await User.findById(req.user._id).select('+password');
//   //2. Check is POSTed password is correct.
//   if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
//     return next(new AppError('Your Current password is wrong!', 401));
//   }
//   //3. If so,update password.
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   await user.save();
//   //4. Log user in, send jwt.
//   createSendToken(user, res, 200);
// });
