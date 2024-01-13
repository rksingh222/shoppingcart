const fs = require('fs');
const path = require('path');

/*const p = path.join(
    path.dirname(process.mainModule.filename),
    'tmp',
    'cart.json'
);*/
const p = path.join("/tmp","cart.json");
// Here products : [{id:12345, qty: 1}]

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }
            if (!err) {
                console.log("no error");
                console.log(fileContent.length);
                if (fileContent.length === 0) {
                    let cart = { products: [], totalPrice: 0 }
                }
                else {
                    cart = JSON.parse(fileContent)
                }

            }
            console.log(cart.products);
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })

    }
    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            const updatedCart = { ...JSON.parse(fileContent) }
            const product = updatedCart.products.find(prod => prod.id === id)
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        })
    }

    static increaseQuantity(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (!err) {
                const cart = JSON.parse(fileContent);
                const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
                const existingProduct = cart.products[existingProductIndex];
                let updatedProduct;
                if (existingProduct) {
                    updatedProduct = { ...existingProduct };
                    updatedProduct.qty = updatedProduct.qty + 1
                    cart.products = [...cart.products]
                    cart.products[existingProductIndex] = updatedProduct;
                }
                cart.totalPrice = cart.totalPrice + +productPrice;
                fs.writeFile(p, JSON.stringify(cart), err => {
                    console.log(err);
                })
            }
        })
    }

    static decreaseQuantity(id, productPrice){
        fs.readFile(p, (err, fileContent) => {
            if (!err) {
                const cart = JSON.parse(fileContent);
                const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
                const existingProduct = cart.products[existingProductIndex];
                let updatedProduct;
                if (existingProduct && existingProduct.qty > 1) {
                    updatedProduct = { ...existingProduct };
                    updatedProduct.qty = updatedProduct.qty - 1
                    cart.products = [...cart.products]
                    cart.products[existingProductIndex] = updatedProduct;
                }
                else{
                    console.log(existingProduct.qty)
                    cart.products = cart.products.filter(prod => prod.id !== id)
                }
                cart.totalPrice = cart.totalPrice - +productPrice;
                fs.writeFile(p, JSON.stringify(cart), err => {
                    console.log(err);
                })
            }
        })
    }

    static getProducts(cb) {
        fs.readFile(p, (err, fileContent) => {
            if(!err){
                if (fileContent.length !== 0) {
                    const carts = JSON.parse(fileContent);
                    if (!err) {
                        console.log(carts);
                        cb(carts);
                    } else {
                        console.log(err);
                        console.log("Inside get products - sending null")
                        cb(null);
                    }
                }
                else{
                    console.log(err);
                    console.log("Inside get products - sending null")
                    cb(null)
                }
            }else{
                console.log(err);
            }
        })
    }
}