const express = require('express');
const adminController = require('../controllers/AdminController');
const isAdmin = require('../middleware/isAdmin');
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const adminRoute = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.route.path.split('/')[1];
    cb(null, path.join("src/uploads", folder));
  },
  filename: (req, file, cb) => {
    const randomString = crypto.randomBytes(8).toString("hex");
    const fileExtension = path.extname(file.originalname);
    const uniqueFilename = randomString + fileExtension;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

const createHandlerWithUpload = (createFunction) => {
  return [
    isAdmin,
    upload.fields([{ name: "coverImage", maxCount: 1 }]),
    createFunction
  ];
};

const createHandlerWithoutUpload = (createFunction) => {
  return [
    isAdmin,
    createFunction
  ];
};

const routes = [
  { path: '/styles', createFunction: adminController.styleCreate },
  { path: '/category', createFunction: adminController.categoryCreate },
  { path: '/articles', createFunction: adminController.articleCreate },
  { path: '/ads', createFunction: adminController.adCreate },
//   { path: '/new-path', createFunction: adminController.someFunctionWithoutFileUpload },
];

routes.forEach((route) => {
  const routeHandlers = route.path === '/new-path'
    ? createHandlerWithoutUpload(route.createFunction)
    : createHandlerWithUpload(route.createFunction);

  adminRoute.post(route.path, ...routeHandlers);
});

module.exports = adminRoute;
