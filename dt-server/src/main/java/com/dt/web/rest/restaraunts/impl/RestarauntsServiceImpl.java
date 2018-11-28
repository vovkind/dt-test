package com.dt.web.rest.restaraunts.impl;

import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.dt.data.Restaraunt;
import com.dt.web.repository.RestarauntsRepository;
import com.dt.web.rest.restaraunts.geocoding.GeoCoder;
import com.dt.web.rest.restaraunts.types.RestarauntRequestEntity;

/**
 * Handles requests captured by controller RestarauntsService
 * 
 * @author VLADIMIB
 *
 */
@Component
@Scope(value = "singleton")
public class RestarauntsServiceImpl
{
    /** The log. */
    private static final Logger log = LoggerFactory.getLogger(RestarauntsServiceImpl.class);
    
    /** the restRepository */
    @Autowired
    private RestarauntsRepository restRepository;
    
    /***
     * Loads new restaurants
     * 
     * @param newRestarauntsListReq
     * @return list of inserted restaurants
     */
	public List<RestarauntRequestEntity> loadNewRestaraunts(@Valid List<RestarauntRequestEntity> newRestarauntsListReq){
		
		RestarauntRequestEntity restReq = null;
        String formattedAddress = null;
        List<RestarauntRequestEntity> duplicateRestarauntsList = new ArrayList<RestarauntRequestEntity>();
        Restaraunt objectToInsert = new Restaraunt();
        
        for(int i=0; i< newRestarauntsListReq.size(); i++) {
        	restReq = newRestarauntsListReq.get(i);

        	try {
				formattedAddress = GeoCoder.getAddressFromGoogle(restReq.getAddressLng(), restReq.getAddressLat());
			} catch (Exception e) {
				log.error("Unable to reverse geocode. Longitude:"+restReq.getAddressLng()+", Latitude:"+restReq.getAddressLat());
				formattedAddress = "";
			}
        	
        	try {        		
        		objectToInsert.setName(restReq.getName());
        		objectToInsert.setType(restReq.getType());
        		objectToInsert.setPhone(restReq.getPhone());
        		objectToInsert.setAddressLng(restReq.getAddressLng());
        		objectToInsert.setAddressLat(restReq.getAddressLat());
        		objectToInsert.setAddr(formattedAddress);
        		
                log.info("Insertion of restaraunt:"+objectToInsert.getName());
                restRepository.insert(objectToInsert);
        	}catch(Exception exc) {
        		duplicateRestarauntsList.add(restReq);
        		log.error("Error during insertion of "+objectToInsert.getName(), exc);
        	}
        }
        
        return duplicateRestarauntsList;
	}

	/**
	 * Retrieves all restaurants
	 * 
	 * @return list of existing restaurants
	 */
	public List<Restaraunt> retrieveAllRestaraunts() {
        log.info("Querying for all restaraunts");
		return restRepository.findAll();
	}

	/**
	 * Create necessary tables on spring load
	 * 
	 */
	public void createTables() {
        log.info("Create necessary table(s)");
		restRepository.createTables();
	}

	/**
	 * Deletes restaurant from DB
	 * 
	 * @param id the id of restaurant
	 * @return the deleted restaurant
	 */
	public int deleteRestaraunt(@Valid int id) {
        log.info("Deleting restaraunt");
        return restRepository.delete(id);
	}

	/**
	 * Updates restaurant
	 * 
	 * @param id the id of restaurant
	 * @return the updated restaurant
	 */
	public int updateRestaraunt(@Valid RestarauntRequestEntity restReq) {
        log.info("Updating restaraunt:"+restReq.getName());
        return restRepository.update(restReq.getId(), restReq.getName(), restReq.getPhone());
	}

	/**
	 * Delete all restaurants
	 * 
	 */
	public void deleteAllRestaraunts() {
        log.info("Deleting all restaraunts");
        restRepository.deleteAll();
	} 
}