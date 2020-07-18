using PoeFliper_DesktopApp.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace PoeFliper_DesktopApp
{
    public partial class Poe : Form
    {
        public Poe()
        {
            InitializeComponent();
        }

        private void Poe_Load(object sender, EventArgs e)
        {
            if (Validator.IsNodeInstalled())
            {
                Status_Node_Env.Text += " Installed";
                Status_Node_Env.ForeColor = Color.Green;
            }
            else
            {
                Status_Node_Env.Text += " Not Installed";
                Status_Node_Env.ForeColor = Color.Red;
                Status_Node_Env.Font = new Font("Microsoft Sans Serif",8.0F, FontStyle.Bold);
                Button_Install.Enabled = false;
                Button_Uninstall.Enabled = false;
                Button_Update.Enabled = false;
            }

            if (Validator.ArePortsAvailable())
            {
                Label_Port_Available.Text += "Yes";
                Label_Port_Available.ForeColor = Color.Green;
            }
            else
            {
                Label_Port_Available.Text += "No (Please Unlock TCP Port 8510)";
                Label_Port_Available.ForeColor = Color.Red;
                Button_Install.Enabled = false;
                Button_Uninstall.Enabled = false;
                Button_Update.Enabled = false;
            }

            Instal_Location_Message.Text = "Will be instaled in " + Input_Text_Install_Location.Text + "\\Poe Sniper Tool";
        }

        private void Button_Select_Folder_Click(object sender, EventArgs e)
        {
            using (FolderBrowserDialog dialog = new FolderBrowserDialog())
            {
                dialog.RootFolder = Environment.SpecialFolder.ProgramFilesX86;
                if (dialog.ShowDialog() == DialogResult.OK)
                {
                    Input_Text_Install_Location.Text = dialog.SelectedPath;
                }
            }
        }

        private void Input_Text_Install_Location_TextChanged(object sender, EventArgs e)
        {
            try
            {
                if (Directory.Exists(Input_Text_Install_Location.Text))
                {
                    Instal_Location_Message.Text = "Will be instaled in "+Input_Text_Install_Location.Text+"\\Poe Sniper Tool";
                    Button_Install.Enabled = true;
                    Button_Uninstall.Enabled = true;
                    Button_Update.Enabled = true;
                }
                else
                {
                    Instal_Location_Message.Text = "Location Not Exist";
                    Instal_Location_Message.ForeColor = Color.Red;
                    Button_Install.Enabled = false;
                    Button_Uninstall.Enabled = false;
                    Button_Update.Enabled = false;
                }
                
            }catch(Exception ex)
            {
                Instal_Location_Message.Text = ex.Message;
                Instal_Location_Message.ForeColor = Color.Red;
            }
        }

        private void Button_Install_Click(object sender, EventArgs e)
        {
            Services.Install.InstallApp(Input_Text_Install_Location.Text + "\\Poe Sniper Tool");
        }
    }
}
