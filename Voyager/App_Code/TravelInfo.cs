using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for TravelInfo
/// </summary>
public class TravelInfo
{
    //flyFrom: "ATL", flyTo: "MIA", departureDate: '07/22/2016', returnDate: '', adult: '02', child: '01'

    public string flyFrom { get; set; }
    public string flyTo { get; set; }
    public string departureDate { get; set; }
    public string returnDate { get; set; }
    public string adult { get; set; }
    public string child { get; set; }
}