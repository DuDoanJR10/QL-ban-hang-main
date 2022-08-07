const Goods = require("../../models/Goods");
const { handleCount } = require("../../helpers/handleCount");
const { arrayNoDuplicates } = require("../../helpers/arrayNoDuplicates");

class goodController {
  // [POST] /api/good/add
  async add(req, res) {
    const { productName, priceCapital, priceSell, inventory, filePath } =
      req.body;

    try {
      const Good = await Goods.find({});

      const newGood = new Goods({
        codeProduct: `SP${handleCount("SP", "codeProduct", Good)}`,
        productName,
        priceCapital,
        priceSell,
        inventory,
        filePath,
      });
      await newGood.save();

      return res.status(200).json({
        success: true,
        message: "Đã thêm sản phẩm thành công",
        newGood,
      });
    } catch (error) {
      res.status(200).json({
        success: false,
        message: "Đã lỗi xảy ra, vui lòng thử lại!",
        error,
      });
    }
  }

  // [POST] /api/good/get-list
  async getList(req, res) {
    try {
      const GoodList = await Goods.find({});

      return res.status(200).json({
        success: true,
        message: "Get list sản phẩm thành công!",
        GoodList,
      });
    } catch (error) {
      res.json({
        success: false,
        message: "Đã lỗi xảy ra, vui lòng thử lại!",
        error,
      });
    }
  }

  // [POST] /api/good/update
  async update(req, res) {
    const {
      codeProduct,
      productName,
      priceCapital,
      priceSell,
      inventory,
      filePath,
    } = req.body;

    try {
      await Goods.updateOne(
        { codeProduct },
        {
          productName,
          priceCapital,
          priceSell,
          inventory,
          filePath,
        }
      );

      const listCategory = await Goods.find({});

      return res.status(200).json({
        success: true,
        message: "Cập nhật sản phẩm thành công!",
        listCategory,
      });
    } catch (error) {
      res.json({
        success: false,
        message: "Đã lỗi xảy ra, vui lòng thử lại!",
        error,
      });
    }
  }

  // [POST] /api/good/update-priceSell
  async updatePriceSell(req, res) {
    const { codeProduct, priceSell } = req.body;

    try {
      await Goods.updateOne(
        { codeProduct },
        {
          priceSell,
        }
      );
      const listCategory = await Goods.find({});

      return res.status(200).json({
        success: true,
        message: "Cập nhật sản phẩm thành công!",
        listCategory,
      });
    } catch (error) {
      res.json({
        success: false,
        message: "Đã lỗi xảy ra, vui lòng thử lại!",
        error,
      });
    }
  }

  // [POST] /api/good/remove
  async remove(req, res) {
    const { codeProduct } = req.body;

    try {
      await Goods.deleteOne({ codeProduct });
      const listCategory = await Goods.find({});

      return res.status(200).json({
        success: true,
        message: `Xóa sản phẩm ${codeProduct} thành công!`,
        listCategory,
      });
    } catch (error) {
      res.json({
        success: false,
        message: "Đã lỗi xảy ra, vui lòng thử lại!",
        error,
      });
    }
  }

  // [POST] /api/good/uploadIMG
  async uploadImg(req, res) {
    try {
      if (req.file.path) {
        return res.status(200).json({
          success: true,
          message: `Thêm ảnh thành công`,
          filePath: req.file.path,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: `Thêm ảnh thất bại`,
        });
      }
    } catch (error) {
      return res.json({
        success: false,
        message: `Có lỗi xảy ra, xin vui lòng thử lại!`,
      });
    }
  }

  // [POST] /api/good/find
  async find(req, res) {
    const { find } = req.body;

    try {
      if (find != "") {
        const arrayFind = new Array();
        const codeFind = await Goods.find({
          codeProduct: { $regex: find, $options: "i" },
        });
        const productName = await Goods.find({
          productName: { $regex: find, $options: "i" },
        });

        arrayFind.push(...codeFind);
        arrayFind.push(...productName);

        return res.status(200).json({
          success: true,
          arrayFind: arrayNoDuplicates(arrayFind),
        });
      } else {
        const arrayFind = await Goods.find({});

        return res.status(200).json({
          success: true,
          arrayFind,
        });
      }
    } catch (error) {
      res.json({
        success: false,
        message: "Đã lỗi xảy ra, vui lòng thử lại!",
        error,
      });
    }
  }
}

module.exports = new goodController();
