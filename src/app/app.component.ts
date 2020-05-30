import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      /** Enter your Wikitude (trial) License Key here. You can register and download your free license key here: http://www.wikitude.com/developer/licenses */      
      WikitudePlugin._sdkKey = "uguqccpIqinsjdoJA82nmxRfdKrGxtSXgNOjWEMSKclae7bG4FkWsHjoqM4XFbiKL7rBWdj6BV8cl8oKGaKcebVBmpYuaZqdAlvWoGjR8rF2mG+1vI7vNSAwwK0Ty4IMc2qCnx5q1HeGqPKmzqsRhm4Eo5H7Uz+loeA438QdcSRTYWx0ZWRfX8nUblDI3HU8gnO5Bfhjy47I6mdEtXzuisM7jrDtVGfMSrpL1gs40peliOfpY7+V7xIVL9e3S4P6hNvPH5W7FiNRauOaxU/OHyzrWpcdWB/apH/Bq7fKv6SciQ/4SX0m3qKGEWLRq+GrfeS+EGyIfDX7iqhbtf97IgUl983CEWDA1mph70Uji48Ed6ENqvAdxuJXCvb1Asps40ci87nt4dvdjNCF2mERj3DMvkrkj+0q9Xr2329Lr6MHxMxkGOSB7h2Tu+obnTJVF0/zrRTcAYRqUorSS2l2yDHFwmEPZZVwice55DMQyaKONJOP3EIp+Xhpl+zx3Png9Bra5AC/5sDPWPsueH3kfXyECBj8FwYDLtbSxDd6vHGnREsQ2qxMti0A+l9hfEwm1mX4r+KIsmBNzsnVSLaG3mNr+hZWf6F51dGJdjwkoGLSEf9h8mZSighYwS9UcXgbB+Goa13oDWMGegFHT1welDZqn4YMbOp/0BzaKn7CvKagQm2hyqRMKLs1gTNMfqC40y58UoHzWv3LabYUlhNlQHVMjWV2HSws7GZaKqhfNGn9x+Hwxhf6rab9rmVzOoNf";
      
            /** Check if your device supports AR */
            WikitudePlugin.isDeviceSupported(
                function(success) {
                  console.log("Your platform supports AR/Wikitude. Have fun developing!!");
                },
                function(fail) {
                  console.log("Your platform failed to run AR/Wikitude: "+fail);
                },
                [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
            );                  
      
            /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
             * through the function below for the direction Ionic app --> Wikitude SDK 
             * For calls from Wikitude SDK --> Ionic app see the captureScreen example in 
             * WikitudeIonic3StarterApp/www/assets/07_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
            // set the function to be called, when a "communication" is indicated from the AR View  
            WikitudePlugin.setOnUrlInvokeCallback(function(url) {
      
              console.log("setOnUrlInvokeCallback ...");
              
              // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
              if (url.indexOf('captureScreen') > -1) {
                  WikitudePlugin.captureScreen(
                      (absoluteFilePath) => {
                          console.log("snapshot stored at:\n" + absoluteFilePath);
      
                          // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                          WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                      },
                      (errorMessage) => {
                          console.log(errorMessage);
                      },
                      true, null
                  );
              } else {
                  alert(url + "not handled");
              }
            });
      
            /**
             * Define the generic ok callback
             */
            WikitudePlugin.onWikitudeOK = function() {
                console.log("Things went ok.");
            }
            
            /**
             * Define the generic failure callback
             */
            WikitudePlugin.onWikitudeError = function() {
                console.log("Something went wrong");
            }
      
            // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
            // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
            //WikitudePlugin.setLocation(47, 13, 450, 1);
      
            /* for Android only
            WikitudePlugin.setBackButtonCallback(
                () => {
                    console.log("Back button has been pressed...");
                }
            );                  
            */
            
    });
  }
}
