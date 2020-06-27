const insertProductToCart = (req, res, name) => {
  try {
    const { id, size, color, quantity } = req.body;
    if (
      id !== undefined &&
      size !== undefined &&
      color !== undefined &&
      quantity !== undefined
    ) {
      let listProductInCart = [];
      let theSame = false;
      const cart = req.cookies[name];
      if (cart !== undefined) {
        for (const prd of cart) {
          if (id === prd.id && size === prd.size && color === prd.color) {
            prd.quantity = Number(prd.quantity) + Number(quantity);
            theSame = true;
            continue;
          }
        }
        if (!theSame) listProductInCart.push(req.body);
        listProductInCart = [...listProductInCart, ...cart];
        res.cookie(name, listProductInCart);
        return true;
      }
      listProductInCart.push(req.body);
      res.cookie(name, listProductInCart);
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

const updateProductToCart = (req, res, name) => {
  try {
    const listProductInCart = getListProductInCart(req, name);
    if (listProductInCart !== undefined) {
      for (let i = 0; i < listProductInCart.length; i++) {
        for (let j = 0; j < req.body.id.length; j++) {
          if (listProductInCart[i].id === req.body.id[j]) {
            listProductInCart[i].quantity = req.body.quantity[j];
          }
        }
      }
      res.cookie(name, listProductInCart);
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

const getListProductInCart = (req, name) => {
  let data = req.cookies[name];
  data !== undefined ? data : (data = []);
  return data;
};

const deleteProductInCart = (req, res, name) => {
  let data = req.cookies[name];
  if (data !== undefined) {
    for (let i = 0; i < data.length; i++) {
      if (!!req.query.id && data[i].id === req.query.id) {
        if (data.length === 1) {
          res.clearCookie(name);
          break;
        } else {
          data.splice(i, 1);
          res.cookie(name, data);
        }
      }
    }
    return true;
  }
  return false;
};

module.exports = {
  insertProductToCart,
  updateProductToCart,
  getListProductInCart,
  deleteProductInCart,
};
