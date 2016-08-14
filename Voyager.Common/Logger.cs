using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Voyager.Common
{
    public class Logger
    {

        #region Log Exception
        public static void LogException(string className, System.Reflection.MethodBase methodBase, Exception ex)
        {
            string dirError = "AppErrors";
            string path = AppDomain.CurrentDomain.BaseDirectory;
            DateTime now = DateTime.Now;

            File.WriteAllText(
                String.Format("{0}/{1}/{2}-{3}.txt", 
                    path, dirError, className, now.ToString("ddMMyyyy")),
                String.Format("\nAt {0}\nIn the Method: {1}\nError Message: {2}\nStackTrace: {3}",
                    now.ToString("hh:mm:ss"), methodBase.ToString(), ex.Message, ex.StackTrace));
        }

        public static void LogException(Exception ex)
        {
            string dirError = "AppErrors";
            string path = AppDomain.CurrentDomain.BaseDirectory;
            DateTime now = DateTime.Now;

            File.WriteAllText(
                String.Format("{0}/{1}/{2}-{3}.txt", 
                    path, dirError, "Unknown", now.ToString("ddMMyyyy")),
                String.Format("\nAt {0}\nError Message: {1}\nStackTrace: {2}",
                    now.ToString("hh:mm:ss"),  ex.Message, ex.StackTrace));
        }
        #endregion

        #region Log message
        public static void LogMessage(string className, System.Reflection.MethodBase methodBase, string message)
        {
            string dirError = "AppErrors";
            string path = AppDomain.CurrentDomain.BaseDirectory;
            DateTime now = DateTime.Now;

            File.WriteAllText(
                String.Format("{0}/{1}/{2}-{3}.txt", 
                    path, dirError, "Info", now.ToString("ddMMyyyy")),
                String.Format("\nAt {0}\nIn the method {1} \nMessage: {2}",
                    now.ToString("hh:mm:ss"), methodBase.ToString(), message));
        }

        public static void LogMessage(string info)
        {
            string dirError = "AppErrors";
            string path = AppDomain.CurrentDomain.BaseDirectory;
            DateTime now = DateTime.Now;

            File.WriteAllText(
                String.Format("{0}/{1}/{2}-{3}.txt",
                    path, dirError, "Info", now.ToString("ddMMyyyy")),
                String.Format("\nAt {0} info: {2}",
                    now.ToString("hh:mm:ss"), info));
        }
        #endregion
    }
}
