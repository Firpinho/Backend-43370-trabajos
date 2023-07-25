const { MessageModel } = require('../daos/mongodb/models/message.model');
const { MessageDaoMongoDB } = require('../daos/mongodb/messages.dao');

const messageDao = new MessageDaoMongoDB(MessageModel);


const getAll = async () => {
    try {
        const result = messageDao.getAll();
        return result
    } catch (error) {
        return error.message
    }
}

const createMessage = async (data) => {
    try {
        const result = messageDao.create(data);
        return result
    } catch (error) {
        return error.message
    }
}

module.exports = {
    getAll,
    createMessage
}