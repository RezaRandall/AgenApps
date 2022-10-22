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

            string str1 = "";

            if (param != null)
            {
                str1 = str1 + " AND user_name LIKE '%" + param + "%' OR alamat LIKE '%" + param + "%' OR mobile_phone LIKE '%" + param + "%' OR kabupaten LIKE '%" + param + "%'";
            }

            string sql = @"SELECT * FROM users WHERE id_jenis_user = 2 " + str1 + "  ORDER BY create_at ASC";


            v_var = db.Database.SqlQuery<User>(sql).ToList();
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
                            FROM DB_AGEN.dbo.pelanggan AS plgn 
                            INNER JOIN DB_AGEN.dbo.transaksi AS trans ON plgn.id = trans.id_pelanggan
                            INNER JOIN DB_AGEN.dbo.detail_transaksi AS dtrans ON trans.kode_transaksi = dtrans.kode_transaksi
                            INNER JOIN DB_AGEN.dbo.users AS usr ON usr.id = trans.id_agen
                            WHERE trans.status_sewa = 'expired' " + str1 + " GROUP BY plgn.nama_pelanggan, plgn.alamat, plgn.telepon, plgn.email, plgn.nama_instansi, dtrans.nama_paket, trans.tanggal_transaksi, trans.status_sewa, trans.kode_lisensi, dtrans.kode_transaksi, usr.user_name, dtrans.qty_paket, dtrans.satuan_paket ORDER BY trans.tanggal_transaksi DESC";

            v_var = db.Database.SqlQuery<Pelanggan>(sql).ToList();
            return Json(v_var);
        }

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

            var firstName = data.first_name.Replace( "'", "''");
            var lastName = data.last_name.Replace( "'", "''");
            var userName = data.user_name.Replace( "'", "''");
            var password = data.password.Replace( "'", "''");
            var email = data.email.Replace( "'", "''");
            var mobilePhone = data.mobile_phone.Replace( "'", "''");
            var alamat = data.alamat.Replace( "'", "''");
            var kabupaten = data.kabupaten.Replace( "'", "''");

            try
            {
                if (data.command=="insert")
                {                    
                    string sqlQuery = @"INSERT INTO users(
                                id, first_name, last_name, user_name, 
                                password, email, mobile_phone, alamat,
                                kabupaten, create_at, id_jenis_user) 
                                VALUES (
                                    NEWID(), '" + firstName + "','" + lastName + "','" + userName + @"',
                                    '" + password + "','" + email + "','" + mobilePhone + @"',
                                    '" + alamat + "','" + kabupaten + "',GETDATE(),'2')";

                    db.Database.ExecuteSqlCommand(sqlQuery);
                } else
                {
                    string sqlQuery = @"UPDATE users 
                                        SET 
                                        first_name = '"+ firstName + @"', last_name = '"+ lastName + @"',
                                        user_name = '"+ userName + @"', email = '"+ email + @"', password = '"+ password + @"', 
                                        mobile_phone = '"+ mobilePhone + @"', alamat = '"+ alamat + @"', 
                                        kabupaten = '"+ kabupaten + @"', id_jenis_user = '"+data.id_jenis_user+@"',
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
