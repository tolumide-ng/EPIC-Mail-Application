/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
/* eslint-disable no-else-return */
import jwt from 'jsonwebtoken';
//import config from '../config';
import UserModel from '../models/model';

const Model = {
    createAUser(req, res) {
        const email = req.body.email;
        if(!email){
          return res.status(400).send({ message: 'email is required' });
        }
        if(email){
          const user = UserModel.findOneEmail(req.body.email)
          const validateEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
          const result = validateEmail.test(email);
          const newVal = email.split('@');
          const finalCheck = newVal[1];
          if(!result || finalCheck !=="epic.com"){ 
            return res.status(400).send({ message: 'please enter a valid epic email' });
          }
          if(user && user.email === req.body.email){
            return res.status(400).send({ message: 'email already exists' });
          }
        }
        if(!req.body.firstName || req.body.firstName.length < 3){
          return res.status(400).send({ message: 'first name is required and has a minimum of 3 characters' });
        }
        if(!req.body.lastName || req.body.lastName.length < 3){
          return res.status(400).send({ message: 'last name is required and has a minimum of 3 characters' });
        }
        if(!req.body.password || req.body.password.length < 6){
          return res.status(400).send({ message: 'password is required and has a minimum of 6 characters' });
        }
        /*if (!email || !req.body.firstName || !req.body.lastName || !req.body.password) {
          return res.status(400).json({ message: 'All fields are required' });
        }*/
          const hashedPassword = UserModel.hashPassword(req.body.password);
          // call req.body, destructure to get password and then save encrypt into password
          const userData = {...req.body, password: hashedPassword};
          // create a user that will be displayed by passing userData that contains req.body but remove pwd using token
          const user = UserModel.createUser(userData);
          // eslint-disable-next-line prefer-const
          let token = jwt.sign({ email: user.email, id: user.userId },
            process.env.SECRET,
            { expiresIn: '24h' });
          res.status(200).send({
            status: 'success',
            data:
           {
             message: `Authentication successful!. Welcome ${req.body.firstName}`,
             token: token
           },
          });
      },
      login(req, res) {
        //find the particular user using user's email
        const user = UserModel.findOneEmail(req.body.email);
        if (!req.body.email || !req.body.password) {
          return res.status(400).send({ message: 'email and password are required' });
        }
        // check that the user exists(i.e user) and that the hash of the same password is the same as the hashedLoginPwd
        if (user &&  !UserModel.comparePassword(user.password, req.body.password)) {
          return res.status(400).send({ message: 'Username or password is incorrect' });
        }
        if (user ) {
          
          // eslint-disable-next-line prefer-const
          let token = jwt.sign({ email: user.email, id : user.userId },
            process.env.SECRET,
            { expiresIn: '24h' });
          res.status(200).send({
            status: 'success',
            data:
            {
              token: token,
            },
          });
        }
        else {
          res.status(403).send({
            success: 'error',
            message: 'Incorrect username or password'
          });
        }
      },
      getUserEmail(req, res) {
        const email = UserModel.findOneEmail(req.body.email);
        if (!email) {
          return res.status(404).send({ message: 'user email not found' });
        }
        return res.status(200).send(user);
      },
      sendMessage(req, res) {
        if(!req.body.subject){
          return res.status(400).send({ message: 'A subject is required' });
        }
        if(!req.body.message){
          return res.status(400).send({ message: 'A message is required' });
        }
        if(!req.body.email){
          return res.status(400).send({ message: 'Email is required' });
        }
        const reciever = UserModel.findOneEmail(req.body.email);
        // if there is a reciever
        if(reciever){
          console.log(reciever);
        const msg = {...req.body , sender:req.decodedMessage.id, reciever:reciever.userId}
        const message = UserModel.sendMessage(msg);
        return res.status(200).send(message); 
        }
        else{
          return res.status(400).send({ message: 'the email does not exist' });
        }
      },
      getAllMessagesPerUser(req, res) {
        const message = UserModel.getAllMessagesPerUser(req.decodedMessage.id); // pass the decoded and check if it exists
        if (!message) {
          res.status(404).send('the email(s) are no where to be found');
        }
        const arrOfMessages = [];
        Object.values(message).forEach(i => arrOfMessages.push(i));
        res.status(200).send(Object.values(arrOfMessages));
      },
      getUnreadMessagesPerUser(req, res) {
        const message = UserModel.getUnreadMessagesPerUser(req.decodedMessage.id);
        if (!message) {
          res.status(404).send('the email(s) are no where to be found');
        }
        const arrOfMessages = [];
        Object.values(message).forEach(i => arrOfMessages.push(i));
        res.status(200).send(Object.values(arrOfMessages));
      },
      /* credit: Orji Ikechukwu (LFA Andela) */
      getAMessage(req, res) {
        const message = UserModel.getAMessage(req.decodedMessage.id);
        if (!message) {
          res.status(404).send('the email is no where to be found');
        }
        message.status = 'read';
        res.status(200).json(message);
      },
      getMessagesSentByAUser(req, res) {
        const message = UserModel.getMessagesSentByAUser(req.decodedMessage.id);
        if (!message) {
          res.status(404).send('the email(s) are no where to be found');
        }
        const arrOfSentMessages = [];
        Object.values(message).forEach(i => arrOfSentMessages.push(i));
        res.status(200).send(Object.values(arrOfSentMessages));
      },
      getOneUser(req, res) {
        const user = UserModel.findOneUser(req.decodedMessage.id);
        if (!user) {
          return res.status(404).send({ message: 'user email not found' });
        }
        return res.status(200).send(user);
      },
      deleteAMessage(req, res) {
        const message = UserModel.getAMessage(req.decodedMessage.id);
        if (!message) {
          res.status(404).send('the email(s) are no where to be found');
        }
        const msgToBeDeleted = UserModel.deleteAMessage(req.decodedMessage.id);
        res.status(404).send('the selected message is deleted');
      },
      
};

export default Model;