package com.dt.web.rest.restaraunts.geocoding;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;

/**
 * Simple geocoder class
 * 
 * @author VLADIMIB
 *
 */
public class GeoCoder
{
    /** The context. */
    private static GeoApiContext context =
            new GeoApiContext.Builder().apiKey("AIzaSyBunRZ56ilC1xZIVz1NwUN0ifwtLFd4Nb0").build();
    
    /**
     * Retrieve formatted address
     * 
     * @param lang the longitude coordinate
     * @param lat the latitude coordinate
     * @return formatted address
     * @throws Exception
     */
    public static String getAddressFromGoogle(double lang, double lat) throws Exception
    {
        GeocodingResult[] results = GeocodingApi.reverseGeocode(context, new LatLng(lang, lat)).await();
        
        return results[0].formattedAddress;
    }
}
