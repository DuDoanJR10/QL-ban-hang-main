const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const Admin = require('../../models/Admin')
const User = require('../../models/User')

class adminController {
    // [POST] /api/admin/register
    async register(req, res) {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(200).json({
                success: false,
                message: 'Missing username or password'
            })
        }

        try {
            const user = await Admin.findOne({ username })

            if (user) {
                return res.status(200).json({
                    success: false,
                    message: 'Username đã tồn tại'
                })
            }

            const hashedPassword = await argon2.hash(password)
            const newUser = new Admin({
                username,
                password: hashedPassword,
            })
            await newUser.save()

            const accessToken = jwt.sign({ userId: newUser._id, username }, 'adminngominhthuan')
            res.json({
                success: true,
                message: 'Đã tạo thành công',
                accessToken,
                username,
                userId: newUser._id
            })
        } catch (error) {

        }
    }

    // [POST] /api/admin/login
    async login(req, res) {
        const { username, password, type } = req.body

        if (type == "Admin") {
            if (!username || !password) {
                return res.status(200).json({
                    success: false,
                    message: 'Missing username or password'
                })
            }

            try {
                const user = await Admin.findOne({ username })
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

                const accessToken = jwt.sign({ userId: user._id, username }, 'adminngominhthuan')

                res.json({
                    success: true,
                    message: 'Đăng nhập thành công',
                    accessToken,
                    userId: user._id,
                    username: username,
                })
            } catch (error) {

            }
        } else if (type == 'User') {
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
    }

    // [POST] /api/user/update-password
    async updatePassword(req, res) {
        const { passwordOld, passwordNew } = req.body

        try {
            const admin = await Admin.findOne({ username: req.username })
            const passwordValid = await argon2.verify(admin.password, passwordOld)

            if (!passwordValid) {
                return res.status(200).json({
                    success: false,
                    message: 'Mật khẩu hiện tại không chính xác!'
                })
            }

            const hashedPassword = await argon2.hash(passwordNew)

            await Admin.updateOne({ username: req.username }, { password: hashedPassword })

            return res.status(200).json({
                success: true,
                message: 'Cập nhật mật khẩu thành công!'
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Đã xảy ra lỗi nào đó!'
            })
        }
    }
}

module.exports = new adminController;
