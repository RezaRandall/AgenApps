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
using System.Data.Entity;
using System.ComponentModel.DataAnnotations.Schema;

public partial class dbcontext : DbContext
{
    public dbcontext() : base("data source=139.162.28.116;initial catalog=DB_AGEN;user id=sa;password=Subhanallah2020;MultipleActiveResultSets=True;App=EntityFramework")
    {
    }
}