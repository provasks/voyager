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
        static string dirError = "AppErrors";
        public static void LogException(string className, System.Reflection.MethodBase methodBase, Exception ex)
        {
            string path = AppDomain.CurrentDomain.BaseDirectory;
            DateTime now = DateTime.Now;
            File.WriteAllText(
                String.Format("{0}/{1}/{2}-{3}.txt", path, dirError, className, now.ToString("ddMMyyyy")),
                String.Format("\nAt {0}\nIn the Method: {1}\nError Message: {2}\nStackTrace: {3}.txt",
                now.ToString("hh:mm:ss"), methodBase.ToString(), ex.Message, ex.StackTrace));
        }

        public static void LogException(Exception ex)
        {
            string path = AppDomain.CurrentDomain.BaseDirectory;
            DateTime now = DateTime.Now;
            File.WriteAllText(
                String.Format("{0}/{1}/{2}-{3}.txt", path, dirError, "Unknown", now.ToString("ddMMyyyy")),
                String.Format("\nAt {0}\nError Message: {1}\nStackTrace: {2}.txt",
                now.ToString("hh:mm:ss"),  ex.Message, ex.StackTrace));
        }
        public static void LogMessage(string className, System.Reflection.MethodBase methodBase, string message)
        {
            string appPath = Path.GetDirectoryName("AppErrors");
            File.WriteAllText(String.Format("{0}/{1}.txt", appPath, className), message);
        }
    }
}
