import path from 'path'
import express from 'express'
import multer from 'multer'
import Product from '../models/productModel.js'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

router.post('/two', upload.array('image'), (req, res) => {
    
    res.send(`${[req.files.map(file => `/${file.path}`)]}`)
})

router.get('/carousel', async (req, res) => {

    const product = await Product.find({ type: "carousel"})

    res.send(product)
})

router.post('/carousel', protect, async (req, res) => {

    const { image } = req.body

    const product = await Product.find({ type: "carousel" })

    try {
        const products = new Product({
            name: "carousel",
            user: req.user._id,
            image,
            brand: "carousel",
            category: "carousel",
            description: "carousel",
            type: "carousel"
        })
        const prod = await products.save()
        res.send(product)
    } catch (error) {
        console.error(error)
    }
})
export default router 
 




