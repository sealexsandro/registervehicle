package com.wipro.registervehicle.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin("*")
public class ViewsController {

	@RequestMapping({"/", "/login"})
	public String index() {
		return "index";
	}

	@RequestMapping("/adminHome")
	public String homeAdmin() {
		return "adminHome";
	}

	@RequestMapping("/myRequests")
	public String customerRequest() {
		return "customerRequests";
	}

	@RequestMapping("/reqValidate")
	public String approvalPage() {
		return "validateRequest";
	}

	@RequestMapping("/newRegistration")
	public String registrationForm() {
		return "registrationForm";
	}
}
