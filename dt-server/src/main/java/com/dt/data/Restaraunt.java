package com.dt.data;

import lombok.Data;

/**
 * Restaurants entity: describes DB object
 * 
 * @author VLADIMIB
 *
 */
@Data
public class Restaraunt {
	
	/** the id */
    private int id;
    
    /** the name */
    private String name;
    
    /** the type */
	private String type;
    
	/** the phone */
    private String phone;
    
    /** the addressLng */
    private double addressLng;
    
    /** the addressLat */
    private double addressLat;
    
    /** the formatted address */
    private String addr;
}
