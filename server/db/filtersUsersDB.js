import { UserModel } from "./usersDB.js";
import mongoose from "mongoose";

export async function getAllUsersDB() {
    return new Promise((resolve, reject) => {
        UserModel.find((err, data) =>{
            if (err){
              resolve("error");
            } else {
              resolve(data); 
            }
          })
    })
}

export async function registerUserDB(name, email, password) {

    return new Promise(async (resolve, reject) => {
        const usersData = await getAllUsersDB();
        console.log(usersData);
        if (usersData.find(element => element.email === email)){
            resolve("406");
            return;
        }
        /*usersData.forEach(element => {
            if(element.email === email){
                resolve("406");
                return;
            }
        });*/
        var userModel = new UserModel();
        userModel.name = name;
        userModel.email = email;
        userModel.password = password;
        userModel.isSelected = false;
        userModel.isAdmin = false;
      
        userModel.save((err) => {
          if (err) {
            resolve("500");
          }
          else {
            console.log("Successfully added user to DB");
            resolve("200");
          }
        });
    })
}