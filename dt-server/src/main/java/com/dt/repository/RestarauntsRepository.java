package com.dt.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.dt.data.Restaraunt;

/**
 * Repository for Restaurants DB table
 * 
 * @author VLADIMIB
 *
 */
@Repository
public class RestarauntsRepository {
	
	/** the jdbcTemplate */
	@Autowired
    JdbcTemplate jdbcTemplate;
	
	/**
	 * Delete restaurant
	 * 
	 * @param id the id
	 * @return number of affected rows
	 */
	public int delete(int id) {
	    return jdbcTemplate.update("delete from restaraunts where id=?", id);
	}
	
	/**
	 * Updates restaurant
	 * 
	 * @param id the id
	 * @param name the name
	 * @param phone the phone
	 * @return number of affected rows
	 */
	public int update(int id, String name, String phone) {
	    return jdbcTemplate.update("update restaraunts " + " set name = ?, phone = ? " + " where id = ?",
	        new Object[] {
	            name, phone, id
	        });
	}
	
	/***
	 * Insert new restaurant
	 * 
	 * @param restData the data to insert
	 */
	public void insert(Restaraunt restData) {
        jdbcTemplate.update("INSERT INTO restaraunts(name, type, phone, addressLng, addressLat, addr) VALUES (?,?,?,?,?,?)", 
        		
        		new Object[] {
        				restData.getName(), 
        				restData.getType(), 
        				restData.getPhone(), 
        				restData.getAddressLng(), 
        				restData.getAddressLat(), 
        				restData.getAddr()
        		}
        		);		
	}
	
	/***
	 * Retrieve all restaurants
	 * 
	 * @return the list of existing restaurants
	 */
	public List <Restaraunt> findAll() {
	    return jdbcTemplate.query("select * from restaraunts", new RestarauntsRowMapper());
	}
	
	/**
	 * Create main table on spring start
	 * 
	 */
	public void createTables() {
        jdbcTemplate.execute("DROP TABLE restaraunts IF EXISTS");
        jdbcTemplate.execute("CREATE TABLE restaraunts(id INT AUTO_INCREMENT, name VARCHAR(50) PRIMARY KEY NOT NULL, type VARCHAR(30) NOT NULL, phone VARCHAR(25) NOT NULL, addressLng DOUBLE, addressLat DOUBLE, addr VARCHAR(255))");
		//Issue with Double's precision in SpringBoot H2
	}
	
	/**
	 * RestarauntsRowMapper - maps rows on fetch records
	 * 
	 * @author VLADIMIB
	 *
	 */
	class RestarauntsRowMapper implements RowMapper < Restaraunt > {
	    @Override
	    public Restaraunt mapRow(ResultSet rs, int rowNum) throws SQLException {
	        
	        Restaraunt restaraunt = new Restaraunt();
	        
	        restaraunt.setId(rs.getInt("id"));
	        restaraunt.setName(rs.getString("name"));
	        restaraunt.setType(rs.getString("type"));
	        restaraunt.setPhone(rs.getString("phone"));
	        restaraunt.setAddressLng(rs.getLong("addressLng"));
	        restaraunt.setAddressLat(rs.getLong("addressLat"));
	        restaraunt.setAddr(rs.getString("addr"));
	        
	        return restaraunt;
	    }
	}

	/**
	 * Delete all records from table Restaurants
	 * 
	 */
	public void deleteAll() {
	    jdbcTemplate.update("delete from restaraunts");
	}
}
