import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    return token;
}

const setTokenCookie = (response, token) => {
    response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60*60*24
    });
}

export { generateToken, setTokenCookie };