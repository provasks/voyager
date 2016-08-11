using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Voyager.Common
{
    public class Utility
    {
        public string GetConfigValue(string key)
        {
            try
            {
                return ConfigurationManager.AppSettings["key"].ToString();
            }
            catch (Exception ex)
            {
                Logger.LogException(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod(), ex);
               // Logger.LogMessage(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod(), "HEllo");
                return null;
            }
        }
    }
}
