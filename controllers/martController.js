const Mart = require("../models/Mart");

module.exports = {
  viewDetail: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.params.id);
      const mart = await Mart.findOne({ _id: id });
      if (!mart) {
        return res.status(404).send("Player not found");
      }
      res.render("detail", { mart });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  },

  viewHomepage: async (req, res) => {
    try {
      // Membuat variabel mahasiswa, dan menunda eksekusi hingga proses async selesai lalu mengambil model Mahasiswa
      // dan menggunakan method find untuk mengambil semua collection/tabel yang ada di database Mahasiswa
      const mart = await Mart.find();
      // Membuat variabel untuk alertMessage  dan alertStatus
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
      const alert = { message: alertMessage, status: alertStatus };
      /**
       * Lalu render viewnya yang ada di dalam file index
       * menampilkan datanya dan mendestracturkan nya, lalu memanggil variabel mahasiswa diatas
       * Lalu merender alert yang sudah di deklar di atas
       */
      res.render("homepage", {
        mart,
        alert,
        title: "UTS", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
      });
    } catch (error) {
      // Jika error maka akan meredirect ke route mahasiswa(routenya akan kita buat setelah selesai dengan mahasiswaController)
      res.redirect("/mart/homepage");
    }
  },
  viewMart: async (req, res) => {
    try {
      const mart = await Mart.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("index", {
        mart,
        alert,
        title: "Takumi Mart",
      });
    } catch (error) {
      res.redirect("/mart");
    }
  },

  addMart: async (req, res) => {
    try {
      const { nama, harga, kategori, stock, foto, deskripsi } = req.body;
      await Mart.create({ nama, harga, kategori, stock, foto, deskripsi });
      req.flash("alertMessage", "Berhasil Menambahkan Data");
      req.flash("alertStatus", "success");
      res.redirect("/mart");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/mart");
    }
  },

  editMart: async (req, res) => {
    try {
      const { id, nama, harga, kategori, stock, foto, deskripsi } = req.body;
      const mart = await Mart.findOne({ _id: id });

      mart.nama = nama;
      mart.harga = harga;
      mart.kategori = kategori;
      mart.stock = stock;
      mart.foto = foto;
      mart.deskripsi = deskripsi;

      await mart.save();

      req.flash("alertMessage", "Berhasil mengubah data");
      req.flash("alertStatus", "success");
      res.redirect("/mart");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/mart");
    }
  },

  deleteMart: async (req, res) => {
    try {
      const { id } = req.params;
      const mart = await Mart.findOne({ _id: id });

      await mart.deleteOne();
      req.flash("alertMessage", "Berhasil menghapus data");
      req.flash("alertStatus", "warning");
      res.redirect("/mart");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/mart");
    }
  },
};
