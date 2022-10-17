using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Security;
using System.Text;
using Microsoft.VisualBasic;

namespace pkmcore.Models
{
    public class ProductLisensi
    {
        public string kode_lisensi { get; set; }
        public string status_sewa { get; set; }
        public string id_agen { get; set; }
        public Guid id_pelanggan { get; set; }
        public string nama_instansi { get; set; }
        public string nama_pelanggan { get; set; }
        public string kode_pelanggan { get; set; }
        public DateTime tanggal_transaksi { get; set; }
        public string   namaagen { get; set; }
        public string id_produk { get; set; }
        public int qty { get; set; }
        public int qty_max { get; set; }
        public string  satuan { get; set; }
        public int jangka_sewa { get; set; }
        public string waktu_sewa { get; set; }
    }
    public class lisensi
    {
        public string status { get; set; }
        public string keterangan { get; set; }
        public int? qty_max { get; set; }
        public DateTime? tanggal_expired { get; set; }
        public Transaksi transaksi { get; set; }
        public TransaksiManagementSchool transaksiManagementSchool { get; set; }
        public Pelanggan pelanggan { get; set; }
        public User agen { get; set; }
        public List<ProductLisensi> produk { get; set; }
    }
    public class detailorder
    {
        public Guid? id_paket { get; set; }
        public Guid? id_produk { get; set; }
        public int qty { get; set; }
        public Double total { get; set; }
        public int? addon { get; set; }
        public string jenis_sewa { get; set; }
        public string nama_paket { get; set; }
    }
    public class order
    {
        public string kode_pelanggan { get; set; }
        public string nama_pelanggan { get; set; }
        public string nama_instansi { get; set; }
        public string telepon { get; set; }
        public string alamat { get; set; }
        public string email { get; set; }
        public string diskon { get; set; }
        public List<detailorder> detailorder { get; set; }
        public Int32? jumlah_satuan { get; set; }
        public Int32? qty_max { get; set; }
        public Int32? pajak { get; set; }
        public Int32? total_bayar { get; set; }
        public string jenjang { get; set; }

    }
    public class dataTransaksi
    {
        public string id_agen { get; set; }
        public DateTime tanggal_transaksi { get; set; }
        public DateTime? tanggal_bayar { get; set; }
        public Guid id_pelanggan { get; set; }
        //public int id_pelanggan { get; set; }
        public string status_sewa { get; set; }
        public string kode_transaksi { get; set; }
        public string kode_lisensi { get; set; }

        public int addon { get; set; }
        public double harga { get; set; }
        public Guid? id_paket { get; set; }
        public string id_produk { get; set; }
        public string deskripsi_produk { get; set; }
        public string nama_paket { get; set; }
        public int? qty { get; set; }
        public int qty_paket { get; set; }
        public string satuan { get; set; }
        public string satuan_paket { get; set; }
        public Int64 total_harga { get; set; }
        public decimal ppn { get; set; }
        public decimal total { get; set; }

        public string nama_pelanggan { get; set; }
        public string nama_instansi { get; set; }
        public string alamat { get; set; }
        public string telepon { get; set; }
        public string email { get; set; }
        public string kode_pelanggan { get; set; }
        public Guid? register_agen { get; set; }
        public string discount { get; set; }
        public Int32? diskon { get; set; }

    }
        public class Transaksi
    {
        public Guid? id { get; set; }
        public string id_agen { get; set; }
        public DateTime? tanggal_transaksi { get; set; }
        public string tanggal_pesan { get; set; }
        public DateTime? tanggal_expired { get; set; }
        public string tanggal_kadaluarsa { get; set; }
        //public int id_pelanggan { get; set; }
        public string status_sewa { get; set; }
        public string kode_transaksi { get; set; }
        public Int32 transaksi_kode { get; set; }
        public string nama_instansi { get; set; }
        public string kode_paket { get; set; }
        public string waktu_sewa { get; set; }
        public string kode_lisensi { get; set; }
        public string command { get; set; }
        public string jangka_sewa { get; set; }
        public string harga_paket { get; set; }
        public string discount { get; set; }
        public string nama_pelanggan { get; set; }
        public string alamat { get; set; }
        public string telepon { get; set; }
        public string email { get; set; }
        public string nama_paket { get; set; }
        public Int64? total_harga { get; set; }
        public Int64? hargaTotal { get; set; }
        public Double? total_bayar { get; set; }
        public string kode_pelanggan { get; set; }
        public Guid? id_pelanggan { get; set; }
        public Guid? id_paket { get; set; }

        public Int32? addon { get; set; }
        public Int32? qty_paket { get; set; }
        public Int32? qty { get; set; }
        public Int32? qty_min { get; set; }
        public Int32? qty_max { get; set; }
        //public Int32? harga { get; set; }
    }

    public class TransaksiManagementSchool
    {
        public string status_sewa { get; set; }
        public string status { get; set; }
        public string keterangan { get; set; }
        public Int32? qty_max { get; set; }
        public DateTime? tanggal_expired { get; set; }

    }

        public class DetailTransaksi
    {
        public Guid? id { get; set; }
        public string kode_paket { get; set; }
        public string total_harga { get; set; }
        public int? jumlah_qty { get; set; }
        public string discount { get; set; }
        public string id_pelanggan { get; set; }
    }

    public class reponse
    {
        //public Guid id { get; internal set; }
        public bool hasil { get; set; }
        public string keterangan { get; set; }
    }

    public class akun
    {
        public string username { get; set; }
        public string password { get; set; }
        public string groupid { get; set; }
        public int bidang { get; set; }
        public int level { get; set; }
        public string command { get; set; }
        public string username_key { get; set; }
        public int jumlah_pokmas { get; set; }
        public string namabidang { get; set; }
    }

    public class User
    {
        public Guid? id { get;  set; }
        public String id_agen { get; set; }
        public int kode_agen { get; set; }
        public string user_name { get; set; }
        public string email { get; set; }
        public string mobile_phone { get; set; }
        //public string password { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public int id_jenis_user { get;  set; }
        public string alamat { get; set; }
        public string kabupaten { get; set; }
        public string password { get; set; }
        public string command { get; set; }
        public DateAndTime create_at { get; set; }
        public DateAndTime update_at { get; set; }

    }  
    
    public class Product
    {
        public Guid? id { get;  set; }
        public String id_product { get; set; }
        public string url_product { get; set; }
        public int? jumlah_satuan { get; set; }
        public int addon { get; set; }
        public Double? harga { get; set; }
        public long? calDiskon { get; set; }
        public string nama_product { get; set; }
        public string img_product { get; set; }
        public string command { get; set; }
        public string satuan { get; set; }
        public int? qty { get; set; }
        public int? qty_max { get; set; }
        public int? kuantitas { get; set; }
        
        public string description { get; set; }
        public  string nama_paket { get; set; }
        public DateAndTime create_at { get; set; }
        public DateAndTime update_at { get; set; }
        public string jenis_sewa { get; set; }
    }

    public class DetailPaket
    {
        public string id_product { get; set; }
        public Double? harga { get; set; }
        public int addon { get; set; }
        public int qty { get; set; }
        public int qty_max { get; set; }
        public string satuan { get; set; }
        public string satuan_paket { get; set; }
        public Guid id_paket { get; set; }
        public Guid id { get; set; }
        public string nama_paket { get; set; }
        public string nama_product { get; set; }
        public string description { get; set; }
        public string img_product { get; set; }
        public string jenis_sewa { get; set; }
        public int? kuantitas { get; set; }
        public Int32? diskon { get; set; }
       
    }

    public class Paket
    {
        public Guid? id { get; set; }
        public string id_product { get; set; }
        public List<Product> qtys { get; set; }
        public Int64? harga_paket { get; set; }
        public string nama_paket { get; set; }
        public string img_paket { get; set; }
        public string deskripsi { get; set; }
        public string kode_paket { get; set; }
        public List<Product> satuanProduct { get; set; }
        public string satuan_paket { get; set; }
        public string waktu_sewa { get; set; }
        public string command { get; set; }
        public Int32? diskon { get; set; }
        //public string catatan_diskon { get; set; }
        public List<Product> produk { get; set; }
        public List<DetailPaket> detailPaket { get; set; }
        public List<Product> hargaSatuan { get; set; }
    }

    public class Pelanggan
    {
        public Guid id { get; set; }
        public string nama_pelanggan { get; set; }
        public List<Product> qtys { get; set; }
        public string alamat { get; set; }
        public string telepon { get; set; }
        public string email { get; set; }
        public string nama_instansi { get; set; }
        public string kode_pelanggan { get; set; }
        public Guid? register_agen { get; set; }

        public Guid id_pelanggan { get; set; }
        public Guid? id_paket { get; set; }
        public string nama_paket { get; set; }
        public DateTime tanggal_transaksi { get; set; }
        public string status_sewa { get; set; }
        public string kode_transaksi { get; set; }
        public string kode_lisensi { get; set; }
        public Double? total_bayar { get; set; }
        public Int64 hargaTotal { get; set; }
        public string user_name { get; set; }
        public int? qty_paket { get; set; }
        public string satuan_paket { get; set; }
        public string id_produk { get; set; }
        public string jenjang { get; set; }
    }

    public class Sekolah
    {
        public String npsn { get; set; }
        public Guid sekolah_id { get; set; }
        public String nama_sekolah { get; set; }
        public String alamat { get; set; }
        public String jenjang { get; set; }
        public String default_absen { get; set; }
    }

    public class Pengguna
    {
        public String pengguna_email { get; set; }
        public String pengguna_username { get; set; }
        public String pengguna_password { get; set; }
        public String pengguna_jenis { get; set; }
        public Guid pengguna_id { get; set; }
        public String pengguna_npsn { get; set; }
        public Guid pengguna_sekolah_id { get; set; }
        public DateAndTime tgl_insert { get; set; }
    }
    public class UOM
    {
        public int id_satuan { get; set; }
        public string nama_satuan { get; set; }
    }

   

    public class JenisUser
    {
        public int id_jenis_user { get; internal set; }
        public string user_type { get; set; }
    }

    public class response
    {
        public bool hasil { get; set; }
        public string keterangan { get; set; }
        public int id_jenis_user { get; internal set; }
        public Harga harga { get; set; }
        public string kode_transaksi { get; set; }
        //public int id_pokmas { get; internal set; }
    }
    public class Harga
    {
        public double harga { get; set; }
        public int qty { get; set; }
    }
    public enum level
    {
       admin = 0,
       ktk =  1,
       pkm=2,
       bidang=3,
       kelompok =  4 
    }
    public class Api_Management : IDisposable
    {
        private dbcontext context = new dbcontext();

        public User getuser(string username)
        {
            try
            {
                var d = context.Database.SqlQuery<User>(@"SELECT  * as bidang
  FROM [users] where user_name='" + username + "'").ToList();
                if (d.Count > 0)
                {
                    return d[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }


        }

        public User getlogin(string username,string password)
        {
            try
            {
                var d = context.Database.SqlQuery<User>(@"SELECT id, user_name,password,id_jenis_user,kode_agen
  FROM [users] where user_name='" + username + "' and password='" + password + "'").ToList();
                if (d.Count > 0)
                {
                    return d[0];
                }
                else
                {
                    return null;
                }
            } catch (Exception ex)
            {
                return null;
            }
        }

        public List<akun> gethakakses(string nama, string level)
        {
            try
            {
                string where = "";
                if (nama != "" & nama != null)
                {
                    nama = " and aset.[customer] like '%" + nama + "%'";
                }
                if (level != "" & level != null)
                {
                    level = " and akun.[level] = '" + level + "'";
                }
                where = nama + level;
                if (where.Length > 0)
                {
                    where = " where " + where.Substring(4);
                }

                string sql = @"SELECT akun.[username]
      ,akun.[password]
      ,akun.[groupid]
,isnull(akun.[bidang],0) as bidang
,tbidang.nama as namabidang
      ,akun.[level]
,isnull(pokmas.jumlah,0) + isnull(pokmas_kec.jumlah,0) + isnull(tbidang.jumlah,0) as jumlah_pokmas
  FROM [bappeda].[dbo].[akun] 
 left join ( select user_pkm,count(pokmas.id_pokmas) as jumlah from pokmas group by user_pkm) pokmas on pokmas.user_pkm=akun.username and akun.level=2
  left join ( select pokmas.kecamatan,count(pokmas.id_pokmas) as jumlah from pokmas group by kecamatan) pokmas_kec on pokmas_kec.kecamatan=akun.groupid and akun.level=1
        left join (select b.bidang_id,b.nama,count(pokmas.id_pokmas) as jumlah 
        from bidang b
        left join jenis_usaha ju on b.bidang_id=ju.bidang_id
        left join pokmas on ju.jenis_usaha_id=pokmas.jenis_usaha_id
        group by b.bidang_id,b.nama
        ) 
        tbidang on tbidang.bidang_id=akun.bidang and akun.level=3
" + where + "" +
" order by akun.username asc";
                var d = context.Database.SqlQuery<akun>(sql).ToList();
                return d;
            }
            catch (Exception ex)
            {
                return null;
            }


        }
      
        public response setanggota_pkm(string userid, List<string> pokmas)
        {
            response hasil = new response();
            try
            {
                // datapost.total = datapost.qty * datapost.harga;
                string sql = "";
                foreach (string s in pokmas)
                {
                    sql = sql + @"UPDATE [dbo].[pokmas]
   SET [user_pkm] = '" + userid + "'" +
     " WHERE [id_pokmas] = '" + s + "'";
                }

                var d = context.Database.ExecuteSqlCommand(sql);
                hasil.hasil = true;
                return hasil;
            }
            catch (Exception ex)
            {
                hasil.keterangan = ex.Message;
                return hasil;
            }


        }
        public response resetanggota_pkm(string userid)
        {
            response hasil = new response();
            try
            {
                // datapost.total = datapost.qty * datapost.harga;
                string sql = "";
                sql = @"UPDATE [dbo].[pokmas]
   SET [user_pkm] = ''" +
     " WHERE [user_pkm] = '" + userid + "'";

                var d = context.Database.ExecuteSqlCommand(sql);
                hasil.hasil = true;
                return hasil;
            }
            catch (Exception ex)
            {
                hasil.keterangan = ex.Message;
                return hasil;
            }


        }
        public response hapusanggota_pkm(List<string> pokmas)
        {
            response hasil = new response();
            try
            {
                // datapost.total = datapost.qty * datapost.harga;
                string sql = "";
                foreach (string s in pokmas)
                {
                    sql = sql + @"UPDATE [dbo].[pokmas]
   SET [user_pkm] = ''" +
     " WHERE [id_pokmas] = '" + s + "'";
                }

                var d = context.Database.ExecuteSqlCommand(sql);
                hasil.hasil = true;
                return hasil;
            }
            catch (Exception ex)
            {
                hasil.keterangan = ex.Message;
                return hasil;
            }


        }
        public response inserthakakses(akun datapost)
        {
            response hasil = new response();
            try
            {

                if (datapost.username == "" || datapost.username == null)
                {
                    hasil.keterangan = "Data Tidak Lengkap";
                    return hasil;
                }
                else
                {

                    string sql = @"INSERT INTO [dbo].[akun]
           ([username]
           ,[password]
           ,[groupid]
           ,[level],bidang)
     VALUES
           ('" +datapost.username + "'"+
           ",'" +datapost.password + "'" +
           ",'" + datapost.groupid + "'" +
           ",'" + datapost.level + "','" + datapost.bidang + "')";
                    var d = context.Database.ExecuteSqlCommand(sql);
                    hasil.hasil = true;
                    return hasil;
                }


            }
            catch (Exception ex)
            {
                hasil.keterangan = ex.Message;
                return hasil;
            }


        }
        public response updatehakakses(akun datapost)
        {
            response hasil = new response();
            try
            {
                // datapost.total = datapost.qty * datapost.harga;
                string sql = @"UPDATE [dbo].[akun]
   SET [username] = '" + datapost.username + "'" +
      ",[password] = '" + datapost.password + "'" +
      ",[groupid] = '" + datapost.groupid + "'" +
      ",[bidang] = '" + datapost.bidang + "'" +
      ",[level] = '" + datapost.level + "'" +
 " WHERE [username] = '" + datapost.username_key + "'";
                var d = context.Database.ExecuteSqlCommand(sql);
                hasil.hasil = true;
                return hasil;
            }
            catch (Exception ex)
            {
                hasil.keterangan = ex.Message;
                return hasil;
            }


        }
        public response deletehakakses(akun datapost)
        {
            response hasil = new response();
            try
            {

                string sql = @"DELETE FROM [dbo].[akun]  WHERE [username] = '" + datapost.username_key + "'";
                var d = context.Database.ExecuteSqlCommand(sql);
                hasil.hasil = true;
                return hasil;
            }
            catch (Exception ex)
            {
                hasil.keterangan = ex.Message;
                return hasil;
            }


        }
        public void Dispose()
        {
            context.Dispose();
        }
    }
}


