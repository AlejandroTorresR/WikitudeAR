import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit{
public startupConfiguration: any = {"camera_position": "back"};
  constructor() {
  	
  }

  ngOnInit(){
        WikitudePlugin.loadARchitectWorld(
          function(success) {
            console.log("ARchitect World loaded successfully.");
          },
          function(fail) {
            console.log("Failed to load ARchitect World!");
          },          
          "www/assets/07_3dModels_1_3dModelOnTarget/index.html", // (1) if you have a IR (Image Recognition) World, use this
          ["ir"], // (1) if you have a IR (Image Recognition) World, use this
//          "www/assets/07_3dModels_6_3dModelAtGeoLocation/index.html",  // (2) if you have a GeoLocation World, use this
//          ["geo"],  // (2) if you have a GeoLocation World, use this
// you find other samples or Wikitude worlds in Wikitude Cordova Plugin
// which can be downloaded from here: https://github.com/Wikitude/wikitude-cordova-plugin/archive/v5.3.1-3.3.2.zip
          <JSON>this.startupConfiguration
      );

  }



}
