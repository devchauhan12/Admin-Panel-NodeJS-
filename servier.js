const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
// const fs = require('fs')
// const multer = require('multer')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/upload'));
app.set('view engine', 'ejs')
// const { movieModel } = require('./schemas/movieSchema.js')

// const storage = multer.diskStorage(
//     {
//         destination: (req, file, cb) => {
//             return cb(null, './upload')
//         },
//         filename: (req, file, cb) => {
//             return cb(null, Date.now() + file.originalname)
//         }
//     }
// )
// let upload = multer({ storage: storage }).single('file')

app.get('/', async (req, res) => {
    res.render('./Pages/login')
})
app.post('/', async (req, res) => {
    // console.log(req.body)
    res.cookie('user', req.body).send()
    console.log('Cookies: ', req.cookies)
    // res.render('./Pages/login')
})

app.get('/dashboard', async (req, res) => {
    res.render('./Pages/dashboard')
})

// app.get('/addmovie', (req, res) => {
//     res.render('./pages/addmovie')
// })

// app.post('/addmovie', async (req, res) => {
//     upload(req, res, async () => {
//         if (req.file) {
//             let details = {
//                 title: req.body.title,
//                 description: req.body.description,
//                 year: req.body.year,
//                 genre: req.body.genre,
//                 rating: req.body.rating,
//                 movimage: req.file.filename
//             }

//             // const movie = new movieModel(details)
//             // try {
//             //     await movie.save();
//             //     res.redirect('/');
//             // } catch (error) {
//             //     console.error(error);
//             // }
//         }
//     })
// })

// app.get('/deletemovie/:id', async (req, res) => {
//     // let id = req.params.id
//     // let image = await movieModel.findOne({ _id: id })
//     // let result = await movieModel.deleteOne({ _id: id })
//     // if (result.acknowledged) {
//     //     fs.unlink(`upload/${image.movimage}`, (err) => {
//     //         if (err) {
//     //             console.log(err);
//     //         }
//     //         console.log("success");
//     //     })
//     //     res.redirect('/')
//     // }
// })

// app.get('/editmovie/:id', async (req, res) => {
//     var id = req.params.id
//     // var result = await movieModel.findOne({ _id: id })
//     // res.render('./Pages/editmovie', { movies: result })
// })

// app.post('/editmovie/:id', async (req, res) => {
//     // var id = req.params.id;
//     // upload(req, res, async () => {
//     //     try {
//     //         var oldMovie = await movieModel.findOne({ _id: id });

//     //         var details = {
//     //             title: req.body.title,
//     //             description: req.body.description,
//     //             year: req.body.year,
//     //             genre: req.body.genre,
//     //             rating: req.body.rating,
//     //         };

//     //         if (req.file) {
//     //             if (oldMovie.movimage) {
//     //                 fs.unlink(`upload/${oldMovie.movimage}`, (err) => {
//     //                     if (err) {
//     //                         console.log(err);
//     //                     } else {
//     //                         console.log("Old image deleted successfully");
//     //                     }
//     //                 });
//     //             }
//     //             details.movimage = req.file.filename;
//     //         } else {
//     //             details.movimage = oldMovie.movimage;
//     //         }
//     //         await movieModel.updateOne({ _id: id }, details);
//     //         res.redirect('/');
//     //     } catch (error) {
//     //         console.error(error);
//     //     }
//     // });
// })

app.listen(3000, () => {
    console.log('Server Start at 3000');
})