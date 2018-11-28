package com.dt.web;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import com.dt.web.rest.restaraunts.impl.RestarauntsServiceImpl;


@SpringBootApplication
public class ApplicationStarter extends SpringBootServletInitializer implements CommandLineRunner
{    
    /** the communServImpl */
    @Autowired
	private RestarauntsServiceImpl restServImpl;

	/**
     * Configure plate recognizer.
     */
    @PostConstruct
    public void configurePlateRecognizer()
    {

    }

    /* (non-Javadoc)
     * @see org.springframework.boot.web.support.SpringBootServletInitializer#configure(org.springframework.boot.builder.SpringApplicationBuilder)
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application)
    {
        return application.sources(ApplicationStarter.class);
    }

    /**
     * The main method.
     *
     * @param args the arguments 
     * @throws Exception the exception
     */
    public static void main(String[] args) throws Exception
    {
        SpringApplication.run(ApplicationStarter.class, args);
    }
    
    /**
     * The run method
     * 
     */
    @Override
    public void run(String... strings) throws Exception {

    	restServImpl.createTables();
    }
    
}
