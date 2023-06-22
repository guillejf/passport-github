import express from 'express';

export const testSocketChatRouter = express.Router();

testSocketChatRouter.get('/', (req, res) => {
  return res.render('test-chat', {});
});
