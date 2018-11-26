/*
 * (c) 2002-2005 SBC Knowledge Ventures, L.P. All rights reserved.
 */

package com.dt.web.rest.restaraunts.types;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import lombok.Data;

/**
 * RestarauntRequestEntity.java
 * 
 * Instantiates RestarauntRequestEntity
 * 
 * @author VLADIMIB
 *
 */
@Data
public class RestarauntRequestEntity
{

    /** The id, can be empty upon load */
    @Valid
    private int  id;
    
    /** The name. */
    @Valid
    @NotNull
    private String  name;
    
    /** The type. */
    @Valid
    @NotNull
    private String  type;
    
    /** The phone. */
    @Valid
    @NotNull
    private String  phone;
    
    /** The addressLng. */
    @Valid
    @NotNull
    private double  addressLng;
    
    /** The addressLat. */
    @Valid
    @NotNull
    private double  addressLat;
}
