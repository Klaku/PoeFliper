namespace PoeFliper_DesktopApp
{
    partial class Poe
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.Status_Node_Env = new System.Windows.Forms.Label();
            this.Input_Text_Install_Location = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.Button_Select_Folder = new System.Windows.Forms.Button();
            this.Instal_Location_Message = new System.Windows.Forms.Label();
            this.Button_Install = new System.Windows.Forms.Button();
            this.Button_Uninstall = new System.Windows.Forms.Button();
            this.Button_Update = new System.Windows.Forms.Button();
            this.Label_Port_Available = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // Status_Node_Env
            // 
            this.Status_Node_Env.AutoSize = true;
            this.Status_Node_Env.Location = new System.Drawing.Point(12, 9);
            this.Status_Node_Env.Name = "Status_Node_Env";
            this.Status_Node_Env.Size = new System.Drawing.Size(98, 13);
            this.Status_Node_Env.TabIndex = 0;
            this.Status_Node_Env.Text = "Node Environment:";
            // 
            // Input_Text_Install_Location
            // 
            this.Input_Text_Install_Location.Location = new System.Drawing.Point(15, 82);
            this.Input_Text_Install_Location.Name = "Input_Text_Install_Location";
            this.Input_Text_Install_Location.Size = new System.Drawing.Size(370, 20);
            this.Input_Text_Install_Location.TabIndex = 1;
            this.Input_Text_Install_Location.Text = "C:\\Program Files (x86)";
            this.Input_Text_Install_Location.TextChanged += new System.EventHandler(this.Input_Text_Install_Location_TextChanged);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 66);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(78, 13);
            this.label1.TabIndex = 2;
            this.label1.Text = "Install Location";
            // 
            // Button_Select_Folder
            // 
            this.Button_Select_Folder.Location = new System.Drawing.Point(391, 79);
            this.Button_Select_Folder.Name = "Button_Select_Folder";
            this.Button_Select_Folder.Size = new System.Drawing.Size(75, 23);
            this.Button_Select_Folder.TabIndex = 3;
            this.Button_Select_Folder.Text = "Select";
            this.Button_Select_Folder.UseVisualStyleBackColor = true;
            this.Button_Select_Folder.Click += new System.EventHandler(this.Button_Select_Folder_Click);
            // 
            // Instal_Location_Message
            // 
            this.Instal_Location_Message.AutoSize = true;
            this.Instal_Location_Message.Location = new System.Drawing.Point(12, 105);
            this.Instal_Location_Message.Name = "Instal_Location_Message";
            this.Instal_Location_Message.Size = new System.Drawing.Size(10, 13);
            this.Instal_Location_Message.TabIndex = 4;
            this.Instal_Location_Message.Text = " ";
            // 
            // Button_Install
            // 
            this.Button_Install.Location = new System.Drawing.Point(279, 127);
            this.Button_Install.Name = "Button_Install";
            this.Button_Install.Size = new System.Drawing.Size(75, 23);
            this.Button_Install.TabIndex = 5;
            this.Button_Install.Text = "Install";
            this.Button_Install.UseVisualStyleBackColor = true;
            this.Button_Install.Click += new System.EventHandler(this.Button_Install_Click);
            // 
            // Button_Uninstall
            // 
            this.Button_Uninstall.Location = new System.Drawing.Point(360, 127);
            this.Button_Uninstall.Name = "Button_Uninstall";
            this.Button_Uninstall.Size = new System.Drawing.Size(75, 23);
            this.Button_Uninstall.TabIndex = 6;
            this.Button_Uninstall.Text = "Uninstall";
            this.Button_Uninstall.UseVisualStyleBackColor = true;
            // 
            // Button_Update
            // 
            this.Button_Update.Location = new System.Drawing.Point(441, 127);
            this.Button_Update.Name = "Button_Update";
            this.Button_Update.Size = new System.Drawing.Size(75, 23);
            this.Button_Update.TabIndex = 7;
            this.Button_Update.Text = "Update";
            this.Button_Update.UseVisualStyleBackColor = true;
            // 
            // Label_Port_Available
            // 
            this.Label_Port_Available.AutoSize = true;
            this.Label_Port_Available.Location = new System.Drawing.Point(12, 33);
            this.Label_Port_Available.Name = "Label_Port_Available";
            this.Label_Port_Available.Size = new System.Drawing.Size(102, 13);
            this.Label_Port_Available.TabIndex = 8;
            this.Label_Port_Available.Text = "TCP Port Available: ";
            // 
            // Poe
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(536, 169);
            this.Controls.Add(this.Label_Port_Available);
            this.Controls.Add(this.Button_Update);
            this.Controls.Add(this.Button_Uninstall);
            this.Controls.Add(this.Button_Install);
            this.Controls.Add(this.Instal_Location_Message);
            this.Controls.Add(this.Button_Select_Folder);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.Input_Text_Install_Location);
            this.Controls.Add(this.Status_Node_Env);
            this.Name = "Poe";
            this.Text = "Poe Sniper Tool Instalation";
            this.Load += new System.EventHandler(this.Poe_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label Status_Node_Env;
        private System.Windows.Forms.TextBox Input_Text_Install_Location;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button Button_Select_Folder;
        private System.Windows.Forms.Label Instal_Location_Message;
        private System.Windows.Forms.Button Button_Install;
        private System.Windows.Forms.Button Button_Uninstall;
        private System.Windows.Forms.Button Button_Update;
        private System.Windows.Forms.Label Label_Port_Available;
    }
}