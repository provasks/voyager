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
                return ConfigurationManager.AppSettings[key].ToString();
            }
            catch (Exception ex)
            {
                Exception exception = new Exception(string.Format("The key {0} not found in the web.config",key));
                Logger.LogException(this.GetType().Name, System.Reflection.MethodBase.GetCurrentMethod(), exception);
                return null;
            }
        }
    }
}
