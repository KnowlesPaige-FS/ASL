const express = require("express");
const { getContacts, getContactById, createContact, updateContact, deleteContact } = require("../controller/contactsController");
const contactsRoutes = express();

contactsRoutes.get("/", getContacts);
contactsRoutes.get("/:id", getContactById);
contactsRoutes.post("/", createContact);
contactsRoutes.put("/:id", updateContact);
contactsRoutes.delete("/:id", deleteContact);

module.exports = contactsRoutes;