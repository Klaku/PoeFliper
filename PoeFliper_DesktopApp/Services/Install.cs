using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoeFliper_DesktopApp.Services
{
    public static class Install
    {
        public static void InstallApp(string path)
        {
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }


        }
    }
}
