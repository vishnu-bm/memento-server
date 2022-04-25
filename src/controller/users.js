import bcrypt from 'bcryptjs';
import { raw } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user.js'

export const signIn = async(req,res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(!existingUser) {
            return res.status(404).send({"message": "user not found"})
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordValid) {
            return res.status(404).send({"message": "password incorrect"})
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, "TEST", {expiresIn: "1h"})
        res.status(200).send({ result: existingUser, token})
    } catch(err) {
        res.status(500).send({message: "something went wrong"})
    }
}

export const signUp = async(req,res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).send({"message": "user already exist"})
        }
        if(password !== confirmPassword) return res.status(400).send({ message: "password dont match" })
        
        const hashPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ email, password: hashPassword, name: `${firstName} ${lastName}`})
        const token = jwt.sign({ email: result.email, id: result._id}, "TEST", {expiresIn: "1h"})

        res.status(200).send({ result: result, token})

    } catch(err) {
        res.status(500).send({ message: "something went wrong" })
    }
}

