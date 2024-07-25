const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const User = require("./Model/user.js")
const secretKey = require("./secretKey.js")
const Product = require('./Model/Product.js')
const Cart = require('./Model/Cart.js')
const Order = require('./Model/Order.js')
const Coupon = require('./Model/Coupon.js')

const port =process.env.PORT || 3000;
const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));
app.use(bodyParser.json())
app.use(cookieParser())


mongoose.connect("mongodb://localhost:27017/ecart")

const loginCheck = (req, res, next) => {
    try {
        let token = req.cookies.token;

        if (token) {
            next();
        } else {
            res.status(401).json({ message: "Login required" });
        }
    } catch (error) {
        console.log({ error });
        res.status(500).json({ message: "Internal Server Error" });
    }
};


app.post('/signup', async (req, res) => {
    try {

        let { email, username, password } = req.body;
        let findemail = await User.findOne({ email: email });
        let findusername = await User.findOne({ username: username });
        if (findemail) {
            res.json({ message: "Account with this email exists", count: 0 })
        }

        if (findusername) {
            res.json({ message: "Account with this username exists", count: 0 })
        }

        if (!findemail && !findusername) {

            const hashpassword = await bcrypt.hash(password, 10);
            let token = jwt.sign(email, secretKey)
            res.cookie('token', token);

            let result = await User.create({ username: username, email: email, password: hashpassword })
            res.json({ message: "Signed Up sucessfully", count: 1 })
        }
    } catch (error) {
        res.json({ message: "Error in Sign Up", count: 0 })
    }
})

app.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await User.findOne({ email: email })
        let toll = await bcrypt.compare(password, user.password)
        if (toll) {
            let token = jwt.sign(email, secretKey)
            res.cookie('token', token);
            res.json({ message: "Sucessfully logged in", count: 1 })
        } else {
            res.json({ message: "Invalid Credentials", count: 0 })
        }
    } catch (error) {
        console.log({ message: error, count: 0 })
    }
})

app.get('/userdetail', loginCheck, async (req, res) => {
    try {

        let cookie = req.cookies.token;
        let email = jwt.verify(cookie, secretKey);
        let user = await User.findOne({ email: email })

        res.json({ username: user.username, email: user.email, address: user.address })


    } catch (error) {
        console.log({ message: error, count: 0 })
    }
})

app.get('/logout', loginCheck, async (req, res) => {
    try {

        res.cookie("token", '')

        res.json("Sucessfully logged out")
    } catch (error) {
        console.log({ "error": error })
    }
})

app.post('/addtocart', loginCheck, async (req, res) => {
    try {
        let data = req.body;
        let cookie = req.cookies.token;
        let email = jwt.verify(cookie, secretKey);
        let user = await User.findOne({ email: email })
        let userid = user._id;


        let cart = await Cart.findOne({ product_id: data.id, size: data.size })

        if (!cart) {

            await Cart.create({
                user_id: userid,
                product_id: data.id,
                count: 1,
                size: data.size
            })
        } else {
            let count = cart.count + 1;
            await Cart.updateOne({ product_id: data.id }, { count: count })
        }

        res.json({ message: "Sucessfully added to cart " })
    } catch (error) {
        console.log({ "error": error })
    }
})

app.post('/ordernow', loginCheck, async (req, res) => {
    try {
        let data = req.body;
        let cookie = req.cookies.token;
        let email = jwt.verify(cookie, secretKey);
        let user = await User.findOne({ email: email })
        let userid = user._id;

        await Order.create({ user_id: userid, product_id: data.id, count: 1, size: data.size })
        res.json({ message: "We have received your order " })



    } catch (error) {
        console.log({ "error": error })
    }
})
app.put('/buyall', loginCheck, async (req, res) => {
    try {
        let { fc } = req.body;
        let cookie = req.cookies.token;
        let email = jwt.verify(cookie, secretKey);
        let user = await User.findOne({ email: email })
        let userid = user._id;

        let c = await Cart.updateMany({ user_id: userid }, { discount: fc })
        let cart = await Cart.find({ user_id: userid })
        let plaincart = cart.map((value) => {
            let item = value.toObject()
            delete item["_id"]
            return item
        })

        await Order.insertMany(plaincart)

        res.json({ message: "We have received your order " })
    } catch (error) {
        console.log({ "error": error })
    }
})


app.post('/addproduct', async (req, res) => {
    try {
        let { name, old_price, new_price, category, url, tag1, tag2 } = req.body
        let oldp = await Product.find({})
        let id = 1;
        if (oldp.length > 0) {
            id = oldp.slice(-1)[0].id + 1;
        }
        let product = await Product.create({
            id: id,
            name: name,
            old_price: old_price,
            new_price: new_price,
            category: category,
            image: url,
            tag: ['all', tag1, tag2]
        })

        res.json({ status: true, message: "Sucessfully added product" })
    } catch (error) {
        console.log({ "error": error })
        res.json({ status: false, message: "Product not added" })
    }
})
app.put('/updateproduct', async (req, res) => {
    try {
        let { name, old_price, new_price, category, url, tag1, tag2, pro_id } = req.body

        let up_pro = await Product.findByIdAndUpdate(pro_id,
            {
                name: name,
                old_price: old_price,
                new_price: new_price,
                image: url,
                tag: ['all', tag1, tag2]
            })

        res.json({ status: true, message: "Sucessfully product update" })
    } catch (error) {
        console.log({ "error": error })
        res.json({ status: false, message: "Product not added" })
    }
})

app.get('/getcart', loginCheck, async (req, res) => {
    try {

        let cookie = req.cookies.token;
        let email = jwt.verify(cookie, secretKey);
        let user = await User.findOne({ email: email })
        let userid = user._id;
        let code = await Coupon.find({})
        let cart = await Cart.find({ user_id: userid })
        res.json(cart)

    } catch (error) {
        console.log({ "error": error })
    }
})

app.get('/getcode', loginCheck, async (req, res) => {
    try {
        let code = await Coupon.find({})
        res.json(code)

    } catch (error) {
        console.log({ "error": error })
    }
})

app.get('/getorder', loginCheck, async (req, res) => {
    try {

        let cookie = req.cookies.token;
        let email = jwt.verify(cookie, secretKey);
        let user = await User.findOne({ email: email })
        let userid = user._id;
        let order = await Order.find({ user_id: userid })
        res.json(order)
    } catch (error) {
        console.log({ "error": error })
    }
})
app.get('/adminorder', async (req, res) => {
    try {

        let orders = await Order.find({ status: false })

        let orderuser = [];
        orders.map((value, i) => {
            orderuser.push(value.toObject().user_id);
        })
        let users = await User.find({ _id: { $in: orderuser } })

        let arr = [];
        for (let i = 0; i < orders.length; i++) {

            for (let k = 0; k < users.length; k++) {

                if (orders[i].user_id == users[k]['_id']) {
                    let obj = {
                        address: users[k].address,
                        order: orders[i]

                    }
                    arr.push(obj)
                }
            }
        }

        res.json(arr)
    } catch (error) {
        console.log({ "error": error })
    }
})


app.put('/statuschange', loginCheck, async (req, res) => {
    try {
        let { order_id } = req.body;

        let up_order = await Order.findByIdAndUpdate(order_id, { status: true })

        res.json({ message: "Status change success" })
    } catch (error) {
        console.log({ "error": error })
    }
})
app.put('/removecode', loginCheck, async (req, res) => {
    try {
        let { id } = req.body;

        let up_order = await Coupon.findByIdAndDelete(id)

        res.json({ message: "Delete Code success" })
    } catch (error) {
        console.log({ "error": error })
    }
})

app.put('/updatecount', async (req, res) => {
    try {
        let { userid, productid, count } = req.body;

        let cartp = await Cart.findOneAndUpdate({ product_id: productid, user_id: userid }, { count: count })

        res.json({ message: "Update success" })
    } catch (error) {
        console.log({ "error": error })
    }
})

app.post('/address', loginCheck, async (req, res) => {
    try {
        let address = req.body;
        let cookie = req.cookies.token;
        let email = jwt.verify(cookie, secretKey);

        await User.findOneAndUpdate({ email: email }, { address: address })

        res.json({ message: "Address added" })
    } catch (error) {
        console.log({ "error": error })
    }
})

app.get('/getlist', async (req, res) => {
    try {
        let list = await Product.find({})
        res.json(list.reverse())
    } catch (error) {
        console.log({ "error": error })
    }
})



app.put('/cancelorder', loginCheck, async (req, res) => {
    try {

        let { order_id } = req.body;
        let order = await Order.findByIdAndDelete(order_id)
        res.json({ message: "This order is canceled successfully" })
    } catch (error) {
        console.log({ "error": error })
    }
})
app.post('/addcoupon', async (req, res) => {
    try {

        let { discount, name } = req.body;

        let order = await Coupon.create({ name: name, discount: parseInt(discount) })
        console.log(req.body)
        res.json({ message: "Code set successfully" })
    } catch (error) {
        console.log({ "error": error })
    }
})
app.get('/getcoupon', async (req, res) => {
    try {
        let code = await Coupon.find({})

        res.json(code)
    } catch (error) {
        console.log({ "error": error })
    }
})
app.put('/deletecoupon', async (req, res) => {
    try {
        let { id } = req.body;
        let code = await Coupon.findByIdAndDelete(id)
        res.json({ message: "Code delete successfully" })
    } catch (error) {
        console.log({ "error": error })
    }
})
app.post('/sendreview', loginCheck, async (req, res) => {
    try {
        let { id, review } = req.body;

        let cookie = req.cookies.token;
        let email = jwt.verify(cookie, secretKey);
        let user = await User.findOne({ email: email })
        let pp = {
            by: user.username,
            content: review,
        }
        let product = await Product.updateOne({ id: id }, { $push: { reviews: pp } })
        res.json({ message: "Thanks for reviewing on our product" })
    } catch (error) {
        console.log({ "error": error })
    }
})

app.put('/deletecart', loginCheck, async (req, res) => {
    try {
        let { userid, productid } = req.body;
        await Cart.deleteOne({ product_id: productid, user_id: userid })

        res.json("Deleted")
    } catch (error) {
        console.log({ "error": error })
    }
})
app.put('/removeproduct', loginCheck, async (req, res) => {
    try {
        let { id } = req.body;
        await Product.deleteOne({ id: id })

        res.json({ message: "Product removed successfully" })
    } catch (error) {
        console.log({ "error": error })
    }
})



app.listen(port, () => {
    console.log("Server listening at port ", port)
})


