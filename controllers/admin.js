const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getEditProduct = (req, res, next) =>{
  //req.query is ?edit=true
  const editMode = req.query.edit;
  if(!editMode){
    res.redirect('/');
  }
  else{
    //req.param = url/12345 == the productid is the req.param.productId
    const prodId = req.params.productId;

    Product.findById(prodId, product =>{
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: product,
        editing: editMode
      });
    })
    
  }
  
}

exports.postEditProduct = (req, res, next) =>{
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  console.log(prodId,updatedTitle,updatedImageUrl,updatedPrice,updatedDescription);
  const product = new Product(prodId, updatedTitle, updatedImageUrl,updatedDescription, updatedPrice);
  product.save();
  res.redirect('/admin/products');
}


exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) =>{
  const prodID = req.body.productId;
  Product.delete(prodID);
  res.redirect('/admin/products');
}


exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
