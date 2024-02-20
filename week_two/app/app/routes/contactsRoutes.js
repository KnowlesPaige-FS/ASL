const express = require("express");
const { getContacts, getContactById, createContact, updateContact, deleteContact } = require("../controller/contactsController");
const contactsRoutes = express();

contactsRoutes.get("/contacts", getContacts);
contactsRoutes.get("/contacts/:id", getContactById);
contactsRoutes.post("/contacts", createContact);
contactsRoutes.put("/contacts/:id", updateContact);
contactsRoutes.delete("/contacts/:id", deleteContact);

module.exports = contactsRoutes;