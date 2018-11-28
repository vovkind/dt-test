package com.dt.web;

import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.dt.web.ApplicationStarter;
import com.dt.web.rest.restaraunts.impl.RestarauntsServiceImpl;
import com.dt.web.rest.restaraunts.types.RestarauntRequestEntity;

/**
 * ApplicationTest.java
 * 
 * The class for JUNiT testing
 * 
 * @author VLADIMIB
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes=ApplicationStarter.class)
public class ApplicationTest {
	    
	@Autowired
    private RestarauntsServiceImpl restServiceImpl;
    
    /**
     * Test that we are able to insert regular list of restaraunts and no duplicate redocrds returned.
     * 
     */
    @Test
    public void testLoadingNewRestaraunts() {
    	System.out.println("Testing add restaraunts");
    	List<RestarauntRequestEntity> reqEntityList = new ArrayList<RestarauntRequestEntity>();
    	RestarauntRequestEntity reqEntityToLoad = new RestarauntRequestEntity();
    	RestarauntRequestEntity reqEntityToLoad2 = new RestarauntRequestEntity();
    	
    	reqEntityToLoad.setName("Restaraunt 5");
    	reqEntityToLoad.setType("Asian");
    	reqEntityToLoad.setPhone("342344");
    	reqEntityToLoad.setAddressLng(34.345435);
    	reqEntityToLoad.setAddressLat(32.234234);
    	
    	reqEntityToLoad2.setName("Restaraunt 6");
    	reqEntityToLoad2.setType("Asian");
    	reqEntityToLoad2.setPhone("342344");
    	reqEntityToLoad2.setAddressLng(34.345435);
    	reqEntityToLoad2.setAddressLat(32.234234);
    	
    	reqEntityList.add(reqEntityToLoad);
    	reqEntityList.add(reqEntityToLoad2);
    	
    	List<RestarauntRequestEntity> duplicateRestaraunts = restServiceImpl.loadNewRestaraunts(reqEntityList);
    	
    	assertTrue("This will succeed.", duplicateRestaraunts.size() == 0);
    }
    
    /**
     * Test that we receive list of duplicate restaurants, if we inserted such these.
     * 
     */
    @Test
    public void testLoadingDupolicateRestaraunts() {
    	System.out.println("Testing load duplicate restaraunts");
    	List<RestarauntRequestEntity> reqEntityList = new ArrayList<RestarauntRequestEntity>();
    	RestarauntRequestEntity reqEntityToLoad = new RestarauntRequestEntity();
    	
    	reqEntityToLoad.setName("Restaraunt 5");
    	reqEntityToLoad.setType("Asian");
    	reqEntityToLoad.setPhone("342344");
    	reqEntityToLoad.setAddressLng(34.345435);
    	reqEntityToLoad.setAddressLat(32.234234);
    	
    	reqEntityList.add(reqEntityToLoad);
    	
    	List<RestarauntRequestEntity> duplicateRestaraunts = restServiceImpl.loadNewRestaraunts(reqEntityList);
    	assertTrue("This will succeed.", duplicateRestaraunts.size() > 0);
    }
}