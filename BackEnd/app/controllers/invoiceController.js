const Goods = require('../../models/Goods')
const Invoices = require('../../models/Invoices')
const { handleCount } = require('../../helpers/handleCount')

class invoiceController {
    // [POST] /api/invoice/create
    async create(req, res) {
        const { nameGuest, addressGuest, phoneGuest, paymentType, productsBuying, totalMoney } = req.body
        try {
            const Invoice = await Invoices.find({})

            const newInvoice = new Invoices({
                codeInvoice: `HD${handleCount('HD', 'codeInvoice', Invoice)}`,
                nameSeller: req.name,
                nameGuest: nameGuest != '' ? nameGuest : 'Khách lẻ',
                addressGuest: addressGuest != '' ? addressGuest : '',
                phoneGuest: phoneGuest != '' ? phoneGuest : '',
                paymentType,
                productsBuying,
                totalMoney
            })
            await newInvoice.save()

            // productsBuying.map((good) => {
            //     Goods.findOne({ codeProduct: good.codeProduct })
            //         .then(sanpham => {
            //             Goods.updateOne({ codeProduct: good.codeProduct }, { inventory: Number(sanpham.inventory) - good.countProduct })
            //                 .then(() => { })
            //                 .catch(err => {
            //                     res.status(200).json({
            //                         success: false,
            //                         message: `Không cập nhật lại được số lượng của ${good.codeProduct}. Vui lòng báo lại quản lý!`,
            //                         err
            //                     })
            //                 })
            //         })
            //         .catch()
            // })

            await productsBuying.map(async (good) => {
                // try {
                //     console.log(good)
                //     const sanpham = await Goods.findOne({ codeProduct: good.codeProduct })
                //     await Goods.updateOne({ codeProduct: good.codeProduct }, { inventory: Number(sanpham.inventory) - good.countProduct })
                // } catch (error) {
                //     res.json({
                //         success: false,
                //         message: `Không cập nhật lại được số lượng của ${good.codeProduct}. Vui lòng báo lại quản lý!`,
                //         error
                //     })
                // }

                const sanpham = await Goods.findOne({ codeProduct: good.codeProduct })
                await Goods.updateOne({ codeProduct: good.codeProduct }, { inventory: Number(sanpham.inventory) - good.amout })
            })

            return res.status(200).json({
                success: true,
                message: 'Đã tạo hóa đơn thành công!',
            })
        } catch (error) {
            res.status(200).json({
                success: false,
                message: 'Đã lỗi xảy ra, vui lòng thử lại!',
                error
            })
        }
    }

    // [POST] /api/invoice/get-list
    async getList(req, res) {
        try {
            const InoviceList = await Invoices.find({})

            return res.status(200).json({
                success: true,
                message: 'Get list hóa đơn thành công!',
                InoviceList
            })
        } catch (error) {
            res.status(200).json({
                success: false,
                message: 'Đã lỗi xảy ra, vui lòng thử lại!',
                error
            })
        }
    }

    // [POST] /api/invoice/remove
    async remove(req, res) {
        const { codeInvoice } = req.body

        try {
            await Invoices.deleteOne({ codeInvoice })

            const InoviceList = await Invoices.find({})

            return res.status(200).json({
                success: true,
                message: `Xóa hóa đơn ${codeInvoice} thành công!`,
                InoviceList
            })
        } catch (error) {
            res.json({
                success: false,
                message: 'Đã lỗi xảy ra, vui lòng thử lại!',
                error
            })
        }
    }

    // [POST] /api/invoice/find
    async find(req, res) {
        const { find } = req.body

        try {
            const listCode = await Invoices.find({ codeInvoice: { $regex: find, $options: 'i' } })

            return res.status(200).json({
                success: true,
                message: `Tìm thành công!`,
                arrayFind: listCode
            })

        } catch (error) {
            console.log(error)
            return res.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra, xin vui lòng thử lại!',
                error
            })
        }
    }

    // [POST] /api/invoice/findDate
    async findDate(req, res) {
        const { find } = req.body

        try {
            if (find[0] != '' && find[1] != '') {
                const arrayFind = await Invoices.find({ createdAt: { $gte: new Date(find[0]), $lt: new Date(`${find[1]}T23:59:59.000Z`) } })

                return res.status(200).json({
                    success: true,
                    message: `Tìm thành công!`,
                    arrayFind
                })
            } else {
                const arrayFind = await Invoices.find({})

                return res.status(200).json({
                    success: true,
                    message: `Tìm thành công!`,
                    arrayFind
                })
            }

        } catch (error) {
            console.log(error)
            return res.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra, xin vui lòng thử lại!',
                error
            })
        }
    }

    // [POST] /api/invoice/findChart
    async findChart(req, res) {
        const year = new Date().getFullYear()
        const thang1BD = new Date(`01-01-${year} 00:00:00.000Z`)
        const thang1KT = new Date(`01-31-${year} 23:59:59.000Z`)
        const thang2BD = new Date(`02-01-${year} 00:00:00.000Z`)
        const thang2KT = new Date(`02-28-${year} 23:59:59.000Z`)
        const thang3BD = new Date(`03-01-${year} 00:00:00.000Z`)
        const thang3KT = new Date(`03-31-${year} 23:59:59.000Z`)
        const thang4BD = new Date(`04-01-${year} 00:00:00.000Z`)
        const thang4KT = new Date(`04-30-${year} 23:59:59.000Z`)
        const thang5BD = new Date(`05-01-${year} 00:00:00.000Z`)
        const thang5KT = new Date(`05-31-${year} 23:59:59.000Z`)
        const thang6BD = new Date(`06-01-${year} 00:00:00.000Z`)
        const thang6KT = new Date(`06-30-${year} 23:59:59.000Z`)
        const thang7BD = new Date(`07-01-${year} 00:00:00.000Z`)
        const thang7KT = new Date(`07-31-${year} 23:59:59.000Z`)
        const thang8BD = new Date(`08-01-${year} 00:00:00.000Z`)
        const thang8KT = new Date(`08-31-${year} 23:59:59.000Z`)
        const thang9BD = new Date(`09-01-${year} 00:00:00.000Z`)
        const thang9KT = new Date(`09-30-${year} 23:59:59.000Z`)
        const thang10BD = new Date(`10-01-${year} 00:00:00.000Z`)
        const thang10KT = new Date(`10-31-${year} 23:59:59.000Z`)
        const thang11BD = new Date(`11-01-${year} 00:00:00.000Z`)
        const thang11KT = new Date(`11-30-${year} 23:59:59.000Z`)
        const thang12BD = new Date(`12-01-${year} 00:00:00.000Z`)
        const thang12KT = new Date(`12-31-${year} 23:59:59.000Z`)

        try {
            const invoiceT1 = await Invoices.find({ createdAt: { $gte: thang1BD, $lt: thang1KT } })
            const invoiceT2 = await Invoices.find({ createdAt: { $gte: thang2BD, $lt: thang2KT } })
            const invoiceT3 = await Invoices.find({ createdAt: { $gte: thang3BD, $lt: thang3KT } })
            const invoiceT4 = await Invoices.find({ createdAt: { $gte: thang4BD, $lt: thang4KT } })
            const invoiceT5 = await Invoices.find({ createdAt: { $gte: thang5BD, $lt: thang5KT } })
            const invoiceT6 = await Invoices.find({ createdAt: { $gte: thang6BD, $lt: thang6KT } })
            const invoiceT7 = await Invoices.find({ createdAt: { $gte: thang7BD, $lt: thang7KT } })
            const invoiceT8 = await Invoices.find({ createdAt: { $gte: thang8BD, $lt: thang8KT } })
            const invoiceT9 = await Invoices.find({ createdAt: { $gte: thang9BD, $lt: thang9KT } })
            const invoiceT10 = await Invoices.find({ createdAt: { $gte: thang10BD, $lt: thang10KT } })
            const invoiceT11 = await Invoices.find({ createdAt: { $gte: thang11BD, $lt: thang11KT } })
            const invoiceT12 = await Invoices.find({ createdAt: { $gte: thang12BD, $lt: thang12KT } })


            return res.status(200).json({
                success: true,
                message: `Tìm thành công!`,
                invoiceT1,
                invoiceT2,
                invoiceT3,
                invoiceT4,
                invoiceT5,
                invoiceT6,
                invoiceT7,
                invoiceT8,
                invoiceT9,
                invoiceT10,
                invoiceT11,
                invoiceT12,
            })

        } catch (error) {
            console.log(error)
            return res.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra, xin vui lòng thử lại!',
                error
            })
        }
    }
}

module.exports = new invoiceController;
