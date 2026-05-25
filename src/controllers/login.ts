import config from '../config/config';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import express from 'express';
import responses from '../constants/responses'

const router = express.Router();

interface User {
  username: string;
  passwordHash: string;
  access: string;
  id?: string;
  _id?: string;
  __v?: string;
}

router.post("/", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne<User>({ username });
  const encryptedPassword = user === null || user === undefined ? "" : user.passwordHash;
  const passwordCorrect = bcrypt.compare(password, encryptedPassword);

  if (!passwordCorrect) {
    return response.status(401).json({
      error: responses.ERR_USER_PASSWORD_INVALID,
    });
  }

  const userForToken = {
    username: user?.username,
    id: user?._id,
  };

  const token = jwt.sign(userForToken, config.SECRET);

  if(config.ENV === "production") {
    // token expires in 60*60 seconds (1 hour)
    const token = jwt.sign(
        userForToken,
        config.SECRET,
        { expiresIn: 60*60 }
    )
  }

  response
    .status(200)
    .send({ token, username: user?.username, access: user?.access });
});

export default router;
