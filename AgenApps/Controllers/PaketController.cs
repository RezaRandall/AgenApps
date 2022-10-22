using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pkmcore.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using System.Web;
using Microsoft.Extensions.Hosting;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;
using System.Text;
using AgenApps.filereport;
using System.Net.Mime;

namespace AgenApps.Controllers
{
    public class PaketController : Controller
    {
        private dbcontext db = new dbcontext();
        private readonly IHostingEnvironment _hostingEnvironment;

        public PaketController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        public JsonResult getPaket(string param)
        {
            List<Paket> v_var;

            string str1 = "";
            if (param != null)
                str1 += " WHERE nama_paket LIKE '%" + param + "%' OR kode_paket LIKE '%" + param + "%' OR deskripsi LIKE '%" + param + "%' OR harga_paket LIKE '%" + param + "%'";
            string sql = @"SELECT * FROM DB_AGEN.dbo.paket" + str1 + " ORDER BY create_at ASC";

            //return new JsonResult(sql);

            v_var = db.Database.SqlQuery<Paket>(sql).ToList();
            return Json(v_var);

        }

        [HttpPost]
        public JsonResult getDetailPaket(string id_paket)
        {
            List<Product> v_var;

            string sql = @"SELECT p.harga_paket, p.nama_paket, prd.url_product, prd.description, prd.img_product, prd.nama_product, prd.id_product, dp.satuan, dp.qty, dp.qty_max, isnull(dp.addon,0) as addon, dp.harga, prd.jenis_sewa, dp.kuantitas
                                FROM DB_AGEN.dbo.product AS prd
                                INNER JOIN DB_AGEN.dbo.detail_paket AS dp ON prd.id_product= dp.id_produk
                                INNER JOIN DB_AGEN.dbo.paket AS p ON p.id = dp.id_paket
                                WHERE dp.id_paket = '" + id_paket + "'";

            v_var = db.Database.SqlQuery<Product>(sql).ToList();
            return Json(v_var);
        }

        public JsonResult getProducts()
        {
            List<Product> v_var;

            string sql = @"SELECT * FROM DB_AGEN.dbo.product ORDER BY nama_product ASC";

            v_var = db.Database.SqlQuery<Product>(sql).ToList();
            return Json(v_var);
        }

        public JsonResult getUom()
        {
            List<UOM> v_var;

            //string str1 = "";
            //if (param != null)
            //    str1 += "WHERE id_product LIKE '%" + param + "%' OR url_product LIKE '%" + param + "%' OR harga LIKE '%" + param + "%' OR nama_product LIKE '%" + param + "%'";
            string sql = @"SELECT * FROM DB_AGEN.dbo.jenis_satuan ORDER BY id_satuan ASC";

            //return new JsonResult(sql);

            v_var = db.Database.SqlQuery<UOM>(sql).ToList();
            return Json(v_var);
        }

        [HttpPost]

        public IActionResult savePaket([FromForm] Paket data, IFormFile img)
        {
            reponse res = new reponse();
            long total = 0;

            // ESCAPE CHARACTER
            var namaPaket = data.nama_paket.Replace("'", "''");
            var deskripsi = data.deskripsi.Replace("'", "''");
            var kodePaket = data.kode_paket.Replace("'", "''");
            var satuanPaket = data.satuan_paket.Replace("'", "''");

            try
            {
                string str1 = null;
                if (img != null)
                {
                    //GET FILE NAME 
                    string fileName = Path.GetFileName(img.FileName);
                    str1 = fileName;

                    // INITIAL PATH
                    string webRootPath = _hostingEnvironment.WebRootPath;
                    var path = webRootPath + "\\Content\\ImgProduct\\";

                    // FULL PATH + FILE NAME TOBE SAVE TO DIRECTORY
                    var fullPath = Path.Combine(path, str1);
                    if (!System.IO.File.Exists(fullPath))
                    {
                        FileStream fParameter = new FileStream(fullPath, FileMode.Create, FileAccess.ReadWrite);
                        img.CopyTo(fParameter);
                    }

                }
                if (data.command == "insert")
                {
                    var id_paket = Guid.NewGuid();

                    for (int i = 0; i < data.produk.Count; i++)
                    {
                        var hrg = Convert.ToInt64(data.produk[i].harga);
                        var kuantitas = Convert.ToInt64(data.produk[i].kuantitas);

                        // ESCAPE CHARACTER
                        var idProduct = data.produk[i].id_product.Replace("'", "''");
                        var satuan = data.produk[i].satuan.Replace("'", "''");

                        long harga = Convert.ToInt64(hrg);
                        if (kuantitas == 0)
                        {
                            total += harga;
                            string sql = @"INSERT INTO detail_paket (id, id_paket, id_produk, harga, qty, qty_max, addon, create_at, satuan, kuantitas)
                                        VALUES(NEWID(), '" + id_paket.ToString() + "', '" + idProduct + "', '" + data.produk[i].harga + @"',
                                        '" + data.produk[i].jumlah_satuan + "', '" + data.produk[i].qty_max + "','" + data.produk[i].addon + "', GETDATE(),'" + satuan + "', '" + kuantitas + @"'
                                        )";
                            db.Database.ExecuteSqlCommand(sql);
                        }
                        else {
                            total += harga * kuantitas;
                            string sql = @"INSERT INTO detail_paket (id, id_paket, id_produk, harga, qty, qty_max, addon, create_at, satuan, kuantitas)
                                        VALUES(NEWID(), '" + id_paket.ToString() + "', '" + idProduct + "', '" + data.produk[i].harga + @"',
                                        '" + data.produk[i].jumlah_satuan + "', '" + data.produk[i].qty_max + "','" + data.produk[i].addon + "', GETDATE(),'" + satuan + "', '" + kuantitas + @"'
                                        )";
                            db.Database.ExecuteSqlCommand(sql);
                        }
                    }

                    var diskon = data.diskon;
                    if (diskon == null){
                        diskon = 0;
                        var calculateDiskon = Convert.ToInt32(total - (total * diskon / 100));

                        string sqlQuery = @"INSERT INTO paket (id, harga_paket, nama_paket, deskripsi, kode_paket, create_at, img_paket, satuan_paket, diskon) 
                                            VALUES ('" + id_paket.ToString() + "', '" + calculateDiskon + "', " +
                                                    "'" + namaPaket + "','" + deskripsi + "', '" + kodePaket + "', " +
                                                    "GETDATE(),'" + str1 + "','" + satuanPaket + "', '" + data.diskon + "')";

                        db.Database.ExecuteSqlCommand(sqlQuery);
                    }
                    else{
                        var calculateDiskon = Convert.ToInt32(total - (total * diskon / 100));
                        string sqlQuery = @"INSERT INTO paket (id, harga_paket, nama_paket, deskripsi, kode_paket, create_at, img_paket, satuan_paket, diskon) 
                                            VALUES ('" + id_paket.ToString() + "', '" + calculateDiskon + "', " +
                                                    "'" + namaPaket + "','" + deskripsi + "', '" + kodePaket + "', " +
                                                    "GETDATE(),'" + str1 + "','" + satuanPaket + "', '" + data.diskon + "')";

                        db.Database.ExecuteSqlCommand(sqlQuery);
                    }

                }
                // UPDATE PAKET
                else
                {
                    string sql = @"DELETE DB_AGEN.dbo.detail_paket WHERE id_paket = '" + data.id + @"' ";
                    db.Database.ExecuteSqlCommand(sql);

                    for (int i = 0; i < data.produk.Count; i++)
                    {
                        var hrg = Convert.ToInt64(data.produk[i].harga);
                        var kuantitas = Convert.ToInt64(data.produk[i].kuantitas);
                        long harga = Convert.ToInt64(hrg);

                        if (kuantitas == 0)
                        {
                            total += harga;

                            string sqlPaket = @"INSERT INTO DB_AGEN.dbo.detail_paket (id, id_paket, id_produk, harga, qty, qty_max, addon, create_at, satuan, kuantitas)
                                            VALUES(NEWID(), '" + data.id.ToString() + "', '" + data.produk[i].id_product + "', '" + data.produk[i].harga + @"',
                                            '" + data.produk[i].jumlah_satuan + "','" + data.produk[i].qty_max + "','" + data.produk[i].addon + "', GETDATE(),'" + data.produk[i].satuan + "', '" + kuantitas + @"'
                                            )";
                            db.Database.ExecuteSqlCommand(sqlPaket);
                        }
                        else 
                        {
                            total += harga * kuantitas;
                            string sqlPaket = @"INSERT INTO DB_AGEN.dbo.detail_paket (id, id_paket, id_produk, harga, qty, qty_max, addon, create_at, satuan, kuantitas)
                                        VALUES(NEWID(), '" + data.id.ToString() + "', '" + data.produk[i].id_product + "', '" + data.produk[i].harga + @"',
                                        '" + data.produk[i].jumlah_satuan + "', '" + data.produk[i].qty_max + "','" + data.produk[i].addon + "', GETDATE(),'" + data.produk[i].satuan + "', '" + kuantitas + @"'
                                        )";
                            db.Database.ExecuteSqlCommand(sqlPaket);
                        }
                    }

                    string strimg = "";
                    if (str1 != null) {
                        strimg = ",img_paket = '" + str1 + "'";
                    }

                    var diskon = data.diskon;
                    if (diskon == null) {
                        diskon = 0;
                        var calculateDiskon = Convert.ToInt32(total - (total * diskon / 100));
                        string sqlQuery = @"UPDATE paket 
                                        SET harga_paket = '" + calculateDiskon + "', nama_paket = '" + namaPaket + "', deskripsi = '" + deskripsi + "', kode_paket = '" + kodePaket + "', satuan_paket = '" + satuanPaket + "'" + strimg + ", update_at = GETDATE(), diskon = '" + data.diskon + "' WHERE id = '" + data.id + @"' ";
                        db.Database.ExecuteSqlCommand(sqlQuery);
                    } else {
                        var calculateDiskon = Convert.ToInt32(total - (total * diskon / 100));
                        string sqlQuery = @"UPDATE paket 
                                        SET harga_paket = '" + calculateDiskon + "', nama_paket = '" + namaPaket + "', deskripsi = '" + deskripsi + "', kode_paket = '" + kodePaket + "', satuan_paket = '" + satuanPaket + "'" + strimg +", update_at = GETDATE(), diskon = '"+ data.diskon +"' WHERE id = '" + data.id + @"' ";
                        db.Database.ExecuteSqlCommand(sqlQuery);
                    }
                }

                res.hasil = true;
                return Json(res);
            }
            catch (Exception ex) {
                res.keterangan = ex.Message;
            }
            return Json(res);
        }

        [HttpPost]
        public int deletePaket(String id)
        {
            //var npsn = System.Convert.ToString(Session("npsn"));

            string s = @"DELETE FROM DB_AGEN.dbo.paket WHERE id = '" + id + "' ; DELETE FROM DB_AGEN.dbo.detail_paket WHERE id_paket = '" + id + @"'";
            return db.Database.ExecuteSqlCommand(s);
        }

        public int deleteTransaksi(String trnNumber)
        {
            //var npsn = System.Convert.ToString(Session("npsn"));

            string delQuery = @"DELETE FROM DB_AGEN.dbo.transaksi WHERE kode_transaksi = '"+ trnNumber + "'; DELETE FROM DB_AGEN.dbo.detail_transaksi WHERE kode_transaksi = '" + trnNumber + "' ";
            return db.Database.ExecuteSqlCommand(delQuery);
        }

        public JsonResult findPrice(string id_product)
        {
            var vals = id_product.Split('/', '\\')[0];


            string sql = @"SELECT * FROM product WHERE id_product = '" + vals + "'";

            var v_var = db.Database.SqlQuery<Product>(sql);
            return Json(v_var);
        }

        public JsonResult getAdminAccount(int kodePel)
        {
            reponse res = new reponse();

            string adminQuery = "SELECT pengguna_email, pengguna_password, pengguna_npsn FROM ujianonline.master.pengguna " +
                                "INNER JOIN DB_AGEN.dbo.pelanggan ON pengguna.pengguna_npsn = pelanggan.kode_pelanggan " +
                                "INNER JOIN DB_AGEN.dbo.transaksi ON pelanggan.id = transaksi.id_pelanggan " +
                                "WHERE pelanggan.kode_pelanggan = '" + kodePel + "' AND pengguna_jenis = 'Sekolah' AND transaksi.status_sewa = 'paid'";

            var v_var = db.Database.SqlQuery<Pelanggan>(adminQuery);
            return Json(v_var);
        }

        public JsonResult getharga(string id_paket, string id_produk, int qty)
        {
            response res = new response();

            double totalProduk = 0;
            double totaladdon = 0;
            double total = 0;

            if (id_paket != null)
            {
                string sql = @"SELECT detail_paket.*, paket.diskon FROM 
                    DB_AGEN.dbo.paket inner join
                    DB_AGEN.dbo.detail_paket on paket.id=detail_paket.id_paket
                    WHERE paket.id='" + id_paket + "'";

                var produk = db.Database.SqlQuery<DetailPaket>(sql).ToList();
                double diskon = Convert.ToDouble(produk[0].diskon);


                foreach (DetailPaket d in produk)
                {
                    if (d.addon == 0)
                    {
                        totalProduk += (double)d.harga * qty;
                    }
                    else
                    {
                        totaladdon += (double)d.harga * (double)d.kuantitas;
                    }

                }
                total = totalProduk + totaladdon;
                if (diskon != 0)
                {
                    total = (total / 100 * diskon);
                }
            }
            else {
                string sql = @"SELECT * FROM DB_AGEN.dbo.product
                    WHERE id ='" + id_produk + "'";

                var produk = db.Database.SqlQuery<DetailPaket>(sql).ToList();

                foreach (DetailPaket d in produk)
                {
                    if (d.addon != 1)
                    {
                        totalProduk = totalProduk + (double)d.harga;
                    }
                    else
                    {
                        totaladdon = totaladdon + (double)d.harga;
                    }
                }
                total = totalProduk + totaladdon;

                if (qty == 0)
                {
                    total = 0;
                }
                int qtynext = qty - 1;
                if (qtynext > 0)
                {
                    total = total + (total * qtynext);
                }
            }

            res.harga = new Harga();
            res.harga.harga = total;
            res.harga.qty = qty;
            res.hasil = true;
            return Json(res);
        }

        [HttpPost]
        public JsonResult savetransaksi(order data)
        {
            //var npsn = System.Convert.ToString(Session("npsn"));
            response hasil = new response();
            try
            {
                var user_name = umum.Session(HttpContext, "username");
                var id_agen = umum.Session(HttpContext, "id");
                var kode_agen = umum.Session(HttpContext, "kode_agen");
                var id_jenis_user = umum.Session(HttpContext, "id_jenis_user");

                // CHECK WHEN PELANGGAN IS ALREADY EXIST
                string sql = "SELECT * FROM DB_AGEN.dbo.pelanggan where kode_pelanggan='" + data.kode_pelanggan + "'";
                List<Pelanggan> pelanggan = db.Database.SqlQuery<Pelanggan>(sql).ToList();
                Guid idpelanggan = Guid.NewGuid();
                if (pelanggan.Count <= 0)
                {
                    sql = "INSERT INTO DB_AGEN.dbo.pelanggan" +
                        "([nama_pelanggan],[alamat],[telepon],[email],[nama_instansi],[id],[kode_pelanggan],[register_agen])" +
                        " VALUES ('" + data.nama_pelanggan + "','" + data.alamat + "','" + data.telepon + "','" + data.email + "'" +
                        ",'" + data.nama_instansi + "','" + idpelanggan.ToString() + "','" + data.kode_pelanggan + "','" + id_agen + "')";
                    db.Database.ExecuteSqlCommand(sql);
                }
                else
                {
                    idpelanggan = pelanggan[0].id;
                }

                // CHECK WHEN NPSN IS ALREADY EXSIS IN TABLE SEKOLAH
                string getNpsnFromSekolah = "SELECT * FROM ujianonline.master.sekolah WHERE npsn = '"+data.kode_pelanggan + "'";
                List<Sekolah> sekolah = db.Database.SqlQuery<Sekolah>(getNpsnFromSekolah).ToList();
                Guid sekolahId = Guid.NewGuid();
                if (sekolah.Count <= 0)
                {
                    string sqlSekolah = "INSERT INTO ujianonline.master.sekolah(npsn, sekolah_id, nama_sekolah, alamat, jenjang, default_absen )" +
                        "VALUES('" + data.kode_pelanggan + "', '" + sekolahId.ToString() + "', '" + data.nama_instansi + "', '" + data.alamat + "', '" + data.jenjang + "', 'a')";
                    db.Database.ExecuteSqlCommand(sqlSekolah);
                }
                else {
                    sekolahId = sekolah[0].sekolah_id;
                }

                // CHECK WHEN NPSN IS ALREADY EXIST IN TABLE PENGGUNA
                string getNpsnFromPenguna = "SELECT * FROM ujianonline.master.pengguna WHERE pengguna_npsn = '" + data.kode_pelanggan + "' AND pengguna_jenis = 'Sekolah' ";
                List<Pengguna> pengguna = db.Database.SqlQuery<Pengguna>(getNpsnFromPenguna).ToList();
                Guid penggunaId = Guid.NewGuid();
                if (pengguna.Count <= 0)
                {
                    string sqlPengguna = "INSERT INTO ujianonline.master.pengguna(pengguna_email, pengguna_username, pengguna_password, pengguna_jenis, pengguna_id, pengguna_sekolah_id,  pengguna_npsn, tgl_insert)" +
                        "VALUES('"+data.email+"', '" + data.email + "', '123456', 'Sekolah', '" + penggunaId + "', '" + sekolahId.ToString() + "', '" + data.kode_pelanggan + "', GETDATE() )";

                    db.Database.ExecuteSqlCommand(sqlPengguna);
                }
                else {
                    penggunaId = pengguna[0].pengguna_id;
                }

                // CREATE RANDOM STRING FOR LICENSE
                var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                var stringCharsLicense = new char[8];

                var random = new Random();

                for (int i = 0; i < stringCharsLicense.Length; i++)
                {
                    stringCharsLicense[i] = chars[random.Next(chars.Length)];
                }
                var licenseStr = new String(stringCharsLicense);


                var strPrefix = "TRN";
                sql = "SELECT MAX(CONVERT(int, (REPLACE(kode_transaksi, 'TRN-" + kode_agen + "-', '')))) AS transaksi_kode FROM DB_AGEN.dbo.transaksi WHERE id_agen='" + id_agen + "'";
                List<Transaksi> trx = db.Database.SqlQuery<Transaksi>(sql).ToList();
                int no = 0;
                int noTrans = trx[0].transaksi_kode;
                if (trx.Count > 0)
                {
                    if (noTrans != 0)
                    {
                        no = noTrans + 1;
                    }
                    else 
                    {
                        no = 1;
                    }
                }
                else
                {
                    no = 1;
                }
                var FinalTrancastionCode = strPrefix + "-" + kode_agen + "-" + no;

                var sqltrxDetail = "";
                var sqltrx = "";

                Double productPrice = 0;
                Double addOnPrice = 0;
                Double tax = 1.11;
                Double sumAddOnAndProduct = 0;
                Double discountPrice = 0;
                Double taxPrice = 0;
                //Double grandTotal = 0;
                Double grandTotalWithPPN = 0;

                foreach (detailorder item in data.detailorder)
                {
                    var idPaket = item.id_paket.ToString();
                    if (idPaket != "")
                    {
                        sql = "SELECT id_product, detail_paket.harga, qty, detail_paket.satuan, id_paket, addon" +
                            ",paket.nama_paket,product.nama_product,paket.satuan_paket,product.description,product.img_product, detail_paket.qty, detail_paket.qty_max, paket.diskon, detail_paket.kuantitas , product.id" +
                            " FROM DB_AGEN.dbo.detail_paket inner join DB_AGEN.dbo.product on product.id_product = detail_paket.id_produk " +
                            "inner join DB_AGEN.dbo.paket on paket.id = detail_paket.id_paket where detail_paket.id_paket='" + item.id_paket + "'";
                    }
                    else
                    {
                        sql = "SELECT * FROM DB_AGEN.dbo.product WHERE id ='" + item.id_produk + "' ";
                    }
                    List<DetailPaket> pkt = db.Database.SqlQuery<DetailPaket>(sql).ToList();

                    Double diskon = Convert.ToDouble(pkt[0].diskon);
                    Double nilaiDiskon = diskon / 100;

                    foreach (DetailPaket itemproduk in pkt)
                    {
                        if (itemproduk.addon == 1)
                        {
                            //addOnPrice = (double)itemproduk.harga * (double)item.qty;
                            addOnPrice = (double)itemproduk.harga * (double)itemproduk.kuantitas;
                            
                            if (diskon != 0)
                            {
                                sqltrxDetail = "INSERT INTO DB_AGEN.dbo.detail_transaksi (id_paket,product_id, nama_paket, id_produk, addon, qty, qty_paket, satuan, harga, kode_transaksi, nama_produk, deskripsi_produk, img_produk, diskon, total_harga ) " +
                                    " VALUES ('" + item.id_paket + "', '" + itemproduk.id + "','" + itemproduk.nama_paket + "','" + itemproduk.id_product + "','" + itemproduk.addon + "','" + item.qty + "', '" + itemproduk.kuantitas + "','" + itemproduk.satuan + "'" +
                                    ",CAST('" + itemproduk.harga + "' AS INT),'" + FinalTrancastionCode + "','" + itemproduk.nama_product + "','" + itemproduk.description + "','" + itemproduk.img_product + "', '" + diskon + "', '" + (itemproduk.harga * itemproduk.kuantitas) * nilaiDiskon + "'); ";
                            }
                            else 
                            {
                                sqltrxDetail = "INSERT INTO DB_AGEN.dbo.detail_transaksi (id_paket,product_id, nama_paket, id_produk, addon, qty, qty_paket, satuan, harga, kode_transaksi, nama_produk, deskripsi_produk, img_produk, diskon, total_harga ) " +
                                    " VALUES ('" + item.id_paket + "', '" + itemproduk.id + "','" + itemproduk.nama_paket + "','" + itemproduk.id_product + "','" + itemproduk.addon + "','" + item.qty + "', '" + itemproduk.kuantitas + "','" + itemproduk.satuan + "', CAST('" + itemproduk.harga + "' AS INT),'" + FinalTrancastionCode + "','" + itemproduk.nama_product + "','" + itemproduk.description + "','" + itemproduk.img_product + "', '" + diskon + "', '" + (itemproduk.harga * itemproduk.kuantitas) + "'); ";
                            }
                        }

                        if (itemproduk.jenis_sewa == "hakmilik")
                        {
                            addOnPrice = (double)itemproduk.harga * (double)item.qty;
                            
                            if (diskon != 0)
                            {
                                sqltrxDetail = "INSERT INTO DB_AGEN.dbo.detail_transaksi (product_id, id_produk, addon, qty, satuan, harga, kode_transaksi, nama_produk, deskripsi_produk, img_produk, diskon, total_harga, qty_paket) VALUES('" + itemproduk.id + "', '" + itemproduk.id_product + "', 1, '" + item.qty + "', '" + itemproduk.satuan + "', CAST('" + itemproduk.harga + "' AS INT), '" + FinalTrancastionCode + "', '" + itemproduk.nama_product + "', '" + itemproduk.description + "', '" + itemproduk.img_product + "', '" + diskon + "', '" + (itemproduk.harga * item.qty) * nilaiDiskon + "', '" + item.qty + "');";
                            }
                            else
                            {
                                sqltrxDetail = "INSERT INTO DB_AGEN.dbo.detail_transaksi (product_id, id_produk, addon, qty, satuan, harga, kode_transaksi, nama_produk, deskripsi_produk, img_produk, diskon, total_harga, qty_paket) VALUES('" + itemproduk.id + "', '" + itemproduk.id_product + "', 1, '" + item.qty + "', '" + itemproduk.satuan + "', CAST('" + itemproduk.harga + "' AS INT), '" + FinalTrancastionCode + "', '" + itemproduk.nama_product + "', '" + itemproduk.description + "', '" + itemproduk.img_product + "', '" + diskon + "', '" + itemproduk.harga * item.qty + "', '" + item.qty + "');";
                            }
                        }

                        if(itemproduk.addon == 0 && idPaket != "")
                        {
                            productPrice = (double)itemproduk.harga * item.qty;

                            if (diskon != 0)
                            {
                                sqltrxDetail = "INSERT INTO DB_AGEN.dbo.detail_transaksi (id_paket, nama_paket, qty_paket, satuan_paket, id_produk, addon, qty,  satuan, harga, total_harga, kode_transaksi, nama_produk, deskripsi_produk, img_produk, qty_min, qty_max, diskon, product_id ) VALUES ('" + item.id_paket + "','" + itemproduk.nama_paket + "','" + item.qty + "','" + itemproduk.satuan_paket + "','" + itemproduk.id_product + "','" + itemproduk.addon + "','" + itemproduk.qty + "','" + itemproduk.satuan + "', '" + itemproduk.harga + "', '" + (itemproduk.harga * item.qty) * nilaiDiskon + "','" + FinalTrancastionCode + "','" + itemproduk.nama_product + "','" + itemproduk.description + "','" + itemproduk.img_product + "', '" + itemproduk.qty + "', '" + itemproduk.qty_max + "', '" + diskon + "', '" + itemproduk.id + "'); ";
                            }
                            else 
                            {
                                sqltrxDetail = "INSERT INTO DB_AGEN.dbo.detail_transaksi (id_paket, nama_paket, qty_paket, satuan_paket, id_produk, addon, qty,  satuan, harga, total_harga, kode_transaksi, nama_produk, deskripsi_produk, img_produk, qty_min, qty_max, diskon, product_id ) VALUES ('" + item.id_paket + "','" + itemproduk.nama_paket + "','" + item.qty + "','" + itemproduk.satuan_paket + "','" + itemproduk.id_product + "','" + itemproduk.addon + "','" + itemproduk.qty + "','" + itemproduk.satuan + "', '" + itemproduk.harga + "', '" + (itemproduk.harga * item.qty) + "','" + FinalTrancastionCode + "','" + itemproduk.nama_product + "','" + itemproduk.description + "','" + itemproduk.img_product + "', '" + itemproduk.qty + "', '" + itemproduk.qty_max + "', '" + diskon + "', '" + itemproduk.id + "'); ";
                            }
                        }

                        if (sqltrxDetail != "")
                        {
                            db.Database.ExecuteSqlCommand(sqltrxDetail);
                        }
                    }


                    if (diskon == 0)
                    {
                        //sumAddOnAndProduct = addOnPrice + productPrice;
                        sumAddOnAndProduct = addOnPrice + discountPrice;
                        grandTotalWithPPN = Math.Round(sumAddOnAndProduct * tax, MidpointRounding.ToEven);
                        taxPrice = grandTotalWithPPN - sumAddOnAndProduct;
                    }
                    else 
                    {
                        sumAddOnAndProduct = addOnPrice + productPrice;
                        discountPrice = (sumAddOnAndProduct / 100) * diskon;
                        grandTotalWithPPN = Math.Round(discountPrice * tax, MidpointRounding.ToEven);
                        taxPrice += grandTotalWithPPN - discountPrice; 
                    }

                }

                sqltrx = "INSERT INTO DB_AGEN.dbo.transaksi([id_agen]" +
                    ",[tanggal_transaksi]" +
                    ",[status_sewa]" +
                    ",[kode_transaksi]" +
                    ",[nama_instansi]" +
                    ",[waktu_sewa]" +
                    ",[kode_lisensi],[jenis_pembayaran],[id_pelanggan] " +
                    ",[pajak]" +
                    ",[total_bayar] )" +
                    "VALUES ('" + id_agen + "'" +
                    ",getdate()" +
                    ",'pending'" +
                    ",'" + FinalTrancastionCode + "'" +
                    ",'" + data.nama_instansi + "'" +
                    ",''" +
                    ",'" + licenseStr + "'" +
                    ",'Cash'" +
                    ",'" + idpelanggan.ToString() + "' " +
                    "," + taxPrice + "" +
                    "," + grandTotalWithPPN + ") ";

                if (sqltrx != "")
                {
                    db.Database.ExecuteSqlCommand(sqltrx);
                }
                hasil.hasil = true;
                hasil.kode_transaksi = FinalTrancastionCode;
            }

            catch (Exception ex)
            {
                hasil.keterangan = ex.Message;
            }
            return Json(hasil);
        }
        public List<dataTransaksi> datainvoice(string kode_transaksi)
        {
            response res = new response(); 
            
            string sql = "SELECT [id_agen] " +
                    ",[tanggal_transaksi]" +
                    ",case when [status_sewa]='pending' then 'BELUM LUNAS' else case when [status_sewa]='paid' then 'LUNAS' else 'BELUM LUNAS' end end status_sewa" +
                    ",detail_transaksi.diskon" +
                    ",transaksi.[kode_transaksi]" +
                    ",[kode_lisensi]" +
                    ",[jenis_pembayaran]" +
                    ",[id_pelanggan]" +
                    ",[tanggal_bayar]" +
                    ",detail_transaksi.addon,detail_transaksi.harga" +
                    ",detail_transaksi.id_paket,detail_transaksi.id_produk" +
                    ",detail_transaksi.nama_produk + ' '+ convert(varchar,detail_transaksi.qty) + ' '+ detail_transaksi.satuan as deskripsi_produk" +
                    ",detail_transaksi.nama_paket" +
                    ",detail_transaksi.qty" +
                    ",detail_transaksi.qty_paket" +
                    ",detail_transaksi.satuan" +
                    ",case when detail_transaksi.addon=1 then detail_transaksi.satuan else detail_transaksi.satuan_paket end satuan_paket" +
                    ",detail_transaksi.total_harga" +
                    ", detail_transaksi.total_harga * (11.0 / 100.0 + 1) - (detail_transaksi.total_harga) as ppn " +
                    ", detail_transaksi.total_harga + (detail_transaksi.total_harga * (11.0 / 100.0 + 1) - (detail_transaksi.total_harga)) as total" +
                    ",pelanggan.alamat, pelanggan.email, pelanggan.kode_pelanggan, pelanggan.nama_instansi, pelanggan.nama_pelanggan" +
                    ",pelanggan.register_agen, pelanggan.telepon" +
                    " FROM [DB_AGEN].[dbo].[transaksi] " +
                    " inner join DB_AGEN.dbo.detail_transaksi on detail_transaksi.kode_transaksi = transaksi.kode_transaksi " +
                    " inner join DB_AGEN.dbo.pelanggan on pelanggan.id=transaksi.id_pelanggan " +
                    " left join DB_AGEN.dbo.product on product.id_product=detail_transaksi.id_produk" +
                    " where transaksi.kode_transaksi='" + kode_transaksi + "'";
                var data = db.Database.SqlQuery<dataTransaksi>(sql).ToList();

            double totalHargaPaket = 0;
            double totalHargaAddOn = 0;
            double grandTotal = 0;
            double diskon = 0;
            int qty = 0;

            foreach (dataTransaksi d in data)
            {
                totalHargaPaket = totalHargaPaket + (double)d.harga;
                diskon = Convert.ToDouble(d.diskon);
                qty = (int)d.qty_paket;

                if (d.addon == 0)
                {

                    if (diskon == 0)
                    {
                        grandTotal = grandTotal + (totalHargaPaket * qty);
                    }
                    else
                    {
                        grandTotal = grandTotal + ((totalHargaPaket / 100) * diskon);
                    }
                }
                else
                {
                    totalHargaAddOn = totalHargaAddOn + (double)d.harga;
                    if (diskon == 0)
                    {
                        grandTotal = grandTotal + (totalHargaAddOn * (double)d.qty_paket);
                    }
                    else
                    {
                        grandTotal = grandTotal + ((totalHargaAddOn / 100) * diskon);
                    }
                }
            }

            res.harga = new Harga();
            res.harga.harga = grandTotal;
            res.harga.qty = qty;
            res.hasil = true;

            return data;
            }
        public FileContentResult getinvoice(string kode_transaksi)
        {

            var datainv = datainvoice(kode_transaksi);
            invoice inv = new invoice();
            inv.DataSource = datainv;
            MemoryStream m = new MemoryStream();
            inv.ExportToImage(m,System.Drawing.Imaging.ImageFormat.Png);
            var bytes = m.ToArray();
            string namafile = "Invoice"+ kode_transaksi;

            var result = new FileContentResult(bytes, "image/png");
            result.FileDownloadName = "invoice.png";
            return result;
           
        }
        public FileContentResult _files(string id)
        {
            string webRootPath = _hostingEnvironment.WebRootPath;
            string contentRootPath = _hostingEnvironment.ContentRootPath;

            string path = "";
            path = webRootPath + "";
            string namafile = "Content\\Image\\logo transparan.png";
            var bytes = System.IO.File.ReadAllBytes(path + "\\" + namafile);
            //var bytes = Encoding.UTF8.GetBytes(xml);
            var result = new FileContentResult(bytes, "image/png");
            result.FileDownloadName = "logo transparan.png";
            return result;
        }
        public FileContentResult downloadinvoice(string kode_transaksi)
        {
            
            var datainv = datainvoice(kode_transaksi);
            invoice inv = new invoice();
            inv.DataSource = datainv;
            MemoryStream m = new MemoryStream();
            inv.ExportToPdf(m);
            var bytes = m.ToArray();
            string namafile = "Invoice" + kode_transaksi;
            //var bytes = Encoding.UTF8.GetBytes(xml);

            //this.HttpContext.Response.Headers.Add("Content-Disposition", cd.ToString());
            //var f = this.File(bytes, MediaTypeNames.Text.Html, namafile + ".html");
            //return f;
            return this.File(bytes, MediaTypeNames.Text.Html, namafile + ".pdf");

        }
        public JsonResult detailTransaksi(string kode_transaksi)
        {
            List<dataTransaksi> v_var;

            v_var = datainvoice(kode_transaksi);
            return Json(v_var);
        }



    }
}
