import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const signup = async ({ login, password }) => {
    let user = await User.findOne({ login });
    if (user) {
        throw new Error('User already exists');
    }

    user = new User({ login, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    return { message: 'User created' };
};

const signin = async ({ login, password }) => {
    const user = await User.findOne({ login });
    if (!user) {
        throw new Error('Invalid Credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid Credentials');
    }

    const payload = {
        user: {
            id: user.id,
            login: user.login
        }
    };

    const accessToken = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1m' });
    const refreshToken = jwt.sign(payload, 'your_jwt_refresh_secret', { expiresIn: '7d' });

    return { accessToken, refreshToken };
};

export default {
    signup,
    signin
}