package com.hd.student.controller.admin;

import com.hd.student.payload.request.ScheduleInfoRequest;
import com.hd.student.payload.request.StudyRoomRequest;
import com.hd.student.payload.response.ApiResponse;
import com.hd.student.service.ScheduleInfoService;
import com.hd.student.service.StudyRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/room")
public class AdminScheduleController {
    @Autowired
    private StudyRoomService studyRoomService;

    @Autowired
    private ScheduleInfoService scheduleInfoService;

    @PostMapping("/add")
    public ResponseEntity<?> addNewStudyRoom(@RequestBody StudyRoomRequest rq){
        return new ResponseEntity<>(this.studyRoomService.addStudyRoom(rq), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateStudyRoom(@RequestBody StudyRoomRequest rq, @PathVariable int id){
        return new ResponseEntity<>(this.studyRoomService.updateStudyRoom(rq, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteStudyRoom(@PathVariable Integer id) {
        ApiResponse rp = studyRoomService.deleteStudyRoom(id);
        return new ResponseEntity<>(rp, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllRoom(){
        return new ResponseEntity<>(this.studyRoomService.getAllRoom(), HttpStatus.OK);
    }

    @GetMapping("/getAvailableRoom")
    public ResponseEntity<?> getAvailableRoom(){
        return new ResponseEntity<>(this.studyRoomService.getAllRoomAvailable(), HttpStatus.OK);
    }

    @GetMapping("/schedule-info/getall")
    public ResponseEntity<?> getAllScheduleInfo(){
        return ResponseEntity.ok(this.scheduleInfoService.getAll());
    }

    @PostMapping("/schedule-info/add")
    public ResponseEntity<?> addNewScheduleInfo(@RequestBody ScheduleInfoRequest rq){
        return ResponseEntity.ok(this.scheduleInfoService.addScheduleInfo(rq));
    }

    @PutMapping("/schedule-info/update/{id}")
    public ResponseEntity<?> updateScheduleInfo(@RequestBody ScheduleInfoRequest rq, @PathVariable int id){
        return ResponseEntity.ok(this.scheduleInfoService.updateScheduleInfo(rq, id));
    }

    @DeleteMapping("/schedule-info/delete/{id}")
    public ResponseEntity<?> deleteScheduleInfo(@PathVariable int id){
        return ResponseEntity.ok(this.scheduleInfoService.deleteSchedule(id));
    }

}
