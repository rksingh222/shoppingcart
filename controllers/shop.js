const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) =>{
  const id = req.params.productId;
  console.log(id);
  Product.findById(id , product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Product Detail',
      path: '/product-detail'
    });
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getProducts(carts =>{
      Product.fetchAll(products =>{
        const cartProducts = [];
        for (product of products){
          cartProductData = carts.products.find(prod => prod.id == product.id)
          if(cartProductData){
            cartProducts.push({productData: product, qty:cartProductData.qty})
          }
        }
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cartProducts
        });
      })
  })
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price)
    
  });
  res.redirect('/cart');
};

exports.addQtyPostCart = (req, res, next) => {
  //const prodId = req.params.productId;

  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.increaseQuantity(prodId,product.price);
    res.redirect('/cart');
  });
  
}

exports.delOneQtyPostCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.decreaseQuantity(prodId,product.price);
    console.log("in redirect")
    res.redirect('/cart');
  });
 
}

exports.deletePostCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product =>{
    Cart.deleteProduct(product.id, product.price);
    res.redirect('/cart');
  })
}


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
