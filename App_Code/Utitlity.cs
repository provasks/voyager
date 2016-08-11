using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

/// <summary>
/// Developed by Provas Kumar Saha
/// on 02-06-2016
/// 
/// The objective of this file is to create a utility class
/// which should help to the main class for diffrent utility function.
/// </summary>
public class Utitlity
{
	public Utitlity()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    /// <summary>
    /// This method is responsible to return the formatted date 
    /// </summary>
    /// <param name="date"></param>
    /// <param name="format"></param>
    /// <returns></returns>
    internal static string getFormattedDate(string date, string format)
    {
        DateTime dt = DateTime.ParseExact(date.Substring(0, 24),
                  "ddd MMM dd yyyy HH:mm:ss", CultureInfo.InvariantCulture);
        return dt.ToString(format);
    }
}