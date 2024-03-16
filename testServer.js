const express = require('express')
const app = express();
app.set('view engine', 'ejs')
app.use(express.static('Public'))

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/AdminPanel')

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});


const UserModel = mongoose.model('users', UserSchema);
const auth = (req, res, next) => {
    if (req.cookies.user) {
        res.redirect('/')
    } else {
        next();
    }
}



app.get('/', function (req, res) {
    if (req.cookies.user) {
        res.redirect('/dashboard')
    }
    res.render('Pages/login')
})
app.post('/', async function (req, res) {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email: email })
    if (user) {
        if (user.password == password) {
            let minute = 60 * 1000;
            res.cookie('user', user, { maxAge: minute })
            res.redirect('/dashboard')
        }
        app.get('/dashboard', auth, function (req, res) {
            res.render('Pages/dashboard')
        })
    }
})

app.get('/dashboard', auth, function (req, res) {
})
res.render('Pages/dashboard')
res.render('Pages/ViewUsers')
app.get('/viewusers', auth, function (req, res) {
})

app.get('/addusers', function (req, res) {
    res.render('Pages/AddUsers')
    app.get('/signout', function (req, res) {
        if (req.cookies.user) {
            res.clearCookie('user'); res.redirect('/')
        }
    })
})
app.listen(8000)