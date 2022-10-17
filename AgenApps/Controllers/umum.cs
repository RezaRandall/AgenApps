using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualBasic;
using System.Net;
using System.Net.Security;

using System.Security.Cryptography;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

//using Org.BouncyCastle.Asn1.Ocsp;

public static  class umum 
    {
        // Public urlserver = "http://localhost:8111"
        public static string UrlServer = "http://adms.sintesys.co.id/";
    //public static object DataTableToJSONWithJSONNet(DataTable table)
    //{
    //    string JSONString = string.Empty;
    //    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
    //    JSONString = JsonConvert.SerializeObject(table);
    //   // object jsonobject = jsSerializer.Serialize(JSONString);
       
    //   //var j= jsSerializer.Deserialize<object>(JSONString);
    //    return JSONString;
    //}
    //public static string ClassToJSONWithJSONNet(object table)
    //{
    //    string JSONString = string.Empty;
    //    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
    //    JSONString = JsonConvert.SerializeObject(table,Formatting.Indented);
    //    // object jsonobject = jsSerializer.Serialize(JSONString);

    //    //var j= jsSerializer.Deserialize<object>(JSONString);
    //    return JSONString;
    //}
    public static string createfilter(List<Dictionary<string, string>> jdatafilter)
        {
            var where = "";
            if (jdatafilter != null)
            {
                foreach (var item in jdatafilter)
                {
                    if ((item["value"] != ""))
                    {
                        var opr = item["operator"];
                        if ((item["operator"] == "contain"))
                            opr = "like";
                        var field = "";
                        field = item["field"];
                        if (item.ContainsKey("type"))
                        {
                            if ((item["type"] != null))
                            {
                                if ((item["type"] == "date"))
                                    field = "convert(varchar," + item["field"] + ",23)";
                            }
                        }


                        if ((item["operator"] == "contain"))
                            where = where + " " + field + " " + opr + " '%" + item["value"] + "%' and";
                        else if ((item["operator"] == "like"))
                            where = where + " " + field + " " + opr + " '%" + item["value"] + "' and";
                        else
                            where = where + " " + field + " " + opr + " '" + item["value"] + "' and";
                    }
                }
            }
            return where;
        }
        public static string CalculateMD5Hash(string input, string salt)
        {
            MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input + salt.ToString());
            byte[] hash = md5.ComputeHash(inputBytes);
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i <= hash.Length - 1; i++)
                sb.Append(hash[i].ToString("X2"));

            return sb.ToString();
        }
        public static string Session(HttpContext ctx, string key)
        {
            //var r = null;
            //HttpContext ctx;
            var r = ctx.Request.Cookies[key];
            //if (r!= null)
            //     r = r;

            return r;
        }
        public static void Session(HttpContext ctx, string key, string value)
        {
            // ctx.Response.Cookies.
            CookieOptions option = new CookieOptions();
            option.Expires = DateTime.Now.AddYears(1);

            ctx.Response.Cookies.Append(key, value, option);
            //ctx.Response.Cookies[key].Expires = DateTime.Now.AddYears(1);
        }
        //public static  object GetObjectFromCache(string cacheItemName, string prevcacheItemName)
        //{
        //    ObjectCache cache = MemoryCache.Default;

        //    var cachedObject = cache.Get(cacheItemName);
        //    if ((prevcacheItemName != ""))
        //        cache.Remove(prevcacheItemName);

        //    // If cachedObject Is Nothing Then
        //    // Dim policy As CacheItemPolicy = New CacheItemPolicy()
        //    // policy.AbsoluteExpiration = DateTimeOffset.Now.AddMinutes(cacheTimeInMinutes)
        //    // 'cachedObject = objectSettingFunction()
        //    // cache.[Set](cacheItemName, cachedObject, policy)
        //    // End If

        //    return cachedObject;
        //}
        //public static bool SetObjectFromCache(string cacheItemName, int cacheTimeInMinutes, object value)
        //{
        //    ObjectCache cache = MemoryCache.Default;
        //    // Dim cachedObject = cache(cacheItemName)

        //    CacheItemPolicy policy = new CacheItemPolicy();
        //    // cacheTimeInMinutes = 1440
        //    policy.AbsoluteExpiration = DateTimeOffset.Now.AddMinutes(cacheTimeInMinutes);
        //    // policy.SlidingExpiration = TimeSpan.FromMinutes(cacheTimeInMinutes)
        //    // cachedObject = objectSettingFunction()

        //    cache.Set(cacheItemName, value, policy);


        //    return true;
        //}
        //public static object GetObjectcounter(string cacheItemName)
        //{
        //    ObjectCache cache = MemoryCache.Default;

        //    var cachedObject = cache.Get(cacheItemName);

        //    return cachedObject;
        //}
        //public static bool SetObjectcounter(string cacheItemName, int cacheTimeInMinutes, object value)
        //{
        //    ObjectCache cache = MemoryCache.Default;
        //    // Dim cachedObject = cache(cacheItemName)

        //    CacheItemPolicy policy = new CacheItemPolicy();
        //    // cacheTimeInMinutes = 1440
        //    // policy.AbsoluteExpiration = DateTimeOffset.Now.AddMinutes(cacheTimeInMinutes)
        //    policy.SlidingExpiration = TimeSpan.FromMinutes(cacheTimeInMinutes);
        //    // cachedObject = objectSettingFunction()

        //    cache.Set(cacheItemName, value, policy);


        //    return true;
        //}


    }
