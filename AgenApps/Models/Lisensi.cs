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

namespace AgenApps.Models
{
    public class Lisensi : IDisposable
    {

        private dbcontext db = new dbcontext();

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public lisensi GetValidationDataCustomer(string kode_lisensi, string kode_pelanggan)
        {
            lisensi lisensi = new lisensi();
            lisensi.status = "False";
            lisensi.keterangan = "Lisensi Tidak Valid";

            string sql = @"SELECT TOP 1 * FROM ( SELECT MAX(dtrans.qty_max) AS qty_max,dtrans.tanggal_expired, MAX(CONVERT(varchar,dtrans.tanggal_expired, 23)) AS tanggal_kadaluarsa, trans.id_pelanggan, trans.id_agen, trans.kode_transaksi, trans.status_sewa,CONVERT(varchar,trans.tanggal_transaksi, 23) AS tanggal_pesan, trans.tanggal_transaksi, trans.nama_instansi, trans.kode_lisensi, trans.jenis_pembayaran, trans.discount, trans.waktu_sewa,
              dtrans.id_paket, dtrans.total_harga, dtrans.nama_paket, dtrans.qty_paket, dtrans.satuan_paket, dtrans.id_produk, dtrans.qty, dtrans.satuan, dtrans.harga, dtrans.nama_produk, dtrans.deskripsi_produk, dtrans.img_produk, dtrans.addon, dtrans.qty_min,
              plgn.nama_pelanggan, plgn.alamat, plgn.telepon, plgn.email
                FROM transaksi AS trans
                INNER JOIN detail_transaksi AS dtrans ON trans.kode_transaksi = dtrans.kode_transaksi
                INNER JOIN pelanggan AS plgn ON trans.id_pelanggan = plgn.id
                WHERE trans.kode_lisensi = '"+ kode_lisensi +"' AND plgn.kode_pelanggan= '"+ kode_pelanggan +"' " + 
                "GROUP BY trans.id_pelanggan, trans.id_agen, trans.kode_transaksi, trans.status_sewa, trans.tanggal_transaksi, trans.nama_instansi, trans.kode_lisensi, trans.jenis_pembayaran, trans.discount, trans.waktu_sewa, " +
                "dtrans.id_paket, dtrans.total_harga, dtrans.nama_paket, dtrans.qty_paket, dtrans.satuan_paket, dtrans.id_produk, dtrans.qty, dtrans.satuan, dtrans.harga, dtrans.nama_produk, dtrans.deskripsi_produk, dtrans.img_produk, dtrans.addon, dtrans.qty_min, dtrans.tanggal_expired, " +
                "plgn.nama_pelanggan, plgn.alamat, plgn.telepon, plgn.email ) a ORDER BY qty_max DESC  "; 

            List<Transaksi> t = db.Database.SqlQuery<Transaksi>(sql).ToList();
            if (t.Count > 0)
            {
                lisensi.transaksi = t[0];
                lisensi.status = lisensi.transaksi.status_sewa;
                lisensi.keterangan = lisensi.transaksi.status_sewa;
                lisensi.qty_max = lisensi.transaksi.qty_max;
                lisensi.tanggal_expired = lisensi.transaksi.tanggal_expired;
            }

            if (lisensi.transaksi != null)
            {
                sql = @"SELECT * FROM pelanggan where id='" + t[0].id_pelanggan.ToString() + "' and kode_pelanggan='" + kode_pelanggan + "'";

                List<Pelanggan> p = db.Database.SqlQuery<Pelanggan>(sql).ToList();
                if (p.Count > 0)
                {
                    lisensi.pelanggan = p[0];
                }

                sql = @"SELECT * FROM users where id='" + t[0].id_agen + "'";
                List<User> a = db.Database.SqlQuery<User>(sql).ToList();
                if (a.Count > 0)
                {
                    lisensi.agen = a[0];
                }

                sql = @"SELECT 
                        plgn.nama_pelanggan, plgn.alamat, plgn.telepon, plgn.email, plgn.nama_instansi, plgn.kode_pelanggan
                        , dtrans.nama_paket, SUM(dtrans.total_harga) AS HargaTotal, dtrans.kode_transaksi, dtrans.qty_paket, dtrans.satuan_paket, dtrans.id_produk,           dtrans.qty_max
                        , CONVERT(varchar,trans.tanggal_transaksi, 23) AS tanggal_pesan, trans.tanggal_transaksi, trans.status_sewa, trans.kode_lisensi, trans.id_agen, trans.id_pelanggan
                        , usr.first_name+' '+usr.last_name as namaagen
                        FROM pelanggan AS plgn 
                        INNER JOIN transaksi AS trans ON plgn.id = trans.id_pelanggan
                        INNER JOIN detail_transaksi AS dtrans ON trans.kode_transaksi = dtrans.kode_transaksi 
                        INNER JOIN users AS usr ON usr.id = trans.id_agen 
                        where trans.kode_transaksi='" + lisensi.transaksi.kode_transaksi + "' " +
                "GROUP BY plgn.nama_pelanggan, plgn.alamat, plgn.telepon, plgn.email, plgn.nama_instansi, plgn.kode_pelanggan, dtrans.nama_paket, trans.tanggal_transaksi, trans.status_sewa, trans.kode_lisensi, trans.id_agen, trans.id_pelanggan, trans.tanggal_transaksi, dtrans.kode_transaksi, usr.first_name, usr.last_name, dtrans.qty_paket, dtrans.satuan_paket, dtrans.id_produk, dtrans.qty_max ORDER BY trans.tanggal_transaksi DESC ";

                            
                List<ProductLisensi> produk = db.Database.SqlQuery<ProductLisensi>(sql).ToList();
                if (produk.Count > 0)
                {
                    lisensi.produk = produk;
                }
            }
            return lisensi;
        }


        public TransaksiManagementSchool GetValidationDataManagementSchool(string kode_pelanggan)
        {
            TransaksiManagementSchool TransaksiManagementSchool = new TransaksiManagementSchool();
            TransaksiManagementSchool.status = "False";
            TransaksiManagementSchool.keterangan = "Lisensi Tidak Valid";

            string sql = @"select top 1 * from ( 
                    SELECT MAX(dtrans.qty_max) AS qty_max, MAX(CONVERT(varchar,dtrans.tanggal_expired, 23)) AS tanggal_kadaluarsa, trans.id_pelanggan, trans.id_agen, trans.kode_transaksi, trans.status_sewa, dtrans.tanggal_expired
                    FROM transaksi AS trans
                    INNER JOIN detail_transaksi AS dtrans ON trans.kode_transaksi = dtrans.kode_transaksi
                    INNER JOIN pelanggan AS plgn ON trans.id_pelanggan = plgn.id
                    WHERE plgn.kode_pelanggan= '"+ kode_pelanggan +"' "+
                    "GROUP BY trans.id_pelanggan, trans.id_agen, trans.kode_transaksi, trans.status_sewa, dtrans.tanggal_expired "+
                    ") a order by qty_max desc ";

            List<TransaksiManagementSchool> t = db.Database.SqlQuery<TransaksiManagementSchool>(sql).ToList();
            if (t.Count > 0)
            {
                TransaksiManagementSchool = t[0];
                TransaksiManagementSchool.status = TransaksiManagementSchool.status_sewa;
                TransaksiManagementSchool.keterangan = TransaksiManagementSchool.status_sewa;
                TransaksiManagementSchool.qty_max = TransaksiManagementSchool.qty_max;
                TransaksiManagementSchool.tanggal_expired = TransaksiManagementSchool.tanggal_expired;
            }

            //if (lisensi.transaksi != null)
            //{
            //    sql = @"SELECT * --nama_pelanggan, alamat, telepon, email, nama_instansi, id, kode_pelanggan
            //      FROM pelanggan where id='" + t[0].id_pelanggan.ToString() + "' and kode_pelanggan='" + kode_pelanggan + "'";

            //    List<Pelanggan> p = db.Database.SqlQuery<Pelanggan>(sql).ToList();
            //    if (p.Count > 0)
            //    {
            //        lisensi.pelanggan = p[0];
            //    }

            //    sql = @"SELECT * --id, user_name, email, mobile_phone, password, first_name, last_name, id_jenis_user, alamat, kabupaten, create_at, update_at 
            //              FROM users where id='" + t[0].id_agen + "'";
            //    List<User> a = db.Database.SqlQuery<User>(sql).ToList();
            //    if (a.Count > 0)
            //    {
            //        lisensi.agen = a[0];
            //    }

            //    sql = @"select
            //                transaksi.kode_lisensi
            //                ,transaksi.status_sewa
            //                ,transaksi.id_agen,transaksi.id_pelanggan
            //                ,pelanggan.nama_instansi
            //                ,pelanggan.nama_pelanggan
            //                ,pelanggan.kode_pelanggan
            //                ,transaksi.tanggal_transaksi 
            //                ,users.first_name+' '+users.last_name as  namaagen
            //                ,detail_paket.id_produk
            //                ,detail_paket.qty
            //                ,detail_paket.satuan
            //                from transaksi
            //                inner join pelanggan on pelanggan.id=transaksi.id_pelanggan
            //                inner join users on users.id=transaksi.id_agen
            //                inner join detail_transaksi on transaksi.kode_transaksi=detail_transaksi.kode_transaksi
            //                inner join paket on paket.id=detail_transaksi.id_paket
            //                inner join detail_paket on detail_paket.id_paket=paket.id
            //                inner join product on product.id_product=detail_paket.id_produk  
            //                where transaksi.kode_transaksi='" + lisensi.transaksi.kode_transaksi + "'";
            //    List<ProductLisensi> produk = db.Database.SqlQuery<ProductLisensi>(sql).ToList();
            //    if (produk.Count > 0)
            //    {
            //        lisensi.produk = produk;
            //    }
            //}
            return TransaksiManagementSchool;
        }


    }
}
