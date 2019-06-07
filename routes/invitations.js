const express = require('express');
const uid = require('uuid');
const db = require('../db');
const { sendEmail } = require('../services/mailer');

const router = express.Router();

router.post('/', (req, res) => {
  const { name, email } = req.body;
  const id = uid();

  const newInvitation = new db.Invitation({
    id,
    name,
    email,
    activated: false
  });
  newInvitation.save();
  const invitationLink = `http://localhost:3000/invitation/${id}`;
  const message = `<p>Hello ${name}, here is your link: ${invitationLink}</p>`;
  sendEmail(email, 'Invitation', message);
  res.send('ok');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log(typeof id, id);
  db.Invitation.queryOne('id').eq(id).exec().then((result) => {
    if (result) {
      if (result.activated) return res.status(400).send('activated');
      const newUser = new db.User({
        id: uid(),
        name: result.name,
        email: result.email,
        token: id
      });
      newUser.save();
      const updatedInvitation = new db.Invitation({
        id,
        name: result.name,
        email: result.email,
        activated: true
      });
      updatedInvitation.put();
      db.User.scan().exec((err, docs) => {
        if (err) return res.status(500).send('Scanning error');
        return res.send(docs);
      });
    } else {
      return res.status(400).send('no invitation');
    }
  })
    .catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
});

module.exports = router;
