import CredentialsProvider from "next-auth/providers/credentials"
import {User}  from "@/models/User"
import NextAuth from "next-auth/next"
import bcrypt from "bcrypt"
import * as mongoose from "mongoose"

const handler = NextAuth({
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          id: 'credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Email", type: "email", placeholder: "text@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {

            const email = credentials?.email;
            const password = credentials?.password;

            mongoose.connect(process.env.MONGO_URL);
            const user = await User.findOne({ email });
            const passwordOK = user && bcrypt.compareSync(password, user.password);

            if (passwordOK) {
              return user;
            }
          
            return null;
          }
        })
      ]
})