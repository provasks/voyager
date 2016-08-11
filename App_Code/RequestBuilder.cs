using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for RequestBuilder
/// </summary>
public class RequestBuilder
{
    public RequestBuilder()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    internal static System.Xml.XmlDocument GetSoapEnvelopeXML(DateTime departure, string originLocationCode, string destinationLocationCode)
    {
        throw new NotImplementedException();
    }

    internal static string GetPOSinfo()
    {
        return @"
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
                </POS>";
    }

    internal static string GetStaticHeaderInfo()
    {
        return @"<?xml version=""1.0"" encoding=""utf-8""?>
                <soap:Envelope 
                xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" 
                xmlns:xsd=""http://www.w3.org/2001/XMLSchema"" 
                xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"">
                  <soap:Body>
                    <wmLowFarePlus xmlns=""http://traveltalk.com/wsLowFarePlus"">
                        <OTA_AirLowFareSearchPlusRQ>";
    }

    internal static string GetOneWayInfo(string date, string flyFrom, string flyTo)
    {
        return @"
                <OriginDestinationInformation>
                    <DepartureDateTime>" + Utitlity.getFormattedDate(date, "yyyy-MM-dd") + @"T00:00:00</DepartureDateTime>
                    <OriginLocation LocationCode=""" + flyFrom + @""" />
                    <DestinationLocation LocationCode=""" + flyTo + @""" />
                </OriginDestinationInformation>";
    }
     internal static string GetReturnInfo(string date, string flyFrom, string flyTo)
    {
        return @"
                <OriginDestinationInformation>
                    <DepartureDateTime>" + Utitlity.getFormattedDate(date, "yyyy-MM-dd") + @"T00:00:00</DepartureDateTime>
                    <OriginLocation LocationCode=""" +flyTo  + @""" />
                    <DestinationLocation LocationCode=""" +  flyFrom + @""" />
                </OriginDestinationInformation>";
    }

     internal static string GetTravellerInfo(int adult, int child)
     {
         return @"
                <TravelerInfoSummary>
                    <SeatsRequested>" + (adult + child) + @"</SeatsRequested>
                    <AirTravelerAvail>
                        <PassengerTypeQuantity Code=""ADT"" Quantity=""" + adult + @""" />
                        <PassengerTypeQuantity Code=""CHD"" Quantity=""" + child + @""" />
                    </AirTravelerAvail>
                    <PriceRequestInformation PricingSource=""Both"" />
                </TravelerInfoSummary>";
     }

     internal static string GetStaticFooterInfo()
     {
         return @"
                        </OTA_AirLowFareSearchPlusRQ>
                    </wmLowFarePlus>
                </soap:Body>
            </soap:Envelope>";
     }

}