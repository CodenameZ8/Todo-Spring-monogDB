package com.example.restservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Map;

import com.example.service.TaskService;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class RestServiceApplicationTests {

	@Test
	void contextLoads() {
		String responseDel = TaskService.deleteTask("60ab4c00b532251dabe77d51");
		assertEquals("success", responseDel);

	}

}
