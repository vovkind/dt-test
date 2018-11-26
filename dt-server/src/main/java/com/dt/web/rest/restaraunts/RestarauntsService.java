package com.dt.web.rest.restaraunts;

import java.util.List;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dt.data.Restaraunt;
import com.dt.web.rest.restaraunts.impl.RestarauntsServiceImpl;
import com.dt.web.rest.restaraunts.types.RestarauntRequestEntity;

@RestController
public class RestarauntsService
{
    
    /** the restServImpl */
    @Autowired
	private RestarauntsServiceImpl restServImpl;
    
    /**
     * Retrieve all restaurants
     * 
     * @return all restaurants
     */
    @GetMapping("/retrieve-restaraunts")
    @ResponseBody
    public Object[] retrieveRestaraunts()
    {                    	
    	List<Restaraunt> restarauntsList = restServImpl.retrieveAllRestaraunts();
    	
    	return restarauntsList.size() > 0 ? new Object[] {restarauntsList} : null;
    }

    /**
     * Load restaurants to DB
     * 
     * @param restarauntsListReq
     * @return inserted restaurants, duplicated restaurants
     */
    @PostMapping("/upload-restaraunts")
    @ResponseBody
    public Object[] uploadNewRestaraunts(@Valid @RequestBody(required = true) List<RestarauntRequestEntity> restarauntsListReq)
    {                
    	List<RestarauntRequestEntity> notInsertedRestaraunts = restServImpl.loadNewRestaraunts(restarauntsListReq);
    	
        return new Object[] {restServImpl.retrieveAllRestaraunts(), notInsertedRestaraunts};
    }
    
    /**
     * Update restaurant
     * 
     * @param restarauntsListReq
     * @return boolean whether the operation succeed or not
     */
    @PostMapping("/update-restaraunt")
    @ResponseBody
    public boolean updateRestaraunt(@Valid @RequestBody(required = true) RestarauntRequestEntity restarauntsListReq)
    {                
    	int result = restServImpl.updateRestaraunt(restarauntsListReq);
    	
    	return result == 1;
    }
    
    /**
     * Delete restaurant
     * 
     * @param id the restaurant id
     * @return boolean whether the operation succeed or not
     */
    @PostMapping("/delete-restaraunt")
    @ResponseBody
    public boolean deleteRestaraunt(@Valid @RequestBody(required = true) String id)
    {                
    	int result = restServImpl.deleteRestaraunt(Integer.valueOf(id));
    	
    	return result == 1;
    }
    
    /**
     * Delete all restaurants
     * 
     * @param restarauntsListReq
     * @return boolean whether the operation succeed or not
     */
    @PostMapping("/delete-restaraunts")
    @ResponseBody
    public void deleteallRestaraunts()
    {                
    	restServImpl.deleteAllRestaraunts();
    }
}