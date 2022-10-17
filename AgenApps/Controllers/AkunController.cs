using Microsoft.AspNetCore.Mvc;
using pkmcore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace admsapi_core.Controllers
{
    public class AkunController : Controller
    {
        public IActionResult Index()
        {
            var username = umum.Session(HttpContext, "username");
            if (username == null)
                return RedirectToAction("Login");
            return View();
        }

        public IActionResult Products()
        {
            var username = umum.Session(HttpContext, "username");
            if (username == null)
                return RedirectToAction("Login");
            return View();
        }

        public IActionResult Packets()
        {
            var username = umum.Session(HttpContext, "username");
            if (username == null)
                return RedirectToAction("Login");
            return View();
        }
        
        public IActionResult ListTransaksiSuperUser()
        {
            var username = umum.Session(HttpContext, "username");
            if (username == null)
                return RedirectToAction("Login");
            return View();
        }
        public ActionResult ListAgen()
        {
            var username = umum.Session(HttpContext, "username");
            if (username == null)
                return RedirectToAction("Login");
            return View();
        }        

       

        public ActionResult Login()
        {
            var username = umum.Session(HttpContext, "username");
            if (username != null & username != "")
            {
                Api_Management mapi = new Api_Management();
                var h = mapi.getuser(username);
                if (h != null)
                {
                    umum.Session(HttpContext, "username", h.user_name);
                    return RedirectToAction("Dashboard");
                }
            }
            return View();
        }
        [HttpPost]
        public JsonResult doLogin(string username, string password)
        {
            Api_Management mapi = new Api_Management();
            response hasil = new response();
            //res hasil = new res();
            if (username != "")
            {
                var h = mapi.getlogin(username, password);
                if (h != null)
                {
                    umum.Session(HttpContext, "username", h.user_name.ToString());
                    umum.Session(HttpContext, "id", h.id.ToString());
                    string s = "00000";
                    string kode_agen = s.Substring(0, s.Length - h.kode_agen.ToString().Length) + h.kode_agen.ToString();
                    umum.Session(HttpContext, "kode_agen", kode_agen);
                    umum.Session(HttpContext, "id_jenis_user", h.id_jenis_user.ToString()); 
                    //umum.Session(HttpContext, "sekolah_id", h..ToString());
                    hasil.hasil = true;
                    hasil.id_jenis_user = h.id_jenis_user;
                    //return Json(hasil);
                    return new JsonResult(hasil);
                }
                else
                {
                    hasil.hasil = false;
                    hasil.keterangan = "UserName / Password Tidak Sesuai";
                    return Json(hasil);
                }
            }
            else
            {
                hasil.hasil = false;
                hasil.keterangan = "UserName / Password Tidak Sesuai";
                return Json(hasil);
            }
        }
        [HttpPost]
        //public JsonResult doLogout()
        //{
        //    response hasil = new response();
        //    umum.Session(HttpContext, "username", "");
        //    hasil.hasil = true;
        //    return Json(hasil);
        //}        
        public JsonResult doLogout()
        {
            response hasil = new response();
            umum.Session(HttpContext, "user_name", "");
            hasil.hasil = true;
            return Json(hasil);
        }

        //public ActionResult Dashboard()
        //{
        //    //var username = umum.Session(HttpContext, "username");
        //    //if (username == null)
        //    //    return RedirectToAction("Login");
        //    //if (username != null)
        //    //{
        //    //    Api_Management mapi = new Api_Management();
        //    //    var h = mapi.getuser(username);

        //    //    if (h != null)
        //    //    {
        //    //        //dim paket = mapi.getpaket(h.paket_id)
        //    //        //profile profile = new profile();
        //    //        //profile.akun = h;
        //    //        //profile.paket = paket
        //    //        //pemakaian p = new pemakaian();
        //    //        //p.total_menit = mapi.get_total_time(h.api_key)
        //    //        // p.total_drive = mapi.get_total_drive(api_management.foldervideo & "\" & h.nama)
        //    //        //profile.pemakaian = p;
        //    //        return View(h);
        //    //    }
        //    //}
        //    //return RedirectToAction("Index");
        //    return View();
        //}



    }
}