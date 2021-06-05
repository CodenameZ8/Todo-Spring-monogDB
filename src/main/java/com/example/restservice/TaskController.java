package com.example.restservice;
//import java.util.ArrayList;
import java.util.Map;

import com.example.service.TaskService;
import  com.example.model.TaskObj;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
public class TaskController extends TaskService {

    // @GetMapping("/task")
	// public static String Test() {
    //     Map<String, Object> data=new HashMap<String, Object>() ;
    //     data.put("test",123);
    //     createTask(data);
    //     return "Test ran";
	// }
    @PostMapping("/task")
	public @ResponseBody Map<String, Object> Task(@RequestBody TaskObj body) {
        //System.out.println("body");
		return createTask(body);
	}

    @DeleteMapping("/task/{taskId}")
	public @ResponseBody String Task(@PathVariable("taskId") String taskId) {
        //System.out.println("body");
		return deleteTask(taskId);
	}
}
