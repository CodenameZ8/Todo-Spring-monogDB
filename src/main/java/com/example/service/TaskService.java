package com.example.service;
import java.lang.reflect.Method;
//import java.net.URI;
//import java.net.http.HttpRequest;
//import java.net.http.HttpRequest.Builder;
import java.util.HashMap;
import java.util.Map;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
//import com.mongodb.client.model.Filters;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.MongoClient;
import static com.mongodb.client.model.Filters.*;
import  com.example.model.TaskObj;
import com.example.restservice.TaskController;
import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.core.env.*;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;


public class TaskService {
//@Autowired
    //private static Environment env;
    public static Map<String, Object> createTask(TaskObj data){
        //@Value("${spring.data.mongodb.uri}")
       // private String mongoDbUri;
        //String mongoDbUri=env.getProperty("spring.data.mongodb.uri");
        //@Autowired
        //ConfigProperties configProp;

        MongoClient mongoClient = (MongoClient) MongoClients.create("mongodb://localhost:27017");
        MongoDatabase database = mongoClient.getDatabase("todo");
        Map<String, Object> returnMap = new HashMap<>();
        

        // try{
        //     database.createCollection("task",
        //   new CreateCollectionOptions().capped(true).sizeInBytes(0x100000));
        // }catch(com.mongodb.MongoCommandException e){
        //     System.err.println("collection creation error: "+e.getMessage());
        // }

           MongoCollection<Document> collection = database.getCollection("task");
           /*Document document = new Document("name", "Saravana Bhavan")
           .append("phone", "044-23631198");
             collection.insertOne(document);*/
             ObjectMapper mapper = new ObjectMapper();
             Map<String, Object> convertedTask = mapper.convertValue(data, HashMap.class);
             Document doc = new Document(convertedTask);
             InsertOneResult result = collection.insertOne(doc);
             String Task_id =result.getInsertedId().asObjectId().getValue().toString();
             //HttpRequest request = HttpRequest.newBuilder().GET().header("asdad", "asdas").uri(new URI("/api/get")).build();
             //System.out.println(collection.find(eq("task", "1")));

            /*Consumer<Document> printConsumer = new Consumer<Document>() {
                @Override
                public void accept(final Document document) {
                    System.out.println(document.toJson());
                }
         };*/

            // MongoCursor<Document> itr = collection.find(eq("name", "Saravana Bhavan")).iterator();
            
            // Document tempDoc;
            // while(itr.hasNext()){
            //     tempDoc = itr.next();
            //     System.out.println("Phone: "+tempDoc.get("phone"));
            // }
            

          mongoClient.close();

          returnMap.put("id", Task_id);
 
        return returnMap;

    }
    public static String deleteTask(String id){
      MongoClient mongoClient = (MongoClient) MongoClients.create("mongodb+srv://mflix:mflixpass@mflix.dp33h.mongodb.net/test?authSource=admin&replicaSet=atlas-cmu0fn-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true");
      MongoDatabase database = mongoClient.getDatabase("todo");
      MongoCollection<Document> collection = database.getCollection("task");
      collection.deleteOne(eq("_id",new ObjectId(id)));
      return "success";
    }

    
}

