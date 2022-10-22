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

namespace AgenApps.Controllers
{
    public class AgenController : Controller
    {
        private dbcontext db = new dbcontext();

        [HttpPost]
        public JsonResult getAllPaketAndDetails()
        {
            List<Product> v_var;

            string sql = @"SELECT p.*, prd.*, dp.* 
                                FROM product AS prd
                                INNER JOIN detail_paket AS dp ON prd.id_product= dp.id_produk
                                INNER JOIN paket AS p ON p.kode_paket = dp.id_paket
                                ";

            v_var = db.Database.SqlQuery<Product>(sql).ToList();
            return Json(v_var);
        }

        public JsonResult getPaketNames()
        {
            List<Paket> v_var;

            string sql = @"SELECT * FROM paket ORDER BY nama_paket ASC";

            v_var = db.Database.SqlQuery<Paket>(sql).ToList();
            return Json(v_var);
        }

        //public JsonResult getPaketNames(Paket data)
        //{
        //    response hasil = new response();

        //    try
        //    {
        //        string sqlPkt = @"SELECT * FROM paket ORDER BY nama_paket ASC";
        //        List<Paket> pkt = db.Database.SqlQuery<Paket>(sqlPkt).ToList();

        //        foreach (Paket item in pkt)
        //        {
        //            var sqlDetailPkt = "SELECT qty, qty_max FROM detail_paket WHERE id_paket = '" + item.id + "' ";
        //            List<DetailPaket> detailPkt = db.Database.SqlQuery<DetailPaket>(sqlDetailPkt).ToList();
        //        }
        //        hasil.hasil = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        hasil.keterangan = ex.Message;
        //    }

        //    return Json(hasil);
        //}

        //public Paket getPaketNames()
        //{
        //    Paket paket = new Paket();

        //        string sqlPkt = @"SELECT * FROM paket ORDER BY nama_paket ASC";
        //        List<Paket> pkt = db.Database.SqlQuery<Paket>(sqlPkt).ToList();

        //    if (pkt.Count > 0)
        //    {
        //        paket.detailPaket = pkt[0];
        //    }

        //        foreach (Paket item in pkt)
        //        {
        //            var sqlDetailPkt = "SELECT qty, qty_max FROM detail_paket WHERE id_paket = '" + item.id + "' ";
        //            List<DetailPaket> detailPkt = db.Database.SqlQuery<DetailPaket>(sqlDetailPkt).ToList();
        //        }



        //    return Json(paket);
        //}

        public JsonResult getAllDataTransaction(string param)
        {
            string idAgen = umum.Session(HttpContext, "id");
            List<Transaksi> v_var;
            string str1 = "";

            if (param != null) 
            {
                str1 += "AND plgn.nama_instansi LIKE '%" + param + "%' OR dtrans.nama_paket LIKE '%" + param + "%' OR trans.status_sewa LIKE '%" + param + "%' OR dtrans.total_harga LIKE '%" + param + "%' OR trans.tanggal_transaksi LIKE '%" + param + "%' OR trans.kode_transaksi LIKE '%" + param + "%' ";
            }

            string sql = @"SELECT plgn.nama_instansi, dtrans.nama_paket, trans.status_sewa, SUM(dtrans.total_harga) AS HargaTotal, trans.tanggal_transaksi, trans.kode_transaksi, trans.total_bayar
                        FROM DB_AGEN.dbo.pelanggan AS plgn 
                        INNER JOIN DB_AGEN.dbo.transaksi AS trans ON plgn.id = trans.id_pelanggan
                        INNER JOIN DB_AGEN.dbo.detail_transaksi AS dtrans ON trans.kode_transaksi = dtrans.kode_transaksi 
						WHERE trans.id_agen = '" + idAgen + "' " + str1 + " GROUP BY plgn.nama_instansi, dtrans.nama_paket, trans.status_sewa, trans.tanggal_transaksi, trans.kode_transaksi, trans.total_bayar  ORDER BY trans.tanggal_transaksi DESC";

            v_var = db.Database.SqlQuery<Transaksi>(sql).ToList();
            return Json(v_var);
        }

        public JsonResult getAllDataTransactionPaid(string param)
        {
            string idAgen = umum.Session(HttpContext, "id");
            List<Transaksi> v_var;

            string str1 = "";

            if (param != null)
            {
                str1 += "OR plgn.nama_instansi LIKE '%" + param + "%' OR dtrans.nama_paket LIKE '%" + param + "%' OR dtrans.total_harga LIKE '%" + param + "%' OR trans.tanggal_transaksi LIKE '%" + param + "%' OR trans.kode_transaksi LIKE '%" + param + "%' ";
            }

            string sql = @"SELECT plgn.nama_instansi, dtrans.nama_paket, trans.status_sewa, SUM(dtrans.total_harga) AS HargaTotal, trans.tanggal_transaksi, trans.kode_transaksi, trans.total_bayar
                        FROM DB_AGEN.dbo.pelanggan AS plgn 
                        INNER JOIN DB_AGEN.dbo.transaksi AS trans ON plgn.id = trans.id_pelanggan
                        INNER JOIN DB_AGEN.dbo.detail_transaksi AS dtrans ON trans.kode_transaksi = dtrans.kode_transaksi 
						WHERE trans.id_agen = '" + idAgen + "' " + str1 + " AND trans.status_sewa = 'paid' GROUP BY plgn.nama_instansi, dtrans.nama_paket, trans.status_sewa, trans.tanggal_transaksi, trans.kode_transaksi, trans.total_bayar ORDER BY trans.tanggal_transaksi DESC";

            v_var = db.Database.SqlQuery<Transaksi>(sql).ToList();
            return Json(v_var);
        }

        public JsonResult getAllDataTransactionExp(string param)
        {
            string idAgen = umum.Session(HttpContext, "id");
            List<Transaksi> v_var;

            string str1 = "";

            if (param != null)
            {
                str1 += "OR plgn.nama_instansi LIKE '%" + param + "%' OR dtrans.nama_paket LIKE '%" + param + "%' OR dtrans.total_harga LIKE '%" + param + "%' OR trans.tanggal_transaksi LIKE '%" + param + "%' OR trans.kode_transaksi LIKE '%" + param + "%'";
            }

            string sql = @"SELECT plgn.nama_instansi, dtrans.nama_paket, trans.status_sewa, SUM(dtrans.total_harga) AS HargaTotal, trans.tanggal_transaksi, trans.kode_transaksi, trans.total_bayar
                        FROM DB_AGEN.dbo.pelanggan AS plgn 
                        INNER JOIN DB_AGEN.dbo.transaksi AS trans ON plgn.id = trans.id_pelanggan
                        INNER JOIN DB_AGEN.dbo.detail_transaksi AS dtrans ON trans.kode_transaksi = dtrans.kode_transaksi 
						WHERE trans.id_agen = '" + idAgen + "' " + str1 + " AND trans.status_sewa = 'expired' GROUP BY plgn.nama_instansi, dtrans.nama_paket, trans.status_sewa, trans.tanggal_transaksi, trans.kode_transaksi, trans.total_bayar ORDER BY trans.tanggal_transaksi DESC";

            v_var = db.Database.SqlQuery<Transaksi>(sql).ToList();
            return Json(v_var);
        }

        public JsonResult getDataUserExists(string kode_pelanggan)
        {
            //string sql = @"SELECT * FROM pelanggan WHERE kode_pelanggan = '" + kode_pelanggan + "'";
            string sql = @"SELECT pel.*, sekolah.jenjang 
                            FROM DB_AGEN.dbo.pelanggan AS pel
                            INNER JOIN ujianonline.master.sekolah AS sekolah ON pel.kode_pelanggan = sekolah.npsn
                            WHERE kode_pelanggan = '" + kode_pelanggan + "'";

            var v_var = db.Database.SqlQuery<Pelanggan>(sql);
            return Json(v_var);
        }

        public JsonResult findAllDataPaket(string id)
        {
            //List<Paket> v_var;

            string sql = @"SELECT p.*, dp.jangka_sewa, dp.waktu_sewa 
                            FROM DB_AGEN.dbo.paket AS p 
                            INNER JOIN DB_AGEN.dbo.detail_paket AS dp ON p.id = dp.id_paket
                            WHERE p.id = '" + id + "'";

             var v_var = db.Database.SqlQuery<Paket>(sql);
            return Json(v_var);
        }

        [HttpPost]
        public JsonResult getListPelangganByAgen(string param)
        {
            string idAgen = umum.Session(HttpContext, "id");
            List<Pelanggan> v_var;

            string str1 = "";
            if (param != null)
                str1 += "AND plgn.nama_pelanggan LIKE '%" + param + "%' OR plgn.alamat LIKE '%" + param + "%' OR plgn.telepon LIKE '%" + param + "%' OR plgn.email LIKE '%" + param + "%' OR plgn.nama_instansi LIKE '%" + param + "%' OR dtrans.nama_paket LIKE '%" + param + "%' OR trans.tanggal_transaksi LIKE '%" + param + "%' OR trans.status_sewa LIKE '%" + param + "%' ";

            string sql = @"SELECT plgn.nama_pelanggan, plgn.alamat, plgn.telepon, plgn.email, plgn.nama_instansi, dtrans.nama_paket,    trans.tanggal_transaksi, trans.status_sewa
                        FROM pelanggan AS plgn 
                        INNER JOIN DB_AGEN.dbo.transaksi AS trans ON plgn.id = trans.id_pelanggan
                        INNER JOIN DB_AGEN.dbo.detail_transaksi AS dtrans ON trans.kode_transaksi = dtrans.kode_transaksi
                        WHERE trans.id_agen = '" + idAgen + "' " + str1 + "  GROUP BY plgn.nama_pelanggan, plgn.alamat, plgn.telepon, plgn.email, plgn.nama_instansi, dtrans.nama_paket, trans.tanggal_transaksi, trans.status_sewa ORDER BY trans.tanggal_transaksi DESC";

            v_var = db.Database.SqlQuery<Pelanggan>(sql).ToList();
            return Json(v_var);
        }

        public ActionResult Transaksi()
        {
            var username = umum.Session(HttpContext, "username");
            if (username == null)
                return RedirectToAction("Login");
            return View();
        }        
        public ActionResult ListPelangganAgen()
        {
            var username = umum.Session(HttpContext, "username");
            if (username == null)
                return RedirectToAction("Login");
            return View();
        }

        public ActionResult AgenPage()
        {
            var username = umum.Session(HttpContext, "username");
            if (username == null)
                return RedirectToAction("Login");
            return View();
        }
        public ActionResult tambahTransaksi()
        {
            var username = umum.Session(HttpContext, "username");
            if (username == null)
                return RedirectToAction("Login");
            return View();
        }
        public ActionResult invoice(string kode_transaksi)
        {
            var username = umum.Session(HttpContext, "username");
            if (username == null)
                return RedirectToAction("Login");
            ViewBag.kode_transaksi = kode_transaksi;
            return View();
        }
        public IActionResult saveTransactionData([FromForm] Transaksi data) {
            response res = new response();
            string idUser = umum.Session(HttpContext, "id");
            var sewa = data.jangka_sewa + " " + data.waktu_sewa;
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            // CREATE RANDOM STRING FOR LICENSE
            var stringCharsLicense = new char[8];
            var stringCharsTransaction = new char[8];
            var random = new Random();

            for (int i = 0; i < stringCharsLicense.Length; i++)
            {
                stringCharsLicense[i] = chars[random.Next(chars.Length)];
            }            
            
            for (int i = 0; i < stringCharsTransaction.Length; i++)
            {
                stringCharsTransaction[i] = chars[random.Next(chars.Length)];
            }

            var licenseStr = new String(stringCharsLicense);
            var transactionCode = new String(stringCharsTransaction);

            var strPrefix = "TRN";
            var date = DateTime.Now.ToString("yyyyMMddhhmmss");
            var FinalTrancastionCode = strPrefix + "-" + transactionCode +"-"+ date;

            var idPelanngan = Guid.NewGuid();
           
            try
            {
                if (data.command == "insert") {
                    //var strCode = data.id;
                    //var kodePaketUpper = strCode.ToString().ToUpper();

                    string sql = @"INSERT INTO transaksi ( id_agen, tanggal_transaksi, status_sewa, kode_transaksi, nama_instansi, waktu_sewa, kode_lisensi, id_pelanggan)
                                    VALUES( '"+ idUser + "', GETDATE(), 'pending', '"+ FinalTrancastionCode + "', '" + data.nama_instansi + "', '"+ sewa + "', '"+ licenseStr + "', '" + idPelanngan + "'); " +
                                    "INSERT INTO detail_transaksi ( id_paket, total_harga, kode_transaksi) VALUES('"+ data.id + "', '" + data.harga_paket + "', '" + FinalTrancastionCode + "'); " +
                                    "IF(NOT EXISTS (SELECT * FROM pelanggan WHERE kode_pelanggan = '" + data.kode_pelanggan + "')) INSERT INTO pelanggan (nama_pelanggan, alamat, telepon, email, nama_instansi, id, kode_pelanggan) VALUES('" + data.nama_pelanggan + "', '" + data.alamat + "', '" + data.telepon + "', '" + data.email + "', '" + data.nama_instansi + "', '" + idPelanngan + "','" + data.kode_pelanggan + "');";
                    db.Database.ExecuteSqlCommand(sql);
                }
                res.hasil = true;
                return Json(res);
            }
            catch (Exception ex)
            {
                res.keterangan = ex.Message;
            }
            return Json(res);
        }

        public JsonResult doLogout()
        {
            response hasil = new response();
            umum.Session(HttpContext, "user_name", "");
            hasil.hasil = true;
            return Json(hasil);
        }





    }
}
