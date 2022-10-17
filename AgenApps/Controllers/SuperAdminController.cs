using Microsoft.AspNetCore.Mvc;
using pkmcore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AgenApps.Controllers
{
    public class SuperAdminController : Controller
    {
        private dbcontext db = new dbcontext();
        public JsonResult getAgen(string param)
        {
            List<User> v_var;

            //string sql = @"SELECT * FROM users WHERE id_jenis_user = 2  ORDER BY create_at ASC";

            //string sql = @"SELECT * FROM users WHERE id_jenis_user = 2 AND user_name LIKE '%kimet%' OR alamat LIKE '%kimet%' OR mobile_phone LIKE '%kimet%' OR kabupaten LIKE '%kimet%'  ORDER BY create_at ASC";

            string str1 = "";

            if (param != null)
            {
                str1 = str1 + " AND user_name LIKE '%" + param + "%' OR alamat LIKE '%" + param + "%' OR mobile_phone LIKE '%" + param + "%' OR kabupaten LIKE '%" + param + "%'";
            }

            string sql = @"SELECT * FROM users WHERE id_jenis_user = 2 " + str1 + "  ORDER BY create_at ASC";


            v_var = db.Database.SqlQuery<User>(sql).ToList();
            return Json(v_var);
        }


        public JsonResult getIdProduk()
        {
            List<Pelanggan> v_var;
            string id_produk = " SELECT DISTINCT id_produk FROM detail_transaksi ";
            v_var = db.Database.SqlQuery<Pelanggan>(id_produk).ToList();
            return Json(v_var);
        }
        [HttpPost]
        public JsonResult getListAllTransaksiSuperUser(string param)
        {
            List<Pelanggan> v_var;

            string str1 = "";
            if (param != null)
                str1 += "WHERE plgn.nama_pelanggan LIKE '%" + param + "%' OR plgn.alamat LIKE '%" + param + "%' OR plgn.telepon LIKE '%" + param + "%' OR plgn.email LIKE '%" + param + "%' OR plgn.nama_instansi LIKE '%" + param + "%' OR dtrans.nama_paket LIKE '%" + param + "%' OR trans.tanggal_transaksi LIKE '%" + param + "%' OR trans.status_sewa LIKE '%" + param + "%' OR trans.kode_lisensi LIKE '%" + param + "%' OR usr.user_name LIKE '%" + param + "%' ";

            string sql = @"SELECT plgn.nama_pelanggan, plgn.alamat, plgn.telepon, plgn.email, plgn.nama_instansi, dtrans.nama_paket, trans.tanggal_transaksi, trans.status_sewa, trans.kode_lisensi, trans.total_bayar, SUM(dtrans.total_harga) AS HargaTotal, dtrans.kode_transaksi, usr.user_name, dtrans.qty_paket, dtrans.satuan_paket, dtrans.id_paket
                        FROM DB_AGEN.dbo.pelanggan AS plgn 
                        INNER JOIN DB_AGEN.dbo.transaksi AS trans ON plgn.id = trans.id_pelanggan
                        INNER JOIN DB_AGEN.dbo.detail_transaksi AS dtrans ON trans.kode_transaksi = dtrans.kode_transaksi 
                        INNER JOIN DB_AGEN.dbo.users AS usr ON usr.id = trans.id_agen " + str1 + "" +
                       "GROUP BY plgn.nama_pelanggan, plgn.alamat, plgn.telepon, plgn.email, plgn.nama_instansi, dtrans.nama_paket, trans.tanggal_transaksi, trans.status_sewa, trans.kode_lisensi, trans.total_bayar, dtrans.kode_transaksi, usr.user_name, dtrans.qty_paket, dtrans.satuan_paket, dtrans.id_paket ORDER BY trans.tanggal_transaksi DESC"; 

            v_var = db.Database.SqlQuery<Pelanggan>(sql).ToList();
            return Json(v_var);
        }

        [HttpPost]
        public JsonResult getListPaidTransaksiSuperUser(string param)
        {
            List<Pelanggan> v_var;

            string str1 = "";
            if (param != null)
                str1 += "AND plgn.nama_pelanggan LIKE '%" + param + "%' OR plgn.alamat LIKE '%" + param + "%' OR plgn.telepon LIKE '%" + param + "%' OR plgn.email LIKE '%" + param + "%' OR plgn.nama_instansi LIKE '%" + param + "%' OR dtrans.nama_paket LIKE '%" + param + "%' OR trans.tanggal_transaksi LIKE '%" + param + "%' OR trans.status_sewa LIKE '%" + param + "%' OR trans.kode_lisensi LIKE '%" + param + "%' OR usr.user_name LIKE '%" + param + "%' ";

            string sql = @"SELECT plgn.nama_pelanggan, plgn.alamat, plgn.telepon, plgn.email, plgn.nama_instansi, dtrans.nama_paket, trans.tanggal_transaksi, trans.status_sewa, trans.kode_lisensi, SUM(dtrans.total_harga) AS HargaTotal, dtrans.kode_transaksi, usr.user_name, dtrans.qty_paket, dtrans.satuan_paket
                    FROM pelanggan AS plgn 
                    INNER JOIN transaksi AS trans ON plgn.id = trans.id_pelanggan
                    INNER JOIN detail_transaksi AS dtrans ON trans.kode_transaksi = dtrans.kode_transaksi
                    INNER JOIN users AS usr ON usr.id = trans.id_agen
                    WHERE trans.status_sewa = 'paid'  " + str1 + " GROUP BY plgn.nama_pelanggan, plgn.alamat, plgn.telepon, plgn.email, plgn.nama_instansi, dtrans.nama_paket, trans.tanggal_transaksi, trans.status_sewa, trans.kode_lisensi, dtrans.kode_transaksi, usr.user_name, dtrans.qty_paket, dtrans.satuan_paket ORDER BY trans.tanggal_transaksi DESC";

            v_var = db.Database.SqlQuery<Pelanggan>(sql).ToList();
            return Json(v_var);
        }

        [HttpPost]
        public JsonResult getListExpTransaksiSuperUser(string param)
        {
            List<Pelanggan> v_var;

            string str1 = "";
            if (param != null)
                str1 += "AND plgn.nama_pelanggan LIKE '%" + param + "%' OR plgn.alamat LIKE '%" + param + "%' OR plgn.telepon LIKE '%" + param + "%' OR plgn.email LIKE '%" + param + "%' OR plgn.nama_instansi LIKE '%" + param + "%' OR dtrans.nama_paket LIKE '%" + param + "%' OR trans.tanggal_transaksi LIKE '%" + param + "%' OR trans.status_sewa LIKE '%" + param + "%' OR trans.kode_lisensi LIKE '%" + param + "%' OR usr.user_name LIKE '%" + param + "%' ";
            string sql = @"SELECT plgn.nama_pelanggan, plgn.alamat, plgn.telepon, plgn.email, plgn.nama_instansi, dtrans.nama_paket, trans.tanggal_transaksi, trans.status_sewa, trans.kode_lisensi, SUM(dtrans.total_harga) AS HargaTotal, dtrans.kode_transaksi, usr.user_name, dtrans.qty_paket, dtrans.satuan_paket
                            FROM pelanggan AS plgn 
                            INNER JOIN transaksi AS trans ON plgn.id = trans.id_pelanggan
                            INNER JOIN detail_transaksi AS dtrans ON trans.kode_transaksi = dtrans.kode_transaksi
                            INNER JOIN users AS usr ON usr.id = trans.id_agen
                            WHERE trans.status_sewa = 'expired' " + str1 + " GROUP BY plgn.nama_pelanggan, plgn.alamat, plgn.telepon, plgn.email, plgn.nama_instansi, dtrans.nama_paket, trans.tanggal_transaksi, trans.status_sewa, trans.kode_lisensi, dtrans.kode_transaksi, usr.user_name, dtrans.qty_paket, dtrans.satuan_paket ORDER BY trans.tanggal_transaksi DESC";

            v_var = db.Database.SqlQuery<Pelanggan>(sql).ToList();
            return Json(v_var);
        }

        //public JsonResult getSearchAgen(string param)
        //{
        //    List<User> v_var;

        //    string q = @"SELECT * FROM users WHERE id_jenis_user = 2 AND user_name LIKE '%" + param + "%' OR alamat LIKE '%" + param + "%' OR mobile_phone LIKE '%" + param + "%' OR kabupaten LIKE '%" + param + "%'  ORDER BY create_at ASC";

        //    v_var = db.Database.SqlQuery<User>(q).ToList();
        //    return Json(v_var);
        //}



        public JsonResult getJenisUser()
        {
            List<JenisUser> v_var;
            string s = @"SELECT * FROM jenis_user";
            v_var = db.Database.SqlQuery<JenisUser>(s).ToList();
            return Json(v_var);
        }

        [HttpPost]
        public IActionResult simpanagen([FromForm] User data)
        {
            reponse res = new reponse();
            //List<JenisUser> v_var;
            //string s = @"SELECT * FROM users where user_name='" + data.user_name + "'";
            //v_var = db.Database.SqlQuery<JenisUser>(s).ToList();
            try
            {
                if (data.command=="insert")
                {
                    string sqlQuery = @"INSERT INTO users(
                                id, first_name, last_name, user_name, 
                                password, email, mobile_phone, alamat,
                                kabupaten, create_at, id_jenis_user) 
                                VALUES (
                                    NEWID(), '" + data.first_name + "','" + data.last_name + "','" + data.user_name + @"',
                                    '" + data.password + "','" + data.email + "','" + data.mobile_phone + @"',
                                    '" + data.alamat + "','" + data.kabupaten + "',GETDATE(),'2')";

                    db.Database.ExecuteSqlCommand(sqlQuery);
                } else
                {
                    string sqlQuery = @"UPDATE users 
                                        SET 
                                        first_name = '"+data.first_name+@"', last_name = '"+data.last_name+@"',
                                        user_name = '"+data.user_name+@"', email = '"+data.email+@"', password = '"+data.password+@"', 
                                        mobile_phone = '"+data.mobile_phone+@"', alamat = '"+data.alamat+@"', 
                                        kabupaten = '"+data.kabupaten+@"', id_jenis_user = '"+data.id_jenis_user+@"',
                                        update_at = GETDATE()
                                        WHERE id = '"+data.id+@"'
                                        ";
                    db.Database.ExecuteSqlCommand(sqlQuery);
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

        //[HttpPost]
        //public JsonResult updateStatusSewa(String status_sewa, string kode_transaksi, string waktu_sewa, string satuan_paket, string tanggal_bayar)
        //{
        //    //List<Transaksi> v_var;

        //    reponse res = new reponse();

        //    try
        //    {
        //        if (status_sewa == "paid")
        //        {
        //            var totalSewa = String.Concat(waktu_sewa, " ", satuan_paket);

        //            int dayPerYear = 365;
        //            var calculateDays = dayPerYear * Convert.ToInt32(waktu_sewa);
        //            DateTime d1 = Convert.ToDateTime(tanggal_bayar);
        //            DateTime d2 = d1.AddDays(calculateDays);
        //            var d3 = d2.ToString("yyyy-MM-dd HH:mm:ss").Replace(".", ":");

        //            string sql = @"UPDATE transaksi
        //                        SET status_sewa = '" + status_sewa + "', waktu_sewa = '" + totalSewa + "', tanggal_bayar = CONVERT(DATETIME, '" + tanggal_bayar + "', 102) WHERE kode_transaksi = '" + kode_transaksi + "'; " +
        //                       "UPDATE detail_transaksi " +
        //                       "SET tanggal_expired = '" + d3 + "' WHERE kode_transaksi = '" + kode_transaksi + "';  ";

        //            db.Database.ExecuteSqlCommand(sql);
        //        }
        //        else if(status_sewa == "pending")
        //        {
        //            var totalSewa = String.Concat(waktu_sewa, " ", satuan_paket);
        //            string sql = @"UPDATE transaksi
        //                        SET status_sewa = '" + status_sewa + "', waktu_sewa = '" + totalSewa + "', tanggal_bayar = NULL WHERE kode_transaksi = '" + kode_transaksi + "'; " +
        //                        "UPDATE detail_transaksi " +
        //                        "SET tanggal_expired = NULL WHERE kode_transaksi = '" + kode_transaksi + "';  ";
        //            db.Database.ExecuteSqlCommand(sql);
        //        }
        //        else if (status_sewa == "expired")
        //        {
        //            var totalSewa = String.Concat(waktu_sewa, " ", satuan_paket);
        //            string sql = @"UPDATE transaksi
        //                        SET status_sewa = '" + status_sewa + "', waktu_sewa = '" + totalSewa + "', tanggal_bayar = NULL WHERE kode_transaksi = '" + kode_transaksi + "'; " +
        //                        "UPDATE detail_transaksi " +
        //                        "SET tanggal_expired = NULL WHERE kode_transaksi = '" + kode_transaksi + "';  ";
        //            db.Database.ExecuteSqlCommand(sql);
        //        }

        //        res.hasil = true;
        //        return Json(res);
        //    }
        //    catch (Exception ex)
        //    {
        //        res.keterangan = ex.Message;
        //    }
        //    return Json(res);
        //}

        [HttpPost]
        public JsonResult updateStatusSewa(String status_sewa, string kode_transaksi, string tanggal_bayar, Guid id_paket)
        {
            //List<Transaksi> v_var;

            reponse res = new reponse();

            var getQtySewa = "SELECT kode_transaksi, nama_paket, qty_paket, id_paket FROM detail_transaksi WHERE kode_transaksi = '" + kode_transaksi+ "' ";
            List<Transaksi> dtTrans = db.Database.SqlQuery<Transaksi>(getQtySewa).ToList();

            foreach (Transaksi detailQty in dtTrans)
            {
                    if (status_sewa == "paid")
                    {
                        var waktuSewa = detailQty.qty_paket;
                        var idPaket = detailQty.id_paket;
                        int dayPerYear = 365;
                        var calculateDays = dayPerYear * Convert.ToInt32(waktuSewa);
                        DateTime d1 = Convert.ToDateTime(tanggal_bayar);
                        DateTime d2 = d1.AddDays(calculateDays);
                        var d3 = d2.ToString("yyyy-MM-dd HH:mm:ss").Replace(".", ":");

                        string sql = @"UPDATE transaksi
                                    SET status_sewa = '" + status_sewa + "', tanggal_bayar = CONVERT(DATETIME, '" + tanggal_bayar + "', 102) WHERE kode_transaksi = '" + kode_transaksi + "'; " +
                                       "UPDATE detail_transaksi " +
                                       "SET tanggal_expired = CONVERT(DATETIME, '" + d3 + "', 102) WHERE kode_transaksi = '" + kode_transaksi + "' AND id_paket = '" + idPaket + "';  ";

                        db.Database.ExecuteSqlCommand(sql);
                    }
                    else if (status_sewa == "pending")
                    {
                    var waktuSewa = detailQty.qty_paket;
                    var idPaket = detailQty.id_paket;
                    string sql = @"UPDATE transaksi
                                SET status_sewa = '" + status_sewa + "', tanggal_bayar = NULL WHERE kode_transaksi = '" + kode_transaksi + "'; " +
                                   "UPDATE detail_transaksi " +
                                   "SET tanggal_expired = NULL WHERE kode_transaksi = '" + kode_transaksi + "' AND id_paket = '" + idPaket + "';  ";
                        db.Database.ExecuteSqlCommand(sql);
                    }
                    else if (status_sewa == "expired")
                    {
                    var waktuSewa = detailQty.qty_paket;
                    var idPaket = detailQty.id_paket;
                    string sql = @"UPDATE transaksi
                                SET status_sewa = '" + status_sewa + "', tanggal_bayar = NULL WHERE kode_transaksi = '" + kode_transaksi + "'; " +
                                    "UPDATE detail_transaksi " +
                                    "SET tanggal_expired = NULL WHERE kode_transaksi = '" + kode_transaksi + "' AND id_paket = '" + idPaket + "';  ";
                        db.Database.ExecuteSqlCommand(sql);
                    }
            }
          return Json(res);
        }

        [HttpPost]
        public int deleteAgen(String id)
        {
            //var npsn = System.Convert.ToString(Session("npsn"));

            string s = @"DELETE FROM users 
                                WHERE id = '" + id + "'";
            return db.Database.ExecuteSqlCommand(s);
        }


    }
}
