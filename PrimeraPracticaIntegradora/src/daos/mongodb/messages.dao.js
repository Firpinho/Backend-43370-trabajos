class MessageDaoMongoDB {
    constructor(model) {
        this.model = model;
    }

    getAll() {
        try {
            const result = this.model.find({});
            return result;
        } catch (error) {
            return error.message
        }
    }

    create(data) {
        try {
            const result = this.model.create(data)
            return result;            
        } catch (error) {
            return error.message
        }
    }

}

module.exports = {MessageDaoMongoDB}