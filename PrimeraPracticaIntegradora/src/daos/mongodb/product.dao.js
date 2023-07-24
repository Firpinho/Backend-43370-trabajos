class ProductDaoMongoDB{

    constructor(model){
        this.model = model;
    }

    async getAll() {
        try {
            const response = await this.model.find({});
            return response;
        } catch (error) {
            console.log(error.message);
        }
    }

    async getById(id) {
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            console.log(error.message);
        }
    }

    async create(obj) {
        try {
            const response = await this.model.create(obj);
            return response;
        } catch (error) {
            console.log(error.message);
        }
    }

    async update(id, product) {
        try {
            const response = await this.model.findByIdAndUpdate(id, product, {new: true});
            return response;
        } catch (error) {
            console.log(error.message);
        }
    }

    async delete(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = { ProductDaoMongoDB }