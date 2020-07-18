using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace PoeFliper_DesktopApp.Services
{
    public static class Validator
    {
        public static bool IsNodeInstalled()
        {
            try
            {
                System.Diagnostics.Process process = new System.Diagnostics.Process();
                process.StartInfo.FileName = "node";
                process.StartInfo.Arguments = "-v";
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.RedirectStandardOutput = true;
                process.Start();
                string response = process.StandardOutput.ReadToEnd();
                process.WaitForExit();

                return response.IndexOf("v") == 0;
            }
            catch(Exception e)
            {
                return false;
            }
            
        }

        public static bool ArePortsAvailable()
        {
            IPAddress adress = Dns.GetHostEntry("localhost").AddressList[0];

            TcpListener lisener = new TcpListener(adress, 7654);
            bool portsAvalable = true;
            try
            {
                lisener.Start();
            }
            catch (Exception e)
            {
                portsAvalable = false;
            }
            finally
            {
                lisener.Stop();
            }
            return portsAvalable;
        }
    }
}
