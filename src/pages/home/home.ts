import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: any;
  private db: any;
  model: any = {};
  isEditing: boolean = false;

  constructor(public navCtrl: NavController) {
    this.db = firebase.firestore();
    this.loadData();
  }

  loadData(){
    this.getAllDocuments("members").then((e)=>{
      this.users = e;
  });
  }

addUser(){
    if(!this.isEditing){
    this.addDocument("members", this.model).then(()=>{
      this.loadData();//refresh view
    });
  }else{
    this.updateDocument("members", this.model.$key, this.model).then(()=>{
      this.loadData();//refresh view
    });
  }
  this.isEditing = false;
  //clear form
  this.model.name = '';
  this.model.address = '';
  this.model.gender = '';
  this.model.number = '';

}

updateUser(obj){
  this.model = obj;
  this.isEditing = true;
}

deleteUser(key){
  this.deleteDocument("members", key).then(()=>{
    this.loadData();//refresh view
    this.isEditing = false;
  });
}





//CRUD operation methods------------------------------------------------------------------------------------------

getAllDocuments(collection: string): Promise<any> {
    return new Promise((resolve, reject) => {
        this.db.collection(collection)
            .get()
            .then((querySnapshot) => {
                let arr = [];
                querySnapshot.forEach(function (doc) {
                    var obj = JSON.parse(JSON.stringify(doc.data()));
                    obj.$key = doc.id
                    console.log(obj)
                    arr.push(obj);
                });

                if (arr.length > 0) {
                    console.log("Document data:", arr);
                    resolve(arr);
                } else {
                    console.log("No such document!");
                    resolve(null);
                }


            })
            .catch((error: any) => {
                reject(error);
            });
    });
}

deleteDocument(collectionName: string, docID: string): Promise<any> {
  return new Promise((resolve, reject) => {
      this.db
          .collection(collectionName)
          .doc(docID)
          .delete()
          .then((obj: any) => {
              resolve(obj);
          })
          .catch((error: any) => {
              reject(error);
          });
  });
}

addDocument(collectionName: string, dataObj: any): Promise<any> {
  return new Promise((resolve, reject) => {
      this.db.collection(collectionName).add(dataObj)
          .then((obj: any) => {
              resolve(obj);
          })
          .catch((error: any) => {
              reject(error);
          });
  });
}

updateDocument(collectionName: string, docID: string, dataObj: any): Promise<any> {
  return new Promise((resolve, reject) => {
      this.db
          .collection(collectionName)
          .doc(docID)
          .update(dataObj)
          .then((obj: any) => {
              resolve(obj);
          })
          .catch((error: any) => {
              reject(error);
          });
  });
}

}