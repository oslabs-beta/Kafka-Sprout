package com.kafkasprout.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

	//Global Route
	@RequestMapping("/")
	public String index() {
		return "index";
  }

}