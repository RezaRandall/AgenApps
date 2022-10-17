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
    //[Route("api/[controller]")]
    [ApiController]
    public class AgenAPIController : ControllerBase
    {
        private dbcontext db = new dbcontext();

        [Route("api/Api_Management/GetValidationDataCustomer")]
        [HttpGet]
        public JsonResult GetValidationDataCustomer(string kode_lisensi, string kode_pelanggan)
        {
            var lisensi = new Models.Lisensi();
            var d = lisensi.GetValidationDataCustomer(kode_lisensi, kode_pelanggan);

            return new JsonResult(d);
        }

        [Route("api/Api_Management/GetValidationDataManagementSchool")]
        public JsonResult GetValidationDataManagementSchool(string kode_pelanggan)
        {
            var lisensi = new Models.Lisensi();
            var d = lisensi.GetValidationDataManagementSchool(kode_pelanggan);

            return new JsonResult(d);
        }



    }
}
