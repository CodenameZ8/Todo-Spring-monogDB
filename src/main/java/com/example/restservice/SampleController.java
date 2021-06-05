package com.example.restservice;


import java.io.IOException;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SampleController {

    @GetMapping("/")
	String home() {
		return "todo.html";
	}
    
    @GetMapping("/home")
    public void getHomePage(HttpServletRequest request, HttpServletResponse response){

        try{
        response.sendRedirect("/");
        }catch(IOException e){
            e.printStackTrace();
        }
    }
    @PostMapping("/sample")
	public @ResponseBody Map<String,String> sample(@RequestBody HashMap<String, Integer> body) {
        int x=body.get("one")+body.get("two");
        Map<String,String> map=new HashMap<String,String>();
        map.put("1",String.valueOf(x));
		return map;
	}
    
   
}


