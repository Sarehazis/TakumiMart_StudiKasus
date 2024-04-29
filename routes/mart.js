// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const martController = require("../controllers/martController");

// endpoint mahasiswa
router.get("/homepage", martController.viewHomepage); // Untuk view
router.get("/mart/detail/:id", martController.viewDetail); // Untuk view
router.get("/", martController.viewMart); // Untuk view
router.post("/", martController.addMart);
router.put("/", martController.editMart);
router.delete("/:id", martController.deleteMart);

// Lalu export routernya
module.exports = router;
