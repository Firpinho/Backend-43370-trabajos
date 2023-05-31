class ProductManager{
    
    constructor() {
        this.products = [];
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product_exists = this.products.some(product => {
            return product.id === id
        });
        
        if(!product_exists) return "Err. No existe: No existe un producto con este ID.";

        let result;

        this.products.forEach(product => {
            if(Object.values(product).includes(id)){
                result = product;
            }
        });

        return result;
    }

    addProduct(title, description, price, thumbnail, code, stock){
        
        const product  = {
            id: this.#generateId(),
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }

        if(this.#code_exists(code)) return console.log("Err. Codigo duplicado: Ya existe un producto con este codigo.");
        if(this.#validate_fields(product)) return console.log("Err. Campos vacios: Todos los campos son obligatorios.");

        this.products.push(product);
    }

    #generateId(){
        
        let id = 0;
        this.products.forEach(product => { if(product.id >= id) id++; });
        
        return id;
    }

    #code_exists(code){
        
        const exists = this.products.some(product => {
            return product.code === code;
        });
        
        return exists;
    }

    #validate_fields(product) {
        
        const result = Object.values(product).some(value => {
            return value === null || value === undefined || value === "";
        });

        return result;
    }

}


const instance = new ProductManager();


console.log(instance.getProducts());

instance.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

console.log(instance.getProducts());

instance.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

instance.addProduct("producto prueba", "", 200, "Sin imagen", "abc124", 25)

console.log(instance.getProductById(0));

console.log(instance.getProductById(1));