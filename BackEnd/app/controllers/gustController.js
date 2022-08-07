const Gusts = require("../../models/Gusts");
const { arrayNoDuplicates } = require("../../helpers/arrayNoDuplicates");
const { handleCount } = require("../../helpers/handleCount");

class gustController {
  // [POST] /api/gust/create
  async create(req, res) {
    const { nameGust, phoneGust, addressGust } = req.body;
    console.log(req.body);

    try {
      const Gust = await Gusts.find({});

      const newGust = new Gusts({
        codeGust: `KH${handleCount("KH", "codeGust", Gust)}`,
        nameSeller: req.name,
        nameGust: nameGust,
        phoneGust: phoneGust != "" ? phoneGust : "",
        addressGust: addressGust != "" ? addressGust : "",
      });
      await newGust.save();

      return res.status(200).json({
        success: true,
        message: "Đã tạo khách hàng thành công!",
        newGust,
      });
    } catch (error) {
      res.status(200).json({
        success: false,
        message: "Đã lỗi xảy ra, vui lòng thử lại!",
        error,
      });
    }
  }

  // [POST] /api/gust/get-list
  async getList(req, res) {
    try {
      const GustList = await Gusts.find({});

      return res.status(200).json({
        success: true,
        message: "Get list khách hàng thành công!",
        GustList,
      });
    } catch (error) {
      res.status(200).json({
        success: false,
        message: "Đã lỗi xảy ra, vui lòng thử lại!",
        error,
      });
    }
  }

  // [POST] /api/gust/update
  async update(req, res) {
    const { codeGust, nameGust, phoneGust, addressGust } = req.body;

    try {
      await Gusts.updateOne(
        { codeGust },
        {
          nameGust: nameGust,
          phoneGust: phoneGust != "" ? phoneGust : "",
          addressGust: addressGust != "" ? addressGust : "",
        }
      );

      const listGuest = await Gusts.find({});

      return res.status(200).json({
        success: true,
        message: "Đã cập nhật khách hàng thành công!",
        listGuest,
      });
    } catch (error) {
      console.log(error);
      res.status(200).json({
        success: false,
        message: "Đã lỗi xảy ra, vui lòng thử lại!",
        error,
      });
    }
  }

  // [POST] /api/invoice/remove
  async remove(req, res) {
    const { codeGust } = req.body;

    try {
      await Gusts.deleteOne({ codeGust });

      const listGust = await Gusts.find({});

      return res.status(200).json({
        success: true,
        message: `Xóa khách hàng ${codeGust} thành công!`,
        listGust,
      });
    } catch (error) {
      res.json({
        success: false,
        message: "Đã lỗi xảy ra, vui lòng thử lại!",
        error,
      });
    }
  }

  // [POST] /api/invoice/find
  async find(req, res) {
    const { find } = req.body;

    try {
      if (find != "") {
        const arrayFind = new Array();
        const codeFind = await Gusts.find({
          codeGust: { $regex: find, $options: "i" },
        });
        const nameFind = await Gusts.find({
          nameGust: { $regex: find, $options: "i" },
        });
        const phoneFind = await Gusts.find({
          phoneGust: { $regex: find, $options: "i" },
        });
        const addressFind = await Gusts.find({
          addressGust: { $regex: find, $options: "i" },
        });

        arrayFind.push(...codeFind);
        arrayFind.push(...nameFind);
        arrayFind.push(...phoneFind);
        arrayFind.push(...addressFind);

        return res.status(200).json({
          success: true,
          arrayFind: arrayNoDuplicates(arrayFind),
        });
      } else {
        const arrayFind = await Gusts.find({});

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

  // [POST] /api/guest/findOne
  async findOne(req, res) {
    const { find } = req.body;

    try {
      const guest = await Gusts.findOne({ codeGust: find });

      res.json({
        success: true,
        message: "",
        guest,
      });
    } catch (error) {
      res.json({
        success: false,
        message: "Đã lỗi xảy ra, vui lòng thử lại!",
        error,
      });
    }
  }
}

module.exports = new gustController();
