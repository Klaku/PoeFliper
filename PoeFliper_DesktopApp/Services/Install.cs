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
            Install.DownloadFile("\\install.js", path);
            if (!Directory.Exists(path+"\\dist"))
            {
                Directory.CreateDirectory(path + "\\dist");
            }
            Install.DownloadDistFile("\\core.js", path);
            Install.DownloadDistFile("\\csvHelper.js", path);
            Install.DownloadDistFile("\\express.js", path);
            Install.DownloadDistFile("\\raport.js", path);
            Install.DownloadDistFile("\\toaster.js", path);
            Install.DownloadDistFile("\\types.js", path);
            if (!Directory.Exists(path + "\\appFiles"))
            {
                Directory.CreateDirectory(path + "\\appFiles");
            }
            Install.DownloadAppFile("\\data.csv", path);
            Install.DownloadAppFile("\\items.csv", path);
            Install.DownloadAppFile("\\settings.txt", path);
            if (!Directory.Exists(path + "\\public"))
            {
                Directory.CreateDirectory(path + "\\public");
            }
            Install.DownloadpublicFile("\\index.html", path);
            Install.DownloadpublicFile("\\items.html", path);
            Install.DownloadpublicFile("\\Settings.html", path);
            //C:\Windows\System32\drivers\etc

            string hostsContent = File.ReadAllText(@"C:\Windows\System32\drivers\etc\hosts");
            if(hostsContent.IndexOf("127.0.0.1 poe.sniper.com") == -1)
            {
                hostsContent += "\n127.0.0.1 poe.sniper.com";
            }
            File.WriteAllText(@"C:\Windows\System32\drivers\etc\hosts", hostsContent);

            try
            {
                System.Diagnostics.Process process = new System.Diagnostics.Process();
                process.StartInfo.FileName = "node "+ path+ "\\dist";
                process.StartInfo.Arguments = "";
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.RedirectStandardOutput = true;
                process.Start();
                string response = process.StandardOutput.ReadToEnd();
                process.WaitForExit();
            }
            catch (Exception e)
            {
            }
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

        private static void DownloadAppFile(string fileName, string path)
        {
            using (WebClient client = new WebClient())
            {
                client.DownloadFile("https://raw.githubusercontent.com/Klaku/PoeFliper/master/PoeSniper_NodeApp/appFiles" + fileName, path + "\\appFiles" + fileName);
            }
        }

        private static void DownloadpublicFile(string fileName, string path)
        {
            using (WebClient client = new WebClient())
            {
                client.DownloadFile("https://raw.githubusercontent.com/Klaku/PoeFliper/master/PoeSniper_NodeApp/public" + fileName, path + "\\public" + fileName);
            }
        }
    }
}
