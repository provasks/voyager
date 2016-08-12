//using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Net;
using System.Net.Cache;
using System.Text;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Xml;
using Voyager.Common;


/// <summary>
/// Summary description for SearchService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class SearchService : System.Web.Services.WebService
{
    Utility utils = new Utility();

    public SearchService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession=true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string SearchFlight(string flyFrom, string flyTo, string departureDate, string returnDate, int adult, int child, bool oneway)
    {
        //string formattedDate = Utitlity.getFormattedDate(departureDate, "yyyy-MM-dd");
        
        HttpWebRequest request = CreateWebRequest();
        XmlDocument soapEnvelopeXml = GetFlightSearchRequestXML(flyFrom, flyTo, departureDate, returnDate, adult, child, oneway);

        using (Stream stream = request.GetRequestStream())
        {
            soapEnvelopeXml.Save(stream);
        }

        using (WebResponse response = request.GetResponse())
        {
            using (StreamReader rd = new StreamReader(response.GetResponseStream()))
            {
                string soapResult = rd.ReadToEnd();
                return JSon.XmlToJSON(soapResult
                    .Replace("soap:Envelope", "soapEnvelope")
                    .Replace("soap:Body", "soapBody"));
            }
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetSeatMap()
    {
        HttpWebRequest request = CreateWebRequest();
        XmlDocument soapEnvelopeXml = GetSeatMapXML();

        using (Stream stream = request.GetRequestStream())
        {
            soapEnvelopeXml.Save(stream);
        }

        using (WebResponse response = request.GetResponse())
        {
            using (StreamReader rd = new StreamReader(response.GetResponseStream()))
            {
                string soapResult = rd.ReadToEnd();
                return JSon.XmlToJSON(soapResult
                    .Replace("soap:Envelope", "soapEnvelope")
                    .Replace("soap:Body", "soapBody"));
            }
        }
    }

    private XmlDocument GetSeatMapXML()
    {
        XmlDocument soapEnvelopeXml = new XmlDocument();
        
        soapEnvelopeXml.LoadXml(@"<?xml version=""1.0"" encoding=""utf-8""?>
                <soap:Envelope 
                xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" 
                xmlns:xsd=""http://www.w3.org/2001/XMLSchema"" 
                xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"">
                  <soap:Body>
                    <wmLowFarePlus xmlns=""http://traveltalk.com/wsLowFarePlus"">
                        <OTA_AirSeatMapRQ>
                            <POS>
                                <Source PseudoCityCode=""JNBZA21ZZ"">
                                    <RequestorID Type=""21"" ID=""VoyagerTravels"" />
                                </Source>
                                <TPA_Extensions>
                                    <Provider>
                                        <Name>Amadeus</Name>
                                        <System>Test</System>
                                        <Userid>VoyagerTravels</Userid>
                                        <Password>ftH54^*gh</Password>
                                    </Provider>
                                </TPA_Extensions>
                            </POS>
                            <SeatMapRequests>
                                <SeatMapRequest>
                                    <FlightSegmentInfo DepartureDateTime=""2016-06-25"" FlightNumber=""2221"">
                                        <DepartureAirport LocationCode=""ATL""/>
                                        <ArrivalAirport LocationCode=""MIA""/>
                                        <MarketingAirline Code=""AA""/>
                                    </FlightSegmentInfo>
                                    <SeatDetails>
                                        <CabinClass CabinType=""Economy""/>
                                        <ResBookDesignations>
                                            <ResBookDesignation ResBookDesigCode=""Y""/>
                                        </ResBookDesignations>
                                    </SeatDetails>
                                </SeatMapRequest>
                            </SeatMapRequests>
                        </OTA_AirSeatMapRQ>
                    </wmLowFarePlus>
                </soap:Body>
            </soap:Envelope>");
        return soapEnvelopeXml;
    }

    /// <summary>
    /// This method is responsible to create a complete API Request
    /// </summary>
    /// <param name="flyFrom">Airport Fly From</param>
    /// <param name="flyTo">Airport fly to</param>
    /// <param name="departureDate">Date of Departure</param>
    /// <param name="returnDate">Date of Return</param>
    /// <param name="adult">Number of Adult</param>
    /// <param name="child">Number of Child</param>
    /// <param name="oneway">Boolean for Oneway or Return</param>
    /// <returns></returns>
    private static XmlDocument GetFlightSearchRequestXML(string flyFrom, string flyTo, 
        string departureDate, string returnDate, int adult, int child, bool oneway)
    {
        XmlDocument soapEnvelopeXml = new XmlDocument();
        StringBuilder xmlBuilder = new StringBuilder();
        xmlBuilder.Append(RequestBuilder.GetStaticHeaderInfo());
        xmlBuilder.Append(RequestBuilder.GetPOSinfo());
        xmlBuilder.Append(RequestBuilder.GetOneWayInfo(departureDate, flyFrom, flyTo));
        xmlBuilder.Append(oneway ? "" : RequestBuilder.GetReturnInfo(returnDate, flyFrom, flyTo));
        xmlBuilder.Append(RequestBuilder.GetTravellerInfo(adult, child));
        xmlBuilder.Append(RequestBuilder.GetStaticFooterInfo());

        soapEnvelopeXml.LoadXml(xmlBuilder.ToString());
        return soapEnvelopeXml;
    }


    /// <summary>
    /// Create a soap webrequest to [Url]
    /// </summary>
    /// <returns></returns>
    private HttpWebRequest CreateWebRequest()
    {
        HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(@"http://amadeusws.tripxml.com/TripXML/wsLowFarePlus.asmx?op=wmLowFarePlus");
        webRequest.Headers.Add(@"SOAP:Action");
        webRequest.ContentType = "text/xml;charset=\"utf-8\"";
        webRequest.Accept = "text/xml";
        webRequest.Method = "POST";
        return webRequest;
    }

    [WebMethod(EnableSession=true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetAirports(string url, string keyword)
    {

        string api_key = utils.GetConfigValue("iata-api-key");
        url = url + "api_key="+ api_key + "&query=" + keyword;
        return DoWebRequest(url,"GET");
    }

    public string DoWebRequest(string address, string method)
    {
        return DoWebRequest(address, method, string.Empty);
    }

    #region DoWebRequest
    public string DoWebRequest(string address, string method, string body)
    {
        var request = (HttpWebRequest)WebRequest.Create(address);
        request.Method = method;

        if (method == "POST")
        {
            if (!string.IsNullOrEmpty(body))
            {
                var requestBody = Encoding.UTF8.GetBytes(body);
                request.ContentLength = requestBody.Length;
                request.ContentType = "application/json";
                using (var requestStream = request.GetRequestStream())
                {
                    requestStream.Write(requestBody, 0, requestBody.Length);
                }
            }
            else
            {
                request.ContentLength = 0;
            }
        }

        request.Timeout = 15000;
        request.CachePolicy = new RequestCachePolicy(RequestCacheLevel.BypassCache);

        string output = string.Empty;
        try
        {
            using (var response = request.GetResponse())
            {
                using (var stream = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding(1252)))
                {
                    output = stream.ReadToEnd();
                }
            }
        }
        catch (WebException ex)
        {
            if (ex.Status == WebExceptionStatus.ProtocolError)
            {
                using (var stream = new StreamReader(ex.Response.GetResponseStream()))
                {
                    output = stream.ReadToEnd();
                }
            }
            else if (ex.Status == WebExceptionStatus.Timeout)
            {
                output = "Request timeout is expired.";
            }
        }

        return output;
    }
    #endregion
}