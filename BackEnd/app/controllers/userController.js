const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const { arrayNoDuplicates } = require('../../helpers/arrayNoDuplicates')
const { handleCount } = require('../../helpers/handleCount')

class userController {
    // [POST] /api/user/register
    async register(req, res) {
        const { username, password, nameStaff, phoneStaff } = req.body

        if (!username || !password) {
            return res.status(200).json({
                success: false,
                message: 'Missing username or password'
            })
        }

        try {
            const user = await User.findOne({ username })

            if (user) {
                return res.status(200).json({
                    success: false,
                    message: 'Username đã tồn tại'
                })
            }

            const hashedPassword = await argon2.hash(password)
            const listStaff = await User.find({})

            const newUser = new User({
                codeStaff: `NV${handleCount('NV', 'codeStaff', listStaff)}`,
                username,
                password: hashedPassword,
                nameStaff,
                phoneStaff: phoneStaff != '' ? phoneStaff : ''
            })
            await newUser.save()

            res.json({
                success: true,
                message: 'Đã tạo thành công',
                newUser
            })
        } catch (error) {
            console.log(error)
        }
    }

    // [POST] /api/user/login
    async login(req, res) {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(200).json({
                success: false,
                message: 'Missing username or password'
            })
        }

        try {
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(200).json({
                    success: false,
                    message: 'Tài khoản mật khẩu không chính xác'
                })
            }

            const passwordValid = await argon2.verify(user.password, password)
            if (!passwordValid) {
                return res.status(200).json({
                    success: false,
                    message: 'Tài khoản mật khẩu không chính xác'
                })
            }

            const accessToken = jwt.sign({ userId: user._id, username, nameStaff: user.nameStaff }, 'userngominhthuan')

            res.json({
                success: true,
                message: 'Đăng nhập thành công',
                accessToken,
                userId: user._id,
                username: username,
                nameStaff: user.nameStaff
            })
        } catch (error) {

        }
    }

    // [POST] /api/user/getList
    async getList(req, res) {
        try {
            const userList = await User.find({})

            res.json({
                success: true,
                message: 'Get list user thành công!',
                userList
            })
        } catch (error) {
            res.json({
                success: false,
                message: 'Có lỗi xảy ra, xin vui lòng thử lại!',
                error
            })
        }
    }

    async updateUser(req, res) {
        const { codeStaff, nameStaff, phoneStaff, password } = req.body

        try {
            if (password != '') {
                const hashedPassword = await argon2.hash(password)
                await User.updateOne({ codeStaff }, {
                    nameStaff,
                    phoneStaff,
                    password: hashedPassword
                })

                const listStaff = await User.find({})

                return res.status(200).json({
                    success: true,
                    message: `Cập nhật ${codeStaff} Thành Công`,
                    listStaff
                })
            } else {
                await User.updateOne({ codeStaff }, {
                    nameStaff,
                    phoneStaff,
                })

                const listStaff = await User.find({})

                return res.status(200).json({
                    success: true,
                    message: `Cập nhật ${codeStaff} Thành Công`,
                    listStaff
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

    // [POST] /api/user/remove
    async removeUser(req, res) {
        const { username } = req.body

        try {
            await User.deleteOne({ username: username })
            const listStaff = await User.find({})

            return res.status(200).json({
                success: true,
                message: `Xóa ${username} Thành Công`,
                listStaff
            })
        } catch (error) {
            return res.status(200).json({
                success: false,
                message: 'Có lỗi xảy ra, xin vui lòng thử lại!',
                error
            })
        }
    }

    // [POST] /api/user/find
    async findUser(req, res) {
        const { find } = req.body
        
        try {
            if (find != '') {
                const arrayFind = new Array
                const listCode = await User.find({ codeStaff: { $regex: find, $options: 'i' } })
                const listName = await User.find({ nameStaff: { $regex: find, $options: 'i' } })
                const listUsername = await User.find({ username: { $regex: find, $options: 'i' } })
                const listPhone = await User.find({ phoneStaff: { $regex: find, $options: 'i' } })

                arrayFind.push(...listCode)
                arrayFind.push(...listName)
                arrayFind.push(...listUsername)
                arrayFind.push(...listPhone)

                return res.status(200).json({
                    success: true,
                    message: `Tìm thành công!`,
                    arrayFind: arrayNoDuplicates(arrayFind)
                })
            } else {
                const arrayFind = await User.find({})

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
}

module.exports = new userController;
