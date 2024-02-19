const bcrypt =require ("bcrypt");
const jwt =require("jsonwebtoken");
const transporter =require("../config/emailTransport");
const User =require("../models/User");
const Verification =require("../models/Verification");
const AppError =require("../utils/AppError");
const {
    ForgetPassword,
    accountVeification,
    successfullResetPassword,
    verifySuccessfully,
} =require("../utils/emailTemplateUtils");
const verifyCode =require("../utils/verifyCode");

exports.signup = async (req,res,next) => {
    try {
        const hashed = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            ...req.body,
            password: hashed,
            image : {
                url : '',
                public_id : ''
            }
        });

        const user = await newUser.save();

        //verification token
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        //verification code
        const code = verifyCode();
        const hashcode = await bcrypt.hash(code, 10);

        const newVerification = new Verification({
            user: user._id,
            code: hashcode,
        });

        await newVerification.save();

        transporter.sendMail(accountVeification(req.body.email, code), (err) => {
            if (err) {
                next(new AppError(500, err.message));
            } else {
                return res.json({
                    success: true,
                    status: 200,
                    message: "Successfully signup.",
                    token,
                    data: {},
                });
            }
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.signin = async (req,res,next) => {
    try {
        const user = await User.findOne({
            $or: [{ email: req.body.email }, { phone: req.body.email }],
        });
        if (!user) {
            return next(new AppError(404, "Account not found."));
        }
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) {
            return next(new AppError(401, "Access denied. Wrong credentials"));
        }
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.json({
            success: true,
            status: 200,
            message: "Successfully signin.",
            token: token,
            data: user,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.getProfile = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id);
        return res.json({
            success: true,
            status: 200,
            message: "Suceesfully find account.",
            data: user,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.updateProfile = async (req,res,next) => {
    try {
        const user = await User.findByIdAndUpdate(req.user, {
            $set: {
                name: req.body.name,
                "address.area": req.body.area,
                "address.postOffice": req.body.postOffice,
                "address.upazilla": req.body.upazilla,
                "address.district": req.body.district,
            },
        });
        return res.json({
            success: true,
            status: 200,
            message: "Profile updated successfully.",
            data: user,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.findAccount = async (req,res,next) => {
    try {
        const { q } = req.query;

        const user = await User.findOne({
            $or: [{ email: q }, { phone: q }],
        }).select("-password -createdAt -updatedAt -__v");

        if (!user) {
            return next(new AppError(404, "Account not found."));
        }
        return res.json({
            success: true,
            status: 200,
            message: "Successfully account find.",
            data: user,
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.verifyAccount = async (req,res,next) => {
    try {
        const user = await User.findById(req.user);
        const findCode = await Verification.findOne({ user: req.user });

        if (Date.now() > findCode.expire) {
            return next(new AppError(401, "Verification code expired."));
        }

        const isValid = await bcrypt.compare(req.body.code, findCode.code);

        if (!isValid) {
            return next(new AppError(404, "Verification code not Found."));
        }

        await User.findByIdAndUpdate(user._id, {
            $set: {
                isVerified: true,
            },
        });

        await Verification.deleteMany({ user: req.user });

        transporter.sendMail(verifySuccessfully(user.email), (err) => {
            if (err) {
                next(new AppError(500, err.message));
            } else {
                return res.json({
                    success: true,
                    status: 200,
                    message: "Successfully verified.",
                    data: {},
                });
            }
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.verifyCodeSendAgain = async (req,res,next) => {
    try {
        const user = await User.findById(req.user);

        const findCode = await Verification.findOne({ user: req.user });

        const code = verifyCode();

        const hashcode = await bcrypt.hash(code, 10);

        if (!findCode) {
            const newVerification = new Verification({
                user: user._id,
                code: hashcode,
            });

            await newVerification.save();
        } else {
            await Verification.findByIdAndUpdate(findCode._id, {
                $set: {
                    code: hashcode,
                },
            });
        }

        transporter.sendMail(accountVeification(user.email, code), (err) => {
            if (err) {
                next(new AppError(500, err.message));
            } else {
                return res.json({
                    success: true,
                    status: 200,
                    message: "Veridication sent successfully.",
                    data: {},
                });
            }
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.forgetAccount = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id);

        const findCode = await Verification.findOne({ user: req.params.id });

        const token = await jwt.sign({ id: req.params.id }, process.env.JWT_SECRET);

        const code = verifyCode();

        const hashcode = await bcrypt.hash(code, 10);

        if (!findCode) {
            const newVerification = new Verification({
                user: user._id,
                code: hashcode,
            });

            await newVerification.save();
        } else {
            await Verification.findByIdAndUpdate(findCode._id, {
                $set: {
                    code: hashcode,
                },
            });
        }

        transporter.sendMail(ForgetPassword(user.email, token, code), (err) => {
            if (err) {
                next(new AppError(500, err.message));
            } else {
                return res.json({
                    success: true,
                    status: 200,
                    message: "Forget password link sent.",
                    data: {},
                });
            }
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.changePassword = async (req,res,next) => {
    try {
        console.log(req.user, req.body);
        const user = await User.findById(req.user);
        const findCode = await Verification.findOne({ user: req.user });

        if (Date.now() > findCode.expire) {
            return next(new AppError(401, "Verification code expired."));
        }

        const isValid = await bcrypt.compare(req.body.code, findCode.code);

        if (!isValid) {
            return next(new AppError(404, "Verification code not Found."));
        }

        const hashed = await bcrypt.hash(req.body.password, 10);

        await User.findByIdAndUpdate(user._id, {
            $set: {
                password: hashed,
            },
        });

        await Verification.deleteMany({ user: req.user });

        transporter.sendMail(successfullResetPassword(user.email), (err) => {
            if (err) {
                next(new AppError(500, err.message));
            } else {
                return res.json({
                    success: true,
                    status: 200,
                    message: "Successfully Password changed.",
                    data: {},
                });
            }
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.changeEmailAccount = async (req,res,next) => {
    try {
        return res.json({
            success: true,
            status: 200,
            data: "user",
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.changePhoneAccount = async (req,res,next) => {
    try {
        return res.json({
            success: true,
            status: 200,
            data: "user",
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};

exports.changeImageAccount = async (req,res,next) => {
    try {
        return res.json({
            success: true,
            status: 200,
            data: "user",
        });
    } catch (error) {
        next(new AppError(500, error.message));
    }
};
