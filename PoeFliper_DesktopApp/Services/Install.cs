using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
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

            Install.DownloadFile("\\tsconfig.json", path);
            Install.DownloadFile("\\package-lock.json", path);
            Install.DownloadFile("\\package.json", path);
            if (!Directory.Exists(path+"\\dist"))
            {
                Directory.CreateDirectory(path + "\\dist");
            }
            Install.DownloadDistFile("\\core.js", path);
        }

        private static void DownloadFile(string fileName, string path)
        {
            using (WebClient client = new WebClient())
            {
                client.DownloadFile("https://raw.githubusercontent.com/Klaku/PoeFliper/master/PoeSniper_NodeApp" + fileName, path + fileName);
            }
        }

        private static void DownloadDistFile(string fileName, string path)
        {
            using (WebClient client = new WebClient())
            {
                client.DownloadFile("https://raw.githubusercontent.com/Klaku/PoeFliper/master/PoeSniper_NodeApp/dist" + fileName, path + "\\dist" + fileName);
            }
        }
    }
}
