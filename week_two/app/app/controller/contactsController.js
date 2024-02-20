const contacts = require("@jworkman-fs/asl/src/Data/contacts");
const Pager = require("@jworkman-fs/asl/src/Util/Pager");
const { PagerLimitExceededError } = require("@jworkman-fs/asl/src/Exception/pager");
const { InvalidEnumError, InvalidOperatorError, InvalidContactResourceError, DuplicateContactResourceError, InvalidContactSchemaError } = require("@jworkman-fs/asl/src/Exception/index");
const { ContactModel, sortContacts, filterContacts, validateContactData } = require("@jworkman-fs/asl/src/Model/index");

const Operators = ["eq", "gt", "gte", "lt", "lte"];
const schemaFields = ['fname', 'lname', 'email', 'phone', 'birthday'];

const getContacts = (req, res) => {
  const {page, size, sort, direction, limit} = req.query;
  const by = req.headers["x-filter-by"];
  const operator = req.headers["x-filter-operator"];
  const value = req.headers["x-filter-value"];

    const pageLimit = limit ? limit : size;

    try{
      if(pageLimit > 20){
        throw new PagerLimitExceededError("Page limit cannot exceed 20.");
      }
      if(direction && direction !== "asc" && direction !== "desc"){
        throw new InvalidEnumError(`${direction} is not a valid direction.`);
      }
      if(operator && !Operators.includes(operator)){
        throw new InvalidOperatorError(`${operator} is not a valid operator.`);
      }
      const filterData = filterContacts(by, operator, value, contacts);
    
      const sortData = sortContacts(filterData, sort ? sort : "id" , direction ? direction : "asc");
 
      const pager = new Pager(sortData, page ? page : 1, pageLimit);
      res.set("X-Page-Total", pager.pages)
      res.set("X-Page-Next", pager.next())
      res.set("X-Page-Prev", pager.prev())
      res.status(200).json(pager.results());
    } 
    catch(err) {
      errorHandler(err, res);
    }
};

const getContactById = (req, res) => {
    const {id} = req.params;

    try{
        if(isNaN(Number(id))) {
          throw new InvalidContactResourceError("Invalid contact ID. Please provide a valid number");
        }
        const contact = ContactModel.show(id);
        res.status(200).json(contact);
      } 
      catch(err) {
        errorHandler(err, res);
      }
};

const createContact = (req, res) => {
    const {body} = req;

    try{
      const invalidField = Object.keys(body).find(key => !schemaFields.includes(key))

      if(invalidField) {
        throw new InvalidContactSchemaError(`${invalidField} is not a valid field area`);
      }
      if(contacts.some(contact => contact.email === body.email)) {
        throw new DuplicateContactResourceError("A contact with this email already exists");
      }
      if(!Object.values(body).every(value => !!value)) {
        throw new InvalidContactResourceError("There is an empty field! Ensure all fields are completed");
      } 

      validateContactData(body);
      const newContact = ContactModel.create(body);
      res.set("Location", `/v1/contacts/${newContact.id}`);
      res.status(303).json(newContact);
    } 
    catch(err) {
      errorHandler(err, res);
    }
};

const updateContact = (req, res) => {
    const {body} = req;
    const {id} = req.params;
    
    try{
        if(isNaN(Number(id))) {
          throw new InvalidContactResourceError("Invalid contact ID. Please provide a valid number");
        } 

        const updateSchemaFields = ["id", ...schemaFields];
        const invalidField = Object.keys(body).find(key => !updateSchemaFields.includes(key))

        if(invalidField) {
          throw new InvalidContactSchemaError(`${invalidField} is not a valid field area`);
        }
        if(contacts.some(contact => contact.email === body.email)) {
          throw new DuplicateContactResourceError("A contact with this email address already exists");
        }
        if(!Object.values(body).every(value => !!value)) {
          throw new InvalidContactResourceError("There is an empty field! Ensure all fields are completed");
        }
        validateContactData(body, true);
        const contact = ContactModel.update(id, body);
        res.set("Location", `${contact.id}`);
        res.status(303).json(contact);
      } 
      catch(err) {
        errorHandler(err, res);
      }
};

const deleteContact = (req, res) => {
    const{id} = req.params;
    try{
      if(isNaN(Number(id))) {
        throw new InvalidContactResourceError("Invalid contact ID. Please provide a valid number");
      }
        const contact = ContactModel.remove(id);
        res.redirect(303, "http://localhost:8080/v1/contacts").json(contact); 
      } 
      catch(err) {
        errorHandler(err, res);
      }
};

const errorHandler = (err, res) => {
  console.log(err);
  const message = err.message ? err.message : "An invalid request was received"
  res.status(err.statusCode ? err.statusCode: 400).json({message});
};

module.exports = {getContacts, getContactById, createContact, updateContact, deleteContact}