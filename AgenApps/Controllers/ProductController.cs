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

namespace AgenApps.Controllers
{
    public class ProductController : Controller
    {
        private dbcontext db = new dbcontext();

        private readonly IHostingEnvironment _hostingEnvironment;

        public ProductController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        public JsonResult getProduct(string param)
        {
            List<Product> v_var;

            string str1 = "";
            if (param != null)
                str1 += " WHERE id_product LIKE '%" + param + "%' OR url_product LIKE '%" + param + "%' OR harga LIKE '%" + param + "%' OR nama_product LIKE '%" + param + "%'";
            string sql = @"SELECT * FROM DB_AGEN.dbo.product" + str1 + " ORDER BY create_at ASC";

            //return new JsonResult(sql);

            v_var = db.Database.SqlQuery<Product>(sql).ToList();
            return Json(v_var);
        }
        
        public JsonResult getAllProductAddOn()
        {
            List<Product> v_var;
            string sql = @"SELECT * FROM DB_AGEN.dbo.product WHERE jenis_sewa = 'hakmilik'";

            //return new JsonResult(sql);

            v_var = db.Database.SqlQuery<Product>(sql).ToList();
            return Json(v_var);
        }

        public ContentResult AjaxMethod(string namafile)
        {
            string webRootPath = _hostingEnvironment.WebRootPath;
            string contentRootPath = _hostingEnvironment.ContentRootPath;

            string path = "";
            path = webRootPath + "\\Contenyt\\ImgProduct\\";
            string xml = System.IO.File.ReadAllText(path + "\\" + namafile);
            return Content(xml);
        }

        [HttpPost]
        public IActionResult saveProduct([FromForm] Product data, IFormFile img)
        {
            reponse res = new reponse();
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


            try
            {
                if (data.command == "insert")
                {
                    string sqlQuery = @"INSERT INTO product (id, id_product, url_product, harga, nama_product, create_at, description, img_product, satuan) 
                                        VALUES (NEWID(), '"+data.id_product+"','"+data.url_product+"','"+data.harga+"','"+data.nama_product+@"',
                                                GETDATE(),'"+data.description+"','"+str1+"','"+data.satuan+ "')";
                    db.Database.ExecuteSqlCommand(sqlQuery);
                }
                else 
                {
                    if (str1 == null)
                    {
                        string sqlQuery = @"UPDATE product 
                                        SET 
                                        id_product = '" + data.id_product + @"', url_product = '" + data.url_product + @"',
                                        harga = '" + data.harga + @"', nama_product = '" + data.nama_product + @"',
                                        update_at = GETDATE(), description = '" + data.description + @"',
                                        satuan = '"+data.satuan+ @"'
                                        WHERE id = '" + data.id + @"'
                                    ";
                        db.Database.ExecuteSqlCommand(sqlQuery);
                    }
                    else { 
                    string sqlQuery = @"UPDATE product 
                                        SET 
                                        id_product = '" + data.id_product + @"', url_product = '" + data.url_product + @"',
                                        harga = '" + data.harga + @"', nama_product = '" + data.nama_product + @"',
                                        update_at = GETDATE(), description = '"+data.description+"', img_product = '" + str1 + @"',
                                        satuan = '"+data.satuan + @"'
                                        WHERE id = '" + data.id + @"'
                                    ";
                    db.Database.ExecuteSqlCommand(sqlQuery);
                    }
                    
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
        public int deleteProduct(String id, string img)
        {
            //var npsn = System.Convert.ToString(Session("npsn"));
            //string str1 = null;

            // INITIAL PATH
            string webRootPath = _hostingEnvironment.WebRootPath;
            var path = webRootPath + "\\Content\\ImgProduct\\";
            // FULL PATH + FILE NAME TOBE SAVE TO DIRECTORY
            var fullPath = Path.Combine(path, img);

            //FileStream fParameter = new FileStream(fullPath, FileMode.Create, FileAccess.ReadWrite);
            if (System.IO.File.Exists(fullPath))
            {
                try
                {
                    System.IO.File.Delete(fullPath);
                } catch (Exception ex)
                {

                }
                
            }


            string s = @"DELETE FROM product 
                                WHERE id = '" + id + "'";
            return db.Database.ExecuteSqlCommand(s);
        }


    }
}
