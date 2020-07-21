package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
public class BrokerController {

    @PostMapping ("/startBroker")
    public void mapping(@RequestBody HashMap<String, Object> payload){
        
    }


}
